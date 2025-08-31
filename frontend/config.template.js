// Frontend Configuration Template
// This file contains all the configuration variables for the React app

const config = {
  // API Configuration
  API_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  BACKEND_URL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000',

  // Site Configuration
  SITE_URL: process.env.REACT_APP_SITE_URL || 'http://localhost:3000',
  SITE_NAME: process.env.REACT_APP_SITE_NAME || 'PathFinderEdu',

  // Feature Flags
  ENABLE_CHATBOT: process.env.REACT_APP_ENABLE_CHATBOT !== 'false',
  ENABLE_ASSESSMENT: process.env.REACT_APP_ENABLE_ASSESSMENT !== 'false',
  ENABLE_ANALYTICS: process.env.REACT_APP_ENABLE_ANALYTICS === 'true',

  // Third-party Services
  GOOGLE_ANALYTICS_ID: process.env.REACT_APP_GOOGLE_ANALYTICS_ID || '',
  FACEBOOK_PIXEL_ID: process.env.REACT_APP_FACEBOOK_PIXEL_ID || ''
};

export default config;

/* 
PRODUCTION DEPLOYMENT INSTRUCTIONS:

1. Create a .env file in the frontend directory with:
REACT_APP_API_URL=https://your-api-domain.com/api
REACT_APP_BACKEND_URL=https://your-api-domain.com
REACT_APP_SITE_URL=https://your-domain.com
REACT_APP_ENABLE_ANALYTICS=true

2. Or set these as environment variables in your hosting platform:
- Netlify: Site settings > Environment variables
- Vercel: Project settings > Environment Variables  
- AWS S3: Use AWS CLI or console to set environment variables

3. Build variables are embedded at build time, so make sure to:
- Set environment variables before running 'npm run build'
- Redeploy if you change any REACT_APP_ variables

EXAMPLE DEPLOYMENT COMMANDS:
# Netlify
netlify env:set REACT_APP_API_URL https://your-api.herokuapp.com/api

# Vercel  
vercel env add REACT_APP_API_URL

# Manual build
REACT_APP_API_URL=https://your-api.com/api npm run build
*/
