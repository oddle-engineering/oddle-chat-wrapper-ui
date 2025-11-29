// Quick environment variable test for debugging
console.log('Testing environment variables...');

const fs = require('fs');
const path = require('path');

// Check if .env.local exists
const envPath = path.join(__dirname, '.env.local');
console.log('.env.local exists:', fs.existsSync(envPath));

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  console.log('.env.local content:');
  console.log(envContent);
  
  // Parse environment variables
  const envVars = {};
  envContent.split('\n').forEach(line => {
    if (line.trim() && !line.startsWith('#')) {
      const [key, value] = line.split('=');
      if (key && value) {
        envVars[key.trim()] = value.trim();
      }
    }
  });
  
  console.log('Parsed variables:', envVars);
}

// Check if Node.js sees the environment variables
console.log('Process env:', {
  VITE_APP_TOLGEE_API_URL: process.env.VITE_APP_TOLGEE_API_URL,
  VITE_APP_TOLGEE_PROJECT_ID: process.env.VITE_APP_TOLGEE_PROJECT_ID,
  HAS_API_KEY: !!process.env.VITE_APP_TOLGEE_API_KEY
});