# HTML Cleanup Guide - Removing PHP Code

## Overview

All HTML files in this project contain PHP code that needs to be removed for GitHub Pages compatibility. This guide provides step-by-step instructions to clean each file.

## What's Being Removed

1. **PHP opening/closing tags:** `<?php ... ?>`
2. **Session management:** `session_start();`
3. **File includes:** `include()`, `require()`, `require_once()`
4. **PHP functions:** `htmlspecialchars()`, `getSiteImagePath()`, etc.
5. **Database queries:** All PDO/database operations

## Templates Available

Two templates are provided in the root directory:
- `TEMPLATE_USER_PAGE.html` - For user-facing pages
- `TEMPLATE_ADMIN_PAGE.html` - For admin-only pages

## User Pages Cleanup

### Pages to Clean
- `about.html`
- `account_page.html`
- `cart.html`
- `checkout.html`
- `contact.html`
- `forgot_password.html`
- `gallery_page.html`
- `login_page.html`
- `orders_page.html`
- `pay.html`
- `payment-failure.html`
- `payment-success.html`
- `products_page.html`
- `registration_page.html`
- `services_page.html`
- `tattoo_viewer.html`
- `verify.html`

### Cleanup Steps

For each file, follow these steps:

1. **Open the file** in a text editor

2. **Remove PHP opening (lines 1-5):**
   ```php
   <?php
   session_start();
   require_once('config/site-images-helper.html');
   require_once('api/config.html');
   // ... database queries ...
   ?>
   ```

3. **Replace with clean HTML:**
   - Start with `<!DOCTYPE html>`
   - Include proper head section with CSS/scripts
   - Keep all HTML structure intact

4. **Update header include:**
   - Replace: `<?php include('Header.html'); ?>`
   - With: Copy the navigation HTML from `TEMPLATE_USER_PAGE.html`

5. **Update footer include:**
   - Replace: `<?php include('Footer.html'); ?>`
   - With: Copy the footer HTML from `TEMPLATE_USER_PAGE.html`

6. **Fix dynamic content:**
   - Database loops: Replace with static HTML or JavaScript data loading
   - PHP variables: Replace with placeholder content or JavaScript
   - Image paths: Update `<?php echo getSiteImagePath(...) ?>` to relative paths like `../assets/Gallery/Images/...`

7. **Add scripts at bottom:**
   ```html
   <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
   <script src="../assets/js/setup.js"></script>
   <script src="../assets/js/theme.js"></script>
   <script>
       AOS.init({ duration: 800, once: true });
       feather.replace();
       DOMUtils.setupThemeToggle('theme-toggle');
   </script>
   ```

### Example: Cleaning about.html

**Original (with PHP):**
```php
<?php
session_start();
require_once('config/site-images-helper.html');
require_once('api/config.html');

try {
    $stmt = $pdo->query("SELECT * FROM artists ORDER BY created_at ASC");
    $all_artists = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch(PDOException $e) {
    $all_artists = [];
}

include('Header.html');
?>
```

**Cleaned (HTML only):**
```html
<!DOCTYPE html>
<html lang="en" class="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Artists - Illuminated By Artistry</title>
    <!-- Include scripts and styles -->
</head>
<body>
    <!-- Navigation from template -->
    <!-- Main content -->
    <!-- Footer from template -->
    
    <script src="../assets/js/setup.js"></script>
    <script>
        async function loadArtists() {
            const data = await DataManager.loadArtists();
            // Display artists...
        }
        loadArtists();
    </script>
</body>
</html>
```

## Admin Pages Cleanup

### Pages to Clean
- `admin-artists.html`
- `admin-dashboard.html`
- `admin-gallery-management.html`
- `admin-inventory.html`
- `admin-messages.html`
- `admin-orders.html`
- `admin-products.html`
- `admin-revenue.html`
- `admin-services.html`
- `admin-site-images.html`
- `admin-tattoo-images.html`

### Cleanup Steps

1. **Remove PHP auth check** at the top:
   ```php
   <?php
   session_start();
   if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'admin') {
       header('Location: login_page.html');
       exit;
   }
   ?>
   ```

2. **Replace with JavaScript auth check:**
   ```html
   <script src="../assets/js/setup.js"></script>
   <script>
       // Check if user is admin
       if (!AuthManager.isAdmin()) {
           window.location.href = '../user/login_page.html';
       }
   </script>
   ```

3. **Use admin template structure:**
   - Start with proper DOCTYPE
   - Include sidebar from `TEMPLATE_ADMIN_PAGE.html`
   - Keep admin-specific content
   - Remove all PHP includes

4. **Remove sidebar includes:**
   - Replace: `<?php include 'admin-sidebar.html'; ?>`
   - With: Sidebar HTML from template

5. **Fix dynamic content:**
   - Admin dashboards often use database queries
   - Replace with static content or data from `data/site-data/` JSON files
   - Use `DataManager` to load data

## Data Loading with JavaScript

### Example: Loading Artists

**Instead of database query:**
```javascript
async function loadArtists() {
    const data = await DataManager.loadArtists();
    if (data && data.artists) {
        // Process artists...
        data.artists.forEach(artist => {
            console.log(artist.name);
        });
    }
}
```

**In HTML:**
```html
<div id="artists-list"></div>

<script>
    async function displayArtists() {
        const data = await DataManager.loadArtists();
        const container = document.getElementById('artists-list');
        
        if (data && data.artists) {
            container.innerHTML = data.artists.map(artist => `
                <div class="artist-card">
                    <img src="${artist.image_path}" alt="${artist.name}">
                    <h3>${artist.name}</h3>
                    <p>${artist.bio}</p>
                </div>
            `).join('');
        }
    }
    
    displayArtists();
</script>
```

## Path Updates

When replacing PHP image paths, update them to relative paths:

**Old (PHP):**
```html
<img src="<?php echo getSiteImagePath('homepage_hero', 'Logo/Logo.jpg'); ?>">
```

**New (HTML):**
```html
<img src="../assets/Logo/Logo.jpg">
```

**Path reference:**
- From `user/` pages: Use `../` to go to root, then to `assets/`
- From `admin/` pages: Use `../` to go to root, then to `assets/`
- From `shared/components/`: Use `../../` to go to root

## Automated Cleanup (Advanced)

If you have many files to clean, you can use these tools:

### Windows Batch Script
```batch
@echo off
REM This would need custom logic to remove PHP code
REM For now, use Find & Replace in VS Code
```

### VS Code Find & Replace
1. Open Find & Replace (Ctrl+H)
2. Enable Regex mode (Alt+R)
3. Use these patterns:

**Pattern: Remove PHP tags**
- Find: `<\?php[\s\S]*?\?>`
- Replace: ` ` (leave empty)

**Pattern: Remove include statements**
- Find: `(?:include|require)(?:_once)?\s*\(['\"].*?['\"]\);`
- Replace: ` ` (leave empty)

**Pattern: Remove session_start**
- Find: `session_start\(\);`
- Replace: ` ` (leave empty)

## Verification Checklist

After cleaning each file:

- ✅ No `<?php` or `?>` tags remain
- ✅ No `include()` or `require()` statements
- ✅ No `session_start()` calls
- ✅ Navigation includes proper HTML (not PHP)
- ✅ Footer includes proper HTML (not PHP)
- ✅ All image paths are relative (not PHP functions)
- ✅ Dynamic content uses JavaScript/JSON (not database)
- ✅ Admin pages check auth with JavaScript
- ✅ All script references are correct
- ✅ File opens properly in browser

## Testing

For each cleaned file:

1. Start local server: `python -m http.server 8000`
2. Open file: `http://localhost:8000/user/[filename].html`
3. Check browser console for JavaScript errors
4. Test all links and buttons
5. Test responsive design (mobile view)
6. Test dark/light theme toggle

## Batch Processing

To speed up cleanup of multiple files:

1. **Use VS Code Multi-Cursor:**
   - Find all instances: Ctrl+F
   - Replace each: Ctrl+H
   - Replace All: Ctrl+Alt+Enter

2. **Create a cleanup script** (Python):
   ```python
   import os
   import re
   
   for root, dirs, files in os.walk('user'):
       for file in files:
           if file.endswith('.html'):
               path = os.path.join(root, file)
               with open(path, 'r', encoding='utf-8') as f:
                   content = f.read()
               
               # Remove PHP tags
               content = re.sub(r'<\?php[\s\S]*?\?>', '', content)
               # Remove includes
               content = re.sub(r'(?:include|require)(?:_once)?\s*\([\'"].*?[\'"]\);?', '', content)
               
               with open(path, 'w', encoding='utf-8') as f:
                   f.write(content)
               
               print(f'Cleaned {path}')
   ```

3. **Share cleaned versions** with your team

## Next Steps

1. Clean all user pages (17 files)
2. Clean all admin pages (11 files)
3. Test each page in browser
4. Commit changes to Git
5. Deploy to GitHub Pages

## Support

If you get stuck:
1. Compare with `TEMPLATE_USER_PAGE.html` or `TEMPLATE_ADMIN_PAGE.html`
2. Check browser console for errors (F12)
3. Review `assets/js/setup.js` for available functions
4. Check `data/site-data/` for available data

---

**Estimated time:** 30-60 minutes for all files
**Difficulty:** Easy to Intermediate
**Last Updated:** April 2026
