/**
 * Manual Integration Test Script for Authentication Flow
 * Tests: User registration, login, logout, protected route access, JWT token handling
 * Requirements: 2.1, 2.2, 2.3, 2.4, 3.5, 11.1, 11.2, 11.4
 */

const API_BASE_URL = 'http://localhost:5000/api';

// Test data
const testUser = {
  name: 'Test User',
  email: `test${Date.now()}@example.com`,
  password: 'testpass123',
};

let authToken = null;

// Helper function to make API requests
async function makeRequest(endpoint, method = 'GET', body = null, token = null) {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    const data = await response.json();
    return { status: response.status, data };
  } catch (error) {
    return { status: 0, error: error.message };
  }
}

// Test 1: User Registration with Valid Data
async function testValidSignup() {
  console.log('\n🧪 Test 1: User Registration with Valid Data');
  const result = await makeRequest('/auth/signup', 'POST', testUser);
  
  if (result.status === 201 && result.data.success) {
    console.log('✅ PASS: User registered successfully');
    console.log(`   User ID: ${result.data.data.user._id}`);
    console.log(`   Token received: ${result.data.data.token ? 'Yes' : 'No'}`);
    authToken = result.data.data.token;
    return true;
  } else {
    console.log('❌ FAIL: User registration failed');
    console.log(`   Status: ${result.status}`);
    console.log(`   Response:`, result.data);
    return false;
  }
}

// Test 2: User Registration with Invalid Data (Missing Fields)
async function testInvalidSignup() {
  console.log('\n🧪 Test 2: User Registration with Invalid Data (Missing Fields)');
  const invalidUser = { email: 'test@example.com' }; // Missing name and password
  const result = await makeRequest('/auth/signup', 'POST', invalidUser);
  
  if (result.status === 400) {
    console.log('✅ PASS: Invalid registration rejected correctly');
    console.log(`   Error message: ${result.data.message}`);
    return true;
  } else {
    console.log('❌ FAIL: Invalid registration should have been rejected');
    console.log(`   Status: ${result.status}`);
    return false;
  }
}

// Test 3: User Registration with Weak Password
async function testWeakPassword() {
  console.log('\n🧪 Test 3: User Registration with Weak Password');
  const weakPasswordUser = {
    name: 'Test User',
    email: `weak${Date.now()}@example.com`,
    password: '123', // Less than 6 characters
  };
  const result = await makeRequest('/auth/signup', 'POST', weakPasswordUser);
  
  if (result.status === 400 && result.data.message.includes('Password')) {
    console.log('✅ PASS: Weak password rejected correctly');
    console.log(`   Error message: ${result.data.message}`);
    return true;
  } else {
    console.log('❌ FAIL: Weak password should have been rejected');
    console.log(`   Status: ${result.status}`);
    return false;
  }
}

// Test 4: User Registration with Invalid Email Format
async function testInvalidEmail() {
  console.log('\n🧪 Test 4: User Registration with Invalid Email Format');
  const invalidEmailUser = {
    name: 'Test User',
    email: 'notanemail',
    password: 'testpass123',
  };
  const result = await makeRequest('/auth/signup', 'POST', invalidEmailUser);
  
  if (result.status === 400 && result.data.message.includes('email')) {
    console.log('✅ PASS: Invalid email format rejected correctly');
    console.log(`   Error message: ${result.data.message}`);
    return true;
  } else {
    console.log('❌ FAIL: Invalid email should have been rejected');
    console.log(`   Status: ${result.status}`);
    return false;
  }
}

// Test 5: Login with Correct Credentials
async function testValidLogin() {
  console.log('\n🧪 Test 5: Login with Correct Credentials');
  const result = await makeRequest('/auth/login', 'POST', {
    email: testUser.email,
    password: testUser.password,
  });
  
  if (result.status === 200 && result.data.success && result.data.data.token) {
    console.log('✅ PASS: Login successful with correct credentials');
    console.log(`   Token received: Yes`);
    console.log(`   User: ${result.data.data.user.name}`);
    authToken = result.data.data.token;
    return true;
  } else {
    console.log('❌ FAIL: Login failed with correct credentials');
    console.log(`   Status: ${result.status}`);
    console.log(`   Response:`, result.data);
    return false;
  }
}

// Test 6: Login with Incorrect Password
async function testInvalidLogin() {
  console.log('\n🧪 Test 6: Login with Incorrect Password');
  const result = await makeRequest('/auth/login', 'POST', {
    email: testUser.email,
    password: 'wrongpassword',
  });
  
  if (result.status === 401) {
    console.log('✅ PASS: Login rejected with incorrect password');
    console.log(`   Error message: ${result.data.message}`);
    return true;
  } else {
    console.log('❌ FAIL: Login should have been rejected');
    console.log(`   Status: ${result.status}`);
    return false;
  }
}

// Test 7: Access Protected Route with Valid Token
async function testProtectedRouteWithToken() {
  console.log('\n🧪 Test 7: Access Protected Route with Valid Token');
  const result = await makeRequest('/auth/me', 'GET', null, authToken);
  
  if (result.status === 200 && result.data.success) {
    console.log('✅ PASS: Protected route accessible with valid token');
    console.log(`   User: ${result.data.data.name}`);
    console.log(`   Email: ${result.data.data.email}`);
    return true;
  } else {
    console.log('❌ FAIL: Protected route should be accessible with valid token');
    console.log(`   Status: ${result.status}`);
    console.log(`   Response:`, result.data);
    return false;
  }
}

// Test 8: Access Protected Route without Token
async function testProtectedRouteWithoutToken() {
  console.log('\n🧪 Test 8: Access Protected Route without Token');
  const result = await makeRequest('/auth/me', 'GET', null, null);
  
  if (result.status === 401) {
    console.log('✅ PASS: Protected route rejected without token');
    console.log(`   Error message: ${result.data.message}`);
    return true;
  } else {
    console.log('❌ FAIL: Protected route should be rejected without token');
    console.log(`   Status: ${result.status}`);
    return false;
  }
}

// Test 9: Access Protected Route with Invalid Token
async function testProtectedRouteWithInvalidToken() {
  console.log('\n🧪 Test 9: Access Protected Route with Invalid Token');
  const result = await makeRequest('/auth/me', 'GET', null, 'invalid.token.here');
  
  if (result.status === 401) {
    console.log('✅ PASS: Protected route rejected with invalid token');
    console.log(`   Error message: ${result.data.message}`);
    return true;
  } else {
    console.log('❌ FAIL: Protected route should be rejected with invalid token');
    console.log(`   Status: ${result.status}`);
    return false;
  }
}

// Test 10: Logout Functionality
async function testLogout() {
  console.log('\n🧪 Test 10: Logout Functionality');
  const result = await makeRequest('/auth/logout', 'POST', null, authToken);
  
  if (result.status === 200 && result.data.success) {
    console.log('✅ PASS: Logout successful');
    console.log(`   Message: ${result.data.message}`);
    return true;
  } else {
    console.log('❌ FAIL: Logout failed');
    console.log(`   Status: ${result.status}`);
    console.log(`   Response:`, result.data);
    return false;
  }
}

// Run all tests
async function runAllTests() {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('🚀 Starting Authentication Flow Integration Tests');
  console.log('═══════════════════════════════════════════════════════════');
  
  const results = [];
  
  // Registration tests
  results.push(await testInvalidSignup());
  results.push(await testWeakPassword());
  results.push(await testInvalidEmail());
  results.push(await testValidSignup());
  
  // Login tests
  results.push(await testInvalidLogin());
  results.push(await testValidLogin());
  
  // Protected route tests
  results.push(await testProtectedRouteWithoutToken());
  results.push(await testProtectedRouteWithInvalidToken());
  results.push(await testProtectedRouteWithToken());
  
  // Logout test
  results.push(await testLogout());
  
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
    console.log('\n🎉 All tests passed! Authentication flow is working correctly.');
  } else {
    console.log('\n⚠️  Some tests failed. Please review the failures above.');
  }
  console.log('═══════════════════════════════════════════════════════════\n');
}

// Run tests
runAllTests().catch(console.error);
