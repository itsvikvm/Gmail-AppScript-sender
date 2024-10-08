# Gmail Apps Script sender
AppsScript script to automate email sending, likely outdated, but I think that's a cool use case!

ChatGPT created this script a few years ago for me, but it might be useful to someone. You can write a similar one using ChatGPT based on your requests or simply check the documentation. Readme is also chatgpt generated sorry

## Overview

This Google Apps Script automates the process of sending emails and follow-ups from a Google Sheet. It tracks sent emails and updates the status based on responses.

## Features

- Sends an initial email and up to 3 follow-up emails.
- Checks for replies and updates the status in the Google Sheet.
- Automatically appends the signature set in your Gmail settings.

## Prerequisites

1. **Google Account**: You need a Google account to access Google Sheets and Gmail.
2. **Google Sheet**: Create a Google Sheet with the following columns:
   - Column A: Project Names
   - Column B: Recipient Emails
   - Column D: Initial Email Body
   - Columns E, F, G: Follow-up Email Bodies
   - Column C: Status Updates

3. **Libraries**: Ensure that the Google Sheets and Gmail libs are enabled in your Apps Script environment.

## Steps to Use

1. **Open Google Sheets**: Create or open an existing Google Sheet.
2. **Open Apps Script**: Click on `Extensions` > `Apps Script`.
3. **Copy the Script**: Paste the provided script into the script editor.
4. **Customize the Script**:
   - Update the `sheetId` and `sheetName` variables with your Google Sheet's ID and name.
   - Modify any text, such as the sender name or reply-to address.
5. **Save and Authorize**: Save your script and authorize it to access your Gmail and Sheets.
6. **Run the Script**: Click the run button to start sending emails based on your sheet data.

## Contact

Feel free to reach out to me on Telegram if you want to chat about current tools or just have a casual conversation!

---

### Disclaimer

This script is provided as-is and may require adjustments based on your specific needs. Follow the comments in the script for guidance on usage and customization.

Happy emailing!
