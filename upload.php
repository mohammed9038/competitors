<?php
$uploadDir = "uploads/";

// Create uploads folder if it doesn't exist
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

$response = [];

foreach ($_FILES as $file) {
    $filename = basename($file["name"]);
    $targetFile = $uploadDir . time() . "_" . $filename;

    if (move_uploaded_file($file["tmp_name"], $targetFile)) {
        $url = "https://" . $_SERVER['HTTP_HOST'] . "/Competitors/" . $targetFile;
        $response[] = $url;
    } else {
        $response[] = "Error uploading " . $filename;
    }
}

header('Content-Type: application/json');
echo json_encode($response);
?>
