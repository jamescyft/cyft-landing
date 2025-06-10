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

    // Sections start visible to prevent blank page flash
    // Just enhance them with smooth transitions for future animations
    requestAnimationFrame(() => {
      this.sections.forEach((section, index) => {
        // Ensure sections are definitely visible (defensive coding)
        section.style.opacity = '1';
        section.style.transform = 'none';
        // Add smooth transitions for any future animations
        section.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
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