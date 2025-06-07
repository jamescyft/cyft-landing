# Google Apps Script Error 400 - Troubleshooting Guide

## Common Solutions for Error 400

### 1. **Clear Browser Data** (Most Common Fix)
1. Clear cookies and cache for `google.com` and `script.google.com`
2. In Chrome: Settings → Privacy and security → Clear browsing data
3. Select "Cookies and other site data" and "Cached images and files"
4. Time range: "All time"
5. Clear data and try again

### 2. **Check Google Account Issues**
If you're signed into multiple Google accounts:
1. Sign out of all Google accounts
2. Close all browser tabs
3. Sign in with only ONE Google account (the one that owns the spreadsheet)
4. Try accessing Apps Script again

### 3. **Use an Incognito/Private Window**
1. Open an incognito/private browser window
2. Sign in to your Google account
3. Open your Google Sheet
4. Go to Extensions → Apps Script

### 4. **Try a Different Browser**
Sometimes the issue is browser-specific:
- If using Chrome, try Firefox or Safari
- If using Safari, try Chrome

### 5. **Direct Access Method**
Instead of going through the Google Sheet:
1. Go directly to [script.google.com](https://script.google.com)
2. Click "New Project"
3. Create your script there
4. Then connect it to your sheet later

## Alternative Setup Method

If you still can't access Apps Script through your sheet, here's an alternative approach:

### Step 1: Create Script at script.google.com
1. Go to [script.google.com](https://script.google.com)
2. Click "New project"
3. Name it "Cyft Form Handler"
4. Paste the script code from the setup guide

### Step 2: Connect to Your Sheet
In the script, modify the code to explicitly reference your sheet:

```javascript
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Open the spreadsheet by ID (get this from your sheet's URL)
    // Your sheet URL looks like: https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
    const spreadsheetId = 'YOUR_SPREADSHEET_ID_HERE';
    const sheet = SpreadsheetApp.openById(spreadsheetId).getActiveSheet();
    
    // Rest of the code remains the same...
    let rowData = [
      data.timestamp || new Date().toISOString(),
      data.formType || 'unknown',
      data.name || '',
      data.email || '',
      data.company || '',
      data.techs || data.role || '',
      data.source || '',
      data.referrer || '',
      data.userAgent || ''
    ];
    
    sheet.appendRow(rowData);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true, message: 'Data saved'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error:', error);
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Step 3: Get Your Spreadsheet ID
1. Open your Google Sheet
2. Look at the URL: `https://docs.google.com/spreadsheets/d/1abc123def456/edit`
3. Copy the ID part: `1abc123def456`
4. Replace `YOUR_SPREADSHEET_ID_HERE` in the script

### Step 4: Deploy the Script
1. Save the script
2. Click Deploy → New Deployment
3. Choose "Web app"
4. Set "Execute as: Me" and "Who has access: Anyone"
5. Deploy and copy the URL

## Additional Tips

### Check Google Workspace Settings
If you're using a Google Workspace account (not personal Gmail):
- Your organization might have restricted Apps Script access
- Contact your Google Workspace admin
- Try using a personal Gmail account instead

### Browser Extensions
Some browser extensions can interfere:
- Temporarily disable ad blockers
- Disable VPN extensions
- Disable privacy-focused extensions

### Account Permissions
Make sure your Google account has the necessary permissions:
1. Go to [myaccount.google.com/permissions](https://myaccount.google.com/permissions)
2. Check if Google Apps Script is listed
3. If it's blocked or restricted, update the permissions

## Quick Test

To verify Apps Script is working for your account:
1. Go to [script.google.com/home](https://script.google.com/home)
2. If you can access this page, Apps Script is working
3. If not, the issue is with your account/browser

## Still Having Issues?

If none of the above works:
1. Try on a different computer
2. Check if you're behind a corporate firewall that blocks Google services
3. Create a new Google Sheet with a personal Gmail account as a test

The Error 400 is almost always related to browser cookies/cache or multiple account conflicts. The incognito window method works 90% of the time! 