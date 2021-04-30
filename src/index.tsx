import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
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
