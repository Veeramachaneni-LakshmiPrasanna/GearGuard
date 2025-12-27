const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = {
  getEquipment: () => fetch(`${API_BASE}/equipment`).then(res => res.json()),
  createEquipment: (data) => fetch(`${API_BASE}/equipment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    body: JSON.stringify(data)
  }).then(res => res.json()),

  getTeams: () => fetch(`${API_BASE}/teams`).then(res => res.json()),
  createTeam: (data) => fetch(`${API_BASE}/teams`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    body: JSON.stringify(data)
  }).then(res => res.json()),

  getRequests: () => fetch(`${API_BASE}/requests`).then(res => res.json()),
  createRequest: (data) => fetch(`${API_BASE}/requests`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  updateRequestStatus: (id, status, duration) => fetch(`${API_BASE}/requests/${id}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    body: JSON.stringify({ status, duration })
  }).then(res => res.json())
};

export default api;
