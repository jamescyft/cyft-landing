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
    
    // What technicians typically write in their rushed notes
    typicalNotes: "Reset AD pwd - Sarah @ Acme. Added MFA.",
    
    // What they naturally say when explaining the work
    naturalSpeech: "Just finished resetting Active Directory password for Sarah at Acme Corp. Also set up MFA on her account using Microsoft Authenticator. She was locked out after too many attempts. Verified her identity through our standard security questions. Password is now reset and she confirmed she can log in successfully.",
    
    // The resulting structured documentation
    documentation: {
      title: "Password Reset - Sarah Johnson",
      systemName: "ConnectWise",
      template: 'security-incident',
      sections: [
        {
          type: 'summary',
          heading: "Issue Summary",
          content: "User locked out of Active Directory account after multiple failed login attempts. Required password reset and MFA configuration."
        },
        {
          type: 'details',
          heading: "Client Details",
          items: [
            "Client: Acme Corp",
            "User: Sarah Johnson",
            "Ticket Type: Password Reset",
            "Priority: High"
          ]
        },
        {
          type: 'actions',
          heading: "Actions Taken",
          items: [
            "Verified user identity via security questions",
            "Reset Active Directory password",
            "Configured Microsoft Authenticator for MFA",
            "Tested login with new credentials",
            "Confirmed successful access with user"
          ]
        },
        {
          type: 'resolution',
          heading: "Resolution",
          content: "✓ Password successfully reset - User has regained access",
          status: 'success'
        }
      ]
    },
    
    // Information extracted that wouldn't be in typical notes
    informationGain: [
      {
        category: 'root-cause',
        description: '✓ Root cause identified (too many attempts)'
      },
      {
        category: 'security',
        description: '✓ Security verification documented'
      },
      {
        category: 'confirmation',
        description: '✓ User confirmation captured'
      },
      {
        category: 'technical-details',
        description: '✓ MFA setup details included'
      }
    ],
    
    // Metadata for analytics
    metadata: {
      timeToDocument: 240, // seconds saved
      informationDensity: 4.2, // ratio of final doc to typical notes
      completenessScore: 0.95
    }
  },
  
  {
    id: 'network-switch-replacement',
    type: 'hardware',
    priority: 'critical',
    
    typicalNotes: "Replaced switch at medical center. Cisco 2960 -> 9300. Working.",
    
    naturalSpeech: "Completed network switch replacement at Downtown Medical Center. Old Cisco 2960 was failing intermittently. Installed new Cisco 9300, migrated all VLANs, updated spanning tree configuration. Tested connectivity on all ports. Network is stable, all devices reconnected successfully. Backed up new config to repository.",
    
    documentation: {
      title: "Network Switch Replacement",
      systemName: "ServiceNow",
      template: 'hardware-change',
      sections: [
        {
          type: 'summary',
          heading: "Hardware Change Summary",
          content: "Replaced failing Cisco 2960 switch with new Cisco 9300 at Downtown Medical Center due to intermittent failures."
        },
        {
          type: 'equipment',
          heading: "Equipment Details",
          items: [
            "Old Device: Cisco 2960 (S/N: FCW1942C0HB)",
            "New Device: Cisco 9300 (S/N: FCW2334D0JK)",
            "Location: Downtown Medical Center - Server Room A",
            "Rack Position: U24-U26"
          ]
        },
        {
          type: 'configuration',
          heading: "Configuration Changes",
          items: [
            "Migrated all VLAN configurations",
            "Updated spanning tree protocol settings",
            "Configured port security on all access ports",
            "Enabled redundant uplinks",
            "Applied latest firmware (16.12.5)"
          ]
        },
        {
          type: 'validation',
          heading: "Testing & Validation",
          items: [
            "All ports tested for connectivity",
            "VLAN routing verified",
            "Spanning tree convergence confirmed",
            "Configuration backed up to repository"
          ]
        }
      ]
    },
    
    informationGain: [
      {
        category: 'failure-pattern',
        description: '✓ Failure pattern documented (intermittent)'
      },
      {
        category: 'configuration',
        description: '✓ Complete configuration changes listed'
      },
      {
        category: 'testing',
        description: '✓ Testing procedures captured'
      },
      {
        category: 'asset-tracking',
        description: '✓ Serial numbers & location recorded'
      }
    ],
    
    metadata: {
      timeToDocument: 360,
      informationDensity: 6.8,
      completenessScore: 0.98
    }
  },
  
  {
    id: 'server-performance-optimization',
    type: 'performance',
    priority: 'medium',
    
    typicalNotes: "Fixed slow file server. Moved backup to 2am. Added RAM.",
    
    naturalSpeech: "Resolved slow performance issue on file server. Found that automated backup job was running during business hours. Rescheduled to 2 AM, also increased RAM allocation to VM from 16GB to 32GB. Cleaned up temp files, freed up 200GB. Performance is back to normal, users reporting much better response times.",
    
    documentation: {
      title: "File Server Performance Optimization",
      systemName: "Autotask",
      template: 'performance-issue',
      sections: [
        {
          type: 'problem',
          heading: "Performance Issue",
          content: "File server experiencing severe performance degradation during business hours, affecting user productivity."
        },
        {
          type: 'analysis',
          heading: "Root Cause Analysis",
          items: [
            "Backup job running during business hours (9 AM daily)",
            "Insufficient RAM allocation (16GB for 50+ users)",
            "Temp file accumulation (200GB+ of orphaned files)",
            "Resource contention during peak usage"
          ]
        },
        {
          type: 'remediation',
          heading: "Remediation Steps",
          items: [
            "Rescheduled backup job to 2:00 AM",
            "Increased VM RAM from 16GB to 32GB",
            "Cleaned temporary files (freed 200GB)",
            "Configured automated cleanup tasks",
            "Optimized cache settings"
          ]
        },
        {
          type: 'results',
          heading: "Results",
          content: "✓ Performance restored - Users reporting normal response times",
          status: 'success'
        }
      ]
    },
    
    informationGain: [
      {
        category: 'root-cause',
        description: '✓ Root cause analysis documented'
      },
      {
        category: 'specific-changes',
        description: '✓ Specific resource changes (16GB → 32GB)'
      },
      {
        category: 'metrics',
        description: '✓ Space recovered (200GB)'
      },
      {
        category: 'user-impact',
        description: '✓ User feedback captured'
      }
    ],
    
    metadata: {
      timeToDocument: 300,
      informationDensity: 5.5,
      completenessScore: 0.93
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