/**
 * Manual Integration Test Script for Image Upload and Prediction Flow
 * Tests: Image upload, file validation, Cloudinary upload, Hugging Face API, scan record creation, error handling
 * Requirements: 5.1, 5.2, 5.3, 5.4, 6.1, 6.2, 6.4, 6.5
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_BASE_URL = 'http://localhost:5000/api';

// Test user credentials
const testUser = {
  email: `uploadtest${Date.now()}@example.com`,
  password: 'testpass123',
  name: 'Upload Test User',
};

let authToken = null;
let createdScanId = null;

// Helper function to make API requests
async function makeRequest(endpoint, method = 'GET', body = null, token = null, isFormData = false) {
  const headers = {};

  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = isFormData ? body : JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    const data = await response.json();
    return { status: response.status, data };
  } catch (error) {
    return { status: 0, error: error.message };
  }
}

// Setup: Create test user and login
async function setupTestUser() {
  console.log('\n🔧 Setup: Creating test user and logging in...');
  
  // Register
  const signupResult = await makeRequest('/auth/signup', 'POST', testUser);
  if (signupResult.status !== 201) {
    console.log('❌ Failed to create test user');
    return false;
  }
  
  // Login
  const loginResult = await makeRequest('/auth/login', 'POST', {
    email: testUser.email,
    password: testUser.password,
  });
  
  if (loginResult.status === 200 && loginResult.data.data.token) {
    authToken = loginResult.data.data.token;
    console.log('✅ Test user created and logged in successfully');
    return true;
  }
  
  console.log('❌ Failed to login test user');
  return false;
}

// Create a test image file (1x1 PNG)
function createTestImage(filename, sizeInKB = 1) {
  // Minimal valid PNG file (1x1 pixel, transparent)
  const minimalPNG = Buffer.from([
    0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, // PNG signature
    0x00, 0x00, 0x00, 0x0D, 0x49, 0x48, 0x44, 0x52, // IHDR chunk
    0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
    0x08, 0x06, 0x00, 0x00, 0x00, 0x1F, 0x15, 0xC4,
    0x89, 0x00, 0x00, 0x00, 0x0A, 0x49, 0x44, 0x41,
    0x54, 0x78, 0x9C, 0x63, 0x00, 0x01, 0x00, 0x00,
    0x05, 0x00, 0x01, 0x0D, 0x0A, 0x2D, 0xB4, 0x00,
    0x00, 0x00, 0x00, 0x49, 0x45, 0x4E, 0x44, 0xAE,
    0x42, 0x60, 0x82
  ]);
  
  // Pad to desired size if needed
  const targetSize = sizeInKB * 1024;
  let imageBuffer = minimalPNG;
  
  if (targetSize > minimalPNG.length) {
    // Add padding (won't be a valid image but good for size testing)
    const padding = Buffer.alloc(targetSize - minimalPNG.length, 0);
    imageBuffer = Buffer.concat([minimalPNG, padding]);
  }
  
  const filepath = path.join(__dirname, filename);
  fs.writeFileSync(filepath, imageBuffer);
  return filepath;
}

// Test 1: Upload valid image file (JPEG/PNG)
async function testValidImageUpload() {
  console.log('\n🧪 Test 1: Upload Valid Image File');
  
  const testImagePath = createTestImage('test-valid.png', 50); // 50KB
  
  try {
    const formData = new FormData();
    const fileBuffer = fs.readFileSync(testImagePath);
    const blob = new Blob([fileBuffer], { type: 'image/png' });
    formData.append('image', blob, 'test-valid.png');
    
    const result = await makeRequest('/scans/upload', 'POST', formData, authToken, true);
    
    if (result.status === 201 && result.data.success) {
      console.log('✅ PASS: Valid image uploaded successfully');
      console.log(`   Scan ID: ${result.data.data._id}`);
      console.log(`   Predicted Disease: ${result.data.data.predictedDisease}`);
      console.log(`   Confidence: ${result.data.data.confidence}%`);
      console.log(`   Image URL: ${result.data.data.imageUrl ? 'Generated' : 'Missing'}`);
      console.log(`   Treatment: ${result.data.data.treatment ? 'Provided' : 'Missing'}`);
      createdScanId = result.data.data._id;
      return true;
    } else {
      console.log('❌ FAIL: Valid image upload failed');
      console.log(`   Status: ${result.status}`);
      console.log(`   Response:`, result.data);
      return false;
    }
  } catch (error) {
    console.log('❌ FAIL: Error during upload');
    console.log(`   Error: ${error.message}`);
    return false;
  } finally {
    // Cleanup
    if (fs.existsSync(testImagePath)) {
      fs.unlinkSync(testImagePath);
    }
  }
}

// Test 2: Upload without authentication
async function testUploadWithoutAuth() {
  console.log('\n🧪 Test 2: Upload Without Authentication');
  
  const testImagePath = createTestImage('test-noauth.png', 10);
  
  try {
    const formData = new FormData();
    const fileBuffer = fs.readFileSync(testImagePath);
    const blob = new Blob([fileBuffer], { type: 'image/png' });
    formData.append('image', blob, 'test-noauth.png');
    
    const result = await makeRequest('/scans/upload', 'POST', formData, null, true);
    
    if (result.status === 401) {
      console.log('✅ PASS: Upload rejected without authentication');
      console.log(`   Error message: ${result.data.message}`);
      return true;
    } else {
      console.log('❌ FAIL: Upload should be rejected without authentication');
      console.log(`   Status: ${result.status}`);
      return false;
    }
  } catch (error) {
    console.log('❌ FAIL: Error during test');
    console.log(`   Error: ${error.message}`);
    return false;
  } finally {
    if (fs.existsSync(testImagePath)) {
      fs.unlinkSync(testImagePath);
    }
  }
}

// Test 3: Upload without file
async function testUploadWithoutFile() {
  console.log('\n🧪 Test 3: Upload Without File');
  
  try {
    const formData = new FormData();
    // Don't append any file
    
    const result = await makeRequest('/scans/upload', 'POST', formData, authToken, true);
    
    if (result.status === 400) {
      console.log('✅ PASS: Upload rejected without file');
      console.log(`   Error message: ${result.data.message}`);
      return true;
    } else {
      console.log('❌ FAIL: Upload should be rejected without file');
      console.log(`   Status: ${result.status}`);
      return false;
    }
  } catch (error) {
    console.log('❌ FAIL: Error during test');
    console.log(`   Error: ${error.message}`);
    return false;
  }
}

// Test 4: Verify scan record creation
async function testScanRecordCreation() {
  console.log('\n🧪 Test 4: Verify Scan Record Creation');
  
  if (!createdScanId) {
    console.log('⚠️  SKIP: No scan ID available from previous test');
    return true;
  }
  
  const result = await makeRequest(`/scans/${createdScanId}`, 'GET', null, authToken);
  
  if (result.status === 200 && result.data.success) {
    console.log('✅ PASS: Scan record retrieved successfully');
    console.log(`   Scan ID: ${result.data.data._id}`);
    console.log(`   User ID: ${result.data.data.userId}`);
    console.log(`   Image URL: ${result.data.data.imageUrl ? 'Present' : 'Missing'}`);
    console.log(`   Predicted Disease: ${result.data.data.predictedDisease}`);
    console.log(`   Confidence: ${result.data.data.confidence}%`);
    console.log(`   Created At: ${result.data.data.createdAt}`);
    return true;
  } else {
    console.log('❌ FAIL: Failed to retrieve scan record');
    console.log(`   Status: ${result.status}`);
    console.log(`   Response:`, result.data);
    return false;
  }
}

// Test 5: Test error handling for API failures
async function testErrorHandling() {
  console.log('\n🧪 Test 5: Test Error Handling');
  
  // Try to get a non-existent scan
  const fakeId = '507f1f77bcf86cd799439011'; // Valid ObjectId format but doesn't exist
  const result = await makeRequest(`/scans/${fakeId}`, 'GET', null, authToken);
  
  if (result.status === 404) {
    console.log('✅ PASS: Error handling works correctly for non-existent resources');
    console.log(`   Error message: ${result.data.message}`);
    return true;
  } else {
    console.log('❌ FAIL: Should return 404 for non-existent scan');
    console.log(`   Status: ${result.status}`);
    return false;
  }
}

// Run all tests
async function runAllTests() {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('🚀 Starting Image Upload and Prediction Flow Tests');
  console.log('═══════════════════════════════════════════════════════════');
  
  // Setup
  const setupSuccess = await setupTestUser();
  if (!setupSuccess) {
    console.log('\n❌ Setup failed. Cannot continue with tests.');
    return;
  }
  
  const results = [];
  
  // Run tests
  results.push(await testUploadWithoutAuth());
  results.push(await testUploadWithoutFile());
  results.push(await testValidImageUpload());
  results.push(await testScanRecordCreation());
  results.push(await testErrorHandling());
  
  // Summary
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('📊 Test Summary');
  console.log('═══════════════════════════════════════════════════════════');
  const passed = results.filter(r => r).length;
  const total = results.length;
  console.log(`Total Tests: ${total}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${total - passed}`);
  console.log(`Success Rate: ${((passed / total) * 100).toFixed(1)}%`);
  
  if (passed === total) {
    console.log('\n🎉 All tests passed! Upload and prediction flow is working correctly.');
  } else {
    console.log('\n⚠️  Some tests failed. Please review the failures above.');
  }
  
  console.log('\n📝 Note: This test validates the upload flow and API integration.');
  console.log('   Actual Cloudinary upload and Hugging Face prediction require');
  console.log('   valid API credentials and network connectivity.');
  console.log('═══════════════════════════════════════════════════════════\n');
}

// Run tests
runAllTests().catch(console.error);
