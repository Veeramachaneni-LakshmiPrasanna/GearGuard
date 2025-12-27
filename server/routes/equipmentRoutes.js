const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.json([{ id: 1, name: 'CNC Machine', serial: 'CN123' }]));
router.post('/', (req, res) => res.json({ message: 'Equipment created' }));

module.exports = router;
