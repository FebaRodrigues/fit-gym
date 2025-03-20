// test-cloudinary-direct.js
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary with hardcoded values
cloudinary.config({
  cloud_name: 'daacjyk3d',
  api_key: '529398839939766',
  api_secret: 'uh7GzWkQ4A5Hc2bfh-RyBk8AAFI'
});

// Log configuration
console.log('Cloudinary Configuration:');
console.log('CLOUD_NAME: daacjyk3d');
console.log('API_KEY: 529398839939766');
console.log('API_SECRET: ✓ Set');

// Create a test image if it doesn't exist
const testImagePath = path.join(__dirname, 'test-image.txt');
if (!fs.existsSync(testImagePath)) {
  fs.writeFileSync(testImagePath, 'This is a test file for Cloudinary upload');
  console.log('Created test file at:', testImagePath);
}

// Test upload function
async function testUpload() {
  try {
    console.log('Attempting to upload test file to Cloudinary...');
    
    const result = await cloudinary.uploader.upload(testImagePath, {
      folder: 'test',
      resource_type: 'raw'
    });
    
    console.log('Upload successful!');
    console.log('Result:', result);
    console.log('Secure URL:', result.secure_url);
    
    return result;
  } catch (error) {
    console.error('Upload failed with error:', error);
    throw error;
  }
}

// Run the test
testUpload()
  .then(() => console.log('Test completed successfully'))
  .catch(err => console.error('Test failed:', err))
  .finally(() => {
    // Clean up test file
    if (fs.existsSync(testImagePath)) {
      fs.unlinkSync(testImagePath);
      console.log('Test file removed');
    }
  }); 