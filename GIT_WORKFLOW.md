# Git Workflow & Team Development Guide

## Branch Strategy

We follow a simple Git workflow:

```
main
 ├── development
 ├── feature/user-authentication
 ├── feature/payment-integration
 └── bugfix/cart-calculation
```

### Branch Types:
- **main** - Production ready code
- **development** - Integration branch for features
- **feature/** - New features
- **bugfix/** - Bug fixes
- **hotfix/** - Urgent production fixes

## Workflow Steps

### 1. Starting a New Feature

```bash
# Update development branch
git checkout development
git pull origin development

# Create feature branch
git checkout -b feature/your-feature-name

# Make your changes...
git add .
git commit -m "Add: Description of what you added"
```

### 2. Commit Message Conventions

Use clear, descriptive messages:

```
Add: New feature description
Fix: Bug fix description
Update: Code improvement description
Refactor: Code restructuring description
Remove: Removed feature/code description
Docs: Documentation changes
```

### 3. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then on GitHub:
1. Click "Create Pull Request"
2. Add description of changes
3. Request review from team members
4. Wait for approval before merging

### 4. Merging to Development

```bash
# Pull latest development
git checkout development
git pull origin development

# Merge feature branch
git merge feature/your-feature-name

# Delete feature branch
git branch -d feature/your-feature-name
git push origin --delete feature/your-feature-name

# Push to development
git push origin development
```

### 5. Releasing to Production

```bash
# Merge development to main
git checkout main
git pull origin main
git merge development

# Create a tag for version
git tag -a v1.0.0 -m "Release version 1.0.0"

# Push to production
git push origin main
git push origin v1.0.0
```

## Important Rules

### ⚠️ NEVER commit:
- `.env` file (credentials)
- `vendor/` directory
- `.log` files
- `uploads/` (store on server only)
- `node_modules/` (if using Node)
- IDE config files

### ✅ DO commit:
- Source code files (`.html`, `.js`, `.css`)
- `.env.example` (template only)
- `.gitignore`
- Documentation files
- Configuration templates

## Keeping Your Branch Updated

```bash
# From your feature branch, pull latest development
git fetch origin
git merge origin/development

# Or rebase (cleaner history)
git rebase origin/development
```

## Resolving Merge Conflicts

If conflicts occur:

```bash
# See conflicts
git status

# Edit conflicted files (look for <<<, ===, >>>)
# Then:
git add resolved-file.html
git commit -m "Resolve merge conflict in file.html"
git push origin feature/branch-name
```

## Undoing Mistakes

```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Undo changes in a file
git checkout -- filename.html

# See commit history
git log --oneline

# Revert a specific commit
git revert COMMIT_HASH
git push origin branch-name
```

## Syncing with Deployed Server

### After pushing to production (main branch):

```bash
# SSH into server
ssh user@yourdomain.com

# Navigate to project
cd /home/user/public_html/IlustratedByArtistry

# Pull latest code
git pull origin main

# Install/update dependencies
composer install --no-dev

# Clear any cache if applicable
# (add your cache clear commands here)
```

## Tips & Best Practices

1. **Commit Often** - Small, focused commits are easier to review and debug
2. **Pull Before Push** - Always pull latest before pushing
3. **Test Locally First** - Ensure code works before pushing
4. **Write Good Commit Messages** - Future you will thank current you
5. **Review Your Own PR First** - Check for typos and obvious issues
6. **Keep Branches Short-lived** - Merge features within a few days
7. **Document Changes** - Update README/DOCUMENTATION if needed

## Useful Commands

```bash
# See what you've changed
git diff

# See changes before committing
git diff --cached

# See branch status
git status

# See commit history
git log --oneline -10

# Search for commit containing text
git log --grep="text to search"

# See who changed each line
git blame filename.html

# List all branches
git branch -a

# Create and switch in one command
git checkout -b feature/name

# Delete local branch
git branch -d branch-name

# Delete remote branch
git push origin --delete branch-name
```

## Team Collaboration

### Before Merging a Pull Request:
1. **Code Review** - Another team member reviews changes
2. **Testing** - Verify changes work and don't break existing features
3. **Documentation** - Update docs if needed
4. **Comments** - Leave feedback or approval

### Code Review Checklist:
- [ ] Code follows project style
- [ ] No hardcoded values
- [ ] No sensitive data exposed
- [ ] Tests pass (if applicable)
- [ ] No duplicate code
- [ ] Comments for complex logic
- [ ] Database queries optimized

## Questions?

- Ask in team chat before starting work
- Reference related issues/PRs
- Document decisions in commit messages

