# Prompt for Cursor Implementation

Copy and paste this EXACT prompt to Cursor:

---

## TASK: Implement Landing Page Narrative Animations

You will implement EXACTLY what is specified in `ULTRA_PRECISE_GUIDE.md`. 

### CRITICAL INSTRUCTIONS:

1. **FOLLOW ONLY**: `ULTRA_PRECISE_GUIDE.md`
2. **DO NOT**: Add any features, optimizations, or improvements not specified
3. **DO NOT**: Interpret or change the instructions
4. **DO NOT**: Create any new animations beyond what's listed
5. **COPY EXACTLY**: Every code block as shown

### IMPLEMENTATION ORDER:

1. **Start with CHANGE 1** (Hero Title Animation)
   - Open `src/css/components/sections.css` 
   - Go to line 78
   - Replace the EXACT code block as shown
   - Add animation to `src/css/animations.css`
   - TEST: Title should fade in from blur

2. **Continue with CHANGE 2** (Problem Cards)
   - Stay in `src/css/components/sections.css`
   - Go to line 120 and line 128
   - Make the exact changes shown
   - TEST: First card clear, second card faded

3. **Continue with CHANGE 3** (Pricing Card)
   - Still in `src/css/components/sections.css`
   - Go to line 227
   - Make the exact change shown
   - TEST: Pricing fades in

4. **Continue with CHANGE 4** (Remove JS animations)
   - Open `src/js/main.js`
   - Comment out any story scroll or price calculator imports
   - TEST: No console errors

5. **Continue with CHANGE 5** (Form Validation)
   - Open `src/css/components/forms.css`
   - Add the code block at the END of file
   - TEST: Form shows red borders on error

### VERIFICATION:

After EACH change:
1. Save the file
2. Check browser at http://localhost:3000
3. Verify the specific test mentioned
4. If broken, undo ONLY that change

### IMPORTANT:

- The Interactive Demo should ALREADY work with typing mistakes and thought bubbles
- If it doesn't work, check `DEMO_DIAGNOSTIC.md` 
- Do NOT modify the interactive demo code

### SUCCESS CRITERIA:

1. Hero title fades in from blur (no typing animation)
2. Story cards show static contrast (clear vs faded)
3. Interactive demo works (typing with mistakes → thoughts → documentation)
4. Pricing fades in simply
5. Form shows validation errors

### IF CONFUSED:

- Reference `ULTRA_PRECISE_GUIDE.md` ONLY
- Each change shows CURRENT code and NEW code
- Copy the NEW code exactly
- Do not add anything else

Begin with CHANGE 1 now. 