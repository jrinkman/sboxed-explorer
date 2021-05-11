const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios').default;
const express = require('express');
const cors = require('cors');
const authRouter = require('./auth');

axios.defaults.baseURL =
  'https://apix.facepunch.com/api/sbox';

// Create a new express app
const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: ['https://sbox-api-explorer.web.app', 'http://localhost:3000'] }));

// Firebase admin init
admin.initializeApp();

// Reusable API promise
const sboxApi = async (endpoint, res) => {
  try {
    res.json((await axios.get(endpoint)).data);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

// API status check endpoint
app.get('/', async (req, res) => {
  res.sendStatus(200);
});

// Auth router
// app.use('/auth', authRouter);

// Proxy API endpoints
app.get('/menu', (req, res) => sboxApi('/menu/index', res));
app.get('/asset/get/:id', (req, res) => sboxApi(`/asset/get?id=${req.params.id}`, res));
app.get('/asset/find/:type', (req, res) => sboxApi(`/asset/find?type=${req.params.type}`, res));

// Expose Express API as a single Cloud Function:
exports.proxy = functions.https.onRequest(app);
exports.auth = functions.https.onRequest(authRouter);
