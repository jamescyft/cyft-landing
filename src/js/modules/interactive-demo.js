/**
 * Interactive Demo Module
 * Manages the demo interaction flow with clean state management
 */

import { DEMO_SCENARIOS } from '../../config/scenarios.js';
import { DEMO_CONFIG, ANIMATION_TIMING, TIMEOUTS, ANIMATION_DELAYS } from '../../config/constants.js';
import { $, $$, on, show, hide, addClass, removeClass, createElement } from '../utils/dom.js';
import { logger } from '../utils/logger.js';

/**
 * InteractiveDemo Class
 * Handles the entire demo flow and state
 */
export class InteractiveDemo {
  constructor(containerId) {
    this.container = $(containerId);
    if (!this.container) {
      throw new Error(`Demo container not found: ${containerId}`);
    }
    
    // State management
    this.state = {
      isRunning: false,
      currentScenarioIndex: 0,
      currentStep: 'idle',
      animationTimeouts: []
    };
    
    // DOM element references
    this.elements = {
      micButton: null,
      voiceInputSection: null,
      splitViewSection: null,
      transcriptText: null,
      typicalNotes: null,
      docContent: null,
      processingIndicator: null,
      syncIndicators: null,
      resetButton: null,
      infoGain: null,
      infoGainContent: null
    };
    
    this.init();
  }
  
  /**
   * Initialize the demo
   */
  init() {
    this.cacheElements();
    this.setupEventListeners();
  }
  
  /**
   * Cache DOM element references
   */
  cacheElements() {
    this.elements = {
      micButton: $('#mic-button'),
      voiceInputSection: $('#voice-input-section'),
      splitViewSection: $('#split-view-section'),
      transcriptText: $('#transcript-text'),
      typicalNotes: $('#typical-notes'),
      docContent: $('#doc-content'),
      processingIndicator: $('#processing-indicator'),
      syncIndicators: $('#sync-indicators'),
      resetButton: $('#reset-demo'),
      resetSection: $('#reset-section'),
      infoGain: $('#info-gain'),
      infoGainContent: $('#info-gain-content'),
      ripple: $('.ripple', this.elements.micButton)
    };
    
    // Validate required elements
    const requiredElements = ['micButton', 'voiceInputSection', 'splitViewSection'];
    requiredElements.forEach(key => {
      if (!this.elements[key]) {
        logger.error(`Required element not found: ${key}`);
      }
    });
  }
  
  /**
   * Setup event listeners
   */
  setupEventListeners() {
    if (this.elements.micButton) {
      on(this.elements.micButton, 'click', () => this.startDemo());
    }
    
    if (this.elements.resetButton) {
      on(this.elements.resetButton, 'click', () => this.resetDemo());
    }
  }
  
  /**
   * Start the demo flow
   */
  startDemo() {
    if (this.state.isRunning) return;
    
    this.state.isRunning = true;
    const scenario = DEMO_SCENARIOS[this.state.currentScenarioIndex];
    
    // Trigger ripple animation
    this.animateRipple();
    
    // Transition to split view
    setTimeout(() => {
      hide(this.elements.voiceInputSection);
      show(this.elements.splitViewSection);
      
      // Start the scenario
      this.runScenario(scenario);
    }, TIMEOUTS.rippleAnimation);
  }
  
  /**
   * Run a demo scenario
   * @param {Object} scenario - Scenario configuration
   */
  async runScenario(scenario) {
    // Reset content
    this.resetContent();
    
    // Start typing typical notes
    await this.typeText(
      scenario.typicalNotes,
      this.elements.typicalNotes,
      DEMO_CONFIG.typingSpeed.typical
    );
    
    // Wait before transcript
    await this.wait(DEMO_CONFIG.delays.beforeTranscript);
    
    // Start typing transcript
    await this.typeText(
      scenario.naturalSpeech,
      this.elements.transcriptText,
      DEMO_CONFIG.typingSpeed.transcript
    );
    
    // Wait before documentation
    await this.wait(DEMO_CONFIG.delays.beforeDocumentation);
    
    // Generate documentation
    await this.generateDocumentation(scenario);
    
    // Show completion UI
    this.showCompletionUI(scenario);
  }
  
  /**
   * Type text with animation
   * @param {string} text - Text to type
   * @param {Element} element - Target element
   * @param {number} speed - Typing speed in ms
   * @returns {Promise}
   */
  typeText(text, element, speed) {
    return new Promise(resolve => {
      if (!element) {
        resolve();
        return;
      }
      
      element.innerHTML = '';
      let index = 0;
      
      const type = () => {
        if (index < text.length) {
          element.innerHTML += text.charAt(index);
          index++;
          this.state.animationTimeouts.push(
            setTimeout(type, speed)
          );
        } else {
          resolve();
        }
      };
      
      type();
    });
  }
  
  /**
   * Generate documentation with animations
   * @param {Object} scenario - Scenario configuration
   */
  async generateDocumentation(scenario) {
    const doc = scenario.documentation;
    
    hide(this.elements.processingIndicator);
    this.elements.docContent.style.opacity = '1';
    
    // Build documentation HTML
    const docElements = [];
    
    // Title
    docElements.push(
      createElement('h4', {
        classes: ['doc-title', 'a-doc-line', 'a-line-highlight'],
        text: doc.title
      })
    );
    
    // Sections
    doc.sections.forEach(section => {
      if (section.heading) {
        docElements.push(
          createElement('h5', {
            classes: ['doc-section-header', 'a-doc-line', 'a-line-highlight'],
            text: section.heading
          })
        );
      }
      
      if (section.content) {
        docElements.push(
          createElement('p', {
            classes: ['doc-content', 'a-doc-line', 'a-line-highlight'],
            text: section.content
          })
        );
      }
      
      if (section.items) {
        const list = createElement('ul', {
          classes: ['doc-list']
        });
        
        section.items.forEach(item => {
          list.appendChild(
            createElement('li', {
              classes: ['doc-list-item', 'a-doc-line', 'a-line-highlight'],
              text: item
            })
          );
        });
        
        docElements.push(list);
      }
    });
    
    // Add success message if resolution section exists
    const resolutionSection = doc.sections.find(s => 
      s.type === 'resolution' || s.type === 'results'
    );
    
    if (resolutionSection) {
      docElements.push(
        createElement('div', {
          classes: ['doc-success', 'a-success-pulse'],
          children: [
            createElement('p', {
              classes: ['success-message'],
              text: resolutionSection.content
            })
          ]
        })
      );
    }
    
    // Clear and append all elements
    this.elements.docContent.innerHTML = '';
    docElements.forEach(element => {
      this.elements.docContent.appendChild(element);
    });
    
    // Animate each line with stagger
    const lines = $$('.a-doc-line', this.elements.docContent);
    lines.forEach((line, index) => {
      const delay = index * ANIMATION_TIMING.lineStagger + 
                   (Math.floor(index / 3) * ANIMATION_TIMING.groupDelay);
      
      // Map calculated delay to nearest predefined CSS class
      const delayClass = this.getDelayClass(delay);
      addClass(line, delayClass);
      
      // Remove highlight after animation
      setTimeout(() => {
        removeClass(line, 'a-line-highlight');
      }, delay + TIMEOUTS.highlightRemoval);
    });
    
    // Wait for animations to complete
    const totalDelay = lines.length * ANIMATION_TIMING.lineStagger + TIMEOUTS.documentationComplete;
    await this.wait(totalDelay);
  }
  
  /**
   * Show completion UI elements
   * @param {Object} scenario - Scenario configuration
   */
  showCompletionUI(scenario) {
    // Show information gain
    if (scenario.informationGain && this.elements.infoGain) {
      show(this.elements.infoGain);
      
      // Map index to predefined delay classes
      const delayClasses = ['0', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
      
      this.elements.infoGainContent.innerHTML = scenario.informationGain
        .map((item, index) => {
          const delayClass = index < delayClasses.length ? delayClasses[index] : '1000';
          return `<p class="info-gain-item a-fade-in a-delay-${delayClass}">${item.description}</p>`;
        })
        .join('');
    }
    
    // Show sync indicators
    if (this.elements.syncIndicators) {
      this.elements.syncIndicators.style.opacity = '1';
      
      const syncCards = $$('.sync-card', this.elements.syncIndicators);
      syncCards.forEach((card, index) => {
        setTimeout(() => {
          addClass(card, 'a-fade-up');
        }, index * DEMO_CONFIG.delays.syncIndicators);
      });
    }
    
    // Show reset button
    if (this.elements.resetSection) {
      this.elements.resetSection.style.opacity = '1';
    }
    
    this.state.isRunning = false;
  }
  
  /**
   * Reset demo to initial state
   */
  resetDemo() {
    // Clear all timeouts
    this.state.animationTimeouts.forEach(timeout => clearTimeout(timeout));
    this.state.animationTimeouts = [];
    
    // Update scenario index
    this.state.currentScenarioIndex = 
      (this.state.currentScenarioIndex + 1) % DEMO_SCENARIOS.length;
    
    // Reset UI
    show(this.elements.voiceInputSection);
    hide(this.elements.splitViewSection);
    
    // Reset content
    this.resetContent();
    
    // Reset visibility
    if (this.elements.resetSection) {
      this.elements.resetSection.style.opacity = '0';
    }
    if (this.elements.syncIndicators) {
      this.elements.syncIndicators.style.opacity = '0';
    }
    if (this.elements.infoGain) {
      hide(this.elements.infoGain);
    }
    
    // Reset sync cards
    const syncCards = $$('.sync-card');
    syncCards.forEach(card => {
      removeClass(card, 'a-fade-up');
    });
    
    this.state.isRunning = false;
  }
  
  /**
   * Reset content areas
   */
  resetContent() {
    if (this.elements.transcriptText) {
      this.elements.transcriptText.innerHTML = '<span class="u-text-light">Listening...</span>';
    }
    if (this.elements.typicalNotes) {
      this.elements.typicalNotes.innerHTML = '<span class="u-text-light">Loading...</span>';
    }
    if (this.elements.docContent) {
      this.elements.docContent.innerHTML = '';
    }
    if (this.elements.infoGainContent) {
      this.elements.infoGainContent.innerHTML = '';
    }
    
    show(this.elements.processingIndicator);
  }
  
  /**
   * Animate ripple effect
   */
  animateRipple() {
    if (this.elements.ripple) {
      addClass(this.elements.ripple, 'a-ripple-click');
      setTimeout(() => {
        removeClass(this.elements.ripple, 'a-ripple-click');
      }, TIMEOUTS.rippleAnimation);
    }
  }
  
  /**
   * Get CSS delay class for given milliseconds
   * @param {number} ms - Milliseconds of delay
   * @returns {string} CSS class name
   */
  getDelayClass(ms) {
    // Use the centralized helper from constants
    return ANIMATION_DELAYS.getDelayClass(ms);
  }
  
  /**
   * Wait utility
   * @param {number} ms - Milliseconds to wait
   * @returns {Promise}
   */
  wait(ms) {
    return new Promise(resolve => {
      const timeout = setTimeout(resolve, ms);
      this.state.animationTimeouts.push(timeout);
    });
  }
  
  /**
   * Destroy demo and cleanup
   */
  destroy() {
    // Clear all timeouts
    this.state.animationTimeouts.forEach(timeout => clearTimeout(timeout));
    
    // Remove event listeners
    // Note: Using our DOM utility's on() function returns cleanup functions
    // In a real implementation, we'd store these and call them here
    
    // Clear references
    this.container = null;
    this.elements = null;
    this.state = null;
  }
}

/**
 * Factory function to create interactive demo
 * @param {string} containerId - Container element ID
 * @returns {InteractiveDemo|null}
 */
export const createInteractiveDemo = (containerId) => {
  try {
    return new InteractiveDemo(containerId);
  } catch (error) {
    logger.error('Failed to create interactive demo:', error);
    return null;
  }
}; 