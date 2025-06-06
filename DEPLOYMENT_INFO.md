# 🚀 Cyft Landing Page - Deployment Information

## 📋 Project Details

- **GitHub Repository**: https://github.com/jamescyft/cyft-landing
- **Vercel Project**: cyft-website
- **Live URL**: https://cyft-website.vercel.app (or check Vercel dashboard)
- **Vercel Dashboard**: https://vercel.com/jamescyft/cyft-website

## 🎯 Quick Deploy from Cursor

### Method 1: Using Tasks (Recommended)
1. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows)
2. Type "Run Task"
3. Select one of:
   - **🚀 Deploy to Vercel** - Prompts for commit message
   - **📦 Quick Deploy** - Uses auto-generated timestamp message
   - **👀 Preview Locally** - Run dev server
   - **🔨 Build Locally** - Test build before deploying

### Method 2: Terminal Commands
```bash
# Quick deploy with custom message
./deploy-quick.sh "Your update message"

# Quick deploy with auto message
./deploy-quick.sh

# Manual deploy
git add .
git commit -m "Your message"
git push
```

### Method 3: Keyboard Shortcut
Press `Cmd+Shift+B` (Mac) or `Ctrl+Shift+B` (Windows) to run the default deploy task.

## 🔧 Configuration Files

### `.vscode/tasks.json`
Contains all the Cursor/VS Code tasks for easy deployment.

### `deploy-quick.sh`
Bash script for one-command deployment.

### `vercel.json`
Vercel configuration with build settings.

## 📝 Deployment Workflow

1. **Make your changes** in Cursor
2. **Save all files** (`Cmd+S` or `Ctrl+S`)
3. **Deploy** using one of the methods above
4. **Wait ~2 minutes** for deployment to complete
5. **Check your live site** 

## 🔄 How It Works

```
Your Code Changes → Git Push → GitHub → Vercel Auto-Deploy → Live Site
```

Every push to the `main` branch triggers an automatic deployment on Vercel.

## 🛠️ Useful Commands

### Check Status
```bash
git status
```

### View Deployment History
```bash
git log --oneline -5
```

### Undo Last Commit (before push)
```bash
git reset --soft HEAD~1
```

### Force Redeploy
```bash
git commit --allow-empty -m "Force redeploy"
git push
```

## 🚨 Troubleshooting

### Build Fails
1. Check build logs in Vercel dashboard
2. Test locally: `npm run build`
3. Fix any errors and redeploy

### Changes Not Showing
1. Clear browser cache
2. Wait full 2-3 minutes for deployment
3. Check Vercel dashboard for deployment status

### Git Issues
```bash
# Reset to match GitHub
git fetch origin
git reset --hard origin/main
```

## 📊 Performance Monitoring

- **Vercel Analytics**: Available in dashboard
- **Speed Insights**: Enable in Vercel project settings
- **Lighthouse**: Run from Chrome DevTools

## 🔐 Environment Variables

If you need to add environment variables:
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Add your variables
3. Redeploy for changes to take effect

## 📱 Project Structure
```
cyft-deploy/
├── .vscode/tasks.json    # Cursor deployment tasks
├── public/               # Static files
├── src/                  # Source code
├── dist/                 # Build output (gitignored)
├── deploy-quick.sh       # Quick deploy script
├── vercel.json          # Vercel config
└── package.json         # Dependencies
```

## 🎉 Success Metrics

- ✅ Automatic deployments on every push
- ✅ ~2 minute deployment time
- ✅ One-command deployment from Cursor
- ✅ Professional Git workflow
- ✅ Version control for all changes

---

**Happy deploying!** 🚀 Your site auto-deploys every time you push to GitHub. 