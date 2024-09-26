// src/pages/SearchPage.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box, List, ListItem, ListItemText, Avatar, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axiosInstance from '../auth/axiosInstance';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const [search, setSearch] = useState('');
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chatList, setChatList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const userProfile = JSON.parse(localStorage.getItem('profile')) || {};

  console.log(userProfile.id)
  useEffect(() => {
    const fetchAllChat = async () => {
      try {
        const response = await axiosInstance.get(`/message/latest/${userProfile.id}`);
        if (response.data) {
          setChatList(response.data); 
        } else {
          setChatList([]); 
        }
      } catch (error) {
        console.error('Error fetching chat list:', error);
        setChatList([]); 
      }
    };
    fetchAllChat();
  }, [userProfile.id]);

  const handleSearch = () => {
    if (search.length > 2) {
      setLoading(true);
      axiosInstance.get(`/${search}`)
        .then(response => {
          setProfile(response.data);
          setLoading(false);
          setOpenDialog(true);
        })
        .catch(error => {
          console.error('Error fetching profile:', error);
          setProfile(null);
          setLoading(false);
        });
    } else {
      setProfile(null);
    }
  };

  const handleSelect = (email) => {
    setOpenDialog(false);
    navigate(`/chat/${email}`);
  };

  const handleChatClick = (chatId) => {
    navigate(`/chat/${chatId}`);
  };

  return (
    <Container>
      {/* Search bar */}
      <Box display="flex" alignItems="center" mb={2}>
        <TextField
          label="Search for a contact"
          variant="outlined"
          fullWidth
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          disabled={loading}
          sx={{ ml: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Search'}
        </Button>
      </Box>

      {/* List of previous chats */}
      <Typography variant="h6" mb={2}>Chats</Typography>
      <List>
        {chatList.map(chat => (
          <ListItem button key={chat.id} onClick={() => handleChatClick(chat.email)}>
            <Avatar alt={chat.name} src="/default-avatar.png" />
            <ListItemText
              primary={chat.name} // Displaying the name from the API
              secondary={
                <>
                  <Typography variant="body2" color="textSecondary">{chat.email}</Typography>
                </>
              } 
            />
          </ListItem>
        ))}
      </List>

      {/* Profile Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>User Profile</DialogTitle>
        <DialogContent>
          {profile ? (
            <>
              <Typography variant="h6">{profile.email}</Typography>
              <Typography variant="body1">{profile.fullName || 'No full name available'}</Typography>
            </>
          ) : (
            <Typography variant="body1">No results found</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">Cancel</Button>
          {profile && (
            <Button onClick={() => handleSelect(profile.email)} color="secondary">Start Chat</Button>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SearchPage;
