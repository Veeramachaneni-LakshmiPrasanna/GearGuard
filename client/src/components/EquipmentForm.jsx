import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box, Card, CardContent, TextField, Button, MenuItem, Chip,
  Typography, Badge, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { Add, Maintenance } from '@mui/icons-material';
import api from '../services/api';

const EquipmentForm = ({ open, onClose, equipment, onSave }) => {
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const [teams, setTeams] = useState([]);
  const selectedTeam = watch('maintenanceTeam');

  useEffect(() => {
    api.getTeams().then(setTeams);
  }, []);

  useEffect(() => {
    if (equipment) {
      reset(equipment);
    } else {
      reset({
        equipmentName: '',
        serialNumber: '',
        purchaseDate: '',
        warrantyInfo: '',
        location: '',
        department: '',
        employee: '',
        maintenanceTeam: ''
      });
    }
  }, [equipment, reset]);

  const onSubmit = async (data) => {
    try {
      if (equipment) {
        await api.updateEquipment(equipment._id, data);
      } else {
        await api.createEquipment(data);
      }
      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving equipment:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{equipment ? 'Edit Equipment' : 'Add New Equipment'}</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
          <TextField
            {...register('equipmentName')}
            label="Equipment Name"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            {...register('serialNumber')}
            label="Serial Number"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            {...register('purchaseDate')}
            label="Purchase Date"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            {...register('warrantyInfo')}
            label="Warranty Info"
            fullWidth
            margin="normal"
          />
          <TextField
            {...register('location')}
            label="Location"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            {...register('department')}
            label="Department"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            {...register('employee')}
            label="Assigned Employee"
            fullWidth
            margin="normal"
          />
          <TextField
            select
            {...register('maintenanceTeam')}
            label="Maintenance Team"
            fullWidth
            margin="normal"
            required
          >
            {teams.map((team) => (
              <MenuItem key={team._id} value={team._id}>
                {team.teamName}
              </MenuItem>
            ))}
          </TextField>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained" startIcon={<Add />}>
              {equipment ? 'Update' : 'Add Equipment'}
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default EquipmentForm;
