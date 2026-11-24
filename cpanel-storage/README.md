# cPanel Storage Architecture for bmtradingplc

This directory contains the production-ready tools for storing all media files (timber specifications, photos, certificates, and PDF spec sheets) on your **cPanel hosting account**.

---

## Deployment Option 1: Direct cPanel Hosting (Node.js App)
If your Next.js application runs directly on your cPanel server (via cPanel **"Setup Node.js App"** or CloudLinux Phusion Passenger):

1. Set `UPLOAD_DIR` in your cPanel `.env` to:
   ```env
   UPLOAD_DIR=/home/<cpanel_user>/public_html/uploads
   NEXT_PUBLIC_CPANEL_MEDIA_URL=https://bmtradingplc.com/uploads
   ```
2. Next.js will automatically write files directly to your cPanel local disk using high-speed filesystem writes.

---

## Deployment Option 2: Remote cPanel File Storage (Bridge Mode)
If your Next.js application is deployed on Vercel, Railway, or a separate server, and you want all media files saved to your cPanel server:

1. Upload the files in this directory to your cPanel:
   - Place `cpanel-storage/upload.php` into: `/home/<user>/public_html/api/upload.php`
   - Place `cpanel-storage/.htaccess` into: `/home/<user>/public_html/uploads/.htaccess`
2. In your Next.js `.env` (or environment variables on Vercel/Railway), set:
   ```env
   CPANEL_UPLOAD_ENDPOINT=https://files.bmtradingplc.com/api/upload.php
   CPANEL_UPLOAD_SECRET=bmt_cpanel_secure_storage_token_2026
   NEXT_PUBLIC_CPANEL_MEDIA_URL=https://files.bmtradingplc.com/uploads
   ```
3. Whenever an admin adds a product photo, gallery image, or spec PDF, Next.js streams the file directly to your cPanel server over HTTPS.

---

## Supported File Formats & Security
- **Allowed Formats:** JPG, JPEG, PNG, WEBP, AVIF, SVG, PDF (up to 25MB).
- **Security:** Execution of PHP, CGI, and shell scripts inside the uploads directory is completely blocked by `.htaccess`.
- **Caching:** 30-day static browser caching enabled for optimal performance.

