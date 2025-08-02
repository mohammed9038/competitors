# Market Insights Form

This project is a simple HTML form for collecting competitor pricing and activity data. Submitted data is forwarded to a Google Sheets document using a Google Apps Script.

## Setup

1. Create a Google Spreadsheet and copy the script from `appsScript.gs` into the Apps Script editor.
2. Deploy the script as a **web app** with access level *Anyone*. Copy the deployment URL – by default the repository uses:

   `https://script.google.com/macros/s/AKfycbzfSWHROQG2Hx_FJtEMvnHtFgMjV8CG6ZfE5hUJ7e8HqJEOHDCzGlZ-i8Pauaj1yN7c/exec`

3. Open `index.html` in a browser. Filling the form and clicking **Submit** will send the data to the Apps Script endpoint which appends it to the spreadsheet.

If you need to use a different deployment URL, update the value in `js/submit.js`.

## Files

- `index.html` – the form UI and client logic
- `js/submit.js` – handles form submission
- `appsScript.gs` – Google Apps Script for storing the data

## Troubleshooting

If submission fails, check the browser console for errors and verify that the Apps Script deployment URL is correct and accessible.
