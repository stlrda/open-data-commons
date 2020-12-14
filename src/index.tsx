/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import './index.css';
import reportWebVitals from './reportWebVitals';

const getEnvironmentVariables = () => ({
  swaggerUrl: process.env.REACT_APP_SWAGGER_URL,
  api: process.env.REACT_APP_API_URL
})

ReactDOM.render(
  <React.StrictMode>
    <App {...getEnvironmentVariables()} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
