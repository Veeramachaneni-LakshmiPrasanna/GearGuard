const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => res.json({ token: 'fake-jwt-token', user: { id: 1 } }));

module.exports = router;
