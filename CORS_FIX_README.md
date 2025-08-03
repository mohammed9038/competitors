# CORS Fix for Image Upload

## Problem
Your application is getting blocked by CORS (Cross-Origin Resource Sharing) policy when trying to upload images to `www.mkalrawi.com/Competitors/upload.php`.

## Solution
You need to add CORS headers to your `upload.php` file on the mkalrawi.com server.

### Add these lines to the TOP of your upload.php file:

```php
<?php
// Add CORS headers - ADD THESE LINES AT THE TOP
header("Access-Control-Allow-Origin: https://mohammed9038.github.io");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Your existing upload.php code continues here...
?>
```

## Alternative Solutions

### Option 1: Allow all origins (less secure)
```php
header("Access-Control-Allow-Origin: *");
```

### Option 2: Allow multiple domains
```php
$allowed_origins = [
    'https://mohammed9038.github.io',
    'http://localhost:3000',
    'https://your-domain.com'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
}
```

## Test the Fix
1. Add the CORS headers to your upload.php file
2. Test the application again
3. The upload should work without CORS errors

## Current Fallback Behavior
- If upload fails due to CORS, the app will show a warning message
- Data will still be submitted to Google Sheets without images
- Image file names will be logged as "[NOT_UPLOADED] filename.jpg"