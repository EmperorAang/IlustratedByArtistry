# Quick Reference - Common Tasks

## 🚀 Getting Started

```bash
# Clone project
git clone https://github.com/EmperorAang/IlustratedByArtistry.git
cd IlustratedByArtistry

# Install dependencies
composer install

# Setup environment
copy .env.example .env
# Edit .env with your credentials

# Start local server
php -S localhost:8000
```

## 📝 Making Changes

```bash
# Create feature branch
git checkout -b feature/your-feature

# Make changes, then commit
git add .
git commit -m "Add: description of change"

# Push to GitHub
git push origin feature/your-feature

# Create Pull Request on GitHub
```

## 🔄 Updating Code

```bash
# Pull latest changes
git pull origin main

# Update dependencies
composer update

# Clear cache (if applicable)
# Add your cache clear command here
```

## 🐛 Debugging

```bash
# Enable debug mode (local only!)
# Edit .env: APP_DEBUG=true

# Check logs
tail -f ikhokha_callback.log

# Test email sending
# Use mail_config.html settings

# Test database connection
# Try accessing any page that requires DB
```

## 📦 Database Commands

```bash
# Backup database
mysqldump -u root -p illuminated_by_artistry > backup.sql

# Restore database
mysql -u root -p illuminated_by_artistry < backup.sql

# Connect to database
mysql -u root -p illuminated_by_artistry

# Run setup scripts
# Visit: http://localhost/IlustratedByArtistry/api/create_users_table.html
```

## 🔑 Environment Variables

Update `.env` with:

```env
# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=illuminated_by_artistry

# Payments
IKHOKHA_APPLICATION_ID=your_app_id
IKHOKHA_SECRET_KEY=your_secret

# Email
MAIL_HOST=smtp.gmail.com
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_app_password
```

## 💻 File Locations

| File | Purpose |
|------|---------|
| `api/config.html` | Database & API config (loads from .env) |
| `api/mail_config.html` | Email config (loads from .env) |
| `admin-dashboard.html` | Admin home page |
| `checkout.html` | Checkout form |
| `index.html` | Homepage |
| `Header.html` | Navigation & header |
| `.env.example` | Environment template |
| `.gitignore` | Git ignore rules |

## 🔒 Security Reminders

```bash
# NEVER commit these:
# .env (use .env.example instead)
# vendor/ (created by composer install)
# *.log files
# API keys or passwords

# ALWAYS:
# Use strong passwords (12+ characters)
# Keep .env file secure (chmod 600)
# Enable HTTPS in production
# Set APP_DEBUG=false in production
```

## 🧪 Common Issues

### Database Connection Error
```
Solution: Check .env has correct DB credentials
- Ensure database exists
- Verify user has permissions
```

### Emails Not Sending
```
Solution: Check mail_config.html settings
- Verify SMTP credentials
- Check firewall/port settings
- Enable "Less secure apps" if using Gmail
```

### Payment Not Processing
```
Solution: Verify iKhokha settings
- Check Application ID and Secret in .env
- Verify webhook URL in iKhokha dashboard
- Ensure payment signature validation passes
```

### 404 Errors
```
Solution: Check file paths
- Verify .htaccess is configured
- Ensure mod_rewrite enabled
- Check URL paths in HTML
```

## 📞 Helpful Resources

- [DOCUMENTATION.md](DOCUMENTATION.md) - Full technical docs
- [GITHUB_SETUP.md](GITHUB_SETUP.md) - Deployment guide
- [GIT_WORKFLOW.md](GIT_WORKFLOW.md) - Git best practices
- [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) - Pre-deployment checklist
- [.env.example](.env.example) - All environment variables

## 🎯 Typical Workflow

1. **Read the docs** - Familiarize yourself with project
2. **Create a branch** - `git checkout -b feature/name`
3. **Make changes** - Edit files, test locally
4. **Commit** - `git commit -m "Add: description"`
5. **Push** - `git push origin feature/name`
6. **Create PR** - Open pull request on GitHub
7. **Review** - Get feedback from team
8. **Merge** - Merge to development/main
9. **Deploy** - Deploy to production server

## 🆘 Getting Help

- Check existing documentation files
- Review similar code in the project
- Check GitHub Issues for known problems
- Ask team members in chat

---

**Pro Tip:** Bookmark this file! It's in the root directory as `QUICK_REFERENCE.md`
