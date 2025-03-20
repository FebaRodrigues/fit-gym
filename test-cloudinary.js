require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary with the correct environment variable names
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY || process.env.API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET || process.env.API_SECRET
});

// Log configuration for debugging
console.log('Cloudinary Configuration:');
console.log('CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUD_NAME);
console.log('API_KEY:', process.env.CLOUDINARY_API_KEY || process.env.API_KEY);
console.log('API_SECRET:', (process.env.CLOUDINARY_API_SECRET || process.env.API_SECRET) ? '✓ Set' : '✗ Missing');

// Create a test image file
const testImagePath = path.join(__dirname, 'test-upload.txt');
fs.writeFileSync(testImagePath, 'This is a test file for Cloudinary upload');

// Make sure the file was created
console.log('Test file created at:', testImagePath);
console.log('File exists:', fs.existsSync(testImagePath));

// Function to test upload
async function testUpload() {
  try {
    console.log('Attempting to upload test file to Cloudinary...');
    
    const result = await cloudinary.uploader.upload(testImagePath, {
      folder: 'test',
      resource_type: 'raw'
    });
    
    console.log('Upload successful!');
    console.log('Secure URL:', result.secure_url);
    
    // Clean up the test file
    fs.unlinkSync(testImagePath);
    console.log('Test file deleted');
    
  } catch (error) {
    console.error('Upload failed:', error.message);
    
    if (error.http_code) {
      console.error(`HTTP Error ${error.http_code}: ${error.message}`);
    }
    
    if (error.name === 'Error' && error.message.includes('CLOUDINARY_URL')) {
      console.error('HINT: Make sure your environment variables are set correctly');
    }
  }
}

// Run the test
testUpload(); 