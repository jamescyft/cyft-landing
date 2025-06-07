# ULTRA PRECISE Implementation Guide - Line-by-Line

## THIS IS THE FINAL GUIDE. FOLLOW EXACTLY.

Every change shows:
1. EXACT line number
2. CURRENT code
3. NEW code to replace it with

---

## CHANGE 1: Hero Title Animation

### File: `src/css/components/sections.css`

**Line 78-86** - CURRENT CODE:
```css
.hero__title {
  font-size: var(--font-size-hero-mobile);
  font-weight: var(--font-weight-bold);
  letter-spacing: var(--letter-spacing-tight);
  line-height: var(--line-height-tight);
  margin: 0;
  color: var(--color-black-pure);
}
```

**REPLACE WITH THIS EXACT CODE:**
```css
.hero__title {
  font-size: var(--font-size-hero-mobile);
  font-weight: var(--font-weight-bold);
  letter-spacing: var(--letter-spacing-tight);
  line-height: var(--line-height-tight);
  margin: 0;
  color: var(--color-black-pure);
  opacity: 0;
  animation: simple-fade-in 1.5s ease-out 0.5s forwards;
}
```

### File: `src/css/animations.css`

**ADD at the VERY END of the file (after line 509):**
```css

/* Simple fade in - NOTHING ELSE */
@keyframes simple-fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**TEST**: Save, refresh. Title fades in after 0.5 seconds.

---

## CHANGE 2: Problem Cards

### File: `src/css/components/sections.css`

**Line 120-126** - CURRENT CODE:
```css
.problem-card {
  background: var(--color-white-pure);
  padding: var(--space-9);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  margin-bottom: var(--space-10);
}
```

**REPLACE WITH:**
```css
.problem-card {
  background: var(--color-white-pure);
  padding: var(--space-9);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  margin-bottom: var(--space-10);
  opacity: 1;
  filter: none;
}
```

**Line 128-131** - CURRENT CODE:
```css
.problem-card--faded {
  background: var(--color-bg-tertiary);
  border: var(--border-width-medium) dashed var(--color-text-light);
}
```

**REPLACE WITH:**
```css
.problem-card--faded {
  background: var(--color-bg-tertiary);
  border: var(--border-width-medium) dashed var(--color-text-light);
  opacity: 0.7;
}
```

**TEST**: First card clear, second card faded. NO animations.

---

## CHANGE 3: Pricing Card

### File: `src/css/components/sections.css`

**Line 227-232** - CURRENT CODE:
```css
.pricing__card {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  padding: var(--space-12) var(--space-9);
}
```

**REPLACE WITH:**
```css
.pricing__card {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  padding: var(--space-12) var(--space-9);
  opacity: 0;
  animation: simple-fade-in 0.8s ease-out forwards;
}
```

**TEST**: Pricing card fades in. Shows static "$73,125".

---

## CHANGE 4: Remove JavaScript Animations

### File: `src/js/main.js`

**LOOK FOR these lines (they may not exist):**
```javascript
import { initStoryScroll } from './modules/story-scroll.js';
import { initPriceCalculator } from './modules/price-counter.js';
```

**IF FOUND**: Add `//` at the start of each line to comment out.

**ALSO LOOK FOR these lines in the DOMContentLoaded section:**
```javascript
const storyScroll = initStoryScroll();
const priceCalculator = initPriceCalculator();
```

**IF FOUND**: Add `//` at the start of each line to comment out.

---

## CHANGE 5: Form Error Styles

### File: `src/css/components/forms.css`

**ADD at the VERY END of the file:**
```css

/* Form validation styles */
.form__error {
  color: #d32f2f;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  opacity: 0;
  transition: opacity 0.2s ease;
  display: block;
  min-height: 1.2rem;
}

.form__input.has-error {
  border-color: #d32f2f;
}

.form__error:not(:empty) {
  opacity: 1;
}
```

---

## VERIFICATION CHECKLIST

Run each test IN ORDER:

### 1. Hero Title Test
- [ ] Open http://localhost:3000
- [ ] Title appears after 0.5 second fade
- [ ] NO typing animation
- [ ] NO stacked text

### 2. Story Cards Test  
- [ ] Scroll to story section
- [ ] First card: fully visible
- [ ] Second card: slightly faded (0.7 opacity)
- [ ] Times show "10:47 AM" and "5:30 PM"
- [ ] NO blur effects
- [ ] NO scroll animations

### 3. Interactive Demo Test
- [ ] Click microphone button
- [ ] Left side: Types with mistakes and corrections
- [ ] Shows thought bubbles
- [ ] Documentation emerges
- [ ] If NOT working, STOP and check DEMO_DIAGNOSTIC.md

### 4. Pricing Test
- [ ] Scroll to pricing
- [ ] Card fades in
- [ ] Shows "117,000 tickets × 6 minutes"
- [ ] Shows "$73,125"
- [ ] NO counting animation

### 5. Form Test
- [ ] Try to submit empty form
- [ ] Red borders appear on required fields
- [ ] Error messages show below fields

---

## IF SOMETHING BREAKS

1. **Which change broke it?** Undo only that change
2. **Console errors?** Check exact error message
3. **Interactive demo broken?** This is CRITICAL - restore immediately

## DO NOT

- Add any animations not specified
- Change any code not mentioned
- Optimize or improve anything
- Add features

## SUMMARY

You are making 5 precise changes:
1. Hero title: Add fade animation
2. Problem cards: Ensure opacity values
3. Pricing card: Add fade animation  
4. JavaScript: Comment out scroll/price animations
5. Forms: Add error styles

That's it. Nothing more. 