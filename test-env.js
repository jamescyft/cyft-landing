import { ENV } from './src/config/environment.js';

console.log('Google Sheets Config:');
console.log('- Enabled:', ENV.googleSheets.enabled);
console.log('- Script URL:', ENV.googleSheets.scriptUrl);
console.log('- Full ENV:', JSON.stringify(ENV, null, 2)); 