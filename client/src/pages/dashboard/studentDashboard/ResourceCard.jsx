import React from 'react';
import { Box, Card, CardContent, Typography, IconButton } from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';

const ResourceCard = ({ id, courseCode, courseTitle, file, isStudent }) => {
  const handleDownload = () => {
    if (file) {
      const link = document.createElement('a');
      link.href = file;
      link.download = file.split('/').pop(); // Extract file name from URL
      link.click();
    }
  };

  return (
    <Card sx={{ mb: 2, boxShadow: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">{courseTitle}</Typography>
          <Typography variant="body2" color="textSecondary">{courseCode}</Typography>
          {isStudent && (
            <IconButton onClick={handleDownload}>
              <DownloadIcon />
            </IconButton>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ResourceCard;
