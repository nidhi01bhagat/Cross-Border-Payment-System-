# GitHub Collaboration Guide for Your Team

Complete Git commands to get your team up and running with version control.

---

## 🚀 Initial Setup (First Time Only)

### 1. Configure Git Locally
```bash
# Set your identity (do this on each team member's machine)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Verify configuration
git config --global user.name
git config --global user.email
```

### 2. Initialize Git in Your Project (Already Done)
```bash
# If not already initialized
git init

# Verify git is initialized
git status
```

### 3. Add Remote Repository
```bash
# Link your local repo to GitHub
git remote add origin https://github.com/nidhi01bhagat/Cross-Border-Payment-System-.git

# Verify remote is added
git remote -v
# Should show:
# origin  https://github.com/nidhi01bhagat/Cross-Border-Payment-System-.git (fetch)
# origin  https://github.com/nidhi01bhagat/Cross-Border-Payment-System-.git (push)
```

---

## 📝 Daily Workflow Commands

### Step 1: Check Status
```bash
# See what files have changed
git status

# Output example:
# On branch main
# Changes not staged for commit:
#   modified:   backend-server.js
#   modified:   PaymentFlow.jsx
# Untracked files:
#   new-file.js
```

### Step 2: Stage Changes
```bash
# Stage one file
git add backend-server.js

# Stage all changed files
git add .

# Stage specific files
git add PaymentFlow.jsx ARCHITECTURE.md

# See what's staged
git diff --staged
```

### Step 3: Commit Changes
```bash
# Commit with message
git commit -m "Add Dodo webhook verification"

# Commit multiple changes with detailed message
git commit -m "Refactor payment flow

- Add webhook signature verification
- Implement idempotency checks
- Add error handling for blockchain transactions"

# Good commit messages:
# ✅ "Add Phantom wallet connection"
# ✅ "Fix transaction confirmation polling"
# ❌ "update" (too vague)
# ❌ "asdfasdf" (meaningless)
```

### Step 4: Push to GitHub
```bash
# Push to main branch
git push origin main

# Push all changes and set upstream
git push -u origin main

# Push a specific branch (see branching section)
git push origin feature/add-mongodb
```

### Step 5: Pull Latest Changes
```bash
# Get latest from main branch
git pull origin main

# ALWAYS do this before starting work!
# Prevents merge conflicts
```

---

## 🌿 Branching Strategy (Team Collaboration)

### Create a Branch for Your Feature
```bash
# Create new branch
git checkout -b feature/your-feature-name

# Or in newer Git:
git switch -c feature/your-feature-name

# Examples:
git checkout -b feature/add-mongodb
git checkout -b feature/webhook-verification
git checkout -b feature/ui-improvements
git checkout -b fix/payment-timeout-bug
```

### View All Branches
```bash
# List local branches
git branch

# List all branches (local + remote)
git branch -a

# Show branches and commits
git branch -v
```

### Switch Between Branches
```bash
# Switch to existing branch
git checkout main
git checkout feature/add-mongodb

# Or newer syntax:
git switch main
git switch feature/add-mongodb
```

### Delete a Branch
```bash
# Delete local branch (after merging)
git branch -d feature/completed-feature

# Force delete if needed
git branch -D feature/incomplete-feature

# Delete remote branch
git push origin --delete feature/completed-feature
```

---

## 👥 Team Collaboration Workflow

### Recommended Branch Structure
```
main branch (production-ready code)
    ↓
feature branches (each team member works here)
    ├── feature/backend-payment-flow
    ├── feature/frontend-ui
    ├── feature/solana-integration
    ├── feature/dodo-webhooks
    └── bugfix/transaction-timeout
```

### Each Team Member's Workflow

**Developer 1 (Backend):**
```bash
# Start
git checkout -b feature/backend-payment-flow
# ... make changes to backend-server.js ...
git add backend-server.js
git commit -m "Implement payment creation endpoint"
git push origin feature/backend-payment-flow

# Then create Pull Request on GitHub
```

**Developer 2 (Frontend):**
```bash
# Start
git checkout -b feature/frontend-ui
# ... make changes to PaymentFlow.jsx ...
git add PaymentFlow.jsx
git commit -m "Add wallet connection UI"
git push origin feature/frontend-ui

# Then create Pull Request on GitHub
```

**Developer 3 (Documentation):**
```bash
# Start
git checkout -b feature/update-docs
# ... make changes to SETUP_GUIDE.md ...
git add SETUP_GUIDE.md
git commit -m "Update setup instructions with team guidelines"
git push origin feature/update-docs

# Then create Pull Request on GitHub
```

---

## 🔄 Pull Requests (Code Review)

### From GitHub Web UI (Easiest)
1. Push your branch: `git push origin feature/your-feature`
2. Go to https://github.com/nidhi01bhagat/Cross-Border-Payment-System-
3. Click "Compare & Pull Request"
4. Add description of changes
5. Click "Create Pull Request"
6. Team reviews and approves
7. Click "Merge Pull Request"

### From Command Line
```bash
# After pushing branch, you'll see:
# Create a pull request for 'feature/add-mongodb' on GitHub by visiting:
# https://github.com/nidhi01bhagat/Cross-Border-Payment-System-/pull/new/feature/add-mongodb

# Just click that link!
```

### After PR is Merged
```bash
# Switch back to main
git checkout main

# Pull the merged code
git pull origin main

# Delete your feature branch (local)
git branch -d feature/your-feature

# Delete your feature branch (remote)
git push origin --delete feature/your-feature
```

---

## 🐛 Dealing with Conflicts

### If Someone Else Modified the Same File

**Scenario**: You edited `backend-server.js`, but so did your teammate

```bash
# Try to push
git push origin feature/my-feature

# ❌ Error: Updates were rejected

# Solution: Pull latest first
git pull origin main

# Merge conflict! Edit the file manually:
# Git will mark conflicts like:
# <<<<<<< HEAD
# Your changes here
# =======
# Their changes here
# >>>>>>> main

# After fixing conflicts:
git add backend-server.js
git commit -m "Resolve merge conflict in backend-server.js"
git push origin feature/my-feature
```

### Avoid Conflicts
```bash
# Always pull before starting work
git pull origin main

# Keep commits small and focused
# This reduces overlap with teammates

# Communicate! Tell team "I'm working on backend-server.js"
```

---

## 📊 Useful View Commands

### See Commit History
```bash
# Simple log
git log

# One-line log (cleaner)
git log --oneline

# With graph (see branches)
git log --oneline --graph --all

# Recent commits
git log -5

# See who changed what
git log -p backend-server.js
```

### See Changes
```bash
# Unstaged changes
git diff

# Staged changes
git diff --staged

# Between branches
git diff main feature/my-feature

# Between commits
git diff abc123 def456
```

### Undo Changes
```bash
# Discard unstaged changes to a file
git checkout backend-server.js

# Or newer syntax:
git restore backend-server.js

# Undo a commit (keep changes)
git reset HEAD~1

# Undo a commit (discard changes) - DANGEROUS!
git reset --hard HEAD~1

# Undo a pushed commit
git revert abc123  # Creates new commit that undoes changes
git push origin main
```

---

## 🎯 Team Meeting Checklist

**Before Each Standup:**
```bash
# Everyone runs:
git pull origin main

# See what changed since yesterday:
git log --oneline -10

# Check status:
git status
```

**Branch Assignment (Suggested):**
```
Team Member 1 (Backend): 
  - feature/payment-creation
  - feature/blockchain-settlement
  
Team Member 2 (Frontend):
  - feature/wallet-connection
  - feature/payment-ui
  
Team Member 3 (Integration):
  - feature/webhook-handling
  - feature/error-handling
  
Team Member 4 (DevOps):
  - feature/docker-setup
  - feature/deployment-config
```

---

## ⚡ Quick Command Reference

| Command | Purpose |
|---------|---------|
| `git status` | See what changed |
| `git add .` | Stage all changes |
| `git commit -m "message"` | Commit changes |
| `git push origin main` | Push to GitHub |
| `git pull origin main` | Get latest from GitHub |
| `git checkout -b feature/name` | Create new branch |
| `git checkout main` | Switch branch |
| `git branch` | List branches |
| `git log --oneline` | See commit history |
| `git diff` | See changes |

---

## 🚀 First Time Setup for New Team Member

**When a new developer joins:**

```bash
# 1. Clone the repository
git clone https://github.com/nidhi01bhagat/Cross-Border-Payment-System-.git
cd Cross-Border-Payment-System-

# 2. Configure their Git
git config user.name "Their Name"
git config user.email "their.email@example.com"

# 3. See available branches
git branch -a

# 4. Start working on their feature
git checkout -b feature/their-task

# 5. Make changes, commit, and push
git add .
git commit -m "Add their changes"
git push origin feature/their-task

# 6. Create PR on GitHub
```

---

## 🔐 GitHub Setup (Admin)

**Only the repo owner needs to do this:**

### Set up Collaborators
1. Go to https://github.com/nidhi01bhagat/Cross-Border-Payment-System-/settings
2. Click "Collaborators"
3. Add team members by email/username

### Branch Protection (Optional)
1. Go to Settings → Branches
2. Add rule for `main` branch
3. Require pull request reviews before merging
4. Prevent direct pushes to main

---

## 📋 Daily Workflow Example

**Developer working on backend feature:**

```bash
# Morning: Start day
git pull origin main              # Get latest code

# During day: Make changes
git status                         # Check what changed
git add backend-server.js          # Stage changes
git commit -m "Add error handling" # Commit

# Multiple commits throughout day:
git add PaymentFlow.jsx
git commit -m "Fix webhook parsing"

# End of day: Push to GitHub
git push origin feature/backend-payment

# Create PR for team review
# (On GitHub web interface)

# Next day: Get reviews, make fixes, merge
git add .
git commit -m "Address review comments"
git push origin feature/backend-payment

# After approval: Merge on GitHub
# Then locally:
git checkout main
git pull origin main
git branch -d feature/backend-payment
```

---

## ⚠️ Common Mistakes to Avoid

```bash
❌ git add *                    # May include unwanted files
✅ git add .                    # Better (respects .gitignore)

❌ git commit -m "fix"          # Too vague
✅ git commit -m "Fix payment timeout in webhook handler"

❌ git push --force             # Dangerous! Rewrites history
✅ git push origin main         # Safe

❌ Work on main branch directly # Everyone conflicts with everyone
✅ Create feature branches      # Everyone works independently

❌ Forget to pull before pushing
✅ git pull origin main first   # Always!
```

---

## 🎓 Resources

- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [GitHub Docs](https://docs.github.com)
- [Pro Git Book](https://git-scm.com/book/en/v2)

---

## 💬 Questions Your Team Might Have

**Q: Can I work offline?**
A: Yes! Git is local. Commit freely, push when ready.

**Q: What if I mess up?**
A: Doesn't matter! Use `git reset` or `git revert`. Git keeps history.

**Q: How do I see what everyone's doing?**
A: `git log --oneline --all` or check GitHub dashboard.

**Q: Do I need to know advanced Git?**
A: No. Just: `add`, `commit`, `push`, `pull`, `checkout -b`. That's 80% of it.

**Q: What if we have conflicts?**
A: Normal! Edit files manually, commit, and push. Take 2 minutes.

---

## 🎯 Next Steps

1. **Add team members as collaborators** on GitHub
2. **Each person clones the repo**: `git clone <url>`
3. **Each person creates their branch**: `git checkout -b feature/their-task`
4. **Everyone works independently** on their branch
5. **Push and create PRs** for code review
6. **Merge to main** after approval

---

**You're ready for team collaboration!** 🚀

Start with:
```bash
git status
git pull origin main
git checkout -b feature/your-feature-name
# ... make changes ...
git add .
git commit -m "Your change"
git push origin feature/your-feature-name
```
