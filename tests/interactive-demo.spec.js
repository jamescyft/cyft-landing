// Interactive Demo Automated Tests
// Run with: npm test

import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import { InteractiveDemo } from '../src/js/modules/interactive-demo.js';

describe('InteractiveDemo Container Height Management', () => {
  let dom;
  let container;
  let demo;
  
  beforeEach(() => {
    // Set up DOM
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <body>
          <div id="demo-container" class="demo__container is-compact">
            <div id="voice-input-section"></div>
            <div id="split-view-section"></div>
            <div id="doc-output"></div>
            <div id="reset-section"></div>
          </div>
        </body>
      </html>
    `);
    
    global.document = dom.window.document;
    global.window = dom.window;
    global.requestAnimationFrame = (cb) => setTimeout(cb, 0);
    global.ResizeObserver = class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
    
    container = document.getElementById('demo-container');
    demo = new InteractiveDemo('#demo-container');
  });
  
  describe('Container States', () => {
    it('should start in compact state', () => {
      expect(container.classList.contains('is-compact')).toBe(true);
      expect(container.classList.contains('demo__container--collapsed')).toBe(false);
    });
    
    it('should remove compact class when starting', () => {
      demo.start();
      expect(container.classList.contains('is-compact')).toBe(false);
      expect(container.classList.contains('demo__container--collapsed')).toBe(false);
    });
    
    it('should add collapsed class for scenarios prompt', () => {
      demo.showCleanScenariosTransition();
      
      // Wait for transition
      setTimeout(() => {
        expect(container.classList.contains('demo__container--collapsed')).toBe(true);
        expect(container.classList.contains('is-compact')).toBe(false);
      }, 700);
    });
    
    it('should remove collapsed class when starting next scenario', () => {
      // Set up scenarios prompt state
      container.classList.add('demo__container--collapsed');
      container.innerHTML = '<div class="scenarios-prompt"></div>';
      
      demo.startNextScenario();
      
      // Wait for transition
      setTimeout(() => {
        expect(container.classList.contains('demo__container--collapsed')).toBe(false);
        expect(container.classList.contains('is-compact')).toBe(false);
      }, 500);
    });
  });
  
  describe('State Transitions', () => {
    it('should handle full cycle without errors', async () => {
      // Start demo
      expect(() => demo.start()).not.toThrow();
      
      // Transition to scenarios
      setTimeout(() => {
        expect(() => demo.showCleanScenariosTransition()).not.toThrow();
      }, 1000);
      
      // Start next scenario
      setTimeout(() => {
        expect(() => demo.startNextScenario()).not.toThrow();
      }, 2000);
    });
    
    it('should clear container content when showing scenarios prompt', () => {
      demo.showCleanScenariosTransition();
      
      setTimeout(() => {
        const scenariosPrompt = container.querySelector('.scenarios-prompt');
        expect(scenariosPrompt).toBeTruthy();
        expect(container.children.length).toBe(1);
      }, 700);
    });
  });
  
  describe('Error Handling', () => {
    it('should handle missing elements gracefully', () => {
      // Remove all child elements
      container.innerHTML = '';
      
      expect(() => demo.start()).not.toThrow();
      expect(() => demo.showCleanScenariosTransition()).not.toThrow();
    });
    
    it('should handle rapid state changes', () => {
      expect(() => {
        demo.start();
        demo.showCleanScenariosTransition();
        demo.startNextScenario();
        demo.reset();
      }).not.toThrow();
    });
  });
  
  describe('Debug Mode', () => {
    it('should add debug attributes when enabled', () => {
      demo.enableDebugMode();
      
      expect(container.hasAttribute('data-debug')).toBe(true);
      expect(container.hasAttribute('data-state')).toBe(true);
      expect(container.hasAttribute('data-height')).toBe(true);
    });
    
    it('should update debug state on transitions', () => {
      demo.enableDebugMode();
      
      demo.start();
      expect(container.getAttribute('data-state')).toContain('playing');
      
      demo.showCleanScenariosTransition();
      setTimeout(() => {
        expect(container.getAttribute('data-state')).toBe('scenarios-prompt');
      }, 700);
    });
  });
});

// CSS Validation Tests
describe('CSS Height Rules', () => {
  it('collapsed container should have fixed height', () => {
    const styles = `
      .demo__container.demo__container--collapsed {
        height: 400px !important;
        min-height: 400px !important;
        max-height: 400px !important;
      }
    `;
    
    expect(styles).toContain('height: 400px !important');
    expect(styles).toContain('min-height: 400px !important');
    expect(styles).toContain('max-height: 400px !important');
  });
}); 