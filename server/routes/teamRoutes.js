const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json([
    { _id: '1', teamName: 'Mechanics' },
    { _id: '2', teamName: 'Electricians' },
    { _id: '3', teamName: 'IT Support' }
  ]);
});

router.post('/', (req, res) => {
  res.json({ message: 'Team created', teamName: req.body.teamName });
});

module.exports = router;
