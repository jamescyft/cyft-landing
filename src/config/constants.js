/**
 * Application Constants
 * All magic numbers and hardcoded values must live here
 * This is the single source of truth for all configuration
 */

export const APP_CONFIG = {
  name: 'Cyft',
  tagline: 'The End of Human APIs',
  description: 'Cyft automates documentation for MSPs. Stop spending 90 minutes a day on manual data entry.',
  url: 'https://cyft.com',
  version: '1.0.0'
};

export const ANIMATION_TIMING = {
  fadeIn: 800, // 0.8s
  whisperIn: 2000, // 2s
  wordReveal: 1200, // 1.2s
  truthRevealDelays: [2000, 2200, 2400], // 2s, 2.2s, 2.4s
  docLineAppear: 400, // 0.4s
  luxuryReveal: 800, // 0.8s
  lineStagger: 120, // 120ms between lines
  groupDelay: 100, // 100ms between groups
  successPulse: 1500 // 1.5s
};

export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1440,
  wide: 1920
};

export const COLORS = {
  primary: {
    black: '#000000',
    deepBlack: '#0A0A0A',
    white: '#FAFAFA',
    pureWhite: '#FFFFFF'
  },
  text: {
    primary: '#000000',
    secondary: '#333333',
    muted: '#666666',
    light: '#999999',
    whisper: '#B0B0B0'
  },
  accent: {
    success: '#4CAF50',
    error: '#F44336',
    warning: '#FF6B35',
    info: '#0052CC'
  },
  background: {
    primary: '#FAFAFA',
    secondary: '#F5F5F5',
    tertiary: '#F9F9F9',
    white: '#FFFFFF'
  }
};

export const TYPOGRAPHY = {
  fontStack: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  displayFontStack: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  weights: {
    thin: 100,
    light: 300,
    regular: 400,
    semibold: 600,
    bold: 700,
    black: 900
  },
  sizes: {
    hero: 'clamp(3rem, 8vw, 7rem)',
    heroMobile: 'clamp(2.5rem, 6vw, 4.5rem)',
    statement: 'clamp(1.5rem, 3vw, 2.5rem)',
    body: 'clamp(1.1rem, 1.5vw, 1.4rem)',
    small: '0.9rem'
  },
  lineHeights: {
    tight: 0.9,
    heading: 1.1,
    body: 1.6,
    relaxed: 2
  },
  letterSpacing: {
    tight: '-0.04em',
    normal: '-0.02em',
    relaxed: '-0.01em',
    wide: '0.05em',
    wider: '0.1em'
  }
};

export const SPACING = {
  // Using a consistent 8px grid system
  xs: '0.5rem', // 8px
  sm: '1rem', // 16px
  md: '1.5rem', // 24px
  lg: '2rem', // 32px
  xl: '3rem', // 48px
  xxl: '4rem', // 64px
  xxxl: '6rem', // 96px,
  section: '10vh',
  sectionMobile: '8vh'
};

export const SHADOWS = {
  subtle: '0 2px 10px rgba(0, 0, 0, 0.05)',
  medium: '0 2px 20px rgba(0, 0, 0, 0.05)',
  strong: '0 10px 60px rgba(0, 0, 0, 0.1)',
  success: '0 2px 10px rgba(76, 175, 80, 0.1)'
};

export const BORDERS = {
  thin: '1px solid',
  medium: '2px solid',
  thick: '3px solid',
  dashed: '2px dashed',
  radius: {
    small: '8px',
    medium: '12px',
    large: '16px',
    circle: '50%'
  }
};

export const Z_INDEX = {
  base: 0,
  dropdown: 100,
  sticky: 200,
  fixed: 300,
  modalBackdrop: 400,
  modal: 500,
  popover: 600,
  tooltip: 700,
  notification: 800,
  critical: 999
};

export const TRANSITIONS = {
  fast: '0.2s ease',
  default: '0.3s ease',
  slow: '0.6s ease',
  bounce: '0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  smooth: '0.8s cubic-bezier(0.16, 1, 0.3, 1)',
  spring: '1.2s cubic-bezier(0.19, 1, 0.22, 1)'
};

export const ACCESSIBILITY = {
  focusOutline: '2px solid',
  focusOffset: '2px',
  minTouchTarget: '44px',
  skipLinkZIndex: 999
};

export const PERFORMANCE = {
  intersectionThreshold: 0.1,
  intersectionRootMargin: '0px 0px -100px 0px',
  debounceDelay: 300,
  throttleDelay: 150,
  maxAnimationElements: 50
};

export const FORM_VALIDATION = {
  patterns: {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    name: /^[a-zA-Z\s]{2,50}$/,
    company: /^[a-zA-Z0-9\s&.,'-]{2,100}$/,
    techs: /^[1-9]\d{0,4}$/
  },
  messages: {
    email: 'Please enter a valid email address',
    name: 'Name must be 2-50 characters',
    company: 'Company name must be 2-100 characters',
    techs: 'Number of technicians must be between 1 and 99999'
  }
};

export const META_TAGS = {
  ogImage: 'https://cyft.com/og-image.jpg',
  twitterImage: 'https://cyft.com/twitter-image.jpg',
  favicon: {
    ico: '/favicon.ico',
    png32: '/favicon-32x32.png',
    png16: '/favicon-16x16.png'
  }
};

export const ERROR_MESSAGES = {
  generic: 'An error occurred. Please try again.',
  network: 'Network error. Please check your connection.',
  formSubmission: 'Failed to submit form. Please try again.',
  demoLoad: 'Failed to load demo. Please refresh the page.'
};

export const DEMO_CONFIG = {
  typingSpeed: {
    typical: 50,
    transcript: 25
  },
  delays: {
    beforeTypical: 500,
    beforeTranscript: 1000,
    beforeDocumentation: 800,
    betweenSections: 200,
    betweenItems: 100,
    syncIndicators: 200,
    formSubmitMock: 1500
  },
  maxVisibleTickets: 450 // Visual representation, not actual count
};

export const TIMEOUTS = {
  formSubmitMock: 1500,
  highlightRemoval: 1500,
  documentationComplete: 500,
  elementWait: 5000
};

export const ANIMATION_DELAYS = {
  // Base delay values in milliseconds
  values: [
    0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000,
    1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000,
    2200, 2400
  ],
  
  // CSS custom property mapping
  cssVariables: {
    '--delay-0': '0ms',
    '--delay-100': '100ms',
    '--delay-200': '200ms',
    '--delay-300': '300ms',
    '--delay-400': '400ms',
    '--delay-500': '500ms',
    '--delay-600': '600ms',
    '--delay-700': '700ms',
    '--delay-800': '800ms',
    '--delay-900': '900ms',
    '--delay-1000': '1000ms',
    '--delay-1100': '1100ms',
    '--delay-1200': '1200ms',
    '--delay-1300': '1300ms',
    '--delay-1400': '1400ms',
    '--delay-1500': '1500ms',
    '--delay-1600': '1600ms',
    '--delay-1700': '1700ms',
    '--delay-1800': '1800ms',
    '--delay-1900': '1900ms',
    '--delay-2000': '2000ms',
    '--delay-2200': '2200ms',
    '--delay-2400': '2400ms'
  },
  
  // Helper to get nearest delay value
  getNearestDelay: (ms) => {
    return ANIMATION_DELAYS.values.reduce((prev, curr) => {
      return Math.abs(curr - ms) < Math.abs(prev - ms) ? curr : prev;
    });
  },
  
  // Helper to get CSS class name
  getDelayClass: (ms) => {
    const nearest = ANIMATION_DELAYS.getNearestDelay(ms);
    return `a-delay-${nearest}`;
  }
};

export const METADATA_SCALES = {
  // Information density: ratio of structured doc length to typical notes
  informationDensity: {
    min: 1.0,  // Same amount of info
    low: 2.5,  // 2.5x more info
    medium: 4.0, // 4x more info 
    high: 6.0, // 6x more info
    max: 10.0, // 10x more info
    description: 'Ratio of final documentation length to typical notes length'
  },
  
  // Completeness score: percentage of required fields captured
  completenessScore: {
    min: 0.0,  // 0% complete
    poor: 0.5, // 50% complete
    good: 0.8, // 80% complete
    excellent: 0.95, // 95% complete
    perfect: 1.0, // 100% complete
    description: 'Percentage of required documentation fields successfully captured'
  }
}; 