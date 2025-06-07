/**
 * Demo Scenarios Configuration - Ticket Closure Focus
 * Hyper-realistic scenarios showing technicians closing out completed tickets
 * Each scenario captures the exact moment after work is done, before documentation
 */

export const DEMO_SCENARIOS = [
  {
    id: 'server-outage-closure',
    type: 'critical-infrastructure',
    priority: 'urgent',
    
    // What they actually type in a rush to close the ticket
    typicalNotes: "Fixed server issue. Replaced failed drive in RAID array. Everything working.",
    
    // The reality - they just spent 4 hours fixing this and know every detail
    naturalSpeech: "Alright, wrapping up this nightmare at Meridian Healthcare. Got there at 6 AM, their file server was completely down, RAID 5 array showing two failed drives. Nurses couldn't access patient records, complete chaos. Turned out the drive that failed yesterday took out another one when it tried to rebuild. Pulled both drives, had to drive to the warehouse to grab matching Seagate drives, serial numbers have to match for their old Dell R720. Rebuilt the array, took about 3 hours to resilver, tested all the shares, verified backup jobs are running clean. Dr. Martinez was breathing down my neck the whole time, but I walked him through our preventive monitoring recommendations. Logged 4.2 hours total, they definitely need that infrastructure refresh we quoted last month.",
    
    // Cyft's intelligent understanding during the conversation
    contextualInsights: [
      { insight: 'Critical healthcare client detected', type: 'business-impact', timing: '2s' },
      { insight: 'Infrastructure failure pattern identified', type: 'technical-analysis', timing: '8s' },
      { insight: 'Warranty/compatibility requirements noted', type: 'procurement', timing: '15s' },
      { insight: 'Upsell opportunity captured', type: 'business-development', timing: '28s' },
      { insight: 'Precise billable time extracted', type: 'billing-accuracy', timing: '32s' }
    ],
    
    // The complete ticket closure Cyft generates
    documentation: {
      ticketUpdate: {
        status: "Resolved",
        priority: "Critical → Normal",
        category: "Infrastructure / Storage",
        resolution: "RAID array failure resolved with drive replacement and rebuild"
      },
      
      clientFacingNotes: "**RESOLVED: File Server Outage**\n\nIssue: Complete file server outage affecting patient record access\n\nResolution: Identified dual drive failure in RAID 5 array. Replaced failed drives with matching hardware and performed full array rebuild. All network shares restored and tested. Backup systems verified operational.\n\nPreventive Measures: Recommend infrastructure refresh consultation to prevent future critical failures.\n\nAll systems operational. No data loss occurred.",
      
      internalTechNotes: "**Critical Infrastructure Response - Meridian Healthcare**\n\n**Timeline:**\n• 6:00 AM - On-site arrival\n• 6:15 AM - Diagnosed dual RAID failure (drives 2 & 4)\n• 7:30 AM - Retrieved matching Seagate drives from warehouse\n• 8:00 AM - Drive replacement completed\n• 11:00 AM - Array rebuild completed\n• 11:30 AM - All shares tested and verified\n\n**Technical Details:**\n• Dell PowerEdge R720, RAID 5 configuration\n• Failed drives: 2TB Seagate ST2000NM0023 (S/N matched)\n• Rebuild time: ~3 hours (expected for 2TB)\n• No filesystem corruption detected\n\n**Client Interaction:**\n• Dr. Martinez (IT liaison) very concerned initially\n• Explained RAID rebuild process\n• Discussed infrastructure refresh proposal\n• Client receptive to preventive measures\n\n**Follow-up Required:**\n• Infrastructure refresh meeting (quote from last month)\n• Consider RAID 6 for better redundancy",
      
      timeEntry: {
        duration: "4.2 hours",
        breakdown: [
          "Travel & Diagnosis: 1.2 hours",
          "Parts Procurement: 1.0 hour", 
          "Drive Replacement: 0.5 hours",
          "Array Rebuild & Testing: 1.5 hours"
        ],
        billable: "4.2 hours @ Emergency Rate",
        category: "Emergency Infrastructure Response"
      },
      
      systemUpdates: {
        cwTicket: "AUTO-47291 → Resolved",
        assetUpdates: "Server RAID status updated, drive S/N recorded",
        clientPortal: "Outage notification cleared, status updated",
        billingSync: "Emergency hours logged for approval",
        followUpCreated: "Infrastructure consultation scheduled"
      }
    },
    
    // Information that would be lost with typical documentation
    intelligenceCaptured: [
      "Healthcare compliance considerations",
      "Specific hardware compatibility requirements", 
      "Client relationship dynamics and receptiveness",
      "Upselling opportunity timing and context",
      "Exact timeline for billing accuracy",
      "Preventive recommendations tied to specific experience"
    ],
    
    metadata: {
      timeSavedOnDocumentation: "12 minutes",
      accuracyImprovement: "95%",
      billingRecovery: "$280 in previously missed emergency time",
      businessIntelligence: "Infrastructure refresh opportunity flagged"
    }
  },
  
  {
    id: 'email-migration-closure',
    type: 'project-completion',
    priority: 'normal',
    
    typicalNotes: "Migrated CEO email to O365. Setup complete on all devices.",
    
    naturalSpeech: "Just finished the CEO migration at Sterling Associates, went smoother than expected actually. Jennifer, his assistant, was super helpful coordinating this. We did it during his board meeting so no interruptions. Migrated about 47 gigs of email going back to 2009, PST file was massive. Got his iPhone, iPad, and that new Surface Pro all configured with the modern auth. He was paranoid about losing his folder structure but everything came through perfectly, even his archived client correspondence. The tricky part was his shared calendar with Jennifer - had to make sure those permissions carried over. Also set up his signature with the new compliance footer legal requested. He's actually excited about the Teams integration now. Billed 3.8 hours total, but honestly could have charged more given the coordination required.",
    
    contextualInsights: [
      { insight: 'VIP user migration completed', type: 'client-priority', timing: '3s' },
      { insight: 'Assistant coordination noted', type: 'relationship-mapping', timing: '7s' },
      { insight: 'Large data migration quantified', type: 'technical-scope', timing: '12s' },
      { insight: 'Compliance requirements addressed', type: 'legal-adherence', timing: '24s' },
      { insight: 'Billing optimization opportunity', type: 'revenue-recovery', timing: '29s' }
    ],
    
    documentation: {
      ticketUpdate: {
        status: "Completed",
        priority: "High → Closed",
        category: "Migration / Email / VIP",
        completion: "Executive email migration successful with zero downtime"
      },
      
      clientFacingNotes: "**COMPLETED: CEO Email Migration to Office 365**\n\nScope: Complete email migration for CEO including 15 years of historical data\n\nCompleted During: Board meeting window (zero business disruption)\n\nDevices Configured:\n• iPhone 13 Pro - Outlook app with modern authentication\n• iPad Pro - Native mail app with full sync\n• Surface Pro 8 - Outlook 2021 with full functionality\n\nFeatures Enabled:\n• Shared calendar access with executive assistant\n• Legal compliance signature template\n• Teams integration for modern collaboration\n• Complete folder structure preservation\n\nAll 47GB of historical emails successfully migrated and verified. Executive assistant access and permissions fully configured.",
      
      internalTechNotes: "**VIP Migration - Sterling Associates CEO**\n\n**Pre-Migration:**\n• Coordinated with Jennifer (EA) for scheduling\n• Timed during board meeting for zero interruption\n• PST backup completed (47GB, 2009-2024)\n\n**Migration Details:**\n• Exchange Online P2 license assigned\n• Modern auth configured on all devices\n• Autodiscover settings verified\n• Folder hierarchy: 127 folders preserved exactly\n• Shared calendar: Jennifer delegated access maintained\n\n**Post-Migration:**\n• Signature updated with legal compliance footer\n• Teams integration enabled and demonstrated\n• Mobile device policies applied\n• All devices tested and verified\n\n**Client Feedback:**\n• CEO initially skeptical, now enthusiastic about Teams\n• Jennifer very appreciative of smooth transition\n• Zero complaints or issues reported\n\n**Notes:**\n• Complex coordination - could justify higher billing\n• Excellent opportunity for Teams training project",
      
      timeEntry: {
        duration: "3.8 hours",
        breakdown: [
          "Pre-migration preparation: 0.8 hours",
          "Data migration execution: 1.5 hours",
          "Device configuration: 1.2 hours", 
          "Testing & verification: 0.3 hours"
        ],
        billable: "3.8 hours @ Professional Services Rate",
        category: "Email Migration - Executive"
      },
      
      systemUpdates: {
        cwTicket: "AUTO-47143 → Completed",
        assetUpdates: "CEO devices updated with O365 licensing",
        clientPortal: "Migration completed successfully",
        billingSync: "Professional services hours approved",
        followUpCreated: "Teams training opportunity flagged"
      }
    },
    
    intelligenceCaptured: [
      "VIP coordination requirements and preferences",
      "Assistant relationship dynamics crucial for success",
      "Legal compliance signature requirements", 
      "Billing justification for complex coordination",
      "Teams training upsell opportunity timing",
      "Historical data importance to executive"
    ],
    
    metadata: {
      timeSavedOnDocumentation: "8 minutes",
      accuracyImprovement: "92%", 
      billingRecovery: "$150 in properly justified coordination time",
      businessIntelligence: "Teams training project opportunity identified"
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