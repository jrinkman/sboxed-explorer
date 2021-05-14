import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import runtimeConstants from 'helpers/runtimeConstants';
import GlobalStyle from 'helpers/globalStyle';
import { initializeApp } from 'firebase/app';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Define firebase config
const firebaseConfig = {
  apiKey: 'AIzaSyCGDzdhCdOCpENl7ziicwos8gB8t-y1GEc',
  authDomain: 'sbox-api-explorer.firebaseapp.com',
  projectId: 'sbox-api-explorer',
  storageBucket: 'sbox-api-explorer.appspot.com',
  messagingSenderId: '1050786626818',
  appId: '1:1050786626818:web:5170405557db106505d61b',
  measurementId: 'G-90RNVBCGCN',
};

// Initialize firebase
initializeApp(firebaseConfig);

// Set the API url based on whether we're running locally
axios.defaults.baseURL = (runtimeConstants.isLocal && !runtimeConstants.devUseProdApi) ?
  'http://localhost:5001/sbox-api-explorer/us-central1' :
  'https://us-central1-sbox-api-explorer.cloudfunctions.net';

// Render the dom
ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
