import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';

const localizer = momentLocalizer(moment);

const CalendarView = ({ requests, onAddRequest }) => {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: null,
    end: null
  });

  useEffect(() => {
    const preventiveEvents = requests
      .filter(r => r.requestType === 'Preventive' && r.scheduledDate)
      .map(r => ({
        id: r._id,
        title: `${r.subject} (${r.equipment?.equipmentName})`,
        start: new Date(r.scheduledDate),
        end: new Date(r.scheduledDate),
        allDay: true,
        request: r
      }));
    setEvents(preventiveEvents);
  }, [requests]);

  const handleSelectSlot = ({ start, end }) => {
    setNewEvent({ title: '', start, end });
    setOpen(true);
  };

  const handleSave = () => {
    onAddRequest({
      subject: newEvent.title,
      scheduledDate: newEvent.start,
      requestType: 'Preventive'
    });
    setOpen(false);
  };

  return (
    <Box sx={{ height: '80vh', p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Preventive Maintenance Calendar
      </Typography>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        style={{ height: '100%' }}
      />

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Preventive Request</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Subject"
            fullWidth
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Date"
            type="date"
            fullWidth
            value={moment(newEvent.start).format('YYYY-MM-DD')}
            InputLabelProps={{ shrink: true }}
            disabled
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CalendarView;
