import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import "@oddle/chat-wrapper-ui/dist/style.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);