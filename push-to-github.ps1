# PowerShell script to push to GitHub
# Run this after creating your repository on GitHub

Write-Host "GitHub Repository Setup" -ForegroundColor Cyan
Write-Host "======================" -ForegroundColor Cyan
Write-Host ""

# Prompt for GitHub username
$username = Read-Host "Enter your GitHub username"

# Prompt for repository name
$repoName = Read-Host "Enter your repository name (default: portfolio-website)"
if ([string]::IsNullOrWhiteSpace($repoName)) {
    $repoName = "portfolio-website"
}

# Construct the remote URL
$remoteUrl = "https://github.com/$username/$repoName.git"

Write-Host ""
Write-Host "Setting up remote: $remoteUrl" -ForegroundColor Yellow

# Add remote
git remote add origin $remoteUrl 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Remote added successfully" -ForegroundColor Green
} else {
    # Try to update if remote already exists
    git remote set-url origin $remoteUrl
    Write-Host "✓ Remote updated" -ForegroundColor Green
}

# Push to GitHub
Write-Host ""
Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✓ Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host "Your repository is available at: https://github.com/$username/$repoName" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "✗ Push failed. Please check:" -ForegroundColor Red
    Write-Host "  1. Repository exists on GitHub" -ForegroundColor Yellow
    Write-Host "  2. You have push access" -ForegroundColor Yellow
    Write-Host "  3. You're authenticated (check: git config --global user.name)" -ForegroundColor Yellow
}
