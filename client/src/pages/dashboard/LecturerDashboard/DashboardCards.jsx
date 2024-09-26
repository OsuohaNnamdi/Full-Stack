import React from 'react';
import { Paper, Typography } from '@mui/material';

const DashboardCards = ({ title, icon, count }) => {
  return (
    <Paper sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: 3 }}>
      <Typography variant="h6">{title}</Typography>
      {/* <IconButton sx={{ bgcolor: 'black', color: 'white' }}>
        {icon}
      </IconButton> */}
      <Typography color="textSecondary">{count}</Typography>
    </Paper>
  );
};

export default DashboardCards;
