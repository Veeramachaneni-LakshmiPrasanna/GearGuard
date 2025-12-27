import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, MenuItem, Button, Autocomplete, Chip
} from '@mui/material';
import api from '../services/api';

const RequestForm = ({ open, onClose, equipmentList, teams, onSave }) => {
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const equipmentId = watch('equipment');

  useEffect(() => {
    if (!open) return;
    reset({
      subject: '',
      requestType: 'Corrective',
      scheduledDate: '',
      duration: ''
    });
  }, [open, reset]);

  const handleEquipmentChange = (equipment) => {
    setSelectedEquipment(equipment);
    if (equipment) {
      setValue('equipment', equipment._id);
      setValue('maintenanceTeam', equipment.maintenanceTeam);
    }
  };

  const onSubmit = async (data) => {
    try {
      await api.createRequest(data);
      onSave();
      onClose();
    } catch (error) {
      console.error('Error creating request:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Create Maintenance Request</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
          <Autocomplete
            options={equipmentList}
            getOptionLabel={(option) => `${option.equipmentName} (${option.serialNumber})`}
            onChange={(_, value) => handleEquipmentChange(value)}
            renderInput={(params) => (
              <TextField {...params} label="Select Equipment" margin="normal" fullWidth required />
            )}
          />
          
          {selectedEquipment && (
            <Chip 
              label={`Team: ${selectedEquipment.maintenanceTeam?.teamName || 'Auto-filled'}`} 
              color="primary" 
              sx={{ mb: 2 }}
            />
          )}

          <TextField
            {...register('subject')}
            label="Subject (What's wrong?)"
            fullWidth
            margin="normal"
            required
            multiline
            rows={2}
          />
          
          <TextField
            select
            {...register('requestType')}
            label="Request Type"
            fullWidth
            margin="normal"
            required
          >
            <MenuItem value="Corrective">🔧 Corrective (Breakdown)</MenuItem>
            <MenuItem value="Preventive">📅 Preventive (Routine)</MenuItem>
          </TextField>

          <TextField
            {...register('scheduledDate')}
            label="Scheduled Date"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />

          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              Create Request
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default RequestForm;
