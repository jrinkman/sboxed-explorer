import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import firebase from 'firebase/app';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Set the base URL to the proxied S&box API URL
(window as any).axios = axios;
const isLocal = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

// Set the API url based on whether we're running locally
axios.defaults.baseURL = isLocal ?
  'http://localhost:5001/sbox-api-explorer/us-central1/proxy' :
  'https://us-central1-sbox-api-explorer.cloudfunctions.net/proxy';

// Initialize firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCGDzdhCdOCpENl7ziicwos8gB8t-y1GEc',
  authDomain: 'sbox-api-explorer.firebaseapp.com',
  projectId: 'sbox-api-explorer',
  storageBucket: 'sbox-api-explorer.appspot.com',
  messagingSenderId: '1050786626818',
  appId: '1:1050786626818:web:5170405557db106505d61b',
  measurementId: 'G-90RNVBCGCN',
};

firebase.initializeApp(firebaseConfig);

// Render the dom
ReactDOM.render(
  <React.StrictMode>
    <App isLocal={isLocal} />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
