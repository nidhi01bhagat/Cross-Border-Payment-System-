# 🚀 Git Setup - Quick Start (Right Now!)

Follow these commands in order to get your team started. Copy & paste into Terminal!

---

## ✅ STEP 1: Verify Git is Installed (5 seconds)

```bash
git --version
```

**You should see**: `git version 2.x.x`

If not, download from https://git-scm.com

---

## ✅ STEP 2: Navigate to Your Project (5 seconds)

```bash
cd c:\Users\NEHA\CrossPay\Cross-Border-Payment-System-
```

Verify you're in right folder:
```bash
ls
# Should show: README.md, backend-server.js, PaymentFlow.jsx, etc.
```

---

## ✅ STEP 3: Configure Git (10 seconds)

**Run once on your computer:**

```bash
git config --global user.name "Your Full Name"
git config --global user.email "your.email@example.com"
```

**Example:**
```bash
git config --global user.name "Neha Bhagat"
git config --global user.email "neha@example.com"
```

**Verify it worked:**
```bash
git config --global user.name
git config --global user.email
```

---

## ✅ STEP 4: Verify Git is Tracking Your Project (5 seconds)

```bash
git status
```

**You should see:**
```
On branch main
nothing to commit, working tree clean
```

If not, initialize:
```bash
git init
```

---

## ✅ STEP 5: Add All Your Files (5 seconds)

```bash
git add .
```

**Verify:**
```bash
git status
# Should show files in green
```

---

## ✅ STEP 6: Create First Commit (5 seconds)

```bash
git commit -m "Initial commit: Complete hackathon project setup"
```

**You should see**: `12 files changed, 5000+ insertions`

---

## ✅ STEP 7: Link to GitHub (10 seconds)

**If not already linked:**

```bash
git remote add origin https://github.com/nidhi01bhagat/Cross-Border-Payment-System-.git
```

**Verify:**
```bash
git remote -v
```

**You should see:**
```
origin  https://github.com/nidhi01bhagat/Cross-Border-Payment-System-.git (fetch)
origin  https://github.com/nidhi01bhagat/Cross-Border-Payment-System-.git (push)
```

---

## ✅ STEP 8: Push to GitHub (20 seconds)

```bash
git push -u origin main
```

**You should see**: `[new branch] main -> main`

**Check GitHub**: Refresh https://github.com/nidhi01bhagat/Cross-Border-Payment-System-

Your files should now be visible on GitHub! ✅

---

## ✅ STEP 9: Tell Your Team (2 minutes)

Share these files with your team:

**Send them:**
```
1. Repository URL: https://github.com/nidhi01bhagat/Cross-Border-Payment-System-
2. Tell them to clone it:
   git clone https://github.com/nidhi01bhagat/Cross-Border-Payment-System-.git
3. Share GIT_QUICK_REFERENCE.md
4. Share GITHUB_TEAM_GUIDE.md
```

---

## ✅ STEP 10: Add Your Team Members to GitHub (5 minutes)

1. Go to https://github.com/nidhi01bhagat/Cross-Border-Payment-System-/settings
2. Click **Collaborators**
3. Click **Add people**
4. Enter their GitHub username
5. Click **Send invitation**

**Repeat for each team member**

---

## 🎉 You're Done!

Now your team can:

```bash
# Each team member does this:
git clone https://github.com/nidhi01bhagat/Cross-Border-Payment-System-.git
cd Cross-Border-Payment-System-
git checkout -b feature/their-task
# ... make changes ...
git add .
git commit -m "Their change"
git push origin feature/their-task
```

---

## 📋 Copy-Paste Commands (For Quick Setup)

```bash
# STEP 2: Navigate
cd c:\Users\NEHA\CrossPay\Cross-Border-Payment-System-

# STEP 3: Configure Git (use YOUR name/email)
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# STEP 4: Check status
git status

# STEP 5: Add files
git add .

# STEP 6: Commit
git commit -m "Initial commit: Complete hackathon project"

# STEP 7: Link to GitHub (if not already)
git remote add origin https://github.com/nidhi01bhagat/Cross-Border-Payment-System-.git

# STEP 8: Push to GitHub
git push -u origin main

# STEP 9: Verify
git remote -v
```

---

## ✅ Daily Workflow (After Setup)

```bash
# Morning: Get latest
git pull origin main

# Work: Make changes
git add .
git commit -m "What you changed"

# Evening: Push to GitHub
git push origin main
```

---

## ⚠️ If Something Goes Wrong

```bash
# See what's wrong
git status

# See commit history
git log --oneline

# See changes
git diff

# Ask a teammate for help!
```

---

## 🎯 Next Actions

**Right now:**
1. [ ] Run Steps 1-8 above
2. [ ] Verify files on GitHub
3. [ ] Share link with team

**This week:**
1. [ ] Add team members as collaborators
2. [ ] Each person clones and makes first commit
3. [ ] Start building features

**Before hackathon:**
1. [ ] Test full workflow with team
2. [ ] Create branches for each feature
3. [ ] Do code review on sample PR

---

**Questions?** Check:
- GIT_QUICK_REFERENCE.md (quick commands)
- GITHUB_TEAM_GUIDE.md (detailed guide)
- GITHUB_SETUP.md (full setup)

---

**Go! You're ready! 🚀**
