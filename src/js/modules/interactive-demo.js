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
      ripple: $('.btn__ripple', this.elements.micButton)
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
    
    // Add active state to mic button for pulse animation
    addClass(this.elements.micButton, 'is-active');
    
    // Trigger ripple animation
    this.animateRipple();
    
    // Smooth transition to split view
    setTimeout(() => {
      // Fade out voice input section
      this.elements.voiceInputSection.style.opacity = '0';
      this.elements.voiceInputSection.style.transform = 'scale(0.95)';
      
      setTimeout(() => {
        hide(this.elements.voiceInputSection);
        removeClass(this.elements.micButton, 'is-active');
        
        // Show split view with animation
        this.elements.splitViewSection.style.display = 'block';
        this.elements.splitViewSection.style.opacity = '0';
        
        // Force reflow
        void this.elements.splitViewSection.offsetHeight;
        
        // Fade in split view
        requestAnimationFrame(() => {
          this.elements.splitViewSection.style.transition = 'opacity 0.6s ease-out';
          this.elements.splitViewSection.style.opacity = '1';
          addClass(this.elements.splitViewSection, 'is-visible');
        });
        
        // Start the scenario
        this.runScenario(scenario);
      }, 300);
    }, TIMEOUTS.rippleAnimation);
  }
  
  /**
   * Run a demo scenario
   * @param {Object} scenario - Scenario configuration
   */
  async runScenario(scenario) {
    // Reset content
    this.resetContent();
    
    // Start typing typical notes with smoother timing
    await this.wait(300); // Small delay for visual flow
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
    
    // Animate voice waves while transcript is typing
    this.animateVoiceWaves();
    
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
          // Add character with smooth cursor effect
          const char = text.charAt(index);
          element.innerHTML += char;
          
          // Add typing cursor effect
          if (index === text.length - 1) {
            element.innerHTML += '<span class="typing-cursor">|</span>';
            setTimeout(() => {
              const cursor = element.querySelector('.typing-cursor');
              if (cursor) cursor.remove();
            }, 500);
          }
          
          index++;
          
          // Variable typing speed for more natural effect
          const nextDelay = speed + (Math.random() * 30 - 15);
          this.state.animationTimeouts.push(
            setTimeout(type, nextDelay)
          );
        } else {
          resolve();
        }
      };
      
      type();
    });
  }
  
  /**
   * Animate voice waves
   */
  animateVoiceWaves() {
    const waves = $$('.a-voice-wave');
    waves.forEach(wave => {
      addClass(wave, 'is-active');
    });
    
    // Stop animation after transcript is done
    setTimeout(() => {
      waves.forEach(wave => {
        removeClass(wave, 'is-active');
      });
    }, 5000);
  }
  
  /**
   * Generate documentation with animations
   * @param {Object} scenario - Scenario configuration
   */
  async generateDocumentation(scenario) {
    const doc = scenario.documentation;
    
    // Smooth transition from processing to content
    this.elements.processingIndicator.style.opacity = '0';
    setTimeout(() => {
      hide(this.elements.processingIndicator);
      addClass(this.elements.docContent, 'is-visible');
    }, 300);
    
    // Build documentation HTML
    const docElements = [];
    
    // Title
    docElements.push(
      createElement('h4', {
        classes: ['doc-title', 'a-doc-line'],
        text: doc.title
      })
    );
    
    // Sections
    doc.sections.forEach(section => {
      if (section.heading) {
        const header = createElement('h5', {
          classes: ['doc-section-header', 'a-doc-line'],
          text: section.heading
        });
        docElements.push(header);
        
        // Highlight section headers briefly
        setTimeout(() => {
          addClass(header, 'is-highlighted');
          setTimeout(() => {
            removeClass(header, 'is-highlighted');
          }, 1000);
        }, 500);
      }
      
      if (section.content) {
        docElements.push(
          createElement('p', {
            classes: ['doc-content', 'a-doc-line'],
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
              classes: ['doc-list-item', 'a-doc-line'],
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
    
    // Append elements with staggered animation
    for (let i = 0; i < docElements.length; i++) {
      const element = docElements[i];
      element.style.opacity = '0';
      element.style.transform = 'translateY(10px)';
      this.elements.docContent.appendChild(element);
      
      await this.wait(100); // Stagger each element
      
      requestAnimationFrame(() => {
        element.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      });
    }
    
    // Wait for animations to complete
    await this.wait(500);
  }
  
  /**
   * Show completion UI elements
   * @param {Object} scenario - Scenario configuration
   */
  showCompletionUI(scenario) {
    // Show information gain with smooth animation
    if (scenario.informationGain && this.elements.infoGain) {
      this.elements.infoGain.style.display = 'block';
      this.elements.infoGain.style.opacity = '0';
      
      requestAnimationFrame(() => {
        this.elements.infoGain.style.transition = 'opacity 0.6s ease-out';
        this.elements.infoGain.style.opacity = '1';
      });
      
      // Populate content with staggered items
      this.elements.infoGainContent.innerHTML = '';
      scenario.informationGain.forEach((item, index) => {
        setTimeout(() => {
          const p = createElement('p', {
            classes: ['info-gain-item'],
            text: item.description
          });
          p.style.opacity = '0';
          p.style.transform = 'translateX(-10px)';
          this.elements.infoGainContent.appendChild(p);
          
          requestAnimationFrame(() => {
            p.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
            p.style.opacity = '1';
            p.style.transform = 'translateX(0)';
          });
        }, index * 150);
      });
    }
    
    // Show sync indicators with improved animation
    if (this.elements.syncIndicators) {
      setTimeout(() => {
        addClass(this.elements.syncIndicators, 'is-visible');
        
        const syncCards = $$('.demo__sync-card', this.elements.syncIndicators);
        syncCards.forEach((card, index) => {
          setTimeout(() => {
            addClass(card, 'is-visible');
          }, index * 150);
        });
      }, 800);
    }
    
    // Show reset button
    if (this.elements.resetSection) {
      setTimeout(() => {
        addClass(this.elements.resetSection, 'is-visible');
      }, 1500);
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
    
    // Smooth transition back to initial state
    this.elements.splitViewSection.style.opacity = '0';
    
    setTimeout(() => {
      // Reset UI
      hide(this.elements.splitViewSection);
      removeClass(this.elements.splitViewSection, 'is-visible');
      
      this.elements.voiceInputSection.style.display = 'flex';
      this.elements.voiceInputSection.style.opacity = '0';
      this.elements.voiceInputSection.style.transform = 'scale(1.05)';
      
      requestAnimationFrame(() => {
        this.elements.voiceInputSection.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
        this.elements.voiceInputSection.style.opacity = '1';
        this.elements.voiceInputSection.style.transform = 'scale(1)';
      });
      
      // Reset content
      this.resetContent();
      
      // Reset visibility classes
      removeClass(this.elements.resetSection, 'is-visible');
      removeClass(this.elements.syncIndicators, 'is-visible');
      removeClass(this.elements.docContent, 'is-visible');
      
      if (this.elements.infoGain) {
        this.elements.infoGain.style.display = 'none';
      }
      
      // Reset sync cards
      const syncCards = $$('.demo__sync-card');
      syncCards.forEach(card => {
        removeClass(card, 'is-visible');
      });
      
      this.state.isRunning = false;
    }, 300);
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
      this.elements.docContent.style.opacity = '0';
    }
    if (this.elements.infoGainContent) {
      this.elements.infoGainContent.innerHTML = '';
    }
    
    this.elements.processingIndicator.style.display = 'block';
    this.elements.processingIndicator.style.opacity = '1';
  }
  
  /**
   * Animate ripple effect
   */
  animateRipple() {
    // Create a new ripple element for each click
    const ripple = createElement('span', {
      classes: ['btn__ripple-effect']
    });
    
    this.elements.micButton.appendChild(ripple);
    
    // Trigger animation
    requestAnimationFrame(() => {
      addClass(ripple, 'is-animating');
    });
    
    // Remove after animation
    setTimeout(() => {
      ripple.remove();
    }, 600);
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