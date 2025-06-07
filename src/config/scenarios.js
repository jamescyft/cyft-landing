/**
 * Demo Scenarios Configuration
 * Each scenario represents a realistic use case that demonstrates Cyft's capabilities
 * Structure must be consistent and maintainable
 */

export const DEMO_SCENARIOS = [
  {
    id: 'password-reset',
    type: 'security',
    priority: 'high',
    
    // What technicians typically write in their rushed notes - bare minimum but realistic
    typicalNotes: "Reset AD password for Sarah at Acme. Added MFA.",
    
    // Typing patterns to make it feel real
    typingPatterns: {
      mistakes: ['Reser', 'Sarha', 'Acmr'],
      corrections: ['Reset', 'Sarah', 'Acme'],
      pauses: [800, 1200, 600] // milliseconds after each segment
    },
    
    // Stream of consciousness - what they naturally say when using Cyft
    naturalSpeech: "Okay so Sarah from Acme called, she's the marketing director there, super frustrated because she's been locked out since yesterday afternoon. Did the usual verification, security questions, confirmed her employee ID. Oh and she mentioned she just changed phones last week which might be why she forgot the password. Reset her AD password, walked her through setting up Microsoft Authenticator on her new iPhone. She was really happy we got it sorted quickly. Spent about 18 minutes on this including hold time while she found her employee ID card.",
    
    // Speech patterns for natural flow
    speechPatterns: {
      emphasis: ['super frustrated', 'since yesterday', 'really happy', '18 minutes'],
      pauses: {
        'called,': 300,
        'there,': 400,
        'afternoon.': 500,
        'questions,': 300,
        'ID.': 600,
        'week': 400,
        'password.': 500,
        'iPhone.': 500,
        'quickly.': 400,
        'card.': 600
      }
    },
    
    // Thought process - what Cyft understands
    thoughtProcess: [
      { text: 'User title: Marketing Director', type: 'context', delay: 300 },
      { text: 'Lockout duration: Since yesterday', type: 'analysis', delay: 400 },
      { text: 'Device change noted', type: 'security', delay: 500 },
      { text: 'Time entry: 18 minutes', type: 'billing', delay: 400 },
      { text: 'Customer satisfaction: Positive', type: 'success', delay: 300 },
      { text: 'Generating ConnectWise ticket', type: 'template', delay: 600 }
    ],
    
    // The resulting structured documentation
    documentation: {
      title: "Password Reset - Sarah Johnson",
      systemName: "ConnectWise",
      template: 'security-incident',
      sections: [
        {
          type: 'status',
          heading: "TICKET STATUS",
          content: "New → Resolved"
        },
        {
          type: 'resolution-notes',
          heading: "RESOLUTION NOTES (CLIENT-FACING)",
          content: "Successfully resolved account access issue for Sarah Johnson (Marketing Director). The account lockout that began yesterday afternoon has been resolved. Password has been reset and multi-factor authentication has been configured on her new device. Sarah confirmed she can now access all systems without issue."
        },
        {
          type: 'internal-notes',
          heading: "INTERNAL NOTES",
          content: "User locked out since yesterday afternoon (~24 hours). Recent phone change likely contributed to forgotten password. Completed standard identity verification. Reset AD password and enrolled new iPhone in MS Authenticator. User expressed satisfaction with quick resolution. No signs of compromise."
        },
        {
          type: 'time-entry',
          heading: "TIME ENTRY",
          content: "18 minutes - Password reset and MFA setup"
        },
        {
          type: 'details',
          heading: "TICKET DETAILS",
          items: [
            "Ticket #: AUTO-45892",
            "Client: Acme Corp",
            "Contact: Sarah Johnson (Marketing Director)",
            "Category: Security / Access",
            "Time Spent: 18 minutes"
          ]
        }
      ]
    },
    
    // Information extracted that wouldn't be in typical notes
    informationGain: [
      {
        category: 'context',
        description: '✓ User role captured (Marketing Director)'
      },
      {
        category: 'timeline',
        description: '✓ Lockout duration documented'
      },
      {
        category: 'root-cause',
        description: '✓ Device change context preserved'
      },
      {
        category: 'billing',
        description: '✓ Accurate time tracking (18 min)'
      },
      {
        category: 'satisfaction',
        description: '✓ Customer feedback captured'
      }
    ],
    
    // Metadata for analytics
    metadata: {
      timeToDocument: 240, // seconds saved
      informationDensity: 8.5, // ratio of final doc to typical notes
      completenessScore: 0.98
    }
  },
  
  {
    id: 'network-switch-critical',
    type: 'hardware',
    priority: 'critical',
    
    typicalNotes: "Replaced failed switch at medical center. Network restored.",
    
    typingPatterns: {
      mistakes: ['Replacef', 'failes', 'medocal'],
      corrections: ['Replaced', 'failed', 'medical'],
      pauses: [1000, 800, 900]
    },
    
    naturalSpeech: "Just wrapped up at Downtown Medical Center, that was a fun one. Their main switch started failing around 3 AM, nurses were calling IT because the medication dispensing system went offline. Got there at 3:45, parking was actually easy for once. Old Cisco 2960 was showing amber lights all over the place, port flapping like crazy. Had the replacement 9300 in my truck thankfully. Took about 2 hours and 15 minutes total. Had to be really careful with the VLANs, they've got clinical systems on VLAN 20 that absolutely cannot go down. Migration went smooth though, backed up the config first obviously. The nursing supervisor, Janet I think, she brought me coffee which was awesome. Everything's back up, tested all 48 ports, uplinks are solid.",
    
    speechPatterns: {
      emphasis: ['3 AM', 'medication dispensing system', 'absolutely cannot go down', '2 hours and 15 minutes', 'all 48 ports'],
      pauses: {
        'one.': 500,
        'AM,': 400,
        'offline.': 600,
        '3:45,': 400,
        'once.': 500,
        'place,': 400,
        'crazy.': 600,
        'thankfully.': 500,
        'total.': 600,
        'VLANs,': 400,
        'down.': 700,
        'though,': 400,
        'obviously.': 500,
        'think,': 300,
        'awesome.': 500,
        'up,': 400,
        'ports,': 400,
        'solid.': 600
      }
    },
    
    thoughtProcess: [
      { text: 'Critical system: Medication dispensing', type: 'analysis', delay: 300 },
      { text: 'Response time: 45 minutes', type: 'performance', delay: 400 },
      { text: 'Hardware failure confirmed', type: 'hardware', delay: 500 },
      { text: 'Time entry: 2 hours 15 minutes', type: 'billing', delay: 400 },
      { text: 'Clinical VLAN priority noted', type: 'compliance', delay: 500 },
      { text: 'Positive client interaction', type: 'context', delay: 300 },
      { text: 'Creating emergency ticket', type: 'template', delay: 600 }
    ],
    
    documentation: {
      title: "Emergency Network Switch Replacement",
      systemName: "ConnectWise",
      template: 'emergency-hardware',
      sections: [
        {
          type: 'status',
          heading: "TICKET STATUS",
          content: "Emergency → Resolved"
        },
        {
          type: 'resolution-notes',
          heading: "RESOLUTION NOTES (CLIENT-FACING)",
          content: "Successfully resolved the network outage at Downtown Medical Center that began at approximately 3:00 AM. The failed network switch affecting critical systems including medication dispensing has been replaced with new enterprise hardware. All systems have been restored and thoroughly tested. Clinical systems on the dedicated medical VLAN were prioritized during the migration to minimize impact on patient care."
        },
        {
          type: 'internal-notes',
          heading: "INTERNAL NOTES",
          content: "Emergency response at 3:45 AM for switch failure (Cisco 2960, extensive port flapping on Gi1/0/12-24, amber status lights). Replaced with Cisco 9300 from truck stock. Migration completed with special attention to VLAN 20 (clinical systems) - zero downtime on critical systems. All 48 ports tested individually. Uplinks configured on Te1/1/1 and Te1/1/2. Config backed up pre-replacement. Nursing supervisor (Janet) very appreciative of quick response."
        },
        {
          type: 'time-entry',
          heading: "TIME ENTRY",
          content: "2 hours 15 minutes - Emergency switch replacement including travel"
        },
        {
          type: 'details',
          heading: "TICKET DETAILS",
          items: [
            "Ticket #: AUTO-45893",
            "Client: Downtown Medical Center",
            "Location: Main Server Room",
            "Category: Hardware / Network / Emergency",
            "Response Time: 45 minutes",
            "Time Spent: 2 hours 15 minutes"
          ]
        }
      ]
    },
    
    informationGain: [
      {
        category: 'impact',
        description: '✓ Critical system impact documented'
      },
      {
        category: 'response',
        description: '✓ Emergency response time captured'
      },
      {
        category: 'technical',
        description: '✓ Specific port/config details preserved'
      },
      {
        category: 'billing',
        description: '✓ Accurate time tracking'
      },
      {
        category: 'relationship',
        description: '✓ Client interaction noted'
      }
    ],
    
    metadata: {
      timeToDocument: 360,
      informationDensity: 12.3,
      completenessScore: 0.99
    }
  },
  
  {
    id: 'email-migration-exec',
    type: 'migration',
    priority: 'medium',
    
    typicalNotes: "Migrated CEO email to O365. All devices configured.",
    
    typingPatterns: {
      mistakes: ['Migratef', 'CED', 'O356'],
      corrections: ['Migrated', 'CEO', 'O365'],
      pauses: [700, 1100, 800]
    },
    
    naturalSpeech: "Finished up the CEO's email migration to Office 365. Worked on it for about 47 minutes total. He had like 15 years of emails, almost 50 gigs worth. The PST export took forever but it all came through clean. Set up his iPhone, iPad, and laptop with the new settings. He was worried about losing his folder structure but I showed him everything transferred exactly as it was. Even his weird filing system with the yearly folders and sub-folders by client. He mentioned he's got a board meeting tomorrow so timing was critical. Also set up his assistant Jennifer on the shared calendar. They're both good to go now.",
    
    speechPatterns: {
      emphasis: ['47 minutes', '15 years', '50 gigs', 'board meeting tomorrow', 'timing was critical'],
      pauses: {
        '365.': 500,
        'total.': 600,
        'emails,': 400,
        'worth.': 600,
        'forever': 400,
        'clean.': 600,
        'iPhone,': 300,
        'iPad,': 300,
        'settings.': 500,
        'structure': 400,
        'was.': 600,
        'client.': 500,
        'tomorrow': 400,
        'critical.': 700,
        'calendar.': 500,
        'now.': 600
      }
    },
    
    thoughtProcess: [
      { text: 'VIP user: CEO', type: 'priority', delay: 300 },
      { text: 'Time entry: 47 minutes', type: 'billing', delay: 400 },
      { text: 'Data volume: 50GB over 15 years', type: 'analysis', delay: 500 },
      { text: 'Critical timing: Board meeting', type: 'context', delay: 400 },
      { text: 'Additional user: Assistant configured', type: 'template', delay: 500 },
      { text: 'Multi-device setup completed', type: 'success', delay: 300 },
      { text: 'Documenting migration details', type: 'template', delay: 600 }
    ],
    
    documentation: {
      title: "Executive Email Migration - CEO",
      systemName: "ConnectWise",
      template: 'vip-migration',
      sections: [
        {
          type: 'status',
          heading: "TICKET STATUS",
          content: "Scheduled → Completed"
        },
        {
          type: 'resolution-notes',
          heading: "RESOLUTION NOTES (CLIENT-FACING)",
          content: "Successfully completed email migration to Office 365 for the CEO. All historical emails (15 years) have been preserved with folder structure intact. Email access has been configured on all devices (iPhone, iPad, and laptop). Shared calendar access has been established with the executive assistant. System is fully operational in time for tomorrow's board meeting."
        },
        {
          type: 'internal-notes',
          heading: "INTERNAL NOTES",
          content: "PST export: 50GB total, 15 years of data. Migration completed without data loss. Preserved complex folder hierarchy (annual folders with client subfolders). Configured iOS devices with Outlook app, laptop with native Outlook 2021. Set up shared calendar between CEO and assistant (Jennifer). User expressed concern about folder structure - demonstrated successful preservation. Critical deadline met (board meeting tomorrow)."
        },
        {
          type: 'time-entry',
          heading: "TIME ENTRY",
          content: "47 minutes - Email migration and multi-device configuration"
        },
        {
          type: 'details',
          heading: "TICKET DETAILS",
          items: [
            "Ticket #: AUTO-45894",
            "Client: Acme Corp",
            "Contact: CEO + Executive Assistant",
            "Category: Migration / Email / VIP",
            "Data Migrated: 50GB",
            "Time Spent: 47 minutes"
          ]
        }
      ]
    },
    
    informationGain: [
      {
        category: 'priority',
        description: '✓ VIP status and urgency captured'
      },
      {
        category: 'scope',
        description: '✓ Data volume and timeframe documented'
      },
      {
        category: 'complexity',
        description: '✓ Folder structure concerns addressed'
      },
      {
        category: 'timing',
        description: '✓ Critical deadline context preserved'
      },
      {
        category: 'completeness',
        description: '✓ Additional user setup included'
      }
    ],
    
    metadata: {
      timeToDocument: 300,
      informationDensity: 15.7,
      completenessScore: 0.97
    }
  }
];

/**
 * Get a scenario by ID
 * @param {string} id - Scenario ID
 * @returns {Object|null} Scenario object or null if not found
 */
export const getScenarioById = (id) => {
  return DEMO_SCENARIOS.find(scenario => scenario.id === id) || null;
};

/**
 * Get scenarios by type
 * @param {string} type - Scenario type (security, hardware, performance)
 * @returns {Array} Array of matching scenarios
 */
export const getScenariosByType = (type) => {
  return DEMO_SCENARIOS.filter(scenario => scenario.type === type);
};

/**
 * Get a random scenario
 * @returns {Object} Random scenario
 */
export const getRandomScenario = () => {
  const index = Math.floor(Math.random() * DEMO_SCENARIOS.length);
  return DEMO_SCENARIOS[index];
};

/**
 * Calculate average time saved across all scenarios
 * @returns {number} Average time saved in seconds
 */
export const getAverageTimeSaved = () => {
  const total = DEMO_SCENARIOS.reduce((acc, scenario) => {
    return acc + scenario.metadata.timeToDocument;
  }, 0);
  return Math.round(total / DEMO_SCENARIOS.length);
};

/**
 * Validate scenario structure
 * @param {Object} scenario - Scenario to validate
 * @returns {boolean} True if valid
 */
export const validateScenario = (scenario) => {
  const requiredFields = [
    'id', 'type', 'priority', 'typicalNotes', 'naturalSpeech',
    'documentation', 'informationGain', 'metadata'
  ];
  
  return requiredFields.every(field => scenario.hasOwnProperty(field));
}; 