import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Typography,
  IconButton
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import MenuIcon from '@mui/icons-material/Menu'; // Import the Menu icon
import { useMediaQuery } from "@mui/material";

const Header = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg")); // Media query for larger screens
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const nav = useNavigate();
  const userProfile = JSON.parse(localStorage.getItem('profile')) || {};
  const fullName = userProfile.fullName || '';
  const email = userProfile.email || '';
  const schoolId = userProfile.schoolId || '';
  const initials = fullName.split(' ').map(name => name.charAt(0).toUpperCase()).join('');

  return (
    <AppBar sx={props.sx} elevation={0} className={props.customClass}>
      <Toolbar>
        {/* Left side content */}
        {!lgUp && ( // Show the hamburger icon only on mobile screens
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={props.toggleMobileSidebar} // Open the mobile sidebar when clicked
          >
            <MenuIcon />
          </IconButton>
        )}

        <Box flexGrow={1}>
          {/* Any other content can go here */}
        </Box>

        {/* Profile Dropdown */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            ml: 'auto'
          }}
        >
          <Button
            aria-label="menu"
            color="inherit"
            aria-controls="profile-menu"
            aria-haspopup="true"
            onClick={handleClick}
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Avatar
              sx={{
                width: 30,
                height: 30,
                backgroundColor: 'primary.main',
                color: 'white'
              }}
            >
              {initials}
            </Avatar>
          </Button>
          <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            sx={{
              "& .MuiMenu-paper": {
                width: "250px",
                right: 0,
                top: "70px !important",
              },
            }}
          >
            <MenuItem onClick={handleClose}>
              <Avatar
                sx={{
                  width: 35,
                  height: 35,
                  backgroundColor: 'primary.main',
                  color: 'white'
                }}
              >
                {initials}
              </Avatar>
              <Box
                sx={{
                  ml: 2,
                }}
              >
                <Typography>{fullName}</Typography>
              </Box>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  Email:
                </Typography>
              </ListItemIcon>
              <Typography variant="body2" sx={{ ml: 2 }}>
                {email}
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  School ID:
                </Typography>
              </ListItemIcon>
              <Typography variant="body2" sx={{ ml: 2 }}>
                {schoolId}
              </Typography>
            </MenuItem>
            <MenuItem onClick={() => {
              localStorage.clear(); 
              nav("/");
              window.location.reload(); 
            }}>
              <ListItemIcon>
                <LogoutOutlinedIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
