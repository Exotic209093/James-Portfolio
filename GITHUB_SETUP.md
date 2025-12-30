# Push to GitHub - Quick Guide

## Step 1: Create Repository on GitHub

I've opened the GitHub new repository page in your browser. 

**When creating the repository:**
- Repository name: `portfolio-website` (or your choice)
- Description: "Modern portfolio website built with Next.js 14"
- Choose **Public** or **Private**
- **DO NOT** check "Add a README file" (we already have one)
- **DO NOT** add .gitignore or license
- Click "Create repository"

## Step 2: Push Your Code

After creating the repository, you have two options:

### Option A: Use the PowerShell Script (Easiest)

Run the provided script:
```powershell
.\push-to-github.ps1
```

It will prompt you for your GitHub username and repository name, then push automatically.

### Option B: Manual Commands

Run these commands (replace `YOUR_USERNAME` with your GitHub username):

```powershell
git remote add origin https://github.com/YOUR_USERNAME/portfolio-website.git
git push -u origin main
```

## Authentication

If you're prompted for credentials:
- **Username**: Your GitHub username
- **Password**: Use a Personal Access Token (not your password)
  - Create one at: https://github.com/settings/tokens
  - Select scope: `repo`

## After Pushing

Your code will be on GitHub! You can then:
1. Connect it to Vercel for automatic deployments
2. Share the repository
3. Continue development with version control

---

**Need help?** Check the error messages - they usually tell you what's wrong!
