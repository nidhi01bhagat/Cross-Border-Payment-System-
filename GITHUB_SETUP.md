# GitHub Repository Setup for Team

Complete guide to set up GitHub and add your team members.

---

## 🔧 Prerequisites

- GitHub account created
- Repository already created: `https://github.com/nidhi01bhagat/Cross-Border-Payment-System-`
- Admin access to the repo

---

## 👥 Adding Team Members to GitHub

### Step 1: Get GitHub Usernames from Team
Ask each team member:
```
"What's your GitHub username?"

Examples:
- john-dev
- alice-frontend
- bob-backend
```

### Step 2: Add Collaborators

**Via GitHub Web Interface:**

1. Go to your repo: https://github.com/nidhi01bhagat/Cross-Border-Payment-System-
2. Click **Settings** (top right)
3. Click **Collaborators** (left sidebar)
4. Click **Add people**
5. Enter each team member's GitHub username
6. Select permission level → **Write** (they can push code)
7. Click **Send invitation**

**They'll receive an invite and can start contributing!**

---

## 🔑 Permission Levels Explained

| Permission | Can Do |
|-----------|--------|
| **Write** | Push branches, create PRs, merge | ← Best for teams |
| **Read** | Only view code, can't modify |
| **Maintain** | Admin without deleting repo |
| **Admin** | Full control (only for leads) |

**Recommendation**: Give your team members **Write** access

---

## 🛡️ Protect Your Main Branch (Optional but Recommended)

**Prevents accidental pushes to main:**

1. Go to Settings → Branches
2. Click "Add rule"
3. Apply to: `main`
4. Check: "Require a pull request before merging"
5. Check: "Require status checks to pass"
6. Click **Create**

**Result**: Nobody can push directly to `main`. They MUST use Pull Requests.

---

## 🤖 Set Up GitHub Actions (Optional - Advanced)

**Automatically test code when pushed:**

1. Go to Actions tab
2. Choose a starter workflow (e.g., "Node.js")
3. Create `.github/workflows/test.yml`:

```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
      - run: npm test
```

---

## 📋 GitHub Organization Setup (If Multiple Teams)

### Create Organization (Optional)

1. Go to GitHub Home
2. Click profile → Settings → Organizations
3. Click "New Organization"
4. Name: `crossborder-payments`
5. Invite team members to org
6. Move repo to org

**Benefit**: Team management, shared settings, audit log

---

## 🚀 First Day Checklist

### Admin (You):
- [ ] Verify repo exists on GitHub
- [ ] Add team members as collaborators
- [ ] Set up branch protection for `main`
- [ ] Copy `.env.example` to `.env`
- [ ] Add secrets to GitHub (if needed)
- [ ] Create team channel (Slack/Discord)

### Each Team Member:
- [ ] Accept GitHub invitation
- [ ] Clone repo: `git clone <url>`
- [ ] Configure Git locally:
  ```bash
  git config user.name "Your Name"
  git config user.email "your@email.com"
  ```
- [ ] Create feature branch: `git checkout -b feature/their-task`
- [ ] Make first commit and push

---

## 🔒 Managing Secrets

**Never commit API keys!**

### Option 1: GitHub Secrets (Best)
1. Go to Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add: `HELIUS_API_KEY`, `DODO_API_KEY`, etc.
4. In your code:
   ```javascript
   const apiKey = process.env.HELIUS_API_KEY;
   ```

### Option 2: .env File (Local Only)
```bash
# .gitignore already excludes this
echo .env >> .gitignore

# Each member creates their own .env
cp .env.example .env
# Edit with their keys
```

---

## 📊 Repository Settings

### Recommended Settings

Go to **Settings**:

**General:**
- [ ] Make repo **Public** (for hackathons)
- [ ] Uncheck "Wikis" (not needed)
- [ ] Uncheck "Projects" (unless using)

**Code and automation:**
- [ ] Enable "GitHub Actions"
- [ ] Disable "Sponsor" (unless applicable)

**Branches:**
- [ ] Set default branch to `main`
- [ ] Add branch protection rules

**Collaborators:**
- [ ] Add team members with **Write** access

---

## 🎯 Team Workflow

### Day 1: Setup
```bash
# Each team member runs:
git clone https://github.com/nidhi01bhagat/Cross-Border-Payment-System-.git
cd Cross-Border-Payment-System-
git config user.name "Your Name"
git config user.email "your@email.com"
git pull origin main
```

### Day 2+: Daily Work
```bash
# Morning
git pull origin main

# During day
git checkout -b feature/your-task
# ... make changes ...
git add .
git commit -m "Your change"
git push origin feature/your-task

# Create PR on GitHub (merge after review)
```

---

## 🔄 Code Review Process

### Setting up Reviews

1. In **Settings → Branch protection**, check:
   - "Require a pull request before merging"
   - "Require 1 approving review" (or more)
   - "Dismiss stale pull request approvals"

### Review Workflow

```
Developer creates branch
    ↓
Pushes to GitHub
    ↓
Opens Pull Request
    ↓
Team reviews on GitHub
    ↓
Adds comments/suggestions
    ↓
Developer makes changes (new commits)
    ↓
Team approves
    ↓
Merge to main
```

---

## 📱 GitHub Mobile

**Check PRs and code on your phone!**

1. Download GitHub app
2. Log in
3. View pull requests
4. Review code
5. Approve/comment from anywhere

---

## 📊 Useful GitHub Features

### Issues
```
Go to Issues → New Issue
- Bug report
- Feature request
- Discussion

Assign to team member
Label: "backend", "frontend", "urgent"
```

### Projects
```
Go to Projects → New Project
Create Kanban board:
- To Do
- In Progress
- Done

Drag issues/PRs between columns
```

### Discussions
```
Go to Discussions
For questions/ideas not related to code
Team Q&A
```

---

## 🎓 GitHub Learning Resources

- [GitHub Hello World](https://guides.github.com/activities/hello-world/) - 5 min intro
- [GitHub Skills](https://skills.github.com/) - Free courses
- [GitHub Docs](https://docs.github.com) - Official docs

---

## ❓ Common Questions

**Q: Can my team members see my code?**
A: Only if they're collaborators or repo is public. Check Settings → Visibility.

**Q: What if someone deletes important code?**
A: GitHub keeps history! Revert their commit or restore from history.

**Q: Can we use GitHub on mobile?**
A: Yes! Download GitHub app, but code better on desktop.

**Q: How do we prevent conflicts?**
A: Good communication, small branches, frequent pulls.

**Q: What if someone merges broken code?**
A: Use branch protection to require reviews before merge.

---

## 🚀 Next Steps

1. **Add your team to GitHub** (Collaborators section)
2. **Send them the clone command**: `git clone <url>`
3. **Share GIT_QUICK_REFERENCE.md** with everyone
4. **Have first standup** and assign branches
5. **Start building!**

---

**Your GitHub is ready for team collaboration!** 🎉

Questions? Check GITHUB_TEAM_GUIDE.md for detailed explanations.
