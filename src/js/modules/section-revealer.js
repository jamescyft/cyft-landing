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

    // Sections are now visible by default, just ensure smooth animations
    requestAnimationFrame(() => {
      this.sections.forEach((section, index) => {
        // Ensure sections have proper transition for any future animations
        section.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
        // They should already be visible (opacity: 1) from CSS
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