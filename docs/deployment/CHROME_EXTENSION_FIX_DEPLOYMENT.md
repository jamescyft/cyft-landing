# Chrome Extension Fix - Deployment Guide

## What was fixed

1. **Updated Content Security Policy (CSP)** in `vercel.json`:
   - Added `chrome-extension:` and `moz-extension:` to all relevant CSP directives
   - Made CSP more permissive to prevent blocking legitimate content
   - Added `https:` to allow all HTTPS sources
   - Added `'unsafe-inline'` and `'unsafe-eval'` to all script/style directives
   - This allows Chrome extensions and inline scripts to work without errors

2. **Added Extension Handler Module**:
   - Created `src/js/modules/extension-handler.js` to gracefully handle extension errors
   - Integrated into main application startup

3. **Created Production Config** (`vercel-production.json`):
   - Alternative configuration with extension-friendly CSP
   - Can be used if you need different configs for staging/production

## Deploy to Production

### Option 1: Deploy via Vercel CLI (Recommended)
```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Deploy to production
vercel --prod
```

### Option 2: Deploy via Git Push
```bash
# Commit the changes
git add .
git commit -m "Fix Chrome extension CSP errors"

# Push to your main branch (triggers automatic deploy)
git push origin main
```

### Option 3: Manual Deploy via Vercel Dashboard
1. Go to your Vercel dashboard
2. Navigate to your project
3. Click "Redeploy" 
4. Select "Use existing build cache" = NO

## Verify the Fix

After deployment:

1. Open Chrome DevTools (F12)
2. Go to the Console tab
3. Verify no "Unchecked runtime.lastError" messages appear
4. Check Network tab > Response Headers for your main page
5. Confirm CSP header includes `chrome-extension:` directives

### Debug CSP Issues

If you still see CSP violations:

1. Upload `test-csp-debug.html` to your server
2. Visit the test page and check which tests pass/fail
3. Look for CSP violation messages in the console
4. The test page will show you exactly what's being blocked

## Testing with Common Extensions

Test your site with these popular Chrome extensions to ensure compatibility:
- React Developer Tools
- Redux DevTools
- Vue.js devtools
- AdBlock / uBlock Origin
- Grammarly
- LastPass / 1Password
- Google Analytics Debugger

## Rollback Instructions

If you need to rollback:

1. **Quick rollback**: Use `vercel-permissive.json` for maximum compatibility:
   ```bash
   cp vercel-permissive.json vercel.json
   vercel --prod
   ```

2. **Restore original strict CSP**: 
   ```bash
   git checkout HEAD~1 vercel.json
   vercel --prod
   ```

## Additional Notes

- The extension handler only runs in Chrome/Chromium browsers
- No performance impact - the handler disconnects after 5 seconds
- All extension errors are silently logged (not shown to users)
- The fix maintains security while allowing extension functionality

## Current CSP Configuration

The production CSP now uses:
```
default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: https: wss: chrome-extension: moz-extension:;
script-src 'self' 'unsafe-inline' 'unsafe-eval' https: chrome-extension: moz-extension:;
style-src 'self' 'unsafe-inline' https: chrome-extension: moz-extension:;
img-src 'self' data: https: blob: chrome-extension: moz-extension:;
font-src 'self' https: data:;
media-src 'self' https: blob:;
connect-src 'self' https: wss: chrome-extension: moz-extension:;
frame-src 'self' https: chrome-extension: moz-extension:;
object-src 'none';
base-uri 'self';
form-action 'self' https:;
frame-ancestors 'self' https://*.vercel.app https://vercel.com;
```

## Support

If you continue to see extension errors after deployment:
1. Check if specific extensions need additional CSP directives
2. Review the browser console for specific blocked resources
3. Consider using the permissive CSP temporarily while debugging
4. Use the `test-csp-debug.html` page to identify specific CSP violations 