import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Card, CardContent, Tabs, Tab } from '@mui/material';
import KanbanBoard from '../components/KanbanBoard';
import CalendarView from '../components/CalendarView';
import api from '../services/api';

const Dashboard = () => {
  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [calendarRequests, setCalendarRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
    fetchCalendarRequests();
  }, []);

  const fetchRequests = async () => {
    const data = await api.getRequests();
    setRequests(data);
  };

  const fetchCalendarRequests = async () => {
    const data = await api.getCalendarRequests();
    setCalendarRequests(data);
  };

  const handleStatusChange = async (requestId, newStatus) => {
    await api.updateRequestStatus(requestId, newStatus);
    fetchRequests();
  };

  const tabs = [
    { label: 'Kanban Board', content: <KanbanBoard requests={requests} onStatusChange={handleStatusChange} /> },
    { label: 'Calendar', content: <CalendarView requests={calendarRequests} /> }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        GearGuard Dashboard
      </Typography>
      
      <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
        <Tab label="Kanban Board" />
        <Tab label="Preventive Calendar" />
      </Tabs>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          {tabs[activeTab].content}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
