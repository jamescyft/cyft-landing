/**
 * Section Revealer Module
 * Reveals sections without ANY flash - my OCD demands perfection!
 */

export class SectionRevealer {
  constructor() {
    this.sections = [];
    this.isRevealing = false;
  }

  init() {
    // Get all hidden sections
    this.sections = Array.from(document.querySelectorAll('.section:not(.section--hero)'));
    
    // Reveal sections immediately on load to prevent flash
    this.revealSections();
  }

  revealSections() {
    if (this.isRevealing) return;
    this.isRevealing = true;

    // Use RAF for smooth reveal
    requestAnimationFrame(() => {
      this.sections.forEach((section, index) => {
        // Add a tiny stagger for smoothness
        setTimeout(() => {
          section.style.opacity = '1';
          section.style.transition = 'opacity 0.3s ease-out';
        }, index * 50); // 50ms stagger
      });
    });
  }

  destroy() {
    this.sections = [];
    this.isRevealing = false;
  }
}

export const createSectionRevealer = () => {
  const revealer = new SectionRevealer();
  revealer.init();
  return revealer;
}; 