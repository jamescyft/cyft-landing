/**
 * Interactive Demo - Refined Narrative Implementation
 * Smooth transitions, natural flow, elegant reveals
 */

import { DEMO_SCENARIOS } from '../../config/scenarios.js';

export class InteractiveDemo {
  constructor(containerId) {
    this.container = document.querySelector(containerId);
    if (!this.container) return;
    
    this.state = {
      isRunning: false,
      currentScenarioIndex: 0
    };
    
    this.elements = {
      micButton: document.querySelector('#mic-button'),
      voiceSection: document.querySelector('#voice-input-section'),
      splitView: document.querySelector('#split-view-section'),
      typingContent: document.querySelector('#typical-notes'),
      speechContent: document.querySelector('#transcript-text'),
      voiceBars: document.querySelectorAll('.voice-bar'),
      processingArea: document.querySelector('.demo__processing'),
      docOutput: document.querySelector('#doc-output'),
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
    
    // Smooth fade out of voice section
    this.elements.voiceSection.style.transition = 'opacity 0.4s ease-out';
    this.elements.voiceSection.style.opacity = '0';
    
    setTimeout(() => {
      this.elements.voiceSection.style.display = 'none';
      this.elements.splitView.classList.add('is-visible');
      
      // Start the narrative after split view is visible
      setTimeout(() => {
        this.runNarrative(scenario);
      }, 400);
    }, 400);
  }
  
  async runNarrative(scenario) {
    // Hide processing text during typing phase
    this.elements.processingArea.style.opacity = '0';
    
    // Act 1: Manual typing (simplified without timer)
    await this.actOne_ManualTyping(scenario);
    
    // Smooth transition pause
    await this.wait(800);
    
    // Act 2: Natural speech
    await this.actTwo_NaturalSpeech(scenario);
    
    // Processing pause
    await this.wait(600);
    
    // Act 3: AI understanding
    await this.actThree_Understanding(scenario);
    
    // Show reset after completion
    setTimeout(() => {
      this.elements.resetSection.classList.add('is-visible');
    }, 1000);
    
    this.state.isRunning = false;
  }
  
  /**
   * Act 1: Manual Typing - Show the old way (no timer, just typing)
   */
  async actOne_ManualTyping(scenario) {
    const text = scenario.typicalNotes;
    const words = text.split(' ');
    this.elements.typingContent.innerHTML = '<span class="demo__cursor">|</span>';
    
    // Type each word with natural variation
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      
      // Type the word
      for (let char of word) {
        this.addCharacter(char);
        await this.wait(70 + Math.random() * 30);
      }
      
      // Add space between words
      if (i < words.length - 1) {
        this.addCharacter(' ');
        await this.wait(100);
      }
    }
    
    // Remove cursor after typing completes
    await this.wait(500);
    this.elements.typingContent.innerHTML = text;
  }
  
  addCharacter(char) {
    const content = this.elements.typingContent.innerHTML.replace(/<span class="demo__cursor">.*<\/span>/, '');
    this.elements.typingContent.innerHTML = content + char + '<span class="demo__cursor">|</span>';
  }
  
  /**
   * Act 2: Natural Speech - Show how people actually talk
   */
  async actTwo_NaturalSpeech(scenario) {
    // Show "Listening..." text when speech starts
    this.elements.processingArea.style.opacity = '1';
    this.elements.processingArea.querySelector('.demo__processing-text').textContent = 'Listening...';
    
    // Activate voice bars smoothly
    this.elements.voiceBars.forEach((bar, index) => {
      setTimeout(() => {
        bar.classList.add('is-active');
      }, index * 50);
    });
    
    const text = scenario.naturalSpeech;
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    this.elements.speechContent.innerHTML = '';
    
    // Speak each sentence with natural flow
    for (let sentence of sentences) {
      const words = sentence.trim().split(' ');
      
      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        
        // Create word element with proper spacing
        const wordEl = document.createElement('span');
        wordEl.className = 'flow-word';
        wordEl.textContent = word;
        wordEl.style.animationDelay = `${i * 0.05}s`;
        
        this.elements.speechContent.appendChild(wordEl);
        
        // Natural speech timing
        const delay = this.getSpeechDelay(word);
        await this.wait(delay);
      }
      
      // Pause between sentences
      await this.wait(300);
    }
    
    // Deactivate voice bars smoothly
    await this.wait(400);
    this.elements.voiceBars.forEach((bar, index) => {
      setTimeout(() => {
        bar.classList.remove('is-active');
      }, index * 50);
    });
  }
  
  getSpeechDelay(word) {
    // Natural pauses based on punctuation and word length
    if (word.includes('.') || word.includes('!') || word.includes('?')) {
      return 200;
    } else if (word.includes(',') || word.includes(':')) {
      return 150;
    } else if (word.length > 7) {
      return 120;
    } else {
      return 80;
    }
  }
  
  /**
   * Act 3: AI Understanding - Show Cyft's intelligence
   */
  async actThree_Understanding(scenario) {
    // Show and update processing text
    this.elements.processingArea.querySelector('.demo__processing-text').textContent = 'Understanding context...';
    
    // Simple processing animation
    await this.wait(1500);
    
    // Update to generating
    this.elements.processingArea.querySelector('.demo__processing-text').textContent = 'Generating documentation...';
    
    await this.wait(1000);
    
    // Hide processing text before revealing documentation
    this.elements.processingArea.style.opacity = '0';
    
    await this.wait(300);
    
    // Reveal documentation elegantly
    await this.revealDocumentation(scenario);
  }
  
  /**
   * Create mind map visualization
   */
  async createMindMap(scenario) {
    // Create container
    const container = document.createElement('div');
    container.className = 'demo__mindmap';
    
    // Create SVG
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'mindmap-svg');
    svg.setAttribute('viewBox', '0 0 400 320');
    
    // Define nodes based on scenario
    const nodes = this.generateMindMapNodes(scenario);
    
    // Create connections first (so they appear behind nodes)
    nodes.forEach((node, i) => {
      if (node.connections) {
        node.connections.forEach((targetIndex, j) => {
          const target = nodes[targetIndex];
          const path = this.createConnection(node, target, i * 200 + j * 100);
          svg.appendChild(path);
        });
      }
    });
    
    // Create center node first
    const centerNode = nodes.find(n => n.type === 'center');
    if (centerNode) {
      const nodeGroup = this.createNode(centerNode, 0);
      svg.appendChild(nodeGroup);
    }
    
    // Create peripheral nodes with staggered timing
    nodes.filter(n => n.type !== 'center').forEach((node, i) => {
      const nodeGroup = this.createNode(node, 300 + i * 200);
      svg.appendChild(nodeGroup);
    });
    
    container.appendChild(svg);
    
    // Insert after processing text
    this.elements.processingArea.after(container);
    
    // Trigger visibility
    await this.wait(100);
    container.classList.add('is-visible');
  }
  
  /**
   * Generate mind map nodes based on scenario
   */
  generateMindMapNodes(scenario) {
    const speech = scenario.naturalSpeech.toLowerCase();
    const nodes = [];
    
    // Center node - always present
    nodes.push({
      x: 200,
      y: 160,
      text: 'CONTEXT',
      type: 'center',
      connections: []
    });
    
    // Calculate positions in a circle around center
    const radius = 100;
    const centerX = 200;
    const centerY = 160;
    let peripheralNodes = [];
    
    // Dynamic peripheral nodes based on content
    if (speech.includes('password') || speech.includes('reset')) {
      peripheralNodes.push({ text: 'Security' });
    }
    
    if (speech.includes('user') || speech.includes('account')) {
      peripheralNodes.push({ text: 'User' });
    }
    
    if (speech.includes('locked') || speech.includes('failed')) {
      peripheralNodes.push({ text: 'Issue' });
    }
    
    if (speech.includes('active directory') || speech.includes('ad')) {
      peripheralNodes.push({ text: 'System' });
    }
    
    // Always add ticket and action nodes
    peripheralNodes.push({ text: 'Ticket' });
    peripheralNodes.push({ text: 'Action' });
    
    // Position peripheral nodes in a circle
    peripheralNodes.forEach((node, i) => {
      const angle = (2 * Math.PI * i) / peripheralNodes.length - Math.PI / 2;
      nodes.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        text: node.text,
        type: 'peripheral'
      });
      nodes[0].connections.push(nodes.length - 1);
    });
    
    return nodes;
  }
  
  /**
   * Create SVG connection line with curve
   */
  createConnection(start, end, delay) {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    
    // Create a slight curve for more organic feel
    const mx = (start.x + end.x) / 2;
    const my = (start.y + end.y) / 2;
    const curve = 10;
    
    const d = `M ${start.x} ${start.y} Q ${mx} ${my - curve} ${end.x} ${end.y}`;
    path.setAttribute('d', d);
    path.setAttribute('class', 'mindmap-connection');
    path.style.animationDelay = `${delay}ms`;
    return path;
  }
  
  /**
   * Create SVG node
   */
  createNode(node, delay) {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', `mindmap-node mindmap-${node.type}-node`);
    g.style.animationDelay = `${delay}ms`;
    
    // Create circle
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', node.x);
    circle.setAttribute('cy', node.y);
    circle.setAttribute('r', node.type === 'center' ? '10' : '6');
    circle.setAttribute('class', 'mindmap-node-circle');
    
    // Create pulse effect for center node
    if (node.type === 'center') {
      const pulse = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      pulse.setAttribute('cx', node.x);
      pulse.setAttribute('cy', node.y);
      pulse.setAttribute('r', '10');
      pulse.setAttribute('class', 'mindmap-node-pulse');
      g.appendChild(pulse);
    }
    
    g.appendChild(circle);
    
    // Create text
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', node.x);
    text.setAttribute('y', node.type === 'center' ? node.y : node.y);
    text.setAttribute('class', 'mindmap-node-text');
    text.textContent = node.text;
    g.appendChild(text);
    
    return g;
  }
  
  generateThoughts(scenario) {
    // Remove old thought generation - no longer needed
    return [];
  }
  
  async revealDocumentation(scenario) {
    const doc = scenario.documentation;
    
    // Build horizontal grid documentation HTML
    let html = '';
    
    // Group sections by type for better horizontal layout
    const sectionGroups = {
      issue: null,
      resolution: null,
      actions: [],
      internal: null,
      details: null
    };
    
    // Categorize sections
    doc.sections.forEach(section => {
      if (section.type === 'status') return; // Skip status
      
      if (section.type === 'resolution-notes') {
        sectionGroups.resolution = section;
      } else if (section.type === 'internal-notes') {
        sectionGroups.internal = section;
      } else if (section.type === 'details') {
        sectionGroups.details = section;
      } else if (section.heading && section.heading.toLowerCase().includes('issue')) {
        sectionGroups.issue = section;
      } else {
        sectionGroups.actions.push(section);
      }
    });
    
    // Build issue summary card
    if (sectionGroups.issue || doc.title) {
      html += '<div class="doc-section" data-type="issue-summary">';
      html += '<h4>Issue Summary</h4>';
      if (doc.title) {
        html += `<p><strong>${doc.title}</strong></p>`;
      }
      if (sectionGroups.issue && sectionGroups.issue.content) {
        html += `<p>${sectionGroups.issue.content}</p>`;
      }
      html += '</div>';
    }
    
    // Build resolution card
    if (sectionGroups.resolution) {
      html += '<div class="doc-section" data-type="resolution-notes">';
      html += `<h4>${sectionGroups.resolution.heading || 'Resolution'}</h4>`;
      if (sectionGroups.resolution.content) {
        html += `<p>${sectionGroups.resolution.content}</p>`;
      }
      html += '</div>';
    }
    
    // Build actions taken card
    if (sectionGroups.actions.length > 0 || sectionGroups.internal) {
      html += '<div class="doc-section" data-type="actions-taken">';
      html += '<h4>Actions Taken</h4>';
      
      // Combine all action items
      const allItems = [];
      sectionGroups.actions.forEach(section => {
        if (section.items) {
          allItems.push(...section.items);
        }
      });
      
      if (allItems.length > 0) {
        html += '<ul>';
        allItems.forEach(item => {
          html += `<li>${item}</li>`;
        });
        html += '</ul>';
      }
      
      // Add internal notes if present
      if (sectionGroups.internal && sectionGroups.internal.content) {
        html += `<p style="margin-top: 12px; font-size: 13px; color: #666;">${sectionGroups.internal.content}</p>`;
      }
      html += '</div>';
    }
    
    // Build details card (spans full width)
    if (sectionGroups.details) {
      html += '<div class="doc-section" data-type="details">';
      html += `<h4>${sectionGroups.details.heading || 'Ticket Details'}</h4>`;
      if (sectionGroups.details.items) {
        html += '<div style="display: flex; gap: 30px; flex-wrap: wrap;">';
        sectionGroups.details.items.forEach(item => {
          html += `<div style="flex: 1; min-width: 150px;"><strong style="color: #666; font-size: 12px;">${item.split(':')[0]}:</strong><br>${item.split(':')[1] || ''}</div>`;
        });
        html += '</div>';
      }
      html += '</div>';
    }
    
    this.elements.docContent.innerHTML = html;
    
    // Reveal documentation with smooth animation
    await this.wait(300);
    this.elements.docOutput.classList.add('is-visible');
  }
  
  reset() {
    // Update scenario
    this.state.currentScenarioIndex = (this.state.currentScenarioIndex + 1) % DEMO_SCENARIOS.length;
    
    // Smooth transition out
    this.elements.splitView.style.transition = 'opacity 0.4s ease-out';
    this.elements.splitView.style.opacity = '0';
    
    setTimeout(() => {
      // Reset UI state
      this.elements.splitView.classList.remove('is-visible');
      this.elements.splitView.style.opacity = '';
      this.elements.docOutput.classList.remove('is-visible');
      this.elements.resetSection.classList.remove('is-visible');
      
      // Clear content
      this.elements.typingContent.innerHTML = '<span class="demo__cursor">|</span>';
      this.elements.speechContent.innerHTML = '';
      this.elements.docContent.innerHTML = '';
      
      // Reset processing area
      this.elements.processingArea.style.display = '';
      this.elements.processingArea.classList.remove('is-hidden');
      this.elements.processingArea.querySelector('.demo__processing-text').textContent = 'Listening...';
      
      // Show voice section with fade in
      this.elements.voiceSection.style.display = 'flex';
      this.elements.voiceSection.style.opacity = '0';
      
      requestAnimationFrame(() => {
        this.elements.voiceSection.style.transition = 'opacity 0.4s ease-out';
        this.elements.voiceSection.style.opacity = '1';
      });
    }, 400);
  }
  
  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Export factory function
export const createInteractiveDemo = (containerId) => {
  return new InteractiveDemo(containerId);
}; 