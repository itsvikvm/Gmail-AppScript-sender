function sendEmailsWithDynamicBody() {
  var sheetId = '1hi-wzNabVLBNmari7TsrKzJwx2L5kcvtATW8Ah65Sv8'; // Google Sheet ID
  var sheetName = 'GM'; // Name of your sheet
  var emailRange = 'B2:B'; // Range containing recipient emails
  var projectRange = 'A2:A'; // Range containing project names
  var statusRange = 'C2:C'; // Range for status updates
  var initialBodyCell = 'J2'; // Cell containing the body text for the initial email
  var followUpRange = 'E2:G2'; // Range containing follow-up texts (3 columns)

  var maxEmails = 4; // Total number of emails (1 initial + 3 follow-ups)
  
  var sheet = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName);
  var emailData = sheet.getRange(emailRange).getValues();
  var projectData = sheet.getRange(projectRange).getValues();
  var initialBody = sheet.getRange(initialBodyCell).getValue(); // Get the initial body text
  var followUpBodies = sheet.getRange(followUpRange).getValues()[0]; // Get follow-up texts as an array

  var sentCount = 0; // Counter for sent emails
  var statuses = []; // Array to store statuses

  // Signature to add at the end of each email, check the formatting, a bit tricky, also you can add your own signatory from Gmail, but I have lost the implementation code so
  var signature = "\n\n--\nBest Regards,\nViktor Mikhaylov\nTG/Twitter: @itsvikvm";

  // Loop through each email address
  for (var row = 0; row < emailData.length; row++) {
    var email = emailData[row][0];
    
    // Stop the script if the email is empty
    if (email === "") {
      break;
    }

    var project = projectData[row][0];
    var sentEmails = getSentEmailCount(email);
    
    // Check if a reply has been received
    if (hasReceivedReply(email)) {
      statuses.push(`Reply received from ${email}`);
      sheet.getRange(`K${row + 2}`).setValue("Reply received"); // Update status
      continue; // Skip sending follow-ups if a reply is received
    }

    if (sentEmails < maxEmails) {
      // Set the email subject
      var subject = `${project}, thanks! wow script`;
      if (project === "") {
        subject = "Dude, thanks! wow script";
      }
      
      var body;
      if (sentEmails === 0) {
        // Use the initial body text
        body = initialBody + signature; // Add signature to the initial body
        console.log(`First contact to ${email}`);
      } else {
        // Use the follow-up body text
        body = followUpBodies[sentEmails - 1] + signature; // Add signature to follow-up text
        console.log(`${email} followed-up ${sentEmails}`);
      }
      
      // Send the email with sender's name
      GmailApp.sendEmail(email, subject, body, { name: "Viktor Mikhaylov" });
      sentCount++; // Increment the total sent emails counter
      statuses.push(`Email sent to ${email} with subject: "${subject}"`);

      // Update the sent email count and status in the sheet
      sheet.getRange(`K${row + 2}`).setValue(sentEmails + 1); // Update sent email count

    } else {
      console.log(`Too many follow-ups for ${email} (${sentEmails})`);
      sheet.getRange(`K${row + 2}`).setValue("Touchpoints sent"); // Mark as sent
      statuses.push(`Too many follow-ups for ${email}`);
    }
  }

  // Output the results
  Logger.log(`Total emails sent: ${sentCount}`);
  Logger.log(`Statuses: ${statuses.join(", ")}`);
}

function getSentEmailCount(email) {
  // Get the number of email threads sent to this address
  var threads = GmailApp.search('to:' + email);
  return threads.length; // Return the count of threads
}

function hasReceivedReply(email) {
  // Check if there are any replies from the recipient in the inbox
  var threads = GmailApp.search('from:' + email + ' is:inbox');
  return threads.length > 0; // Return true if replies are found
}
