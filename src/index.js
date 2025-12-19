import React from 'react';
import ReactDOM from 'react-dom/client';
import '@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.min.css';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
