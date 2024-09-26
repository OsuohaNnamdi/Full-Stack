import React, { useState, useEffect } from 'react';
import { Container, TextField, IconButton, List, ListItem, ListItemText, Typography, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import axiosInstance from '../auth/axiosInstance'; 
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const ChatPage = () => {
  const { email } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const userProfile = JSON.parse(localStorage.getItem('profile'));
  const senderEmail = userProfile.email || '';

  useEffect(() => {
    setLoading(true);
    axiosInstance.get(`/message/${senderEmail}/${email}`)
      .then(response => setMessages(response.data))
      .catch(error => {
        console.error('Error fetching messages:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to fetch messages.',
        });
      })
      .finally(() => setLoading(false));
  }, [email, senderEmail]);

  const handleSend = () => {
    if (message || file) {
      setLoading(true);
      const formData = new FormData();
      formData.append('text', message);
      formData.append('sender', senderEmail);
      formData.append('recipient', email);

      if (file) {
        formData.append('document', file);
        axiosInstance.post('/message/add', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then(() => {
          setMessage('');
          setFile(null);
          return axiosInstance.get(`/message/${senderEmail}/${email}`);
        })
        .then(response => setMessages(response.data))
        .catch(error => {
          console.error('Error sending message:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to send message.',
          });
        })
        .finally(() => setLoading(false));
      } else {
        // If no file, send to a different API endpoint
        axiosInstance.post('/message/message/sendNoFile', { text: message, sender: senderEmail, recipient: email })
        .then(() => {
          setMessage('');
          return axiosInstance.get(`/message/${senderEmail}/${email}`);
        })
        .then(response => setMessages(response.data))
        .catch(error => {
          console.error('Error sending message:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to send message.',
          });
        })
        .finally(() => setLoading(false));
      }
    }
  };

  const handleDelete = (id) => {
    setLoading(true);
    axiosInstance.delete(`/message/${id}`)
      .then(() => axiosInstance.get(`/message/${senderEmail}/${email}`))
      .then(response => setMessages(response.data))
      .catch(error => {
        console.error('Error deleting message:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to delete message.',
        });
      })
      .finally(() => setLoading(false));
  };

  const handleFileDownload = (fileUrl) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', 'downloaded_file'); // Customize file name here
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        padding: 0,
        margin: 0,
        overflow: 'hidden'  // Ensures the content doesn't scroll off-screen
      }}
    >
      {loading && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999
        }}>
          <CircularProgress />
        </div>
      )}
      <List
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: 0,
          margin: 0
        }}
      >
        {messages.map((msg) => (
          <ListItem
            key={msg.id}
            style={{
              justifyContent: msg.sender === senderEmail ? 'flex-end' : 'flex-start',
              paddingLeft: msg.sender === senderEmail ? 0 : '10%',
              paddingRight: msg.sender === senderEmail ? '10%' : 0
            }}
          >
            <ListItemText
              primary={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography
                    color="textPrimary"
                    style={{
                      backgroundColor: msg.sender === senderEmail ? '#e0f7fa' : '#f1f1f1',
                      borderRadius: 5,
                      padding: '5px 10px',
                      maxWidth: '70%',
                      wordBreak: 'break-word'
                    }}
                  >
                    {msg.text}
                    {msg.fileUrl && (
                      <div style={{ marginTop: 5, display: 'flex', alignItems: 'center' }}>
                        <IconButton
                          onClick={() => handleFileDownload(msg.fileUrl)}
                          component="span"
                          style={{ marginRight: 5 }}
                        >
                          <DownloadIcon color="primary" />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDelete(msg.id)}
                          size="small"
                          style={{ marginLeft: 10 }}
                        >
                          <DeleteIcon color="error" />
                        </IconButton>
                      </div>
                    )}
                  </Typography>
                </div>
              }
            />
          </ListItem>
        ))}
      </List>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          borderTop: '1px solid #ccc',
          padding: '10px',
          backgroundColor: '#fff',
          position: 'sticky',  // Stick the input box to the bottom
          bottom: 0
        }}
      >
        <input
          type="file"
          style={{ display: 'none' }}
          onChange={(e) => setFile(e.target.files[0])}
          id="file-upload"
        />
        <label htmlFor="file-upload">
          <IconButton component="span">
            <AttachFileIcon />
          </IconButton>
        </label>
        <TextField
          variant="outlined"
          fullWidth
          multiline
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          style={{ marginLeft: 10, marginRight: 10 }}
        />
        <IconButton onClick={handleSend}>
          <SendIcon />
        </IconButton>
        {file && (
          <div style={{ marginTop: 10 }}>
            <Typography variant="body2" color="textSecondary">
              {file.name}
            </Typography>
          </div>
        )}
      </div>
    </Container>
  );
};

export default ChatPage;
