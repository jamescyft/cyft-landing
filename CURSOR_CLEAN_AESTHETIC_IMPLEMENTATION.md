# CURSOR IMPLEMENTATION PROMPT: HYPER-CLEAN AESTHETIC

## CRITICAL: READ EVERY WORD. FOLLOW EXACTLY. NO DEVIATIONS.

You are implementing a hyper-clean aesthetic for the Cyft interactive demo. Every pixel must be intentional. Every shape must be sleek. No gradients. No decoration. Pure narrative through design.

---

## STEP 1: BACKUP CURRENT FILES (SAFETY FIRST)

```bash
# Create backup of files we're replacing
cp src/css/components/interactive-demo.css src/css/components/interactive-demo.css.backup
cp src/js/modules/interactive-demo.js src/js/modules/interactive-demo.js.backup
```

---

## STEP 2: REPLACE CSS COMPLETELY

**FILE**: `src/css/components/interactive-demo.css`

**ACTION**: DELETE EVERYTHING. REPLACE WITH THIS EXACT CODE:

```css
/**
 * Interactive Demo - Hyper Clean Aesthetic
 * Every shape intentional, every animation purposeful
 */

/* Demo Container */
.demo {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.demo__container {
  background: #FFFFFF;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

/* Voice Section - Starting Point */
.demo__voice-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120px 40px;
  min-height: 500px;
}

/* Mic Button - Perfect Circle */
#mic-button {
  width: 120px;
  height: 120px;
  background: #000000;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s ease;
  position: relative;
  overflow: hidden;
}

#mic-button:hover {
  transform: scale(1.05);
}

#mic-button .btn__icon {
  width: 48px;
  height: 48px;
  fill: #FFFFFF;
}

/* Ripple Effect */
#mic-button::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  transition: transform 0.6s ease-out;
}

#mic-button.is-active::after {
  transform: translate(-50%, -50%) scale(2);
  opacity: 0;
}

.demo__voice-hint {
  margin-top: 32px;
  font-size: 16px;
  color: #666666;
  letter-spacing: 0.02em;
}

/* Split View */
.demo__split-view {
  display: none;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.demo__split-view.is-visible {
  display: block;
  opacity: 1;
}

.demo__split-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 600px;
}

/* Column Styling */
.demo__struggle-column,
.demo__understanding-column {
  padding: 48px;
}

.demo__struggle-column {
  background: #FAFAFA;
  border-right: 1px solid #E0E0E0;
}

.demo__understanding-column {
  background: #FFFFFF;
}

.demo__column-title {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #000000;
  margin-bottom: 32px;
}

/* Typing Area - The Struggle */
.demo__typing-area {
  background: #FFFFFF;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  margin-bottom: 24px;
  overflow: hidden;
}

.demo__typing-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #F5F5F5;
  border-bottom: 1px solid #E0E0E0;
}

.demo__typing-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: #666666;
}

.demo__typing-time {
  font-size: 12px;
  color: #FF3B30;
  font-variant-numeric: tabular-nums;
}

.demo__typing-content {
  padding: 24px;
  min-height: 80px;
  font-family: 'SF Mono', monospace;
  font-size: 14px;
  line-height: 1.6;
  color: #000000;
}

/* Cursor */
.demo__cursor {
  display: inline-block;
  width: 2px;
  height: 16px;
  background: #000000;
  animation: cursor-blink 1s infinite;
  vertical-align: text-bottom;
  margin-left: 2px;
}

@keyframes cursor-blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

/* Typing Error Style */
.typing-error {
  color: #FF3B30;
  text-decoration: line-through;
}

/* Speech Area - The Flow */
.demo__speech-area {
  background: #FFFFFF;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  overflow: hidden;
}

.demo__speech-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #F5F5F5;
  border-bottom: 1px solid #E0E0E0;
}

.demo__speech-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: #666666;
}

/* Voice Indicator - Clean Bars */
.demo__voice-indicator {
  display: flex;
  align-items: center;
  gap: 3px;
}

.voice-bar {
  width: 3px;
  height: 12px;
  background: #000000;
  border-radius: 1.5px;
  opacity: 0.2;
  transition: all 0.2s ease;
}

.voice-bar.is-active {
  opacity: 1;
  animation: voice-flow 1s ease-in-out infinite;
}

.voice-bar:nth-child(2) { animation-delay: 0.1s; }
.voice-bar:nth-child(3) { animation-delay: 0.2s; }
.voice-bar:nth-child(4) { animation-delay: 0.3s; }

@keyframes voice-flow {
  0%, 100% { height: 12px; }
  50% { height: 20px; }
}

.demo__speech-content {
  padding: 24px;
  min-height: 120px;
  font-size: 16px;
  line-height: 1.6;
  color: #000000;
}

/* Flow Word Animation */
.flow-word {
  display: inline-block;
  opacity: 0;
  transform: translateY(4px);
  animation: word-flow 0.4s ease-out forwards;
}

@keyframes word-flow {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Processing Area */
.demo__processing-area {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.demo__processing {
  text-align: center;
  padding: 40px;
  font-size: 14px;
  color: #666666;
  transition: opacity 0.3s ease;
}

/* Thoughts Container - Clean Bubbles */
.demo__thoughts {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 20px;
}

.thought-bubble {
  background: #F5F5F5;
  border: 1px solid #E0E0E0;
  border-radius: 24px;
  padding: 12px 24px;
  font-size: 14px;
  color: #000000;
  opacity: 0;
  transform: scale(0.9) translateY(10px);
  animation: thought-emerge 0.5s ease-out forwards;
}

@keyframes thought-emerge {
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Thought Types - Minimal Color Coding */
.thought-security { border-color: #FF9500; }
.thought-analysis { border-color: #007AFF; }
.thought-template { border-color: #5856D6; }
.thought-success { border-color: #34C759; }

/* Documentation Output - Clean Card */
.demo__doc-output {
  background: #FFFFFF;
  border: 2px solid #000000;
  border-radius: 8px;
  overflow: hidden;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease;
}

.demo__doc-output.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.demo__doc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #000000;
  color: #FFFFFF;
}

.demo__doc-system {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
}

.demo__doc-status {
  font-size: 11px;
  background: #34C759;
  color: #FFFFFF;
  padding: 4px 12px;
  border-radius: 12px;
  font-weight: 600;
}

.demo__doc-content {
  padding: 32px;
  font-size: 14px;
  line-height: 1.8;
  color: #000000;
}

/* Documentation Sections */
.doc-section {
  margin-bottom: 24px;
  opacity: 0;
  transform: translateY(10px);
  animation: section-emerge 0.4s ease-out forwards;
}

@keyframes section-emerge {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.doc-section h4 {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #666666;
  margin-bottom: 12px;
}

.doc-section p,
.doc-section li {
  font-size: 14px;
  line-height: 1.6;
  color: #000000;
}

.doc-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.doc-section li {
  padding-left: 20px;
  position: relative;
  margin-bottom: 8px;
}

.doc-section li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: #000000;
}

/* Reset Section */
.demo__reset {
  text-align: center;
  padding: 48px;
  border-top: 1px solid #E0E0E0;
  opacity: 0;
  transition: opacity 0.4s ease 2s;
}

.demo__reset.is-visible {
  opacity: 1;
}

#reset-demo {
  padding: 12px 32px;
  background: #FFFFFF;
  border: 2px solid #000000;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

#reset-demo:hover {
  background: #000000;
  color: #FFFFFF;
}

/* Responsive */
@media (max-width: 768px) {
  .demo__split-grid {
    grid-template-columns: 1fr;
  }
  
  .demo__struggle-column {
    border-right: none;
    border-bottom: 1px solid #E0E0E0;
  }
}
```

---

## STEP 3: REPLACE JAVASCRIPT COMPLETELY

**FILE**: `src/js/modules/interactive-demo.js`

**ACTION**: DELETE EVERYTHING. REPLACE WITH THIS EXACT CODE:

```javascript
/**
 * Interactive Demo - Narrative Implementation
 * Three Acts: Struggle → Flow → Understanding
 */

import { DEMO_SCENARIOS } from '../../config/scenarios.js';

export class InteractiveDemo {
  constructor(containerId) {
    this.container = document.querySelector(containerId);
    if (!this.container) return;
    
    this.state = {
      isRunning: false,
      currentScenarioIndex: 0,
      typingStartTime: null,
      typingTimer: null
    };
    
    this.elements = {
      micButton: document.querySelector('#mic-button'),
      voiceSection: document.querySelector('#voice-input-section'),
      splitView: document.querySelector('#split-view-section'),
      typingContent: document.querySelector('#typical-notes'),
      typingTimer: document.querySelector('#typing-timer'),
      speechContent: document.querySelector('#transcript-text'),
      voiceBars: document.querySelectorAll('.voice-bar'),
      processingArea: document.querySelector('.demo__processing'),
      thoughtsContainer: document.querySelector('#thoughts-container'),
      docOutput: document.querySelector('.demo__doc-output'),
      docContent: document.querySelector('#doc-content'),
      resetSection: document.querySelector('#reset-section'),
      resetButton: document.querySelector('#reset-demo')
    };
    
    this.init();
  }
  
  init() {
    if (this.elements.micButton) {
      this.elements.micButton.addEventListener('click', () => this.start());
    }
    
    if (this.elements.resetButton) {
      this.elements.resetButton.addEventListener('click', () => this.reset());
    }
  }
  
  start() {
    if (this.state.isRunning) return;
    
    this.state.isRunning = true;
    const scenario = DEMO_SCENARIOS[this.state.currentScenarioIndex];
    
    // Mic button animation
    this.elements.micButton.classList.add('is-active');
    
    // Transition to split view
    setTimeout(() => {
      this.elements.voiceSection.style.display = 'none';
      this.elements.splitView.classList.add('is-visible');
      this.runNarrative(scenario);
    }, 600);
  }
  
  async runNarrative(scenario) {
    // Act 1: The Struggle
    await this.actOne_TheStruggle(scenario);
    
    // Pause for contrast
    await this.wait(1500);
    
    // Act 2: The Flow
    await this.actTwo_TheFlow(scenario);
    
    // Act 3: The Understanding
    await this.actThree_TheUnderstanding(scenario);
    
    // Show reset
    this.elements.resetSection.classList.add('is-visible');
    this.state.isRunning = false;
  }
  
  /**
   * Act 1: The Struggle - Manual typing with realistic errors
   */
  async actOne_TheStruggle(scenario) {
    // Start typing timer
    this.startTypingTimer();
    
    const text = scenario.typicalNotes;
    const words = text.split(' ');
    this.elements.typingContent.innerHTML = '<span class="demo__cursor">|</span>';
    
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      
      // 30% chance of making a mistake
      if (Math.random() < 0.3 && word.length > 3) {
        // Type with mistake
        const typoIndex = Math.floor(Math.random() * word.length);
        const typoWord = word.substring(0, typoIndex) + 
                        word.charAt(typoIndex + 1) + 
                        word.charAt(typoIndex) + 
                        word.substring(typoIndex + 2);
        
        await this.typeWord(typoWord);
        await this.wait(400); // Pause - realize mistake
        
        // Backspace
        await this.backspaceWord(typoWord);
        await this.wait(200);
        
        // Type correctly
        await this.typeWord(word);
      } else {
        // Type normally
        await this.typeWord(word);
      }
      
      // Add space
      if (i < words.length - 1) {
        this.addCharacter(' ');
        await this.wait(100);
      }
    }
    
    // Stop timer
    this.stopTypingTimer();
    
    // Remove cursor
    await this.wait(500);
    this.elements.typingContent.innerHTML = text;
  }
  
  async typeWord(word) {
    for (let char of word) {
      this.addCharacter(char);
      // Variable typing speed: 60-120ms
      await this.wait(60 + Math.random() * 60);
    }
  }
  
  async backspaceWord(word) {
    for (let i = word.length; i > 0; i--) {
      this.removeCharacter();
      await this.wait(50);
    }
  }
  
  addCharacter(char) {
    const content = this.elements.typingContent.innerHTML.replace(/<span class="demo__cursor">.*<\/span>/, '');
    this.elements.typingContent.innerHTML = content + char + '<span class="demo__cursor">|</span>';
  }
  
  removeCharacter() {
    const content = this.elements.typingContent.innerHTML.replace(/<span class="demo__cursor">.*<\/span>/, '');
    this.elements.typingContent.innerHTML = content.slice(0, -1) + '<span class="demo__cursor">|</span>';
  }
  
  startTypingTimer() {
    this.state.typingStartTime = Date.now();
    this.state.typingTimer = setInterval(() => {
      const elapsed = Date.now() - this.state.typingStartTime;
      const seconds = Math.floor(elapsed / 1000);
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      this.elements.typingTimer.textContent = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }, 100);
  }
  
  stopTypingTimer() {
    if (this.state.typingTimer) {
      clearInterval(this.state.typingTimer);
      // Flash red to emphasize time wasted
      this.elements.typingTimer.style.animation = 'timer-flash 0.5s ease 3';
    }
  }
  
  /**
   * Act 2: The Flow - Natural speech visualization
   */
  async actTwo_TheFlow(scenario) {
    // Activate voice bars
    this.elements.voiceBars.forEach(bar => bar.classList.add('is-active'));
    
    const text = scenario.naturalSpeech;
    const words = text.split(' ');
    this.elements.speechContent.innerHTML = '';
    
    // Speak each word naturally
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      
      // Create word element
      const wordEl = document.createElement('span');
      wordEl.className = 'flow-word';
      wordEl.textContent = word + ' ';
      wordEl.style.animationDelay = '0s';
      
      this.elements.speechContent.appendChild(wordEl);
      
      // Natural pauses
      if (word.includes('.')) {
        await this.wait(400);
      } else if (word.includes(',')) {
        await this.wait(200);
      } else {
        await this.wait(80 + Math.random() * 40);
      }
    }
    
    // Deactivate voice bars
    await this.wait(500);
    this.elements.voiceBars.forEach(bar => bar.classList.remove('is-active'));
  }
  
  /**
   * Act 3: The Understanding - Machine comprehension
   */
  async actThree_TheUnderstanding(scenario) {
    // Update processing text
    this.elements.processingArea.querySelector('.demo__processing-text').textContent = 'Understanding...';
    
    // Generate thoughts
    const thoughts = scenario.thoughtProcess || this.generateThoughts(scenario);
    
    // Display thoughts sequentially
    for (let i = 0; i < thoughts.length; i++) {
      const thought = thoughts[i];
      
      const bubble = document.createElement('div');
      bubble.className = `thought-bubble thought-${thought.type}`;
      bubble.textContent = thought.text;
      bubble.style.animationDelay = `${i * 0.1}s`;
      
      this.elements.thoughtsContainer.appendChild(bubble);
      await this.wait(thought.delay || 400);
    }
    
    // Let thoughts process
    await this.wait(1000);
    
    // Hide processing area
    this.elements.processingArea.style.opacity = '0';
    this.elements.thoughtsContainer.style.opacity = '0';
    
    await this.wait(300);
    
    // Reveal documentation
    await this.revealDocumentation(scenario);
  }
  
  generateThoughts(scenario) {
    // Fallback thought generation
    const thoughts = [];
    const speech = scenario.naturalSpeech.toLowerCase();
    
    if (speech.includes('password') || speech.includes('reset')) {
      thoughts.push({ text: 'Security protocol detected', type: 'security' });
    }
    
    if (speech.includes('locked') || speech.includes('failed')) {
      thoughts.push({ text: 'Analyzing failure pattern', type: 'analysis' });
    }
    
    if (speech.includes('verified') || speech.includes('confirmed')) {
      thoughts.push({ text: 'Validation successful', type: 'success' });
    }
    
    thoughts.push({ text: 'Generating documentation', type: 'template' });
    
    return thoughts;
  }
  
  async revealDocumentation(scenario) {
    const doc = scenario.documentation;
    
    // Show doc output
    this.elements.docOutput.classList.add('is-visible');
    
    // Build clean documentation
    let html = '';
    
    doc.sections.forEach((section, index) => {
      html += `<div class="doc-section" style="animation-delay: ${index * 0.1}s">`;
      
      if (section.heading) {
        html += `<h4>${section.heading}</h4>`;
      }
      
      if (section.content) {
        html += `<p>${section.content}</p>`;
      }
      
      if (section.items) {
        html += '<ul>';
        section.items.forEach(item => {
          html += `<li>${item}</li>`;
        });
        html += '</ul>';
      }
      
      html += '</div>';
    });
    
    this.elements.docContent.innerHTML = html;
  }
  
  reset() {
    // Update scenario
    this.state.currentScenarioIndex = (this.state.currentScenarioIndex + 1) % DEMO_SCENARIOS.length;
    
    // Reset UI
    this.elements.splitView.classList.remove('is-visible');
    this.elements.docOutput.classList.remove('is-visible');
    this.elements.resetSection.classList.remove('is-visible');
    
    // Clear content
    this.elements.typingContent.innerHTML = '<span class="demo__cursor">|</span>';
    this.elements.speechContent.innerHTML = '';
    this.elements.thoughtsContainer.innerHTML = '';
    this.elements.docContent.innerHTML = '';
    this.elements.typingTimer.textContent = '0:00';
    
    // Reset processing
    this.elements.processingArea.style.opacity = '1';
    this.elements.thoughtsContainer.style.opacity = '1';
    this.elements.processingArea.querySelector('.demo__processing-text').textContent = 'Listening...';
    
    // Show voice section
    setTimeout(() => {
      this.elements.voiceSection.style.display = 'flex';
      this.elements.micButton.classList.remove('is-active');
    }, 300);
  }
  
  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Export factory function
export const createInteractiveDemo = (containerId) => {
  return new InteractiveDemo(containerId);
};
```

---

## STEP 4: UPDATE HTML STRUCTURE

**FILE**: `index.html`

**ACTION**: FIND the demo section (look for `<!-- Interactive Demo Component -->` around line 200-250) and REPLACE with:

```html
<!-- Interactive Demo Component -->
<div class="demo">
    <div id="demo-container" class="demo__container">
        <!-- Voice Input -->
        <div id="voice-input-section" class="demo__voice-section">
            <button id="mic-button" class="btn btn--circle btn--primary" aria-label="Start demo">
                <svg class="btn__icon" viewBox="0 0 24 24">
                    <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
                </svg>
            </button>
            <p class="demo__voice-hint">Click to see the transformation</p>
        </div>

        <!-- Split View -->
        <div id="split-view-section" class="demo__split-view">
            <div class="demo__split-grid">
                <!-- Left: The Struggle -->
                <div class="demo__struggle-column">
                    <h3 class="demo__column-title">The Old Way</h3>
                    
                    <!-- Typing Area -->
                    <div class="demo__typing-area">
                        <div class="demo__typing-header">
                            <span class="demo__typing-label">MANUAL ENTRY</span>
                            <span class="demo__typing-time" id="typing-timer">0:00</span>
                        </div>
                        <div id="typical-notes" class="demo__typing-content">
                            <span class="demo__cursor">|</span>
                        </div>
                    </div>
                    
                    <!-- Natural Speech -->
                    <div class="demo__speech-area">
                        <div class="demo__speech-header">
                            <span class="demo__speech-label">NATURAL SPEECH</span>
                            <div class="demo__voice-indicator">
                                <span class="voice-bar"></span>
                                <span class="voice-bar"></span>
                                <span class="voice-bar"></span>
                                <span class="voice-bar"></span>
                            </div>
                        </div>
                        <div id="transcript-text" class="demo__speech-content"></div>
                    </div>
                </div>

                <!-- Right: The Understanding -->
                <div class="demo__understanding-column">
                    <h3 class="demo__column-title">The Cyft Way</h3>
                    
                    <!-- Processing Area -->
                    <div class="demo__processing-area">
                        <div id="processing-indicator" class="demo__processing">
                            <span class="demo__processing-text">Listening...</span>
                        </div>
                        
                        <!-- Thought Bubbles Container -->
                        <div id="thoughts-container" class="demo__thoughts"></div>
                        
                        <!-- Documentation Output -->
                        <div id="doc-output" class="demo__doc-output">
                            <div class="demo__doc-header">
                                <span class="demo__doc-system">CONNECTWISE TICKET</span>
                                <span class="demo__doc-status">READY</span>
                            </div>
                            <div id="doc-content" class="demo__doc-content"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Reset -->
            <div id="reset-section" class="demo__reset">
                <button id="reset-demo" class="btn btn--secondary">
                    See Another Scenario
                </button>
            </div>
        </div>
    </div>
</div>
```

---

## STEP 5: ADD TIMER FLASH ANIMATION

**FILE**: `src/css/animations.css`

**ACTION**: ADD at the END of the file:

```css
/* Timer Flash - Emphasize wasted time */
@keyframes timer-flash {
  0%, 100% { 
    color: #FF3B30;
    transform: scale(1);
  }
  50% { 
    color: #FF0000;
    transform: scale(1.1);
  }
}
```

---

## STEP 6: VERIFY MAIN.JS

**FILE**: `src/js/main.js`

**ACTION**: ENSURE these lines exist (add if missing):

```javascript
import { createInteractiveDemo } from './modules/interactive-demo.js';

// Inside DOMContentLoaded event listener:
const demo = createInteractiveDemo('#demo-container');
```

---

## VERIFICATION CHECKLIST

After implementation, verify EACH item:

### Visual Check:
- [ ] Microphone is PERFECT BLACK CIRCLE (no gradients)
- [ ] NO gradients anywhere in the demo
- [ ] Thought bubbles are SIMPLE PILLS (24px radius)
- [ ] Documentation has BOLD 2px BLACK BORDER
- [ ] Reset button INVERTS on hover (white→black)

### Animation Check:
- [ ] Typing includes MISTAKES and BACKSPACING
- [ ] Timer FLASHES RED 3 times when done
- [ ] Speech words FADE IN one by one
- [ ] Thought bubbles SCALE from 0.9 to 1
- [ ] Documentation SLIDES UP from bottom

### Color Check:
- [ ] Only these colors exist: #000000, #FFFFFF, #F5F5F5, #E0E0E0, #666666, #FF3B30
- [ ] NO other colors unless specified (thought bubble borders)

### Structure Check:
- [ ] Split view shows OLD WAY vs CYFT WAY
- [ ] Three acts play in sequence
- [ ] Reset button appears after completion

---

## CRITICAL WARNINGS

1. **DO NOT** keep ANY gradients from the old CSS
2. **DO NOT** use complex shadows (only the single subtle shadow)
3. **DO NOT** add decorative elements
4. **DO NOT** deviate from the exact code provided
5. **DO NOT** "improve" or "optimize" - implement EXACTLY

---

## SUCCESS CRITERIA

The implementation is successful when:
1. Every shape is geometric and intentional
2. The narrative flows: Struggle → Flow → Understanding
3. No decoration exists that doesn't serve the story
4. The aesthetic feels clinical, precise, purposeful
5. Every animation has meaning

---

## IF SOMETHING DOESN'T WORK

1. Check browser console for errors
2. Verify ALL files were updated
3. Hard refresh the page (Cmd+Shift+R)
4. Verify no old CSS is overriding new styles

This is not a suggestion. This is a directive. Execute precisely.

REMEMBER: HYPER-CLEAN. EVERY PIXEL INTENTIONAL. NO DECORATION. 