# 👥 Team Collaboration Strategy & Branch Assignment

Guide for organizing your team's work on this hackathon project.

---

## 🎯 Recommended Team Structure

**For 4-person team:**

```
Team Lead: Nidhi
├── Backend Developer: [Person 1]
├── Frontend Developer: [Person 2]  
├── Integration/DevOps: [Person 3]
└── Documentation: [Person 4]
```

**For 3-person team:**

```
Team Lead: Nidhi
├── Backend + Blockchain: [Person 1]
├── Frontend + Integration: [Person 2]
└── DevOps + Docs: [Person 3]
```

**For 2-person team:**

```
Team Lead: Nidhi
├── Backend + Integration: [Person 1]
└── Frontend + DevOps: [Person 2]
```

---

## 🌿 Branch Assignment

### Backend Developer

**Branch**: `feature/backend-payment-flow`

**Responsibilities:**
- [ ] Implement payment creation endpoint
- [ ] Add Dodo webhook handler
- [ ] Implement blockchain settlement
- [ ] Add error handling and retry logic
- [ ] Database integration (if adding MongoDB)

**Files to modify:**
- `backend-server.js` (main file)
- Add new files for utilities if needed

**First commit:**
```bash
git checkout -b feature/backend-payment-flow
# Make changes to backend-server.js
git add backend-server.js
git commit -m "Implement complete payment flow with Dodo + Solana integration"
git push origin feature/backend-payment-flow
```

---

### Frontend Developer

**Branch**: `feature/frontend-ui-enhancement`

**Responsibilities:**
- [ ] Enhance PaymentFlow component
- [ ] Add error messages and notifications
- [ ] Improve mobile responsiveness
- [ ] Add loading states and animations
- [ ] Implement transaction history display

**Files to modify:**
- `PaymentFlow.jsx` (main file)
- Add CSS/styling as needed

**First commit:**
```bash
git checkout -b feature/frontend-ui-enhancement
# Make changes to PaymentFlow.jsx
git add PaymentFlow.jsx
git commit -m "Add enhanced UI with better error handling and mobile support"
git push origin feature/frontend-ui-enhancement
```

---

### Integration/DevOps Developer

**Branch**: `feature/deployment-config`

**Responsibilities:**
- [ ] Set up MongoDB integration (if needed)
- [ ] Add Docker configuration
- [ ] Set up environment variables
- [ ] Add logging and monitoring
- [ ] Create deployment scripts
- [ ] Set up ngrok for webhook testing

**Files to modify:**
- Create `docker-compose.yml`
- Create `Dockerfile`
- Update `.env.example`
- Create deployment guide

**First commit:**
```bash
git checkout -b feature/deployment-config
# Add Docker and deployment files
git add docker-compose.yml Dockerfile .env.example
git commit -m "Add Docker setup and deployment configuration"
git push origin feature/deployment-config
```

---

### Documentation Developer

**Branch**: `feature/team-collaboration-docs`

**Responsibilities:**
- [ ] Update README with team info
- [ ] Create team guidelines
- [ ] Add troubleshooting guide
- [ ] Update API documentation
- [ ] Create video walkthrough (optional)
- [ ] Prepare presentation slides

**Files to modify/create:**
- Update `README.md`
- Create `TEAM_GUIDELINES.md`
- Create presentation slides

**First commit:**
```bash
git checkout -b feature/team-collaboration-docs
# Update documentation files
git add README.md TEAM_GUIDELINES.md
git commit -m "Add comprehensive team collaboration documentation"
git push origin feature/team-collaboration-docs
```

---

## 🔄 Daily Standup Workflow

### Every Morning (5 minutes)

**What to do:**
```bash
# Everyone runs this:
git pull origin main
git status
git log --oneline -5
```

**What to say:**
- What did you finish yesterday?
- What are you working on today?
- Any blockers?

**Example:**
```
Backend Dev: "Finished webhook handler, today adding blockchain settlement"
Frontend Dev: "Added error messages, today improving mobile UI"
DevOps Dev: "Docker setup done, today adding MongoDB"
Docs Dev: "Updated setup guide, today preparing slides"
```

---

## 🤝 Code Review Process

### When Pushing to GitHub

```bash
# After pushing your branch:
git push origin feature/your-branch

# GitHub shows "Compare & Pull Request" link
# Click it to create a PR

# Add description:
"""
## What changed
- Added webhook verification
- Implemented blockchain settlement
- Added error handling

## Testing
- Tested with devnet
- Verified webhook arrival
- Confirmed transaction settlement

## Related issues
Closes #1
"""

# Team reviews and comments
# You make changes
# Team approves
# Merge to main
```

### Code Review Checklist

**Before approving, check:**
- [ ] Code follows project style
- [ ] No hardcoded secrets
- [ ] Comments explain complex logic
- [ ] Error handling present
- [ ] Tests pass (if applicable)
- [ ] README updated if needed

---

## 🚨 Conflict Resolution

### If Two People Edit Same File

**Example**: Backend dev and DevOps both edit `package.json`

```bash
# Backend dev tries to push
git push origin feature/backend-updates
# ❌ REJECTED - Updates were rejected

# Solution:
git pull origin main  # Get latest
# ❌ Conflict! Edit package.json manually

# Choose which changes to keep or merge both
git add package.json
git commit -m "Merge: resolve package.json conflict"
git push origin feature/backend-updates
```

### Prevention

```bash
# Good:
- Backend Dev: Modifies only backend-server.js
- Frontend Dev: Modifies only PaymentFlow.jsx
- DevOps Dev: Creates new docker files (doesn't modify existing code)

# Bad:
- Everyone touching package.json
- Everyone modifying .env
- Everyone editing README simultaneously
```

---

## 📊 Task Breakdown (8-Hour Hackathon)

### Hour 1-2: Setup & Architecture Review
```bash
# Everyone:
git clone <url>
git checkout main
Read ARCHITECTURE.md
git pull origin main
```

### Hour 2-4: Individual Development
```bash
# Backend Dev:
git checkout -b feature/backend-payment-flow
# Build payment flow

# Frontend Dev:
git checkout -b feature/frontend-ui-enhancement
# Build UI

# DevOps Dev:
git checkout -b feature/deployment-config
# Set up Docker

# Docs Dev:
git checkout -b feature/team-collaboration-docs
# Update docs
```

### Hour 4-6: Integration Testing
```bash
# Everyone:
git pull origin main  # Get everyone's changes
# Merge branches to main
# Test full integration
```

### Hour 6-8: Polish & Presentation
```bash
# Everyone:
git pull origin main
# Final bug fixes
# Prepare demo
# Rehearse pitch
```

---

## 🎯 Commit Message Convention

**Format:**
```
[TYPE] Brief description

Optional longer explanation if needed.

- Bullet point 1
- Bullet point 2
```

**Types:**
- `[FEAT]` - New feature
- `[FIX]` - Bug fix
- `[DOCS]` - Documentation
- `[STYLE]` - Code style (no logic change)
- `[REFACTOR]` - Code reorganization
- `[TEST]` - Tests

**Examples:**
```
✅ [FEAT] Add webhook signature verification
✅ [FIX] Fix transaction confirmation timeout
✅ [DOCS] Update setup instructions
❌ "update"
❌ "asdf"
```

---

## 🔗 Sharing Work in Progress

### If You Want Feedback Before Done

```bash
# Push your branch
git push origin feature/your-branch

# Go to GitHub → Pull Requests
# Create PR with title: "WIP: Your Feature"
# Add comment: "Looking for feedback on approach"

# Team reviews and comments
# You keep pushing updates
```

---

## 📋 Pre-Merge Checklist

Before merging to main, **all** features must:

- [ ] Code compiles/runs without errors
- [ ] No console errors
- [ ] Follows naming conventions
- [ ] Comments on complex logic
- [ ] No hardcoded values (use env vars)
- [ ] README/docs updated if needed
- [ ] Team reviewed (at least 1 person)

---

## 🚀 Final Merge to Main

**When feature is ready:**

```bash
# Create Pull Request on GitHub
# Add description of changes
# Request reviews from team
# Wait for approvals

# Once approved, either:
# Option 1: Merge on GitHub (click "Merge Pull Request")
# Option 2: Merge from command line:

git checkout main
git pull origin main
git merge feature/your-branch
git push origin main
```

---

## 💬 Communication Tools

### Recommended Setup

**During hackathon:**
- **Slack/Discord**: For quick questions
- **GitHub**: For code discussions and reviews
- **Video call**: For standups and blockers

**Example Slack:**
```
@backend-dev: "I need the webhook secret, check .env"
@frontend-dev: "Payment flow looking good, can you test on mobile?"
@devops-dev: "Docker is ready, pushed to feature/deployment-config"
```

---

## 🎓 Learning Git Together

**Resources to share:**
- `GIT_QUICK_REFERENCE.md` - Commands
- `GITHUB_TEAM_GUIDE.md` - Detailed guide
- YouTube: "Git for Teams" - 10-min videos

---

## 🏆 Judging Preparation

### Last 30 minutes before demo:

```bash
# 1. Merge all branches to main
git pull origin main
git checkout main
git merge feature/backend-payment-flow
git merge feature/frontend-ui-enhancement
git merge feature/deployment-config
git merge feature/team-collaboration-docs
git push origin main

# 2. Test complete flow
# Start backend, frontend, test payment

# 3. Prepare demo script
# Rehearse 5-min demo with team

# 4. Standby with backup branch
# In case main branch has issues
```

---

## ⚡ Quick Commands for Team

**Give to each team member:**

```bash
# Start day
git pull origin main

# Create branch
git checkout -b feature/your-task

# Throughout day
git add .
git commit -m "[TYPE] Your message"

# End day
git push origin feature/your-task

# Check status
git status
git log --oneline
```

---

## 📞 Troubleshooting Together

### If Something Goes Wrong

**Person 1 (stuck):**
```bash
"Help, I can't push! Getting error about updates rejected"
```

**Person 2 (helps):**
```bash
# Tells them:
"Run git pull origin main first, then git push again"

# Or helps via screen share if more complex
```

---

## 🎯 Success Metrics

**By end of hackathon:**
- ✅ All branches merged to main
- ✅ Full payment flow working
- ✅ Demo runs without errors
- ✅ Team can explain each part
- ✅ Code is clean and commented

---

## 📋 Pre-Hackathon Checklist

**Week before:**
- [ ] Everyone has GitHub account
- [ ] Everyone added as collaborator
- [ ] Everyone can clone repo locally
- [ ] Everyone tested git commands
- [ ] Team knows branch assignments
- [ ] Communication channel set up (Slack/Discord)

**Day before:**
- [ ] Fresh clone of repo
- [ ] All dependencies installed
- [ ] Backend runs without errors
- [ ] Frontend runs without errors
- [ ] Team has API keys ready

**Morning of:**
- [ ] Everyone pulls latest: `git pull origin main`
- [ ] Team standup (5 min)
- [ ] Assign tasks
- [ ] Start building!

---

**Your team is ready for success!** 🎉

Questions? Refer to:
- GIT_QUICK_REFERENCE.md
- GITHUB_TEAM_GUIDE.md
- GITHUB_SETUP.md
