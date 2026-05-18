# GitHub Setup and Deployment Guide for Illuminated By Artistry

## Prerequisites

Before you begin, ensure you have:
- Git installed on your machine
- A GitHub account
- A hosting provider (we recommend Bluehost, HostGator, or similar for PHP/MySQL)
- SSH keys configured for GitHub (recommended)

## Step 1: Initialize Git Repository (If Not Already Done)

```bash
cd C:\xampp\htdocs\IlustratedByArtistry
git init
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

## Step 2: Create .env File

Copy `.env.example` to `.env`:

```bash
copy .env.example .env
```

**Edit `.env` file and add your actual credentials:**
```
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

## Step 3: Add and Commit Files

```bash
git add .
git commit -m "Initial commit: Illuminated By Artistry e-commerce platform"
```

## Step 4: Create Repository on GitHub

1. Go to [GitHub.com](https://github.com/new)
2. Create a new repository named `IlustratedByArtistry`
3. **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Copy the repository URL

## Step 5: Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/IlustratedByArtistry.git
git branch -M main
git push -u origin main
```

## Step 6: Make Repository Private (Recommended)

1. Go to your repository on GitHub
2. Settings → General → Change repository visibility to **Private**

---

# Hosting Setup Guide

## Option A: Traditional PHP Hosting (Recommended for Beginners)

### Providers:
- Bluehost
- HostGator
- SiteGround
- A2 Hosting

### Setup Steps:

#### 1. **Purchase Hosting & Domain**
   - Get a PHP hosting plan with MySQL support
   - Register/transfer your domain

#### 2. **Connect to Hosting via FTP/SFTP**
   - Download FileZilla or similar FTP client
   - Use credentials provided by hosting provider
   - Navigate to `public_html` folder

#### 3. **Clone Repository on Server**
   
   Option A - Using Git (if available):
   ```bash
   cd public_html
   git clone https://github.com/YOUR_USERNAME/IlustratedByArtistry.git
   cd IlustratedByArtistry
   ```

   Option B - Using FTP:
   - Download `.zip` from GitHub
   - Extract files to `public_html`

#### 4. **Install Dependencies**
   ```bash
   cd public_html/IlustratedByArtistry
   composer install
   ```

#### 5. **Create .env File**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your hosting provider's database credentials (provided in hosting panel)

#### 6. **Create Database**
   - Use hosting provider's cPanel
   - Go to **MySQL Databases** or **phpMyAdmin**
   - Create database named `illuminated_by_artistry`
   - Create database user with full privileges

#### 7. **Run Database Setup**
   - Visit: `https://yourdomain.com/IlustratedByArtistry/api/create_users_table.html`
   - Visit: `https://yourdomain.com/IlustratedByArtistry/api/create_products_table.html`
   - Visit: `https://yourdomain.com/IlustratedByArtistry/api/create_orders_table.html`
   - etc.

#### 8. **Configure Environment Variables**
   Edit `.env` with:
   - Database credentials from hosting panel
   - iKhokha keys
   - Google OAuth credentials
   - Email SMTP settings

#### 9. **Set Permissions**
   ```bash
   chmod 755 .
   chmod 755 uploads/
   chmod 755 vendor/
   ```

---

## Option B: Cloud Hosting (More Advanced)

### Popular Options:
- **Heroku** (easy but paid)
- **Railway** (modern alternative)
- **PlanetScale** (for database)

### Docker Container (for any cloud):

Create `Dockerfile`:
```dockerfile
FROM php:8.2-apache

RUN docker-php-ext-install mysqli pdo pdo_mysql

COPY . /var/www/html

RUN apt-get update && apt-get install -y \
    git \
    curl \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /var/www/html
RUN composer install

EXPOSE 80
```

---

## Post-Deployment Checklist

### Security:
- [ ] `.env` file **NOT** committed to GitHub
- [ ] `.gitignore` excludes sensitive files
- [ ] Enable HTTPS on your domain (SSL certificate)
- [ ] Set strong database password
- [ ] Update iKhokha credentials to production keys
- [ ] Update Google OAuth redirect URI to your domain
- [ ] Disable debug mode: `APP_DEBUG=false` in `.env`

### Performance:
- [ ] Enable page caching
- [ ] Minify CSS/JS
- [ ] Optimize images
- [ ] Enable gzip compression in `.htaccess`

### Maintenance:
- [ ] Set up automated daily backups
- [ ] Enable error logging to file (outside web root)
- [ ] Monitor server logs for errors
- [ ] Keep PHP/MySQL updated

---

## Updating Code After Changes

### On Your Local Machine:
```bash
git add .
git commit -m "Description of changes"
git push origin main
```

### On Hosting Server (via SSH):
```bash
cd public_html/IlustratedByArtistry
git pull origin main
composer install
```

---

## Troubleshooting

### Issue: `.env` file not found
**Solution:** Make sure `.env` is copied from `.env.example` in the project root

### Issue: Database connection error
**Solution:** 
1. Verify credentials in `.env`
2. Ensure database exists
3. Check username has proper permissions

### Issue: iKhokha payments not working
**Solution:**
1. Verify IKHOKHA_APPLICATION_ID and SECRET_KEY in `.env`
2. Update redirect URI in iKhokha dashboard to match your domain

### Issue: Emails not sending
**Solution:**
1. Check SMTP credentials in `.env`
2. Enable "Less secure app access" for Gmail (if using Gmail)
3. Use app-specific password instead of account password

---

## Environment Variables Reference

See `.env.example` for all available variables and their descriptions.

