// Backend Configuration Template
// Copy this file and rename to 'config.js' or use environment variables

module.exports = {
  // Server Configuration
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,

  // Database Configuration
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/pathfinderedu_dev',

  // Authentication
  JWT_SECRET: process.env.JWT_SECRET || 'your_super_secret_jwt_key_change_this_in_production',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',

  // CORS Configuration
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',

  // Security
  BCRYPT_ROUNDS: parseInt(process.env.BCRYPT_ROUNDS) || 12,

  // Email Configuration (Optional)
  EMAIL: {
    HOST: process.env.EMAIL_HOST || 'smtp.gmail.com',
    PORT: parseInt(process.env.EMAIL_PORT) || 587,
    USER: process.env.EMAIL_USER || '',
    PASS: process.env.EMAIL_PASS || ''
  },

  // File Upload Configuration
  UPLOAD: {
    MAX_FILE_SIZE: parseInt(process.env.MAX_FILE_SIZE) || 5000000,
    PATH: process.env.UPLOAD_PATH || './uploads'
  }
};

/* 
PRODUCTION DEPLOYMENT INSTRUCTIONS:

1. Create a .env file in the backend directory with:
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pathfinderedu
JWT_SECRET=generate_a_strong_random_secret_key_here
FRONTEND_URL=https://your-domain.com

2. Or set these as environment variables in your hosting platform:
- Heroku: heroku config:set VARIABLE_NAME=value
- Netlify: Site settings > Environment variables
- Vercel: Project settings > Environment Variables
- AWS: EC2 instance or Lambda environment variables

3. Make sure to generate a strong JWT secret:
- Use: openssl rand -hex 32
- Or: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
*/
