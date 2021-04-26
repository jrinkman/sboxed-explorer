const functions = require('firebase-functions');
const axios = require('axios').default;
const express = require('express');
const cors = require('cors');

const app = express();

axios.defaults.baseURL =
  'https://apix.facepunch.com/api/sbox';

// Automatically allow cross-origin requests
app.use(cors({ origin: ['https://sbox-api-explorer.web.app', 'http://localhost:3000'] }));

app.get('/', async (req, res) => {
  res.sendStatus(200);
});

app.get('/menu', async (req, res) => {
  try {
    res.json((await axios.get('/menu/index')).data);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.get('/asset/get/:id', async (req, res) => {
  try {
    res.json((await axios.get(`/asset/get?id=${req.params.id}`)).data);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.get('/asset/find/:type', async (req, res) => {
  try {
    res.json((await axios.get(`/asset/find?type=${req.params.type}`)).data);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// Expose Express API as a single Cloud Function:
exports.proxy = functions.https.onRequest(app);