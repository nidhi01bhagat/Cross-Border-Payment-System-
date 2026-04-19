# Git Commands Quick Reference Card

Print this and keep it at your desk! 📋

---

## 🚀 FIRST TIME SETUP (Do Once)

```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
git remote -v  # Verify it's set to GitHub
```

---

## 📝 DAILY WORKFLOW (Do Every Day)

```bash
# 1. START YOUR DAY
git pull origin main

# 2. CREATE YOUR FEATURE BRANCH
git checkout -b feature/what-you're-doing

# 3. MAKE CHANGES (repeat as needed throughout day)
git add .
git commit -m "What you changed"

# 4. END YOUR DAY
git push origin feature/what-you're-doing
```

---

## 🔍 CHECK STATUS

```bash
git status              # What changed?
git log --oneline       # See commit history
git branch -a           # See all branches
git diff                # See changes before staging
```

---

## ➕ STAGING & COMMITTING

```bash
git add .               # Stage all changes
git add file.js         # Stage one file
git commit -m "Fixed bug"  # Commit
git push origin main    # Push to GitHub
```

---

## 🌿 BRANCHING

```bash
git checkout -b feature/name    # Create branch
git checkout main               # Switch to main
git branch                      # List branches
git branch -d feature/name      # Delete branch
```

---

## 🔄 PULLING CHANGES

```bash
git pull origin main            # Get latest from GitHub
git pull origin feature/other    # Get other person's changes
```

---

## ⚠️ FIXING MISTAKES

```bash
git reset HEAD~1        # Undo last commit (keep changes)
git checkout file.js    # Discard changes to file
git revert abc123       # Undo a pushed commit safely
```

---

## 📊 VIEWING HISTORY

```bash
git log --oneline -10        # Last 10 commits
git log --oneline --graph    # See branches
git show abc123              # See specific commit
```

---

## 🤝 COLLABORATING

```bash
# Before starting work:
git pull origin main

# Work on your branch:
git checkout -b feature/your-task

# Push your work:
git push origin feature/your-task

# Then create PR on GitHub.com
```

---

## 💾 TYPICAL 5-MINUTE WORK CYCLE

```bash
# Morning
git pull origin main

# Work (repeat):
git add .
git commit -m "Added payment verification"

# Evening
git push origin feature/backend-updates

# Next morning
git pull origin main
```

---

## ❌ DON'T DO THIS

```bash
❌ git push --force              # DANGEROUS
❌ git reset --hard              # DELETES YOUR WORK
❌ git commit -m "fix"           # TOO VAGUE
❌ Forget to git pull first      # CREATES CONFLICTS
```

---

## ✅ DO THIS INSTEAD

```bash
✅ git push origin main          # Normal push
✅ git reset HEAD~1              # Safe undo
✅ git commit -m "Fixed webhook" # Specific message
✅ git pull origin main first    # Always pull first!
```

---

## 🎯 TEAM MEMBERS

Assign branches:
- Backend Dev → `feature/payment-flow`
- Frontend Dev → `feature/ui-components`
- Docs Dev → `feature/documentation`
- DevOps → `feature/deployment`

---

## 📞 STUCK? DO THIS

```bash
# See what changed
git status

# See history
git log --oneline

# See differences
git diff

# Revert to last committed version
git checkout -- .

# Start over (DANGEROUS - deletes all changes)
git reset --hard origin/main
```

---

## 🚀 ONE-LINER DAILY

```bash
# Morning
git pull origin main

# End of day
git add . && git commit -m "Your changes" && git push origin feature/branch-name
```

---

**Save this! Bookmark it! Print it!** 🖨️

Questions? Check GITHUB_TEAM_GUIDE.md for full explanations.
