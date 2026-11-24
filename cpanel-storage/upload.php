<?php
/**
 * ==============================================================================
 * bmtradingplc - cPanel Remote File Storage Gateway
 * ==============================================================================
 * Place this file inside your cPanel public directory, e.g.:
 *   /public_html/api/upload.php  OR  /files.bmtradingplc.com/api/upload.php
 *
 * This allows your Next.js application to upload and store product images,
 * jobsite gallery photos, and PDF specification sheets directly into your cPanel host.
 */

// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Authorization, Content-Type, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Security: Verify Bearer Secret Token (matches CPANEL_UPLOAD_SECRET in Next.js .env)
$expectedSecret = getenv('CPANEL_UPLOAD_SECRET') ?: 'bmt_cpanel_secure_storage_token_2026';
$authHeader = isset($_SERVER['HTTP_AUTHORIZATION']) ? $_SERVER['HTTP_AUTHORIZATION'] : '';

if (!empty($expectedSecret) && $expectedSecret !== 'change-this-secret') {
    if (strpos($authHeader, 'Bearer ') !== 0 || substr($authHeader, 7) !== $expectedSecret) {
        http_response_code(401);
        echo json_encode(["success" => false, "error" => "Unauthorized access to cPanel storage"]);
        exit;
    }
}

// Only accept POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "error" => "Method not allowed. Use POST."]);
    exit;
}

// Check uploaded file
if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "No file uploaded or upload error code: " . ($_FILES['file']['error'] ?? 'empty')]);
    exit;
}

$file = $_FILES['file'];
$rawFolder = isset($_POST['folder']) ? preg_replace('/[^a-zA-Z0-9_-]/', '', $_POST['folder']) : 'products';
$allowedFolders = ['products', 'gallery', 'specs', 'brand', 'general'];
$folder = in_array($rawFolder, $allowedFolders) ? $rawFolder : 'products';

// Allowed mime types & extensions
$allowedExts = ['jpg', 'jpeg', 'png', 'webp', 'avif', 'svg', 'pdf'];
$fileExt = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

if (!in_array($fileExt, $allowedExts)) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Unsupported file format (." . $fileExt . ")"]);
    exit;
}

// 25MB max size
if ($file['size'] > 26214400) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "File exceeds 25MB size limit"]);
    exit;
}

// Target directory on cPanel (e.g., /home/user/public_html/uploads/<folder>)
$baseDir = dirname(__DIR__) . '/uploads';
$targetDir = $baseDir . '/' . $folder;

if (!file_exists($targetDir)) {
    if (!mkdir($targetDir, 0755, true)) {
        http_response_code(500);
        echo json_encode(["success" => false, "error" => "Failed to create target folder on cPanel disk"]);
        exit;
    }
}

// Generate unique safe filename
$cleanName = preg_replace('/[^a-zA-Z0-9_-]/', '-', pathinfo($file['name'], PATHINFO_FILENAME));
$cleanName = substr($cleanName, 0, 40);
$targetFileName = time() . '-' . $cleanName . '.' . $fileExt;
$targetPath = $targetDir . '/' . $targetFileName;

if (!move_uploaded_file($file['tmp_name'], $targetPath)) {
    http_response_code(500);
    echo json_encode(["success" => false, "error" => "Failed to save file to cPanel filesystem"]);
    exit;
}

// Determine public URL
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? "https://" : "http://";
$host = $_SERVER['HTTP_HOST'];
$publicUrl = $protocol . $host . '/uploads/' . $folder . '/' . $targetFileName;

http_response_code(200);
echo json_encode([
    "success" => true,
    "file_url" => $publicUrl,
    "file_name" => $file['name'],
    "file_size" => $file['size'],
    "folder" => $folder,
    "created_at" => date('c')
]);
exit;

