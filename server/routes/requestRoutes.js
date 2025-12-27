const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.json([
  { id: 1, subject: 'Oil leak', status: 'New', equipment: 'CNC Machine' },
  { id: 2, subject: 'Screen broken', status: 'In Progress', equipment: 'Laptop 01' }
]));
router.post('/', (req, res) => res.json({ message: 'Request created' }));

module.exports = router;
