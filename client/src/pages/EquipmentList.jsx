import React, { useState, useEffect } from 'react';
import {
  Box, Grid, Card, CardContent, Typography, Button, Badge,
  Chip, Avatar
} from '@mui/material';
import { Add, Maintenance } from '@mui/icons-material';
import api from '../services/api';

const EquipmentList = ({ onOpenForm, onViewRequests }) => {
  const [equipmentList, setEquipmentList] = useState([]);

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    const data = await api.getEquipment();
    setEquipmentList(data);
  };

  const getOpenRequestsCount = (equipment) => {
    // This would fetch from API in real app
    return Math.floor(Math.random() * 3);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Equipment Inventory</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={onOpenForm}>
          Add Equipment
        </Button>
      </Box>

      <Grid container spacing={2}>
        {equipmentList.map((equipment) => {
          const openRequests = getOpenRequestsCount(equipment);
          return (
            <Grid item xs={12} sm={6} md={4} key={equipment._id}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {equipment.equipmentName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    📄 {equipment.serialNumber}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    📍 {equipment.location} | {equipment.department}
                  </Typography>
                  <Chip label={equipment.isActive ? 'Active' : 'Scrap'} 
                    color={equipment.isActive ? 'success' : 'error'} size="small" />
                  
                  <Badge badgeContent={openRequests} color="primary" sx={{ ml: 1 }}>
                    <Button 
                      variant="outlined" 
                      startIcon={<Maintenance />}
                      onClick={() => onViewRequests(equipment._id)}
                      size="small"
                      sx={{ mt: 1 }}
                    >
                      Maintenance
                    </Button>
                  </Badge>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default EquipmentList;
