# Cyft Landing Page - Clean Architecture

A meticulously organized, modular landing page built with obsessive attention to clean code principles.

## 🏗️ Architecture Overview

```
.
├── public/              # Static HTML entry point
│   └── index.html      # Clean semantic HTML with proper ARIA labels
│
├── src/                # Source code - the heart of cleanliness
│   ├── config/         # Configuration and constants
│   │   ├── constants.js    # All magic numbers live here
│   │   └── scenarios.js    # Demo scenarios configuration
│   │
│   ├── css/            # Modular CSS architecture
│   │   ├── main.css        # Entry point - imports in correct order
│   │   ├── variables.css   # Design tokens - single source of truth
│   │   ├── base.css        # Reset and foundational styles
│   │   ├── utilities.css   # Utility classes with consistent naming
│   │   ├── animations.css  # All keyframes and animation classes
│   │   └── components/     # Component-specific styles
│   │       ├── sections.css
│   │       ├── buttons.css
│   │       ├── forms.css
│   │       └── interactive-demo.css
│   │
│   └── js/             # Modular JavaScript
│       ├── main.js         # Application entry point
│       ├── utils/          # Utility functions
│       │   └── dom.js      # DOM manipulation helpers
│       └── modules/        # Feature modules
│           ├── form-validator.js
│           ├── interactive-demo.js
│           └── scroll-animations.js
│
├── dist/               # Production build output
├── tests/              # Test files (future)
└── Configuration Files
    ├── package.json    # Dependencies and scripts
    ├── vite.config.js  # Build configuration
    ├── postcss.config.js # CSS processing
    ├── .eslintrc.json  # JavaScript linting
    └── .prettierrc.json # Code formatting
```

## 🎯 Design Principles

### 1. **Separation of Concerns**
- HTML: Structure only, no inline styles or scripts
- CSS: Modular architecture with clear hierarchy
- JS: ES6 modules with single responsibilities

### 2. **No Magic Numbers**
- All values defined in `constants.js`
- CSS variables for all design tokens
- Configuration-driven demo scenarios

### 3. **Consistent Naming Conventions**
- CSS: BEM-inspired with utility prefix system
  - Components: `.component__element--modifier`
  - Utilities: `.u-[property]-[value]`
  - Animations: `.a-[animation-name]`
- JS: Clear, descriptive names with JSDoc comments

### 4. **Progressive Enhancement**
- Works without JavaScript (degraded experience)
- Semantic HTML for accessibility
- CSS animations respect `prefers-reduced-motion`

### 5. **Performance First**
- Lazy loading for animations
- Efficient DOM queries cached at initialization
- Debounced scroll handlers
- CSS containment for animation performance

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (for development)
- Modern browser (production)

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Opens at http://localhost:3000 with hot module replacement.

### Production Build
```bash
npm run build
```
Outputs optimized files to `dist/` directory.

### Code Quality
```bash
npm run lint        # Run all linters
npm run lint:css    # CSS linting only
npm run lint:js     # JavaScript linting only
npm run format      # Auto-format code
```

## 📁 Module Documentation

### CSS Architecture

#### Variables (`variables.css`)
Design tokens following a consistent naming pattern:
- Colors: `--color-[category]-[variant]`
- Spacing: `--space-[size]` (8px grid system)
- Typography: `--font-[property]-[variant]`
- Animations: `--duration-[speed]`, `--ease-[type]`

#### Utilities (`utilities.css`)
Single-purpose classes for rapid development:
- Display: `.u-flex`, `.u-grid`, `.u-hidden`
- Spacing: `.u-m-[size]`, `.u-p-[size]`
- Typography: `.u-text-[size]`, `.u-font-[weight]`
- States: `.is-active`, `.is-loading`, `.is-visible`

### JavaScript Architecture

#### DOM Utilities (`dom.js`)
Clean abstractions over native DOM APIs:
```javascript
import { $, $$, on, addClass, removeClass } from './utils/dom.js';

// Query single element
const button = $('#my-button');

// Query multiple elements
const cards = $$('.card');

// Event handling with cleanup
const cleanup = on(button, 'click', handleClick);
```

#### Form Validator (`form-validator.js`)
Robust validation with accessibility:
```javascript
const validator = createFormValidator('#my-form', {
  validateOnBlur: true,
  showInlineErrors: true
});
```

#### Interactive Demo (`interactive-demo.js`)
State-managed demo flow:
```javascript
const demo = createInteractiveDemo('#demo-container');
// Handles all demo interactions internally
```

#### Scroll Animations (`scroll-animations.js`)
Performance-optimized scroll triggers:
```javascript
const animator = createScrollAnimations({
  animationClass: 'u-animate-fade-in',
  threshold: 0.1
});
```

## 🧹 Code Standards

### CSS
- Mobile-first responsive design
- No `!important` unless absolutely necessary
- Variables for all repeated values
- Comments for complex calculations

### JavaScript
- ES6+ features (const/let, arrow functions, modules)
- No global variables (except debugging hook)
- Error boundaries on all public APIs
- Cleanup functions for all event listeners

### HTML
- Semantic elements (`<section>`, `<article>`, `<nav>`)
- ARIA labels for interactive elements
- Progressive enhancement structure

## 🔍 Debugging

The application exposes a debug object in development:
```javascript
window.__cyftApp // Main application instance
```

## 📊 Performance Metrics

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Total Bundle Size**: < 150KB (gzipped)
- **CSS**: ~25KB minified
- **JavaScript**: ~15KB minified

## 🚨 Common Issues

### Import Paths
Ensure all imports use correct relative paths:
```javascript
// ✅ Correct
import { COLORS } from '../config/constants.js';

// ❌ Wrong - missing .js extension
import { COLORS } from '../config/constants';
```

### CSS Import Order
The main.css file imports in specific order:
1. Variables (design tokens)
2. Base (reset and foundations)
3. Utilities (utility classes)
4. Animations (keyframes)
5. Components (specific components)

### State Management
Each module manages its own state. Never store state in global scope.

## 🎨 Design System

### Colors
- Primary: Pure black (#000000)
- Background: Soft white (#FAFAFA)
- Text hierarchy: 5 levels of gray
- Semantic: Success, error, warning, info

### Typography
- System font stack for performance
- Fluid typography with clamp()
- Consistent scale: 1.2 ratio

### Spacing
- 8px grid system
- Consistent scale: 0.25rem to 8rem
- Section spacing: viewport-based

### Animation
- All animations in one file
- Consistent timing functions
- Respects user preferences

## 📊 Google Sheets Integration

### Overview
The landing page supports automatic lead capture to Google Sheets via Google Apps Script.

### Quick Setup
1. **Create a Google Sheet** with columns for lead data
2. **Deploy Google Apps Script** (see `google-sheets-setup.md` for detailed instructions)
3. **Configure environment variables**:
   ```env
   VITE_GOOGLE_SHEETS_ENABLED=true
   VITE_GOOGLE_SHEETS_SCRIPT_URL=your_script_url_here
   ```
4. **Test the integration**:
   ```bash
   npm run test:sheets
   ```

### Features
- Automatic form submission to Google Sheets
- Captures both demo requests and friend invitations
- Includes metadata (timestamp, source, referrer)
- Non-blocking (doesn't delay form submission)
- Error resilient (form still works if Sheets fails)

### Data Captured
- **Demo Form**: Name, Email, Company, Tech Stack
- **Friend Form**: Email
- **Metadata**: Timestamp, Source, Referrer, User Agent

For detailed setup instructions, see `google-sheets-setup.md`.

## 🐛 Chrome Rendering Fixes (December 2024)

### Issue Fixed
HTML text was showing incorrectly during rendering on Chromium-based browsers.

### Changes Made
1. **Hero elements now start visible** - Removed `opacity: 0` from critical elements
2. **Chrome-specific rendering optimizations** - Added transform3d and backface-visibility fixes
3. **Progressive enhancement** - Content visible by default, animations enhance

### Testing
1. Open `test-chrome-rendering.html` in Chrome/Edge
2. Run all tests - they should pass
3. Check main site with Chrome DevTools:
   - Network throttled to "Slow 3G"
   - Clear cache and hard reload
   - No HTML text should flash

### Files Modified
- `index.html` - Updated inline critical CSS
- `src/css/critical-inline.css` - Made hero elements visible
- `src/css/hero-optimized.css` - Added Chrome rendering fixes

See `CHROMIUM_RENDERING_FIX_2024.md` for full details.

## 📝 License

Proprietary - Cyft 2025

---

*Built with an obsessive attention to clean code. Every line has a purpose. Every file has a home. Every pattern has a reason.* 