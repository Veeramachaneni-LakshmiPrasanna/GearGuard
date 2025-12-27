import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Box, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Chip
} from '@mui/material';
import { GroupAdd } from '@mui/icons-material';
import api from '../services/api';

const MaintenanceTeamForm = ({ open, onClose, team, onSave }) => {
  const { register, handleSubmit, reset } = useForm();

  React.useEffect(() => {
    if (team) {
      reset(team);
    } else {
      reset({ teamName: '', members: [] });
    }
  }, [team, reset]);

  const onSubmit = async (data) => {
    try {
      if (team) {
        await api.updateTeam(team._id, data);
      } else {
        await api.createTeam(data);
      }
      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving team:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{team ? 'Edit Team' : 'Add Maintenance Team'}</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
          <TextField
            {...register('teamName')}
            label="Team Name"
            fullWidth
            margin="normal"
            required
            helperText="e.g., Mechanics, Electricians, IT Support"
          />
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained" startIcon={<GroupAdd />}>
              {team ? 'Update' : 'Create Team'}
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default MaintenanceTeamForm;
