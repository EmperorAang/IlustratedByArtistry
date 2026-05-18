# Illuminated By Artistry

A full-featured e-commerce platform for selling tattoo and piercing services, merchandise, and artistic products. Built with PHP, MySQL, and modern web technologies.

## 🚀 Quick Start

### For Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/EmperorAang/IlustratedByArtistry.git
   cd IlustratedByArtistry
   ```

2. **Install dependencies:**
   ```bash
   composer install
   ```

3. **Setup environment:**
   ```bash
   copy .env.example .env
   ```
   Edit `.env` with your local database credentials

4. **Create database:**
   - Open phpMyAdmin: `http://localhost/phpmyadmin`
   - Create database: `illuminated_by_artistry`
   - Run setup scripts:
     ```
     http://localhost/IlustratedByArtistry/api/create_users_table.html
     http://localhost/IlustratedByArtistry/api/create_products_table.html
     http://localhost/IlustratedByArtistry/api/create_orders_table.html
     http://localhost/IlustratedByArtistry/api/create_gallery_table.html
     http://localhost/IlustratedByArtistry/api/create_services_table.html
     ```

5. **Start development server:**
   ```bash
   cd C:\xampp\htdocs\IlustratedByArtistry
   php -S localhost:8000
   ```

6. **Access the site:**
   - Frontend: `http://localhost:8000`
   - Admin: `http://localhost:8000/admin-dashboard.html`

### For Production/Hosting

See [GITHUB_SETUP.md](GITHUB_SETUP.md) for detailed deployment instructions.

## 📋 Features

- ✅ **Customer Storefront** - Browse products, services, and gallery
- ✅ **User Authentication** - Register, login with OTP verification
- ✅ **Shopping Cart** - Add/remove items, view cart summary
- ✅ **Payment Integration** - Secure payments via iKhokha
- ✅ **Order Management** - Track orders and delivery status
- ✅ **Admin Dashboard** - Manage products, orders, galleries, and revenue
- ✅ **Dark Mode** - Light/dark theme support
- ✅ **Responsive Design** - Works on all devices

## 🔧 Tech Stack

- **Backend:** PHP 7.4+
- **Database:** MySQL 5.7+
- **Frontend:** HTML, CSS, JavaScript, Tailwind CSS
- **Payments:** iKhokha Payment Gateway
- **Auth:** Google OAuth, OTP verification

## 📁 Project Structure

```
IlustratedByArtistry/
├── api/              # API endpoints & backend logic
├── config/           # Configuration files
├── js/               # JavaScript files
├── uploads/          # User uploads (images, etc)
├── vendor/           # Composer dependencies
├── *.html             # Frontend pages
├── .env.example      # Environment variables template
├── .gitignore        # Git ignore rules
└── DOCUMENTATION.md  # Full technical documentation
```

## 🛡️ Security

- Database credentials in `.env` (not committed)
- Prepared statements prevent SQL injection
- Password hashing with bcrypt
- CSRF protection ready for implementation
- Secure payment signature validation

## 📚 Documentation

- [Full Documentation](DOCUMENTATION.md) - Database schema, API reference
- [GitHub Setup Guide](GITHUB_SETUP.md) - Deployment instructions
- [Environment Variables](.env.example) - Configuration options

## 🔑 Environment Setup

Copy `.env.example` to `.env` and configure:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=illuminated_by_artistry
IKHOKHA_APPLICATION_ID=your_app_id
IKHOKHA_SECRET_KEY=your_secret_key
GOOGLE_CLIENT_ID=your_google_id
GOOGLE_CLIENT_SECRET=your_google_secret
MAIL_HOST=smtp.gmail.com
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_app_password
```

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m "Add your feature"`
3. Push branch: `git push origin feature/your-feature`
4. Create Pull Request on GitHub

## ⚠️ Important Notes

- **Never commit `.env` file** - Use `.env.example` as template
- Keep secrets secure (API keys, passwords)
- Always test locally before pushing
- Keep dependencies updated: `composer update`
- Use HTTPS in production

## 📞 Support

For issues or questions:
1. Check [DOCUMENTATION.md](DOCUMENTATION.md)
2. Review error logs
3. Check GitHub Issues

## 📄 License

This project is created for Illuminated By Artistry. All rights reserved.

---

**Last Updated:** April 24, 2026
