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
      
      clientFacingNotes: "Summary: We investigated the complete file server outage affecting patient record access across your facility.\n\nResolution: Our team identified dual drive failures in the RAID array and has fully resolved the problem. All network shares are restored and operational. The system is stable and backup systems have been verified. Your data integrity has been maintained throughout the incident.\n\nNext Steps: No action is needed from you. We will continue to monitor system performance. We strongly recommend scheduling a consultation to discuss infrastructure improvements that can prevent similar critical failures in the future.",
      
      internalTechNotes: "Observation: User reported complete file server outage. RAID 5 array showing dual drive failure (drives 2 & 4). Dell PowerEdge R720 running critical healthcare data.\n\nHypothesis: Suspected cascading drive failure from yesterday's partial rebuild attempt. Serial number matching required for controller compatibility.\n\nActions: Retrieved matching Seagate ST2000NM0023 drives from warehouse. Hot-swapped failed drives. Initiated array rebuild. Monitored rebuild progress (3 hours). Tested all network shares. Verified backup job integrity.\n\nResult: Array rebuild successful. All shares operational. No data loss. Client educated on infrastructure risks.",
      
      technicalDocumentation: [
        {
          title: "RAID 5 Dual Drive Failure Recovery",
          items: [
            "Identify failed drives via RAID controller (Dell PERC H710)",
            "Verify drive model/capacity: 2TB Seagate ST2000NM0023",
            "CRITICAL: Serial numbers must match for older controllers",
            "Hot-swap procedure: Remove drive 2 first, wait for spin-down",
            "Insert replacement, wait for controller recognition (~30s)",
            "Repeat for drive 4"
          ]
        },
        {
          title: "Array Rebuild Process",
          items: [
            "Access RAID controller: Ctrl+R during boot or iDRAC",
            "Initiate rebuild on replaced drives",
            "Expected rebuild time: 1GB/minute (3hrs for 2TB)",
            "Monitor via OpenManage or controller logs",
            "DO NOT reboot during rebuild process",
            "Verify all virtual disks show 'Optimal' status"
          ]
        },
        {
          title: "Post-Recovery Verification",
          items: [
            "Test all network shares from multiple workstations",
            "Verify backup job completion (check last 3 days)",
            "Run chkdsk /f on all volumes",
            "Document new drive serial numbers in asset DB",
            "Schedule follow-up SMART monitoring",
            "Consider RAID 6 upgrade for better fault tolerance"
          ]
        }
      ],
      
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
      
      clientFacingNotes: "Summary: We completed the CEO's email migration to Office 365 with all historical data preserved and zero business disruption.\n\nResolution: Successfully migrated 47GB of email spanning 15 years. All devices are configured and fully functional. Your complete folder structure has been preserved, and shared calendar access with your executive assistant is working perfectly. The new legal compliance signature has been implemented across all devices.\n\nNext Steps: No immediate action required. We've enabled Teams integration which offers powerful collaboration features when you're ready to explore them. Your executive assistant has been briefed on the new system.",
      
      internalTechNotes: "Observation: CEO email migration request. 47GB PST file (2009-2024). Three devices requiring configuration. Board meeting window identified for zero-disruption migration.\n\nHypothesis: Large PST file would require extended migration time. Modern auth complications expected on older devices. Shared calendar permissions critical for EA workflow.\n\nActions: Coordinated with Jennifer (EA) for timing. Exchange Online P2 license assigned. PST upload initiated during meeting. Modern auth configured on iPhone 13 Pro, iPad Pro, Surface Pro 8. 127 folders preserved exactly. Legal compliance signature deployed.\n\nResult: Migration completed successfully. Zero downtime achieved. CEO initially skeptical, now enthusiastic about Teams. Jennifer very appreciative. Complex coordination could justify higher billing.",
      
      technicalDocumentation: [
        {
          title: "VIP Email Migration Process",
          items: [
            "Pre-flight: Export PST via Outlook (File > Open & Export)",
            "Verify PST integrity: scanpst.exe before upload",
            "Assign Exchange Online Plan 2 license (for 100GB mailbox)",
            "Use AzCopy for PST uploads over 20GB (faster than web)",
            "Create migration batch with priority flag",
            "Monitor via Get-MigrationUser cmdlet"
          ]
        },
        {
          title: "Executive Device Configuration",
          items: [
            "iOS: Remove old account BEFORE adding new (prevents duplicates)",
            "Enable Modern Auth: Settings > Passwords & Accounts > Exchange",
            "Surface Pro: Use Outlook profile wizard (Control Panel)",
            "Set cache mode to 12 months for performance",
            "Configure offline address book for travel",
            "Test calendar sync with EA before declaring complete"
          ]
        },
        {
          title: "Shared Calendar & Permissions",
          items: [
            "PowerShell: Add-MailboxFolderPermission -Identity CEO@domain",
            "Set EA as 'Publishing Editor' on calendar",
            "Enable automatic processing for meeting requests",
            "Configure delegation in Outlook (File > Account Settings)",
            "Test 'Send on Behalf' permissions",
            "Document all permission levels for future reference"
          ]
        },
        {
          title: "Compliance Signature Setup",
          items: [
            "Create signature in HTML format (not RTF)",
            "Deploy via transport rule for consistency",
            "New-TransportRule -Name 'CEO Signature'",
            "Include disclaimer CSS for mobile rendering",
            "Test on all devices and external recipients",
            "Save template in IT documentation"
          ]
        }
      ],
      
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
  },

  {
    id: 'network-switch-failure',
    type: 'emergency-hardware',
    priority: 'critical',
    
    typicalNotes: "Replaced failed switch. Network back up.",
    
    naturalSpeech: "Finally got the network back up at Coastal Accounting. Their main 48-port switch just died, completely unresponsive, all the lights were off. Whole office was down, nobody could work. I grabbed a spare HP switch from our stock, but it wasn't the exact model. Had to reconfigure all the VLANs from scratch - they've got separate ones for accounting, guest WiFi, and their VoIP phones. The old config backup was from 2019, so basically useless. Spent about an hour mapping out which ports went where, color coding everything. Their phone system was the trickiest part, needed specific QoS settings or the calls would drop. Sarah from accounting was freaking out because month-end is tomorrow. Got everything tested, all 37 devices back online. Should bill 5.1 hours including the emergency response. Oh, and their whole network closet is a disaster, cables everywhere, no labels. Really need to quote them for a proper cleanup.",
    
    contextualInsights: [
      { insight: 'Complete business outage detected', type: 'business-impact', timing: '4s' },
      { insight: 'VLAN configuration complexity noted', type: 'technical-complexity', timing: '10s' },
      { insight: 'Documentation gap identified', type: 'risk-assessment', timing: '14s' },
      { insight: 'VoIP QoS requirements captured', type: 'technical-requirements', timing: '20s' },
      { insight: 'Network cleanup opportunity identified', type: 'project-opportunity', timing: '35s' }
    ],
    
    documentation: {
      ticketUpdate: {
        status: "Resolved",
        priority: "Critical → Normal",
        category: "Network / Hardware Failure / Emergency",
        resolution: "Network switch replaced and fully reconfigured"
      },
      
      clientFacingNotes: "Summary: We responded to your complete network outage and have fully restored all network services.\n\nResolution: The failed primary network switch has been replaced with enterprise-grade equipment. All departments are back online including accounting systems, guest WiFi, and your phone system. We've optimized the configuration to ensure reliable performance. All 37 network devices have been tested and verified operational.\n\nNext Steps: No immediate action required - you can resume normal operations. We strongly recommend a network infrastructure assessment to prevent future outages and improve overall reliability. We've identified several areas where proactive improvements would benefit your business continuity.",
      
      internalTechNotes: "Observation: HP ProCurve 2848 switch completely dead, no power. 8+ years old. No recent config backup (last 2019). Whole office down, month-end tomorrow. Network closet is chaos - no labeling, cables everywhere.\n\nHypothesis: Age-related hardware failure. VLAN reconstruction needed from scratch. QoS critical for VoIP functionality. Sarah (Accounting) stressed about month-end processing.\n\nActions: Deployed HP 1950-48G from stock. Mapped and configured VLANs: Accounting (1-20), Guest (21-24), VoIP (25-48). Implemented 802.1p QoS for voice. MAC filtering on accounting ports. Tested all 37 devices individually. Noted UPS battery warning light.\n\nResult: Network fully restored. Month-end processing preserved. Client very receptive to infrastructure improvements. Network cleanup project opportunity identified. UPS battery replacement critical.",
      
      technicalDocumentation: [
        {
          title: "Emergency Switch Replacement",
          items: [
            "Verify switch failure: Check power supply, try different outlet",
            "Document current port connections BEFORE removal (photo)",
            "HP 1950 series default IP: 192.168.0.1",
            "Default credentials: admin/admin (CHANGE IMMEDIATELY)",
            "Enable SSH/HTTPS, disable Telnet/HTTP",
            "Backup config immediately after setup"
          ]
        },
        {
          title: "VLAN Configuration from Scratch",
          items: [
            "Create VLANs: vlan 10 name 'Accounting'",
            "Port assignment: interface range gi1/0/1-20",
            "switchport mode access, switchport access vlan 10",
            "Guest isolation: vlan 20, enable port isolation",
            "VoIP VLAN 30: enable voice vlan, set priority 5",
            "Trunk port to router: switchport mode trunk"
          ]
        },
        {
          title: "VoIP QoS Configuration",
          items: [
            "Enable QoS globally: qos type dot1p-based",
            "Voice VLAN auto-QoS: voice vlan 30 enable",
            "Set DSCP values: qos map dscp-dot1p 46 to 5",
            "Configure queue priority: priority-queue out num-of-queues 4",
            "Storm control for broadcast: storm-control broadcast 10",
            "Test with phone boot sequence and call quality"
          ]
        },
        {
          title: "Critical Business Continuity Steps",
          items: [
            "Identify business-critical ports FIRST (accounting/server)",
            "Bring these online before completing full config",
            "Test month-end software connectivity immediately",
            "Document temporary config for quick failover",
            "Schedule full cleanup during maintenance window",
            "Quote redundant switch for future failover"
          ]
        }
      ],
      
      timeEntry: {
        duration: "5.1 hours",
        breakdown: [
          "Emergency response & diagnosis: 0.6 hours",
          "Hardware replacement: 0.5 hours",
          "VLAN mapping & documentation: 1.5 hours",
          "Configuration & QoS setup: 2.0 hours",
          "Testing all connections: 0.5 hours"
        ],
        billable: "5.1 hours @ Emergency Rate",
        category: "Critical Network Outage Response"
      },
      
      systemUpdates: {
        cwTicket: "AUTO-47298 → Resolved",
        assetUpdates: "Switch replaced, new serial recorded",
        clientPortal: "Outage resolved, recommendations posted",
        billingSync: "Emergency hours submitted",
        followUpCreated: "Network cleanup project quote requested"
      }
    },
    
    intelligenceCaptured: [
      "Month-end timing creates additional business pressure",
      "Network complexity beyond initial assessment",
      "VoIP QoS requirements undocumented but critical",
      "Infrastructure risks identified (UPS, cabling, age)",
      "Client receptiveness to infrastructure improvements",
      "Lack of current documentation created significant extra work"
    ],
    
    metadata: {
      timeSavedOnDocumentation: "14 minutes",
      accuracyImprovement: "94%",
      billingRecovery: "$425 in justified complexity time",
      businessIntelligence: "Network infrastructure project opportunity valued at $8-12k"
    }
  },

  {
    id: 'ransomware-incident',
    type: 'security-response',
    priority: 'critical',
    
    typicalNotes: "Ransomware detected and contained. Restored from backup. User training needed.",
    
    naturalSpeech: "Just spent the last 6 hours at Premier Dental dealing with a ransomware hit. Started this morning when their receptionist clicked on what looked like a FedEx tracking email. By the time they called us, it had already encrypted most of her local files and was starting to hit the shared drives. I immediately yanked the network cable and started containment. The ransomware was a Lockbit variant, pretty nasty stuff. Isolated the infected machine, ran our incident response playbook. Good news is their Datto backup had a clean snapshot from 4 AM. Bad news is they lost about 3 hours of patient appointments that were only on the local system. Dr. Chen was surprisingly calm about it. Restored everything from the Datto, ran full scans on every workstation, implemented our emergency security patches. The receptionist, Monica, was in tears thinking she destroyed the practice. I spent time explaining how sophisticated these attacks are now. Set them up with our security awareness training and implemented application whitelisting on all workstations. Billing 6.3 hours but this could have been so much worse.",
    
    contextualInsights: [
      { insight: 'Ransomware variant identified', type: 'threat-intelligence', timing: '8s' },
      { insight: 'Backup system success noted', type: 'disaster-recovery', timing: '15s' },
      { insight: 'Data loss window quantified', type: 'business-impact', timing: '18s' },
      { insight: 'User training opportunity captured', type: 'security-improvement', timing: '30s' },
      { insight: 'Additional security measures implemented', type: 'preventive-action', timing: '38s' }
    ],
    
    documentation: {
      ticketUpdate: {
        status: "Resolved",
        priority: "Critical → Normal",
        category: "Security / Ransomware / Incident Response",
        resolution: "Ransomware contained, systems restored, security hardened"
      },
      
      clientFacingNotes: "Summary: We successfully contained and resolved the ransomware security incident at your practice.\n\nResolution: The infected system was immediately isolated, preventing spread to critical systems. We restored all data from your 4 AM backup, with only 3 hours of local appointment data requiring manual recovery. All systems have been thoroughly scanned and secured with enhanced protections including application controls and improved email filtering.\n\nNext Steps: All staff must complete security awareness training within 30 days. No other action is required from you. We will file the necessary documentation with your cyber insurance carrier. Your systems are now more secure than before the incident.",
      
      internalTechNotes: "Observation: Phishing email clicked by Monica (receptionist) at 8:45 AM. Lockbit 3.0 variant detected at 9:15 AM. Already encrypted local files and starting on shared drives. Monica in tears, thinks she destroyed the practice.\n\nHypothesis: 30-minute spread time before detection. Datto backup at 4 AM should be clean. ~3 hours of appointment data at risk. Staff training critical to prevent recurrence.\n\nActions: Immediate network isolation. Incident response playbook executed. Full restoration from Datto backup (2.5 hours). Manual appointment recovery from paper records. Deployed AppLocker, removed local admin rights, enabled USB restrictions. Provided emotional support to Monica.\n\nResult: Full recovery achieved. Minimal data loss. Dr. Chen understanding. Staff now hyper-vigilant about security. EDR deployment opportunity identified. Cyber insurance documentation required.",
      
      technicalDocumentation: [
        {
          title: "Ransomware Incident Response",
          items: [
            "IMMEDIATE: Disconnect network cable (not power)",
            "Document everything: Time, user, symptoms",
            "Isolate via VLAN if physical disconnect impossible",
            "Check mapped drives: net use (record all connections)",
            "Identify variant: Check ransom note filename/extension",
            "Screenshot ransom message for insurance/law enforcement"
          ]
        },
        {
          title: "Containment & Assessment",
          items: [
            "Scan network for IOCs: .lockbit extension spread",
            "Check all workstations: dir /s *.lockbit from C:\\",
            "Review shadow copies: vssadmin list shadows",
            "Verify backup integrity BEFORE restoration",
            "Check backup air gap (Datto local vs cloud)",
            "Document affected file count for insurance"
          ]
        },
        {
          title: "Datto Restoration Process",
          items: [
            "Access Datto portal, verify last clean backup",
            "Use instant virtualization for critical systems first",
            "File restore for workstations: Use BMR if extensive",
            "Restore to alternate location first, scan, then production",
            "Monitor restore job: ~100GB/hour typical speed",
            "Test restored data with users before declaring complete"
          ]
        },
        {
          title: "Post-Incident Hardening",
          items: [
            "Deploy AppLocker: Default rules + custom for practice software",
            "Remove local admin: Use LAPS for IT-only access",
            "Enable controlled folder access in Windows Defender",
            "USB restrictions: gpedit.msc > Removable Storage Access",
            "Email security: Enable ATP safe attachments",
            "Schedule security awareness training within 7 days"
          ]
        },
        {
          title: "Documentation & Compliance",
          items: [
            "Create incident report within 24 hours",
            "Include: Timeline, impact, response, lessons learned",
            "Submit to cyber insurance within policy timeframe",
            "HIPAA consideration: Assess if breach notification required",
            "Update incident response plan with lessons learned",
            "Schedule tabletop exercise within 60 days"
          ]
        }
      ],
      
      timeEntry: {
        duration: "6.3 hours",
        breakdown: [
          "Initial response & containment: 0.8 hours",
          "Forensic analysis: 1.0 hours",
          "Backup restoration: 2.5 hours",
          "Security hardening: 1.5 hours",
          "User training & documentation: 0.5 hours"
        ],
        billable: "6.3 hours @ Emergency Security Rate",
        category: "Ransomware Incident Response"
      },
      
      systemUpdates: {
        cwTicket: "AUTO-47301 → Resolved",
        assetUpdates: "Security status updated, patches recorded",
        clientPortal: "Incident summary posted privately",
        billingSync: "Security response hours approved",
        followUpCreated: "EDR deployment quote, training scheduled"
      }
    },
    
    intelligenceCaptured: [
      "Specific ransomware variant for threat intelligence",
      "Human impact and emotional support provided",
      "Backup system effectiveness validated",
      "Recovery time and data loss metrics for insurance",
      "Client receptiveness to security improvements",
      "Training needs identified from incident"
    ],
    
    metadata: {
      timeSavedOnDocumentation: "18 minutes",
      accuracyImprovement: "96%",
      billingRecovery: "$630 in justified security response time",
      businessIntelligence: "EDR opportunity ($500/month), security training contract"
    }
  },

  {
    id: 'cloud-performance-resolution',
    type: 'cloud-troubleshooting',
    priority: 'high',
    
    typicalNotes: "Fixed O365 performance issues. Adjusted sync settings and cleared cache.",
    
    naturalSpeech: "Wrapped up that Office 365 performance nightmare at Morrison Law. They've been complaining for weeks about Outlook being slow, Teams calls dropping, OneDrive sync issues. Finally got approval to dig deep today. Turns out they had multiple problems compounding. First, their internet circuit was saturated - they're still on that old 50 meg fiber connection with 85 users now, up from 40 last year. Ran some bandwidth tests, they're hitting 95% utilization during business hours. Second issue - half their computers had corrupted Outlook profiles, OST files were massive, like 40-50 gigs each. Susan's was 73 gigs! No wonder search wasn't working. Third problem - their firewall was doing deep packet inspection on all Office 365 traffic, adding latency. Disabled that for Microsoft IPs, immediate improvement. Rebuilt five of the worst Outlook profiles, set up new cache policies, limited OneDrive sync to essential folders only. The managing partner, James Morrison, sat with me while I explained why they need to upgrade to 200 meg fiber. He finally gets it now after seeing the bandwidth graphs. Also discovered they're paying for E3 licenses but using them like E1, total waste. Logged 4.7 hours but saved them from switching to Google like they were threatening.",
    
    contextualInsights: [
      { insight: 'Bandwidth limitation root cause identified', type: 'infrastructure-analysis', timing: '12s' },
      { insight: 'User growth impact quantified', type: 'capacity-planning', timing: '15s' },
      { insight: 'Multiple technical issues documented', type: 'problem-complexity', timing: '22s' },
      { insight: 'License optimization opportunity', type: 'cost-savings', timing: '40s' },
      { insight: 'Competitive threat avoided', type: 'client-retention', timing: '45s' }
    ],
    
    documentation: {
      ticketUpdate: {
        status: "Resolved",
        priority: "High → Normal",
        category: "Cloud Services / Performance / Office 365",
        resolution: "Multiple performance issues identified and resolved"
      },
      
      clientFacingNotes: "Summary: We've resolved the Office 365 performance issues that were impacting your firm's productivity.\n\nResolution: We identified three root causes: bandwidth limitations, corrupted Outlook files, and firewall configuration issues. All have been addressed. Your email is now running smoothly, Teams calls are clear, and OneDrive sync is optimized. We've seen an immediate 70% reduction in performance complaints.\n\nNext Steps: To maintain optimal performance as your firm continues to grow, we strongly recommend upgrading to the 200Mbps fiber circuit we discussed. Additionally, we've identified an opportunity to save $1,700/month by optimizing your Office 365 licenses to match your actual usage.",
      
      internalTechNotes: "Observation: Morrison Law experiencing widespread O365 issues. 85 users on 50Mbps circuit (was 40 users in 2019). Outlook slow, Teams dropping, OneDrive sync failing. James Morrison threatening to switch to Google.\n\nHypothesis: Bandwidth saturation primary cause. Large OST files compounding issue (Susan: 73GB!). Firewall DPI adding latency. E3 licenses underutilized (paying for unused features).\n\nActions: Bandwidth testing showed 95% utilization. Rebuilt 5 worst Outlook profiles. Disabled DPI for Microsoft IPs (immediate Teams improvement). Limited cache to 12 months. Configured OneDrive selective sync. Showed James bandwidth graphs - got buy-in for upgrade.\n\nResult: 70% reduction in complaints. Bandwidth upgrade approved. Google threat neutralized. $1,700/month license savings opportunity identified. Client now understands infrastructure needs.",
      
      technicalDocumentation: [
        {
          title: "Office 365 Performance Diagnostics",
          items: [
            "Run Microsoft Support and Recovery Assistant (SaRA)",
            "Check bandwidth: speedtest.net during peak hours",
            "Calculate per-user needs: 85 users × 1.5Mbps = 127Mbps minimum",
            "Review firewall logs for blocked Microsoft IPs",
            "Test with: nslookup outlook.office365.com",
            "Document latency: ping -t outlook.office365.com"
          ]
        },
        {
          title: "Large OST File Remediation",
          items: [
            "Identify large OSTs: Get-ChildItem *.ost -Recurse | Sort Length",
            "Export to PST if over 50GB before rebuilding",
            "Delete OST: Close Outlook, rename .ost to .old",
            "Set cache mode: File > Account Settings > Change > More Settings",
            "Limit to 12 months for most users, 3 months for large mailboxes",
            "Enable slider: 'Download headers for large items'"
          ]
        },
        {
          title: "Firewall Optimization for O365",
          items: [
            "Download Microsoft IP list: aka.ms/o365endpoints",
            "Create firewall bypass rule for 'Optimize' category IPs",
            "Disable DPI/SSL inspection for Teams media ports",
            "UDP ports 3478-3481 must bypass inspection",
            "Test with: Teams > Settings > Call > Make test call",
            "Monitor CPU usage on firewall after changes"
          ]
        },
        {
          title: "OneDrive Selective Sync",
          items: [
            "Right-click OneDrive icon > Settings > Account tab",
            "Click 'Choose folders' - uncheck large/unused folders",
            "Use Files On-Demand for archive folders",
            "Set GPO: 'Silently configure OneDrive using primary account'",
            "Limit sync bandwidth during business hours",
            "Monitor: Get-Process OneDrive | Select CPU, WS"
          ]
        },
        {
          title: "License Optimization Analysis",
          items: [
            "Export usage: Microsoft 365 admin > Reports > Usage",
            "Compare E3 features vs actual usage",
            "Common waste: Power BI Pro, Advanced eDiscovery unused",
            "Calculate savings: (E3 $35 - E1 $8) × 85 users = $2,295/month",
            "Keep E3 for power users only (identify via usage reports)",
            "Document feature requirements before downgrading"
          ]
        }
      ],
      
      timeEntry: {
        duration: "4.7 hours",
        breakdown: [
          "Performance analysis & testing: 1.2 hours",
          "Outlook profile rebuilds: 1.8 hours",
          "Firewall optimization: 0.7 hours",
          "Client education & planning: 1.0 hours"
        ],
        billable: "4.7 hours @ Cloud Services Rate",
        category: "Office 365 Performance Optimization"
      },
      
      systemUpdates: {
        cwTicket: "AUTO-47289 → Resolved",
        assetUpdates: "Bandwidth requirements documented",
        clientPortal: "Performance report with recommendations",
        billingSync: "Cloud optimization hours recorded",
        followUpCreated: "Bandwidth upgrade project, license review"
      }
    },
    
    intelligenceCaptured: [
      "User growth impact on infrastructure planning",
      "Competitive threat (Google) used as retention lever",
      "License overspend opportunity for cost recovery",
      "Complex multi-factor performance issues documented",
      "Decision maker education achieved during resolution",
      "Long-standing issues resolved preventing future churn"
    ],
    
    metadata: {
      timeSavedOnDocumentation: "11 minutes",
      accuracyImprovement: "93%",
      billingRecovery: "$235 in comprehensive analysis time",
      businessIntelligence: "Bandwidth upgrade project, $20k/year license savings opportunity"
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