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
if (process.env.FUNCTIONS_EMULATOR) {
  admin.initializeApp({
    credential: admin.credential.cert('./.admin-credentials.json'),
  });
} else {
  admin.initializeApp();
}

// Reusable API promise
const sboxApi = async (endpoint, res) => {
  try {
    res.json((await axios.get(endpoint)).data);
  } catch (error) {
    console.error(error);
    res.sendStatus(error.response.status);
  }
};

// API status check endpoint
app.get('/', async (req, res) => {
  res.sendStatus(200);
});

// Proxy API endpoints
app.get('/menu', (req, res) => sboxApi('/menu/index', res));
app.get('/asset/get', (req, res) => sboxApi(`/asset/get?id=${req.query.id}`, res));
app.get('/asset/find', (req, res) => sboxApi(`/asset/find?type=${req.query.type}`, res));

// Expose Express API as a single Cloud Function:
exports.proxy = functions.https.onRequest(app);
exports.auth = functions.https.onRequest(authRouter);
