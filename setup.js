// setup.js - Run this before starting the server to ensure environment variables are set
const fs = require('fs');
const path = require('path');

console.log('Setting up environment configuration...');

// Create .env file for the server
const serverDir = path.join(__dirname, 'fitness-tracker', 'Server');
const envPath = path.join(serverDir, '.env');

// Skip if .env already exists
if (!fs.existsSync(envPath)) {
  console.log('Creating .env file from environment variables...');
  
  // Create content from environment variables
  const envContent = `
MONGODB_URI=${process.env.MONGODB_URI || 'mongodb://localhost:27017/fitness-tracker'}
JWT_SECRET=${process.env.JWT_SECRET || 'default-jwt-secret'}
STRIPE_SECRET_KEY=${process.env.STRIPE_SECRET_KEY || 'sk_test_default'}
STRIPE_PUBLISHABLE_KEY=${process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_default'}
CLIENT_URL=${process.env.CLIENT_URL || 'http://localhost:5173'}
NODE_ENV=${process.env.NODE_ENV || 'development'}
`;

  // Ensure directory exists
  if (!fs.existsSync(serverDir)) {
    console.log(`Creating directory: ${serverDir}`);
    fs.mkdirSync(serverDir, { recursive: true });
  }

  // Write the .env file
  fs.writeFileSync(envPath, envContent);
  console.log('.env file created successfully!');
} else {
  console.log('.env file already exists, skipping creation');
}

// Log verification
console.log('Environment setup complete');
console.log('Working directory:', process.cwd());
console.log('Server directory:', serverDir);
console.log('Environment file path:', envPath); 