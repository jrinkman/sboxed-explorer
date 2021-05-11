const functions = require('firebase-functions');
// const admin = require('firebase-admin');
const express = require('express');

// Create a new auth router
const router = express.Router();

router.get('/', (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
