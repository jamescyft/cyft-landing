/**
 * Interactive Demo - Ticket Closure Workflow
 * Hyper-realistic demonstration of technician closing out completed work
 * Shows deep contextual awareness and intelligent PSA integration
 */

import { DEMO_SCENARIOS } from '../../config/scenarios.js';

export class InteractiveDemo {
  constructor(containerId) {
    this.container = document.querySelector(containerId);
    if (!this.container) return;
    
    // Add compact class initially
    this.container.classList.add('is-compact');
    
    this.state = {
      isRunning: false,
      currentScenarioIndex: 0,
      currentFeature: 0
    };
    
    // Ticket Closure Features - What actually happens when closing tickets
    this.ticketClosureFeatures = [
      // Critical Path: 7-8 min saved
      { 
        id: 'timer-analysis', 
        name: 'Smart Time Analysis', 
        description: 'Automatic work timer calculation and breakdown', 
        timeSaved: '1.5 min',
        category: 'time-intelligence',
        psaAction: 'Time entries auto-calculated'
      },
      { 
        id: 'technical-extraction', 
        name: 'Technical Details Capture', 
        description: 'Hardware specs, error codes, configurations extracted', 
        timeSaved: '2 min',
        category: 'technical-intelligence',
        psaAction: 'Asset records updated'
      },
      { 
        id: 'client-communication', 
        name: 'Client-Facing Summary', 
        description: 'Professional resolution notes auto-generated', 
        timeSaved: '1.5 min',
        category: 'communication',
        psaAction: 'Portal update ready'
      },
      { 
        id: 'billing-optimization', 
        name: 'Billing Intelligence', 
        description: 'Proper rates, emergency time, justification captured', 
        timeSaved: '1 min',
        category: 'revenue-recovery',
        psaAction: 'Billing optimized'
      },
      { 
        id: 'compliance-notes', 
        name: 'Internal Documentation', 
        description: 'Detailed technical notes with compliance details', 
        timeSaved: '2 min',
        category: 'documentation',
        psaAction: 'Audit trail complete'
      },
      // Business Intelligence: 3-4 min saved
      { 
        id: 'relationship-mapping', 
        name: 'Relationship Context', 
        description: 'Client contacts, preferences, relationship notes', 
        timeSaved: '0.5 min',
        category: 'relationship-intelligence',
        psaAction: 'CRM updated'
      },
      { 
        id: 'upsell-identification', 
        name: 'Opportunity Detection', 
        description: 'Infrastructure gaps, training needs, project opportunities', 
        timeSaved: '1 min',
        category: 'business-development',
        psaAction: 'Sales pipeline updated'
      },
      { 
        id: 'follow-up-automation', 
        name: 'Follow-up Creation', 
        description: 'Preventive maintenance tasks, check-ins scheduled', 
        timeSaved: '0.5 min',
        category: 'automation',
        psaAction: 'Tasks auto-created'
      },
      { 
        id: 'knowledge-capture', 
        name: 'Knowledge Base Update', 
        description: 'Solution patterns, troubleshooting steps documented', 
        timeSaved: '1 min',
        category: 'knowledge-management',
        psaAction: 'KB articles suggested'
      },
      { 
        id: 'psa-integration', 
        name: 'Complete PSA Sync', 
        description: 'All systems updated, ticket closed with full context', 
        timeSaved: '1 min',
        category: 'system-integration',
        psaAction: 'Multi-system sync complete'
      }
    ];
    
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
      resetButton: document.querySelector('#reset-demo'),
      understandingColumn: document.querySelector('.demo__understanding-column')
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
    
    // First, expand the container smoothly
    this.container.classList.remove('is-compact');
    
    // Add a subtle pulse to the mic button
    this.elements.micButton.classList.add('is-active');
    
    // Wait for expansion animation to complete
    setTimeout(() => {
      // Remove pulse effect
      this.elements.micButton.classList.remove('is-active');
      
      // Smooth transition to workflow
      this.elements.voiceSection.style.transition = 'opacity 0.4s ease-out';
      this.elements.voiceSection.style.opacity = '0';
      
      setTimeout(() => {
        this.elements.voiceSection.style.display = 'none';
        this.elements.splitView.classList.add('is-visible');
        
        setTimeout(() => {
          this.runTicketClosureWorkflow(scenario);
        }, 400);
      }, 400);
    }, 600); // Wait for container expansion
  }
  
  async runTicketClosureWorkflow(scenario) {
    // Phase 1: The rushed typing (what they actually do)
    await this.showRushedTyping(scenario);
    
    await this.wait(600);
    
    // Phase 2: Natural debrief (speaking while tired after work)
    await this.showNaturalDebrief(scenario);
    
    await this.wait(500);
    
    // Phase 3: Intelligent processing and PSA integration
    await this.showIntelligentProcessing(scenario);
    
    // Phase 4: Complete ticket closure
    await this.showCompleteTicketClosure(scenario);
    
    // Show reset option
    setTimeout(() => {
      this.elements.resetSection.classList.add('is-visible');
    }, 1000);
    
    this.state.isRunning = false;
  }
  
  /**
   * Phase 1: Show the rushed typing technicians actually do
   */
  async showRushedTyping(scenario) {
    this.elements.processingArea.style.opacity = '0';
    
    const text = scenario.typicalNotes;
    this.elements.typingContent.innerHTML = '<span class="demo__cursor">|</span>';
    
    // Realistic rushed typing with mistakes
    const words = text.split(' ');
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      
      // Occasional typo and correction to show realism
      if (Math.random() < 0.15 && word.length > 4) {
        // Type with typo first
        const typoWord = word.substring(0, word.length - 2) + word.charAt(word.length - 1) + word.charAt(word.length - 2);
        for (const char of typoWord) {
          this.addCharacter(char);
          await this.wait(45 + Math.random() * 25);
        }
        
        // Pause, realize mistake
        await this.wait(200);
        
        // Backspace to fix
        for (let j = 0; j < typoWord.length; j++) {
          this.removeCharacter();
          await this.wait(30);
        }
        
        // Type correctly
        for (const char of word) {
          this.addCharacter(char);
          await this.wait(55 + Math.random() * 20);
        }
      } else {
        // Normal typing
      for (const char of word) {
        this.addCharacter(char);
          await this.wait(50 + Math.random() * 30);
        }
      }
      
      if (i < words.length - 1) {
        this.addCharacter(' ');
        await this.wait(80);
      }
    }
    
    await this.wait(400);
    this.elements.typingContent.innerHTML = text;
  }
  
  addCharacter(char) {
    const content = this.elements.typingContent.innerHTML.replace(/<span class="demo__cursor">.*<\/span>/, '');
    this.elements.typingContent.innerHTML = content + char + '<span class="demo__cursor">|</span>';
  }
  
  removeCharacter() {
    const content = this.elements.typingContent.innerHTML.replace(/<span class="demo__cursor">.*<\/span>/, '');
    this.elements.typingContent.innerHTML = content.slice(0, -1) + '<span class="demo__cursor">|</span>';
  }
  
  /**
   * Phase 2: Natural debrief - tired technician explaining what actually happened
   */
  async showNaturalDebrief(scenario) {
    // Show Cyft listening
    this.elements.processingArea.style.opacity = '1';
    this.elements.processingArea.querySelector('.demo__processing-text').textContent = 'Cyft listening to debrief...';
    
    // Voice activation
    this.elements.voiceBars.forEach((bar, index) => {
      setTimeout(() => bar.classList.add('is-active'), index * 50);
    });
    
    // Create intelligent analysis tracker
    this.createIntelligentTracker();
    
    const text = scenario.naturalSpeech;
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    this.elements.speechContent.innerHTML = '';
    
    let insightIndex = 0;
    
    // Stream the debrief with contextual insights
    for (let sentenceIndex = 0; sentenceIndex < sentences.length; sentenceIndex++) {
      const sentence = sentences[sentenceIndex];
      const words = sentence.trim().split(' ');
      
      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        
        const wordEl = document.createElement('span');
        wordEl.className = 'flow-word';
        wordEl.textContent = word;
        wordEl.style.animationDelay = `${i * 0.04}s`;
        
        this.elements.speechContent.appendChild(wordEl);
        
        await this.wait(this.getNaturalDelay(word));
      }
      
      // Trigger contextual insights at key moments
      if (scenario.contextualInsights && insightIndex < scenario.contextualInsights.length) {
        const insight = scenario.contextualInsights[insightIndex];
        if (sentenceIndex >= parseInt(insight.timing.replace('s', '')) / 10) {
          await this.triggerContextualInsight(insight, insightIndex);
          insightIndex++;
        }
      }
      
      await this.wait(250);
    }
    
    // Voice deactivation
    await this.wait(300);
    this.elements.voiceBars.forEach((bar, index) => {
      setTimeout(() => bar.classList.remove('is-active'), index * 50);
    });
  }
  
  getNaturalDelay(word) {
    // Realistic speech patterns for tired technician
    if (word.includes('.') || word.includes('!') || word.includes('?')) {
      return 180;
    } else if (word.includes(',')) {
      return 120;
    } else if (word.length > 8) {
      return 100;
    } else {
      return 70;
    }
  }
  
  /**
   * Create the intelligent analysis tracker
   */
  createIntelligentTracker() {
    const tracker = document.createElement('div');
    tracker.className = 'intelligent-tracker';
    tracker.innerHTML = `
      <div class="intelligent-tracker__header">
        <div class="processing-status">
          <span class="status-indicator"></span>
          <span class="status-text">Processing context...</span>
        </div>
      </div>
      <div class="insights-container">
        <div class="insights-list"></div>
      </div>
    `;
    
    this.elements.processingArea.after(tracker);
  }
  
  async triggerContextualInsight(insight, _index) {
    const insightsList = document.querySelector('.insights-list');
    if (!insightsList) return;
    
    const insightEl = document.createElement('div');
    insightEl.className = 'contextual-insight';
    insightEl.innerHTML = `
      <div class="insight-indicator"></div>
      <div class="insight-content">
        <span class="insight-text">${insight.insight}</span>
        <span class="insight-type">${insight.type.replace('-', ' ')}</span>
      </div>
    `;
    
    insightsList.appendChild(insightEl);
    
    // Animate in
    await this.wait(100);
    insightEl.classList.add('is-active');
    
    await this.wait(600);
  }
  
  /**
   * Phase 3: Show intelligent processing and feature activation
   */
  async showIntelligentProcessing(_scenario) {
    this.elements.processingArea.querySelector('.demo__processing-text').textContent = 'Analyzing technical context...';
    
    // Update status
    const statusText = document.querySelector('.status-text');
    if (statusText) statusText.textContent = 'Extracting ticket details...';
    
    // Show ticket closure features activating
    await this.showTicketClosureFeatures();
    
    await this.wait(800);
    
    this.elements.processingArea.querySelector('.demo__processing-text').textContent = 'Generating PSA updates...';
    
    await this.wait(600);
  }
  
  async showTicketClosureFeatures() {
    const tracker = document.querySelector('.intelligent-tracker');
    if (!tracker) return;
    
    const featuresSection = document.createElement('div');
    featuresSection.className = 'closure-features';
    featuresSection.innerHTML = `
      <div class="closure-features__header">
        <h5>Ticket Closure Processing</h5>
      </div>
      <div class="features-grid">
        ${this.ticketClosureFeatures.slice(0, 5).map(feature => `
          <div class="closure-feature" data-feature="${feature.id}">
            <div class="feature-status"></div>
            <div class="feature-info">
              <span class="feature-name">${feature.name}</span>
              <span class="psa-action">${feature.psaAction}</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    
    tracker.appendChild(featuresSection);
    
    // Activate features with realistic timing
    for (let i = 0; i < 5; i++) {
      await this.wait(400);
      await this.activateClosureFeature(i);
    }
    
    // Show advanced features
    await this.showAdvancedClosureFeatures();
  }
  
  async activateClosureFeature(featureIndex) {
    const feature = this.ticketClosureFeatures[featureIndex];
    const featureEl = document.querySelector(`[data-feature="${feature.id}"]`);
    
    if (featureEl) {
      featureEl.classList.add('is-processing');
      
      await this.wait(200);
      
      featureEl.classList.remove('is-processing');
      featureEl.classList.add('is-complete');
    }
  }
  
  async showAdvancedClosureFeatures() {
    const featuresGrid = document.querySelector('.features-grid');
    if (!featuresGrid) return;
    
    const advancedSection = document.createElement('div');
    advancedSection.className = 'advanced-closure';
    advancedSection.innerHTML = `
      <div class="advanced-closure__header">
        <h6>Business Intelligence</h6>
      </div>
      <div class="advanced-grid">
        ${this.ticketClosureFeatures.slice(5).map(feature => `
          <div class="advanced-closure-feature" data-feature="${feature.id}">
            <div class="advanced-status"></div>
            <span class="advanced-name">${feature.name}</span>
          </div>
        `).join('')}
      </div>
    `;
    
    featuresGrid.after(advancedSection);
    
    // Activate advanced features
    for (let i = 5; i < this.ticketClosureFeatures.length; i++) {
      await this.wait(300);
      await this.activateAdvancedFeature(i);
    }
  }
  
  async activateAdvancedFeature(featureIndex) {
    const feature = this.ticketClosureFeatures[featureIndex];
    const featureEl = document.querySelector(`[data-feature="${feature.id}"]`);
    
    if (featureEl) {
      featureEl.classList.add('is-complete');
    }
  }
  
  /**
   * Phase 4: Show complete ticket closure with PSA integration
   */
  async showCompleteTicketClosure(scenario) {
    this.elements.processingArea.style.opacity = '0';
    
    await this.wait(300);
    
    await this.revealCompleteTicketClosure(scenario);
  }
  
  async revealCompleteTicketClosure(scenario) {
    const doc = scenario.documentation;
    
    // Calculate total optimization
    const totalOptimized = this.ticketClosureFeatures.reduce((total, feature) => {
      return total + parseFloat(feature.timeSaved.replace(' min', ''));
    }, 0);
    
    // Store scenario and optimization data for later use
    this.currentTicketData = {
      doc: doc,
      totalOptimized: totalOptimized
    };
    
    // Update the original doc output to show summary with button
    this.elements.docContent.innerHTML = `
      <div class="documentation-summary">
        <div class="summary-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 11l3 3L22 4"></path>
            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path>
          </svg>
        </div>
        <p class="summary-text">Documentation generated and synchronized across all systems.</p>
        <button id="view-documentation-btn" class="btn btn--primary btn--large">
          View Detailed Documentation
        </button>
      </div>
    `;
    
    await this.wait(300);
    this.elements.docOutput.classList.add('is-visible');
    
    // Add click handler for the button
    const viewDocBtn = document.querySelector('#view-documentation-btn');
    if (viewDocBtn) {
      viewDocBtn.addEventListener('click', () => this.showGlassPane());
    }
  }
  
  showGlassPane() {
    if (!this.currentTicketData) return;
    
    const { doc } = this.currentTicketData;
    
    // Create the glass pane overlay
    const glassPane = document.createElement('div');
    glassPane.className = 'cyft-glass-pane';
    glassPane.innerHTML = `
      <div class="glass-pane-backdrop"></div>
      <div class="glass-pane-content">
        <div class="glass-pane-handle">
          <span class="handle-bar"></span>
        </div>
        
        <div class="glass-pane-header">
          <div class="glass-header-main">
            <h2 class="glass-title">Ticket Closure Complete</h2>
            <div class="glass-subtitle">
              <span class="ticket-id">${doc.systemUpdates?.cwTicket || 'AUTO-47291'}</span>
            </div>
          </div>
          <button class="glass-close" aria-label="Close">×</button>
        </div>
        
        <div class="glass-pane-body">
          <!-- Row 1: Client Communication -->
          <div class="glass-info-row client-comm">
            <div class="row-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>
            </div>
            <div class="row-content">
              <h3 class="row-title">Client Communication</h3>
              <div class="info-grid">
                <div class="info-item">
                  <span class="info-label">Issue</span>
                  <span class="info-value">File server outage affecting patient record access</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Resolution</span>
                  <span class="info-value">RAID array failure resolved with matching drive replacement</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Outcome</span>
                  <span class="info-value">All systems operational • Zero data loss • Backup verified</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Next Steps</span>
                  <span class="info-value">Infrastructure refresh consultation recommended</span>
                </div>
              </div>
              <div class="row-meta">
                <span class="meta-tag">Portal Ready</span>
                <span class="meta-tag">Professional Format</span>
                <span class="meta-tag">Auto-generated</span>
              </div>
            </div>
          </div>
          
          <!-- Row 2: Technical Documentation -->
          <div class="glass-info-row tech-docs">
            <div class="row-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
              </svg>
            </div>
            <div class="row-content">
              <h3 class="row-title">Technical Documentation</h3>
              <div class="tech-details">
                <div class="tech-section">
                  <h4 class="tech-section-title">Hardware</h4>
                  <ul class="tech-list">
                    <li>Dell PowerEdge R720, RAID 5 configuration</li>
                    <li>Failed drives: 2TB Seagate ST2000NM0023</li>
                    <li>Serial numbers matched for compatibility</li>
                  </ul>
                </div>
                <div class="tech-section">
                  <h4 class="tech-section-title">Process</h4>
                  <ul class="tech-list">
                    <li>Dual drive failure diagnosed (drives 2 & 4)</li>
                    <li>Array rebuild completed (~3 hours)</li>
                    <li>All shares tested and verified</li>
                  </ul>
                </div>
                <div class="tech-section">
                  <h4 class="tech-section-title">Timeline</h4>
                  <ul class="tech-list">
                    <li>6:00 AM - On-site arrival & diagnosis</li>
                    <li>7:30 AM - Parts procurement completed</li>
                    <li>11:00 AM - Array rebuild finished</li>
                  </ul>
                </div>
              </div>
              <div class="row-meta">
                <span class="meta-tag">KB Indexed</span>
                <span class="meta-tag">Searchable</span>
                <span class="meta-tag">Future Reference</span>
              </div>
            </div>
          </div>
          
          <!-- Row 3: Time & Billing -->
          <div class="glass-info-row time-billing">
            <div class="row-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
            </div>
            <div class="row-content">
              <h3 class="row-title">Time & Billing Intelligence</h3>
              <div class="billing-breakdown">
                <div class="billing-summary">
                  <div class="total-time-display">
                    <span class="time-number">${doc.timeEntry?.duration || '4.2 hours'}</span>
                    <span class="time-rate">${doc.timeEntry?.billable || 'Emergency Rate'}</span>
                  </div>
                </div>
                <div class="time-breakdown">
                  <div class="breakdown-item">
                    <span class="breakdown-task">Travel & Diagnosis</span>
                    <span class="breakdown-time">1.2 hrs</span>
                  </div>
                  <div class="breakdown-item">
                    <span class="breakdown-task">Parts Procurement</span>
                    <span class="breakdown-time">1.0 hrs</span>
                  </div>
                  <div class="breakdown-item">
                    <span class="breakdown-task">Drive Replacement</span>
                    <span class="breakdown-time">0.5 hrs</span>
                  </div>
                  <div class="breakdown-item">
                    <span class="breakdown-task">Rebuild & Testing</span>
                    <span class="breakdown-time">1.5 hrs</span>
                  </div>
                </div>
              </div>
              <div class="row-meta">
                <span class="meta-tag revenue">Revenue Optimized</span>
                <span class="meta-tag">Justification Captured</span>
                <span class="meta-tag">Audit Ready</span>
              </div>
            </div>
          </div>
          
          <!-- Row 4: PSA Integration Status -->
          <div class="glass-info-row psa-sync">
            <div class="row-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
              </svg>
            </div>
            <div class="row-content">
              <h3 class="row-title">System Synchronization</h3>
              <div class="sync-status-grid">
                <div class="sync-item completed">
                  <span class="sync-system">ConnectWise Ticket</span>
                  <span class="sync-status">Updated & Closed</span>
                </div>
                <div class="sync-item completed">
                  <span class="sync-system">Asset Management</span>
                  <span class="sync-status">Hardware Records Updated</span>
                </div>
                <div class="sync-item completed">
                  <span class="sync-system">Time Tracking</span>
                  <span class="sync-status">Emergency Hours Logged</span>
                </div>
                <div class="sync-item completed">
                  <span class="sync-system">Client Portal</span>
                  <span class="sync-status">Resolution Posted</span>
                </div>
                <div class="sync-item completed">
                  <span class="sync-system">Follow-up Tasks</span>
                  <span class="sync-status">Infrastructure Review Scheduled</span>
                </div>
              </div>
              <div class="row-meta">
                <span class="meta-tag success">All Systems Synchronized</span>
                <span class="meta-tag">${new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Append directly to body - escaping ALL containers
    document.body.appendChild(glassPane);
    
    // Close functionality
    const closeBtn = glassPane.querySelector('.glass-close');
    closeBtn.addEventListener('click', () => {
      glassPane.classList.add('closing');
      setTimeout(() => {
        document.body.removeChild(glassPane);
      }, 500);
    });
    
    // Also close on backdrop click
    const backdrop = glassPane.querySelector('.glass-pane-backdrop');
    backdrop.addEventListener('click', () => {
      glassPane.classList.add('closing');
      setTimeout(() => {
        document.body.removeChild(glassPane);
      }, 500);
    });
    
    // Trigger slide-up animation after a brief delay
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        glassPane.classList.add('active');
      });
    });
  }
  
  reset() {
    // Next scenario
    this.state.currentScenarioIndex = (this.state.currentScenarioIndex + 1) % DEMO_SCENARIOS.length;
    this.state.currentFeature = 0;
    
    // Smooth reset
    this.elements.splitView.style.transition = 'opacity 0.4s ease-out';
    this.elements.splitView.style.opacity = '0';
    
    setTimeout(() => {
      // Clean reset
      this.elements.splitView.classList.remove('is-visible');
      this.elements.splitView.style.opacity = '';
      this.elements.docOutput.classList.remove('is-visible');
      this.elements.resetSection.classList.remove('is-visible');
      
      // Clear content
      this.elements.typingContent.innerHTML = '<span class="demo__cursor">|</span>';
      this.elements.speechContent.innerHTML = '';
      this.elements.docContent.innerHTML = '';
      
      // Remove trackers
      const tracker = document.querySelector('.intelligent-tracker');
      if (tracker) tracker.remove();
      
      // Reset processing
      this.elements.processingArea.style.opacity = '1';
      this.elements.processingArea.querySelector('.demo__processing-text').textContent = 'Cyft listening to debrief...';
      
      // Show voice section
      this.elements.voiceSection.style.display = 'flex';
      this.elements.voiceSection.style.opacity = '0';
      
      requestAnimationFrame(() => {
        this.elements.voiceSection.style.transition = 'opacity 0.4s ease-out';
        this.elements.voiceSection.style.opacity = '1';
        
        // Restore compact state after voice section is visible
        setTimeout(() => {
          this.container.classList.add('is-compact');
        }, 300);
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