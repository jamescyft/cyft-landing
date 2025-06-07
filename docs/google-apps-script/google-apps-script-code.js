// Google Apps Script Code for Cyft Landing Page Form Handler
// Copy this entire code and paste it into your Google Apps Script editor

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get your spreadsheet ID from the URL
    // Example URL: https://docs.google.com/spreadsheets/d/1ABC123DEF456/edit
    // Replace this with your actual spreadsheet ID
    const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
    
    // Open the spreadsheet and get the first sheet
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheets()[0]; // Gets the first sheet
    
    // Check if headers exist, if not create them
    if (sheet.getLastRow() === 0) {
      const headers = [
        'Timestamp',
        'Form Type',
        'Name',
        'Email',
        'Company',
        'Tech Stack / Role',
        'Source',
        'Referrer',
        'User Agent'
      ];
      sheet.appendRow(headers);
      
      // Format header row
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#f3f3f3');
    }
    
    // Prepare the row data based on form type
    const rowData = [
      data.timestamp || new Date().toISOString(),
      data.formType || 'unknown',
      data.name || '',
      data.email || '',
      data.company || '',
      data.techs || data.role || '', // techs for demo form, role for friend form
      data.source || '',
      data.referrer || '',
      data.userAgent || ''
    ];
    
    // Append the row to the sheet
    sheet.appendRow(rowData);
    
    // Auto-resize columns for better readability
    sheet.autoResizeColumns(1, 9);
    
    // Log the submission for debugging
    console.log('Form submission received:', data);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true, 
        message: 'Data saved successfully',
        rowNumber: sheet.getLastRow()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log error for debugging
    console.error('Error processing form submission:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false, 
        error: error.toString(),
        message: 'Failed to save data'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function to verify the script is working
function testPost() {
  // Create test data
  const testData = {
    postData: {
      contents: JSON.stringify({
        timestamp: new Date().toISOString(),
        formType: 'test',
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
        techs: 'React, Node.js, AWS',
        source: 'localhost',
        referrer: 'Direct',
        userAgent: 'Test Browser'
      })
    }
  };
  
  // Call the doPost function with test data
  const result = doPost(testData);
  
  // Log the result
  console.log('Test result:', result.getContent());
  
  // Check if it worked
  const response = JSON.parse(result.getContent());
  if (response.success) {
    console.log('✅ Test passed! Check your spreadsheet for the test entry.');
  } else {
    console.log('❌ Test failed:', response.error);
  }
}

// Optional: Function to send email notifications for new submissions
function sendEmailNotification(data) {
  // Change this to your email address
  const NOTIFICATION_EMAIL = 'your-email@example.com';
  
  // Only send if email is configured
  if (NOTIFICATION_EMAIL === 'your-email@example.com') {
    console.log('Email notifications not configured');
    return;
  }
  
  const subject = `New ${data.formType} form submission - Cyft Landing Page`;
  
  let body = `New form submission received:\n\n`;
  body += `Type: ${data.formType}\n`;
  body += `Name: ${data.name || 'N/A'}\n`;
  body += `Email: ${data.email}\n`;
  body += `Company: ${data.company || 'N/A'}\n`;
  body += `Tech Stack/Role: ${data.techs || data.role || 'N/A'}\n`;
  body += `Timestamp: ${data.timestamp}\n`;
  body += `Source: ${data.source}\n`;
  body += `Referrer: ${data.referrer}\n`;
  body += `\nView in spreadsheet: https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}`;
  
  // Send the email
  MailApp.sendEmail(NOTIFICATION_EMAIL, subject, body);
}

// Optional: Function to get submission statistics
function getSubmissionStats() {
  const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getSheets()[0];
  
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) {
    console.log('No submissions yet');
    return;
  }
  
  const data = sheet.getRange(2, 1, lastRow - 1, 9).getValues();
  
  const stats = {
    total: data.length,
    demo: data.filter(row => row[1] === 'demo').length,
    friend: data.filter(row => row[1] === 'friend').length,
    companies: [...new Set(data.map(row => row[4]).filter(Boolean))].length,
    latestSubmission: data[data.length - 1][0]
  };
  
  console.log('Submission Statistics:', stats);
  return stats;
} 