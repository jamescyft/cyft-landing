/**
 * Interactive Demo
 * Simplified demo experience
 */

// Demo scenarios
const SCENARIOS = [
    {
        speech: "Alright, so I just fixed the email routing issue for Contoso. The problem was their Exchange transport rule was blocking emails from their subdomain...",
        notes: "Fixed email issue - transport rule",
        output: `<h3>Ticket #4521 - Email Routing Issue</h3>
<p><strong>Client:</strong> Contoso Ltd</p>
<p><strong>Issue:</strong> Emails from marketing.contoso.com being blocked</p>
<p><strong>Resolution:</strong> Modified Exchange transport rule to whitelist subdomain. Verified SPF records were properly configured for marketing.contoso.com.</p>
<p><strong>Time Spent:</strong> 45 minutes</p>`
    },
    {
        speech: "The backup job kept failing because the VSS writer on the SQL server was stuck. Had to restart the SQL VSS Writer service and now backups are running successfully.",
        notes: "Backup failed - VSS writer",
        output: `<h3>Ticket #4522 - Backup Failure</h3>
<p><strong>Client:</strong> Fabrikam Inc</p>
<p><strong>Issue:</strong> Nightly SQL backup jobs failing with VSS errors</p>
<p><strong>Resolution:</strong> Restarted SQL VSS Writer service. Verified successful backup completion. Scheduled task to monitor VSS health.</p>
<p><strong>Time Spent:</strong> 30 minutes</p>`
    }
];

let currentScenario = 0;
let demoContainer = null;

/**
 * Initialize the demo
 */
export async function initDemo() {
    console.log('[Demo] Initializing');
    
    demoContainer = document.getElementById('demo-container');
    if (!demoContainer) {
        throw new Error('Demo container not found');
    }
    
    // Replace skeleton with demo UI
    demoContainer.innerHTML = `
        <div class="demo__interface">
            <div class="grid grid--2" style="gap: var(--space-8);">
                <!-- Left side: Traditional way -->
                <div class="card">
                    <h3 class="text-center">The Old Way</h3>
                    <div class="stack">
                        <div class="demo__typing">
                            <p class="text-small text-muted text-uppercase">Manual Entry</p>
                            <div class="demo__notes" id="manual-notes">
                                <span class="demo__cursor">|</span>
                            </div>
                        </div>
                        <div class="demo__speech">
                            <p class="text-small text-muted text-uppercase">What You're Saying</p>
                            <div class="demo__transcript" id="speech-text"></div>
                        </div>
                    </div>
                </div>
                
                <!-- Right side: Cyft way -->
                <div class="card">
                    <h3 class="text-center">The Cyft Way</h3>
                    <div class="demo__processing" id="processing">
                        <p class="text-muted">Listening...</p>
                    </div>
                </div>
            </div>
            
            <!-- Output -->
            <div class="demo__output hidden" id="demo-output">
                <div class="card" style="background: var(--color-black); color: var(--color-white); margin-top: var(--space-8);">
                    <p class="text-small text-uppercase" style="opacity: 0.7;">Ready for your PSA</p>
                    <div id="output-content"></div>
                </div>
            </div>
            
            <!-- Controls -->
            <div class="text-center" style="margin-top: var(--space-8);">
                <button class="btn btn--secondary" id="demo-reset">Try Another Scenario</button>
            </div>
        </div>
    `;
    
    // Add demo styles
    addDemoStyles();
    
    // Start demo
    setTimeout(startDemo, 500);
    
    // Setup reset button
    document.getElementById('demo-reset').addEventListener('click', resetDemo);
}

/**
 * Add demo-specific styles
 */
function addDemoStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .demo__interface {
            animation: fadeIn 0.5s ease-out;
        }
        
        .demo__typing, .demo__speech {
            min-height: 100px;
            padding: var(--space-4);
            background: var(--color-gray-100);
            border-radius: var(--radius-md);
        }
        
        .demo__notes, .demo__transcript {
            font-family: var(--font-mono);
            font-size: var(--text-sm);
            line-height: 1.6;
        }
        
        .demo__cursor {
            animation: blink 1s infinite;
        }
        
        .demo__processing {
            min-height: 200px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
        }
        
        .demo__output {
            animation: slideUp 0.5s ease-out;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
        
        @keyframes slideUp {
            from { 
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Start the demo sequence
 */
function startDemo() {
    const scenario = SCENARIOS[currentScenario];
    const manualNotes = document.getElementById('manual-notes');
    const speechText = document.getElementById('speech-text');
    const processing = document.getElementById('processing');
    
    // Reset
    manualNotes.innerHTML = '<span class="demo__cursor">|</span>';
    speechText.textContent = '';
    
    // Simulate typing manual notes
    typeText(manualNotes, scenario.notes, 100);
    
    // Simulate speech transcription
    setTimeout(() => {
        typeText(speechText, scenario.speech, 30);
    }, 1000);
    
    // Show processing
    setTimeout(() => {
        processing.innerHTML = `
            <div class="text-center">
                <p class="text-muted">Understanding context...</p>
                <p class="text-small text-muted">Extracting details...</p>
                <p class="text-small text-muted">Formatting documentation...</p>
            </div>
        `;
    }, 3000);
    
    // Show output
    setTimeout(() => {
        showOutput(scenario.output);
    }, 5000);
}

/**
 * Type text effect
 */
function typeText(element, text, speed) {
    let index = 0;
    element.innerHTML = '';
    
    function type() {
        if (index < text.length) {
            element.innerHTML = text.substring(0, index + 1) + '<span class="demo__cursor">|</span>';
            index++;
            setTimeout(type, speed);
        } else {
            element.innerHTML = text;
        }
    }
    
    type();
}

/**
 * Show the output
 */
function showOutput(content) {
    const output = document.getElementById('demo-output');
    const outputContent = document.getElementById('output-content');
    
    outputContent.innerHTML = content;
    output.classList.remove('hidden');
}

/**
 * Reset the demo
 */
function resetDemo() {
    currentScenario = (currentScenario + 1) % SCENARIOS.length;
    document.getElementById('demo-output').classList.add('hidden');
    startDemo();
} 