# Pre-Deployment Checklist

Use this checklist before deploying to production.

## 🔐 Security

- [ ] Remove all hardcoded credentials from code
- [ ] `.env` file created with production values (not committed)
- [ ] `.env.example` has safe placeholder values
- [ ] `.gitignore` includes `.env`, `vendor/`, `*.log`
- [ ] API keys are strong and unique
- [ ] Database password is strong (12+ characters, mixed case, numbers, symbols)
- [ ] `.htaccess` is configured with security headers
- [ ] `.env` file permissions are 600 (read/write owner only)
- [ ] Logs are stored outside web root
- [ ] Sensitive files not accessible via web (.env, .git, config)
- [ ] HTTPS enabled (SSL certificate installed)
- [ ] API endpoints validate input
- [ ] SQL injection prevention verified (prepared statements)
- [ ] CSRF tokens ready for forms
- [ ] iKhokha production credentials configured (not sandbox)
- [ ] Payment webhook signature validation works
- [ ] Debug mode disabled: `APP_DEBUG=false`
- [ ] Error messages don't expose sensitive info
- [ ] Rate limiting configured for login/API endpoints

## 🗄️ Database

- [ ] Database tables created
- [ ] Database backups configured (daily automated)
- [ ] Database user has minimal required permissions
- [ ] Database password != hosting panel password
- [ ] Foreign key constraints verified
- [ ] Indexes on frequently queried columns
- [ ] Character encoding set to UTF-8
- [ ] MySQL version compatible (5.7+)

## 📦 Dependencies & Code

- [ ] `composer install` runs without errors
- [ ] All dependencies compatible with PHP version
- [ ] No debug code or `var_dump()` left in code
- [ ] No TODO/FIXME comments in production code
- [ ] Console errors minimized
- [ ] Linting checks pass (if using phpcs)
- [ ] Code follows consistent formatting
- [ ] Dead code removed

## 🌐 Server Configuration

- [ ] PHP version 7.4 or higher
- [ ] MySQL/MariaDB version 5.7 or higher
- [ ] Required PHP extensions enabled:
  - [ ] pdo
  - [ ] pdo_mysql
  - [ ] mysqli
  - [ ] openssl
  - [ ] curl
  - [ ] json
- [ ] Apache modules enabled:
  - [ ] mod_rewrite
  - [ ] mod_headers
  - [ ] mod_deflate
- [ ] File upload limits configured
- [ ] PHP execution timeout appropriate
- [ ] Memory limit adequate (256MB+)
- [ ] `open_basedir` configured if needed
- [ ] mail/SMTP working

## 📧 Email Configuration

- [ ] SMTP credentials verified
- [ ] `MAIL_FROM_ADDRESS` set correctly
- [ ] Test email sends successfully
- [ ] Email templates render correctly
- [ ] OTP emails sending to users
- [ ] Order confirmation emails working
- [ ] Admin notifications configured

## 💳 Payment Gateway

- [ ] iKhokha production account active
- [ ] `IKHOKHA_APPLICATION_ID` updated
- [ ] `IKHOKHA_SECRET_KEY` updated
- [ ] Webhook URL configured in iKhokha dashboard
- [ ] Test payment processed successfully
- [ ] Payment callback handler verified
- [ ] Order status updates on payment
- [ ] Receipts generated correctly

## 🔑 OAuth Integration

- [ ] Google OAuth redirect URI updated to production URL
- [ ] Google credentials are production (not development)
- [ ] OAuth login tested end-to-end
- [ ] User data mapped correctly after OAuth login

## 📁 Files & Permissions

- [ ] `uploads/` directory writable (755 permissions)
- [ ] `vendor/` directory NOT in web root or protected
- [ ] `.git/` directory NOT in web root or protected
- [ ] Log files NOT in web root
- [ ] Temporary files in designated temp directory
- [ ] File sizes optimized (images compressed)

## 🎨 Frontend & User Experience

- [ ] All pages load without errors
- [ ] Responsive design tested (mobile, tablet, desktop)
- [ ] Dark mode functioning correctly
- [ ] Images load from correct paths
- [ ] CSS/JS files load without 404 errors
- [ ] Forms submit without JavaScript errors
- [ ] Form validation works client-side
- [ ] Error messages user-friendly
- [ ] Loading states show for API calls
- [ ] Timeouts handled gracefully

## 🛒 Ecommerce Features

- [ ] Products display correctly
- [ ] Add to cart works
- [ ] Cart persists on page refresh
- [ ] Cart calculation correct
- [ ] Checkout form validates
- [ ] Delivery method selection works
- [ ] Order creation saves to database
- [ ] Order confirmation sent to user
- [ ] Admin sees new orders
- [ ] Order tracking works
- [ ] Inventory deducted on purchase

## 👤 User Management

- [ ] Registration works
- [ ] OTP sent and validated
- [ ] Email verification working
- [ ] Login works with credentials
- [ ] Password hashing verified
- [ ] Password reset flow works
- [ ] User profile accessible
- [ ] Session timeout configured
- [ ] Logout clears session
- [ ] Admin role verification working

## 📊 Admin Dashboard

- [ ] Admin can login
- [ ] Dashboard stats load
- [ ] Product management works
- [ ] Order management accessible
- [ ] Revenue reports accurate
- [ ] Gallery management functional
- [ ] User management works
- [ ] Admin actions logged (optional)

## 📈 Performance

- [ ] Page load time under 3 seconds
- [ ] Database queries optimized
- [ ] No N+1 query problems
- [ ] Images compressed
- [ ] CSS/JS minified (optional)
- [ ] Caching headers set
- [ ] Gzip compression enabled

## 📱 Mobile

- [ ] Site responsive on small screens
- [ ] Touch elements properly sized
- [ ] Images scale appropriately
- [ ] Forms mobile-friendly
- [ ] Checkout works on mobile

## 🔍 Testing

- [ ] Registration → Login → Purchase flow works end-to-end
- [ ] All user journeys tested
- [ ] Error pages display correctly
- [ ] Edge cases handled:
  - [ ] Out of stock products
  - [ ] Payment failures
  - [ ] Network timeouts
  - [ ] Session expiry
- [ ] Browser compatibility checked (Chrome, Firefox, Safari)

## 📝 Documentation

- [ ] README.md updated
- [ ] DOCUMENTATION.md current
- [ ] GITHUB_SETUP.md accurate
- [ ] API endpoints documented
- [ ] Environment variables documented
- [ ] Known issues documented

## 🚨 Last Minute

- [ ] Backup created before deploying
- [ ] Deployment procedure tested
- [ ] Rollback plan ready
- [ ] Team notified of deployment
- [ ] Monitoring setup (error logs, uptime)
- [ ] Database backup verification
- [ ] DNS pointing to correct server
- [ ] Domain SSL certificate valid

## ✅ Post-Deployment

- [ ] Site loads without errors
- [ ] Test payment processed
- [ ] Test order created
- [ ] Email notifications working
- [ ] Admin dashboard accessible
- [ ] Monitor for errors (first 24 hours)
- [ ] Performance acceptable
- [ ] No security warnings (SSL, headers)
- [ ] Analytics/tracking working

---

## Deployment Command Reference

```bash
# On server via SSH
ssh user@yourdomain.com
cd /path/to/project

# Pull latest code
git pull origin main

# Install dependencies
composer install --no-dev --optimize-autoloader

# Copy environment template (if .env doesn't exist)
cp .env.example .env

# Configure .env with production values
nano .env

# Set proper permissions
chmod 755 .
chmod 755 uploads/
chmod 600 .env

# Create backup (before running setup)
mysqldump -u dbuser -p database_name > backup_$(date +%Y%m%d_%H%M%S).sql

# Run database migrations/setup (if needed)
# (add migration commands here)

# Clear any cache
# (add cache clear commands here)

# Verify site
curl https://yourdomain.com
```

---

**Last Updated:** April 24, 2026
