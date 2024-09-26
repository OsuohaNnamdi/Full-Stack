import React from "react";
import { useLocation, NavLink } from "react-router-dom";
import { Box, Drawer, useMediaQuery, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import image from "../Logo/logos.jpeg";
import Menuitems from "./data";

const Sidebar = (props) => {
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const userType = localStorage.getItem('TYPE') || localStorage.getItem('TYPES') || localStorage.getItem('TYPESS') || 'guest';
  const menuItems = Menuitems[userType.toLowerCase()] || Menuitems.guest;

  const SidebarContent = (
    <Box sx={{ p: 3, height: "calc(100vh - 40px)" }}>
      <NavLink to="/">
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img 
            src={image} 
            alt="Logo" 
            id="logo" 
            style={{
              width: '230px',  
              height: '170px',  
            }} 
          />
        </Box>
      </NavLink>

      <Box>
        <List sx={{ mt: 4 }}>
          {menuItems.map((item, index) => (
            <List component="li" disablePadding key={item.title}>
              <ListItem
                button
                component={NavLink}
                to={item.href}
                selected={pathDirect === item.href}
                sx={{
                  mb: 1,
                  ...(pathDirect === item.href && {
                    color: "white",
                    backgroundColor: (theme) => `${theme.palette.primary.main}!important`,
                  }),
                }}
                onClick={() => {
                  if (!lgUp) {
                    props.onSidebarClose(); // Close sidebar on item click in mobile view
                  }
                }}
              >
                <ListItemIcon
                  sx={{
                    ...(pathDirect === item.href && { color: "white" }),
                  }}
                >
                  <item.icon width="20" height="20" />
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItem>
            </List>
          ))}
        </List>
      </Box>
    </Box>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open={props.isSidebarOpen}
        variant="persistent"
        PaperProps={{
          sx: {
            width: 240,
          },
        }}
      >
        {SidebarContent}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={props.isMobileSidebarOpen}
      onClose={props.onSidebarClose}
      PaperProps={{
        sx: {
          width: 240,
        },
      }}
      variant="temporary"
    >
      {SidebarContent}
    </Drawer>
  );
};

export default Sidebar;
