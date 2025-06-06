/**
 * Tests for Constants
 * Ensuring our centralized configuration works correctly
 */

import { describe, it, expect } from 'vitest';
import { ANIMATION_DELAYS, METADATA_SCALES } from '../src/config/constants.js';

describe('ANIMATION_DELAYS', () => {
  describe('getNearestDelay', () => {
    it('should return exact match when delay exists', () => {
      expect(ANIMATION_DELAYS.getNearestDelay(500)).toBe(500);
      expect(ANIMATION_DELAYS.getNearestDelay(1000)).toBe(1000);
      expect(ANIMATION_DELAYS.getNearestDelay(2400)).toBe(2400);
    });

    it('should return nearest value when exact match not found', () => {
      expect(ANIMATION_DELAYS.getNearestDelay(450)).toBe(400);
      expect(ANIMATION_DELAYS.getNearestDelay(550)).toBe(500);
      expect(ANIMATION_DELAYS.getNearestDelay(1750)).toBe(1700);
    });

    it('should handle edge cases', () => {
      expect(ANIMATION_DELAYS.getNearestDelay(-100)).toBe(0);
      expect(ANIMATION_DELAYS.getNearestDelay(3000)).toBe(2400);
    });
  });

  describe('getDelayClass', () => {
    it('should return correct CSS class name', () => {
      expect(ANIMATION_DELAYS.getDelayClass(500)).toBe('a-delay-500');
      expect(ANIMATION_DELAYS.getDelayClass(1200)).toBe('a-delay-1200');
    });

    it('should handle non-exact values', () => {
      expect(ANIMATION_DELAYS.getDelayClass(750)).toBe('a-delay-700');
      expect(ANIMATION_DELAYS.getDelayClass(1950)).toBe('a-delay-1900');
    });
  });

  describe('CSS Variables', () => {
    it('should have matching CSS variables for all delay values', () => {
      ANIMATION_DELAYS.values.forEach(delay => {
        const cssVar = `--delay-${delay}`;
        expect(ANIMATION_DELAYS.cssVariables[cssVar]).toBe(`${delay}ms`);
      });
    });

    it('should have correct number of CSS variables', () => {
      const cssVarCount = Object.keys(ANIMATION_DELAYS.cssVariables).length;
      expect(cssVarCount).toBe(ANIMATION_DELAYS.values.length);
    });
  });
});

describe('METADATA_SCALES', () => {
  describe('informationDensity', () => {
    it('should have proper scale values', () => {
      const { informationDensity } = METADATA_SCALES;
      expect(informationDensity.min).toBeLessThan(informationDensity.low);
      expect(informationDensity.low).toBeLessThan(informationDensity.medium);
      expect(informationDensity.medium).toBeLessThan(informationDensity.high);
      expect(informationDensity.high).toBeLessThan(informationDensity.max);
    });

    it('should have documentation', () => {
      expect(METADATA_SCALES.informationDensity.description).toBeTruthy();
      expect(typeof METADATA_SCALES.informationDensity.description).toBe('string');
    });
  });

  describe('completenessScore', () => {
    it('should be normalized between 0 and 1', () => {
      const { completenessScore } = METADATA_SCALES;
      expect(completenessScore.min).toBe(0);
      expect(completenessScore.perfect).toBe(1);
      
      // All values should be between 0 and 1
      Object.values(completenessScore).forEach(value => {
        if (typeof value === 'number') {
          expect(value).toBeGreaterThanOrEqual(0);
          expect(value).toBeLessThanOrEqual(1);
        }
      });
    });

    it('should have documentation', () => {
      expect(METADATA_SCALES.completenessScore.description).toBeTruthy();
      expect(typeof METADATA_SCALES.completenessScore.description).toBe('string');
    });
  });
}); 