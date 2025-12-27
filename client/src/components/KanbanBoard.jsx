import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Divider,
  IconButton,
  Tooltip
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const KanbanBoard = ({ requests, onStatusChange, onEdit, onDelete }) => {
  const [columns, setColumns] = useState({
    'New': [],
    'In Progress': [],
    'Repaired': [],
    'Scrap': []
  });

  useEffect(() => {
    const grouped = {
      'New': [],
      'In Progress': [],
      'Repaired': [],
      'Scrap': []
    };
    requests.forEach(req => {
      grouped[req.status].push(req);
    });
    setColumns(grouped);
  }, [requests]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const request = requests.find(r => r._id === draggableId);
    onStatusChange(draggableId, destination.droppableId);
  };

  const renderCard = (request) => {
    const isOverdue = request.scheduledDate && new Date(request.scheduledDate) < new Date() && request.status !== 'Repaired';

    return (
      <Draggable key={request._id} draggableId={request._id} index={0}>
        {(provided) => (
          <Card
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            sx={{
              mb: 1,
              borderLeft: isOverdue ? '4px solid red' : '4px solid #1976d2',
              backgroundColor: isOverdue ? '#ffebee' : 'white'
            }}
          >
            <CardContent>
              <Typography variant="subtitle2" fontWeight="bold">
                {request.subject}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {request.equipment?.equipmentName} ({request.equipment?.serialNumber})
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {request.maintenanceTeam?.teamName}
              </Typography>
              {request.scheduledDate && (
                <Typography variant="body2" color="textSecondary">
                  {new Date(request.scheduledDate).toLocaleDateString()}
                </Typography>
              )}
              {request.assignedTo && (
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Avatar src={request.assignedTo.avatar} sx={{ width: 24, height: 24, mr: 1 }} />
                  <Typography variant="caption">{request.assignedTo.name}</Typography>
                </Box>
              )}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Chip label={request.status} size="small" color="primary" />
                <Box>
                  <Tooltip title="Edit">
                    <IconButton size="small" onClick={() => onEdit(request)}>
                      <Edit fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton size="small" onClick={() => onDelete(request._id)}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </CardContent>
          </Card>
        )}
      </Draggable>
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', p: 2 }}>
        {Object.keys(columns).map(columnId => (
          <Droppable key={columnId} droppableId={columnId}>
            {(provided) => (
              <Box
                ref={provided.innerRef}
                {...provided.droppableProps}
                sx={{
                  minWidth: 300,
                  maxWidth: 300,
                  border: '1px solid #ddd',
                  borderRadius: 1,
                  p: 1,
                  backgroundColor: '#f5f5f5'
                }}
              >
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                  {columnId}
                </Typography>
                {columns[columnId].map((request, index) => renderCard(request))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        ))}
      </Box>
    </DragDropContext>
  );
};

export default KanbanBoard;
