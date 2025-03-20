// Main entry point for Vercel deployment
console.log('Starting server from repository root...');

// Display path information for debugging
console.log('Current working directory:', process.cwd());
console.log('__dirname:', __dirname);

try {
  // Run setup script to ensure environment variables are set
  console.log('Running setup script...');
  require('./setup.js');
  
  // Run verification script
  console.log('Running verification script...');
  require('./fitness-tracker/Server/verify-paths.js');
  
  // Load the actual server
  console.log('Loading server module from fitness-tracker/Server/server.js');
  require('./fitness-tracker/Server/server.js');
} catch (error) {
  console.error('Error loading server module:', error);
  process.exit(1);
} 