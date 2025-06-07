#!/usr/bin/env node

/**
 * Test script for Google Sheets integration
 * Run with: node test-google-sheets.js
 */

import { googleSheetsService } from './src/services/google-sheets.service.js';
import { ENV } from './src/config/environment.js';

console.log('Testing Google Sheets Integration...\n');

// Check configuration
console.log('Configuration:');
console.log(`- Enabled: ${ENV.googleSheets.enabled}`);
console.log(`- Script URL: ${ENV.googleSheets.scriptUrl || 'NOT SET'}\n`);

if (!ENV.googleSheets.enabled) {
  console.error('❌ Google Sheets integration is not enabled.');
  console.log('Please set VITE_GOOGLE_SHEETS_ENABLED=true in your .env file');
  process.exit(1);
}

if (!ENV.googleSheets.scriptUrl) {
  console.error('❌ Google Sheets script URL is not configured.');
  console.log('Please set VITE_GOOGLE_SHEETS_SCRIPT_URL in your .env file');
  process.exit(1);
}

// Test data
const testDemoData = {
  name: 'Test User',
  email: 'test@example.com',
  company: 'Test Company',
  techs: 'React, Node.js, AWS'
};

const testFriendData = {
  email: 'friend@example.com'
};

// Test demo submission
console.log('Testing demo form submission...');
try {
  const demoResult = await googleSheetsService.submitDemoRequest(testDemoData);
  console.log('✅ Demo submission result:', demoResult);
} catch (error) {
  console.error('❌ Demo submission failed:', error.message);
}

console.log('\n---\n');

// Test friend invitation
console.log('Testing friend invitation submission...');
try {
  const friendResult = await googleSheetsService.submitFriendInvitation(testFriendData);
  console.log('✅ Friend invitation result:', friendResult);
} catch (error) {
  console.error('❌ Friend invitation failed:', error.message);
}

console.log('\n---\n');

// Test connection
console.log('Testing connection...');
const isConnected = await googleSheetsService.testConnection();
if (isConnected) {
  console.log('✅ Connection test passed');
} else {
  console.log('❌ Connection test failed');
}

console.log('\nTest complete! Check your Google Sheet for the test entries.'); 