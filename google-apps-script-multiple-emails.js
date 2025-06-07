// Replace the existing sendEmailNotification function with this updated version

// Function to send email notifications for new submissions
function sendEmailNotification(data) {
  // Add all email addresses here, separated by commas
  const NOTIFICATION_EMAILS = [
    'email1@example.com',
    'email2@example.com',
    'email3@example.com'
    // Add more emails as needed
  ];
  
  // Skip if no emails are configured
  if (NOTIFICATION_EMAILS.length === 0 || NOTIFICATION_EMAILS[0] === 'email1@example.com') {
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
  
  // Send email to all recipients
  NOTIFICATION_EMAILS.forEach(email => {
    try {
      MailApp.sendEmail(email.trim(), subject, body);
      console.log(`Email sent to: ${email}`);
    } catch (error) {
      console.error(`Failed to send email to ${email}:`, error);
    }
  });
}

// Alternative: Send one email with all recipients
function sendEmailNotificationAlternative(data) {
  // Using a single email with multiple recipients
  const PRIMARY_EMAIL = 'primary@example.com';
  const CC_EMAILS = 'cc1@example.com, cc2@example.com'; // Comma-separated string
  const BCC_EMAILS = 'bcc1@example.com, bcc2@example.com'; // Hidden recipients
  
  // Skip if not configured
  if (PRIMARY_EMAIL === 'primary@example.com') {
    console.log('Email notifications not configured');
    return;
  }
  
  const subject = `New ${data.formType} form submission - Cyft Landing Page`;
  
  let htmlBody = `
    <h3>New form submission received</h3>
    <table border="1" cellpadding="5" cellspacing="0">
      <tr><td><strong>Type:</strong></td><td>${data.formType}</td></tr>
      <tr><td><strong>Name:</strong></td><td>${data.name || 'N/A'}</td></tr>
      <tr><td><strong>Email:</strong></td><td>${data.email}</td></tr>
      <tr><td><strong>Company:</strong></td><td>${data.company || 'N/A'}</td></tr>
      <tr><td><strong>Tech Stack/Role:</strong></td><td>${data.techs || data.role || 'N/A'}</td></tr>
      <tr><td><strong>Timestamp:</strong></td><td>${data.timestamp}</td></tr>
      <tr><td><strong>Source:</strong></td><td>${data.source}</td></tr>
      <tr><td><strong>Referrer:</strong></td><td>${data.referrer}</td></tr>
    </table>
    <p><a href="https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}">View in spreadsheet</a></p>
  `;
  
  // Send with CC and BCC
  MailApp.sendEmail({
    to: PRIMARY_EMAIL,
    cc: CC_EMAILS,
    bcc: BCC_EMAILS,
    subject: subject,
    htmlBody: htmlBody,
    name: 'Cyft Form Handler' // Sender name
  });
}

// Don't forget to add this line in your doPost function after sheet.appendRow(rowData):
// sendEmailNotification(data); 