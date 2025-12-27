// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme
} from '@mui/material';
import Dashboard from './pages/Dashboard';
import EquipmentList from './pages/EquipmentList';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' }
  }
});

function App() {
  const [selectedView, setSelectedView] = useState('dashboard');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              🚀 GearGuard - Maintenance Tracker
            </Typography>
          </Toolbar>
        </AppBar>

        <Box sx={{ display: 'flex' }}>
          <Box sx={{ width: 200, p: 2, borderRight: 1, borderColor: 'divider' }}>
            <Typography variant="h6" gutterBottom>
              Navigation
            </Typography>
            <Box
              component="nav"
              sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
            >
              <button
                onClick={() => setSelectedView('dashboard')}
                className="nav-btn"
              >
                📊 Dashboard
              </button>
              <button
                onClick={() => setSelectedView('equipment')}
                className="nav-btn"
              >
                🛠 Equipment
              </button>
              <button
                onClick={() => setSelectedView('teams')}
                className="nav-btn"
              >
                👥 Teams
              </button>
              <button
                onClick={() => setSelectedView('requests')}
                className="nav-btn"
              >
                📋 Requests
              </button>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 1, p: 3 }}>
            {selectedView === 'dashboard' && <Dashboard />}
            {selectedView === 'equipment' && <EquipmentList />}
            {/* You can later add components for teams and requests */}
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;

