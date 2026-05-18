# Illuminated By Artistry - GitHub Edition

A fully functional HTML/JavaScript website for a tattoo studio - no backend or PHP required. Perfect for hosting on GitHub Pages!

## 📁 Project Structure

```
├── user/               # User-facing pages
│   ├── index.html     # Home page
│   ├── gallery_page.html
│   ├── products_page.html
│   ├── services_page.html
│   ├── about.html
│   ├── cart.html
│   ├── checkout.html
│   ├── login_page.html
│   ├── registration_page.html
│   └── ...
│
├── admin/              # Admin pages (login protected)
│   ├── admin-dashboard.html
│   ├── admin-products.html
│   ├── admin-orders.html
│   ├── admin-artists.html
│   └── ...
│
├── shared/             # Shared components
│   └── components/     # Reusable components
│
├── assets/             # Static assets
│   ├── js/            # JavaScript files
│   ├── css/           # Stylesheets
│   ├── images/        # Image files
│   ├── Gallery/       # Gallery images
│   ├── Logo/          # Logo files
│   └── uploads/       # User uploads
│
└── data/               # JSON data files
    └── site-data/
        ├── artists.json
        ├── products.json
        └── services.json
```

## 🚀 Quick Start

### For Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/EmperorAang/IlustratedByArtistry.git
   cd IlustratedByArtistry
   ```

2. **Start a local server:**
   - Using Python 3:
     ```bash
     python -m http.server 8000
     ```
   - Using Python 2:
     ```bash
     python -m SimpleHTTPServer 8000
     ```
   - Using Node.js (if installed):
     ```bash
     npx http-server
     ```

3. **Access the site:**
   - Frontend: `http://localhost:8000/user/`
   - Admin: `http://localhost:8000/admin/admin-dashboard.html`

### Default Admin Login
- **Email:** admin@artistry.com
- **Password:** admin123

> ⚠️ **Security Note:** This is a demo/development login. Change credentials before deploying to production.

## 🛠️ Technology Stack

- **Frontend:** HTML5, Tailwind CSS, Vanilla JavaScript
- **Icons:** Feather Icons
- **Animations:** AOS (Animate On Scroll)
- **Data Storage:** JSON files (easily convertible to a backend API)
- **Hosting:** GitHub Pages (or any static hosting)

## 📝 Features

### User Side
- 🏠 Home page with hero section
- 🖼️ Gallery with image display
- 🛍️ Product/merchandise shop
- 💇 Services catalog
- 👤 User account management
- 🛒 Shopping cart system
- 💳 Checkout process (payment integration ready)
- 📧 Contact form
- 🌙 Dark/Light theme toggle

### Admin Side
- 📊 Dashboard with statistics
- 👨‍🎨 Artist management
- 🖼️ Gallery management
- 📦 Product management
- 📋 Order management
- 💰 Revenue tracking
- 📧 Message center
- 🎨 Tattoo image management
- 🖼️ Site image management

## 🔑 Admin Authentication

Admin pages are protected with localStorage-based authentication:

1. Navigate to `user/login_page.html`
2. Login with admin credentials (email: `admin@artistry.com`, password: `admin123`)
3. You'll be redirected to the admin dashboard
4. Your session is stored in browser localStorage

**To change admin credentials:**
Edit the validation in your JavaScript or create an admin setup page.

## 📦 Data Management

All data is stored in JSON files in the `data/site-data/` directory:

- `artists.json` - Artist information and portfolio
- `products.json` - Product catalog
- `services.json` - Service offerings

You can easily modify these files to update content, or connect them to a backend API.

## 🎨 Customization

### Update Site Information
1. Edit `data/site-data/artists.json`
2. Edit `data/site-data/products.json`
3. Edit `data/site-data/services.json`

### Add New Pages
1. Create a new HTML file in `user/` or `admin/`
2. Copy the header/footer structure from existing pages
3. Import necessary CSS and JavaScript files

### Modify Styling
- The site uses Tailwind CSS (CDN)
- Color scheme: Gold (#FFD700) with light/dark modes
- Fonts: Playfair Display (headings) and Raleway (body)

## 🚀 Deployment

### Deploy to GitHub Pages

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Clean GitHub-ready version"
   git push origin main
   ```

2. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Select "Deploy from a branch"
   - Choose `main` branch and `/root` folder
   - Click Save

3. **Access your site:**
   - User: `https://yourusername.github.io/IlustratedByArtistry/user/`
   - Admin: `https://yourusername.github.io/IlustratedByArtistry/admin/admin-dashboard.html`

### Deploy to Other Platforms

**Netlify:**
- Connect your GitHub repo
- Set publish directory to `/` or `/user/`
- Deploy

**Vercel:**
- Import from GitHub
- Deploy
- Configure domain

**Any Static Host:**
- Upload the entire folder
- Point domain to the hosting

## 🔄 Converting to Backend

To add a backend (Node.js, Python Flask, etc.):

1. Keep the HTML/JavaScript frontend as-is
2. Replace JSON fetch calls with API endpoints
3. Update `assets/js/` files to call your API
4. Add proper authentication/authorization

Example API endpoints to replace:
```javascript
// Before (JSON)
fetch('../data/site-data/artists.json')

// After (API)
fetch('https://api.yoursite.com/artists')
```

## 📋 File Checklist

- ✅ All PHP code removed
- ✅ Vendor/composer dependencies removed
- ✅ Admin and user sides separated
- ✅ Responsive design maintained
- ✅ Dark/Light theme included
- ✅ Mobile-friendly
- ✅ SEO-ready structure
- ✅ No backend required

## 🐛 Troubleshooting

**Issue:** Pages not loading correctly
- **Solution:** Make sure you're running a local server (not opening file:// directly)

**Issue:** Images not showing
- **Solution:** Check file paths are relative to current location

**Issue:** Admin login not working
- **Solution:** Clear browser localStorage and try again

**Issue:** JavaScript errors in console
- **Solution:** Ensure all script paths are correct and files exist

## 📞 Support

For issues or questions:
1. Check the GitHub Issues
2. Review the code comments
3. Test with browser developer tools (F12)

## 📄 License

[Add your license here]

## 🙏 Credits

- **Tailwind CSS** for styling
- **Feather Icons** for iconography
- **AOS Library** for animations
- **Firebase JWT** (previously used, now removed for GitHub hosting)

---

**Last Updated:** April 2026
**Status:** Ready for GitHub Pages deployment ✅
