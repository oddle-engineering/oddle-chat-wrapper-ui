import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "../../src/styles/chat-wrapper.css";

// Set up Tolgee configuration from environment variables
// This enables automatic translation detection in ChatWrapper
if (typeof window !== 'undefined') {
  // Debug: Log environment variables
  console.log('🔧 Setting up Tolgee configuration...');
  console.log('Environment variables:', {
    API_URL: import.meta.env.VITE_APP_TOLGEE_API_URL,
    HAS_API_KEY: !!import.meta.env.VITE_APP_TOLGEE_API_KEY
  });

  // Set global variables for Tolgee auto-detection
  (window as any).__VITE_APP_TOLGEE_API_URL__ = import.meta.env.VITE_APP_TOLGEE_API_URL;
  (window as any).__VITE_APP_TOLGEE_API_KEY__ = import.meta.env.VITE_APP_TOLGEE_API_KEY;

  // Debug: Verify globals were set
  console.log('Window globals set:', {
    API_URL: (window as any).__VITE_APP_TOLGEE_API_URL__,
    HAS_API_KEY: !!(window as any).__VITE_APP_TOLGEE_API_KEY__
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);
