# Google Sheets Integration Setup

This guide will help you set up Google Sheets integration to capture form submissions from your Cyft landing page.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Cyft Landing Page Leads" (or any name you prefer)
4. Set up the following columns in the first row:
   - A1: `Timestamp`
   - B1: `Form Type`
   - C1: `Name`
   - D1: `Email`
   - E1: `Company`
   - F1: `Tech Stack`
   - G1: `Source`
   - H1: `Referrer`
   - I1: `User Agent`

## Step 2: Create a Google Apps Script

1. In your Google Sheet, go to **Extensions → Apps Script**
2. Delete any existing code and paste the following:

```javascript
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Open the spreadsheet (replace with your actual spreadsheet ID)
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Prepare the row data based on form type
    let rowData = [
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
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({success: true, message: 'Data saved'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log error for debugging
    console.error('Error:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function to verify the script is working
function testPost() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        timestamp: new Date().toISOString(),
        formType: 'test',
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
        techs: 'React, Node.js',
        source: 'localhost',
        referrer: 'Direct',
        userAgent: 'Test Browser'
      })
    }
  };
  
  const result = doPost(testData);
  console.log(result.getContent());
}
```

3. Save the script (Ctrl+S or Cmd+S)
4. Name it "Cyft Form Handler" (or any name you prefer)

## Step 3: Deploy as Web App

1. In the Apps Script editor, click **Deploy → New Deployment**
2. Click the gear icon and select **Web app**
3. Configure the deployment:
   - **Description**: "Cyft Landing Page Form Handler"
   - **Execute as**: "Me"
   - **Who has access**: "Anyone"
4. Click **Deploy**
5. Copy the Web App URL (it will look like: `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`)

## Step 4: Configure Your Landing Page

1. Create a `.env` file in your project root (if it doesn't exist)
2. Add the following environment variables:

```env
# Google Sheets Integration
VITE_GOOGLE_SHEETS_ENABLED=true
VITE_GOOGLE_SHEETS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

Replace `YOUR_SCRIPT_ID` with the actual ID from your Web App URL.

## Step 5: Test the Integration

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Submit a test form on your landing page
3. Check your Google Sheet - you should see the new submission appear

## Optional: Email Notifications

To get email notifications for new submissions, add this to your Google Apps Script:

```javascript
// Add this function to your existing script
function sendEmailNotification(data) {
  const recipient = 'your-email@example.com'; // Change to your email
  const subject = `New ${data.formType} form submission from Cyft landing page`;
  
  let body = `New form submission received:\n\n`;
  body += `Type: ${data.formType}\n`;
  body += `Name: ${data.name || 'N/A'}\n`;
  body += `Email: ${data.email}\n`;
  body += `Company: ${data.company || 'N/A'}\n`;
  body += `Tech Stack/Role: ${data.techs || data.role || 'N/A'}\n`;
  body += `Timestamp: ${data.timestamp}\n`;
  body += `Source: ${data.source}\n`;
  body += `Referrer: ${data.referrer}\n`;
  
  MailApp.sendEmail(recipient, subject, body);
}

// Then call it in your doPost function after appending the row:
sendEmailNotification(data);
```

## Troubleshooting

1. **Forms not submitting**: Check the browser console for errors
2. **Data not appearing in sheet**: 
   - Verify the Web App URL is correct in your `.env` file
   - Check the Apps Script execution logs
   - Make sure the deployment is set to "Anyone" for access
3. **CORS errors**: The service uses `no-cors` mode, so CORS errors are expected and won't affect functionality

## Security Notes

- The Google Apps Script Web App is publicly accessible but only accepts POST requests
- Consider adding validation or a secret token for production use
- The script runs under your Google account permissions
- Data is stored in your Google Sheet with your account's security settings 