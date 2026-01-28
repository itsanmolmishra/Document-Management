// Realistic Emirates names and departments for Dubai Finance Department
const emiratesNames = [
  "Ahmed Al Maktoum", "Fatima Al Hashemi", "Mohammed Al Ketbi", "Sara Al Mansouri",
  "Abdullah Al Falasi", "Layla Al Suwaidi", "Rashid Al Mazrouei", "Mariam Al Nuaimi",
  "Khalid Al Kaabi", "Noura Al Zaabi", "Sultan Al Dhaheri", "Hessa Al Shamsi",
  "Saeed Al Qasimi", "Aisha Al Muhairi", "Hamad Al Ameri", "Shamma Al Mazroui"
];

const departments = [
  "Finance", "Procurement", "HR", "Legal", "IT", "Compliance", 
  "Operations", "Strategy", "Audit", "Treasury"
];

const documentTypes = [
  "Financial Report", "Policy Document", "Contract", "Budget", "Audit", 
  "Memorandum", "Invoice", "Tender", "Compliance Report", "Strategic Plan"
];

const classifications = ["Public", "Internal", "Confidential", "Restricted", "Secret"];

// Generate timestamps with variety
const getRealisticTimestamp = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  date.setHours(Math.floor(Math.random() * 12) + 8); // Between 8 AM - 8 PM
  date.setMinutes(Math.floor(Math.random() * 60));
  return date;
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
};

const getTimeAgo = (date: Date) => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffMins < 60) return `${diffMins} mins ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  return formatDate(date);
};

// Enhanced documents with realistic data
export const documents = [
  { 
    id: 'DOC-2025-00128', 
    name: "Dubai 2025 Annual Budget Allocation Plan", 
    type: "Financial Report", 
    classification: "Confidential", 
    owner: "Ahmed Al Maktoum", 
    department: "Finance",
    date: formatDate(getRealisticTimestamp(2)),
    created: getRealisticTimestamp(15),
    modified: getRealisticTimestamp(2),
    status: "Under Review",
    size: "2.4 MB",
    version: "v3.2",
    tags: ["budget", "2025", "strategic"],
    retentionYears: 10,
    approver: "Fatima Al Hashemi"
  },
  { 
    id: 'DOC-2025-00127', 
    name: "Q4 2024 Expenditure Analysis Report", 
    type: "Financial Report", 
    classification: "Internal", 
    owner: "Sara Al Mansouri", 
    department: "Finance",
    date: formatDate(getRealisticTimestamp(5)),
    created: getRealisticTimestamp(20),
    modified: getRealisticTimestamp(5),
    status: "Approved",
    size: "1.8 MB",
    version: "v2.0",
    tags: ["expenditure", "Q4", "analysis"],
    retentionYears: 7,
    approver: "Mohammed Al Ketbi"
  },
  { 
    id: 'DOC-2024-00892', 
    name: "IT Infrastructure Procurement Policy 2025", 
    type: "Policy Document", 
    classification: "Public", 
    owner: "Abdullah Al Falasi", 
    department: "IT",
    date: formatDate(getRealisticTimestamp(45)),
    created: getRealisticTimestamp(60),
    modified: getRealisticTimestamp(45),
    status: "Active",
    size: "892 KB",
    version: "v2.1",
    tags: ["IT", "procurement", "policy"],
    retentionYears: 5,
    approver: "Khalid Al Kaabi"
  },
  { 
    id: 'DOC-2024-00756', 
    name: "Vendor Master Agreement - Etisalat UAE", 
    type: "Contract", 
    classification: "Restricted", 
    owner: "Mariam Al Nuaimi", 
    department: "Legal",
    date: formatDate(getRealisticTimestamp(60)),
    created: getRealisticTimestamp(90),
    modified: getRealisticTimestamp(60),
    status: "Archived",
    size: "3.2 MB",
    version: "v1.0",
    tags: ["contract", "vendor", "telecommunications"],
    retentionYears: 15,
    approver: "Layla Al Suwaidi"
  },
  { 
    id: 'DOC-2025-00015', 
    name: "Employee Handbook & Code of Conduct 2025", 
    type: "Policy Document", 
    classification: "Internal", 
    owner: "Noura Al Zaabi", 
    department: "HR",
    date: formatDate(getRealisticTimestamp(22)),
    created: getRealisticTimestamp(30),
    modified: getRealisticTimestamp(22),
    status: "Active",
    size: "1.2 MB",
    version: "v5.0",
    tags: ["HR", "handbook", "policy"],
    retentionYears: 3,
    approver: "Hessa Al Shamsi"
  },
  { 
    id: 'DOC-2025-00001', 
    name: "December 2024 Comprehensive Audit Trail", 
    type: "Audit", 
    classification: "Confidential", 
    owner: "Rashid Al Mazrouei", 
    department: "Audit",
    date: formatDate(getRealisticTimestamp(27)),
    created: getRealisticTimestamp(27),
    modified: getRealisticTimestamp(27),
    status: "Locked",
    size: "5.6 MB",
    version: "v1.0",
    tags: ["audit", "december", "compliance"],
    retentionYears: 10,
    approver: "System"
  },
  { 
    id: 'DOC-2024-00563', 
    name: "Smart City Initiative - Project Phoenix Technical Specs", 
    type: "Strategic Plan", 
    classification: "Secret", 
    owner: "Sultan Al Dhaheri", 
    department: "Strategy",
    date: formatDate(getRealisticTimestamp(108)),
    created: getRealisticTimestamp(120),
    modified: getRealisticTimestamp(108),
    status: "Approved",
    size: "8.9 MB",
    version: "v4.3",
    tags: ["smart-city", "strategic", "phoenix"],
    retentionYears: 20,
    approver: "Ahmed Al Maktoum"
  },
  { 
    id: 'DOC-2025-00098', 
    name: "Procurement Tender RFP-2025-034 - Cloud Services", 
    type: "Tender", 
    classification: "Confidential", 
    owner: "Aisha Al Muhairi", 
    department: "Procurement",
    date: formatDate(getRealisticTimestamp(8)),
    created: getRealisticTimestamp(12),
    modified: getRealisticTimestamp(8),
    status: "Under Review",
    size: "1.5 MB",
    version: "v1.2",
    tags: ["tender", "cloud", "procurement"],
    retentionYears: 7,
    approver: "Mohammed Al Ketbi"
  },
];

export const auditLogs = [
  { 
    id: 'AUD-000245', 
    user: "Ahmed Al Maktoum", 
    action: "Upload", 
    document: "Dubai 2025 Annual Budget Allocation Plan", 
    timestamp: getRealisticTimestamp(0),
    time: formatTime(getRealisticTimestamp(0)),
    ip: "10.20.1.45",
    location: "Dubai Finance HQ - Floor 12",
    device: "Windows Workstation"
  },
  { 
    id: 'AUD-000244', 
    user: "Fatima Al Hashemi", 
    action: "Approve", 
    document: "Q4 2024 Expenditure Analysis Report", 
    timestamp: getRealisticTimestamp(0),
    time: formatTime(getRealisticTimestamp(0)),
    ip: "10.20.1.52",
    location: "Dubai Finance HQ - Floor 10",
    device: "MacOS Desktop"
  },
  { 
    id: 'AUD-000243', 
    user: "Saeed Al Qasimi", 
    action: "Archive", 
    document: "Historical Budget Records 2020", 
    timestamp: getRealisticTimestamp(1),
    time: formatTime(getRealisticTimestamp(1)),
    ip: "10.20.2.18",
    location: "Archive Facility - Deira",
    device: "Tablet Device"
  },
  { 
    id: 'AUD-000242', 
    user: "System Administrator", 
    action: "Backup", 
    document: "Full Database Backup", 
    timestamp: getRealisticTimestamp(1),
    time: "02:00 AM",
    ip: "10.20.0.1",
    location: "Data Center",
    device: "Server - Automated"
  },
  { 
    id: 'AUD-000241', 
    user: "Mariam Al Nuaimi", 
    action: "Download", 
    document: "Vendor Master Agreement - Etisalat UAE", 
    timestamp: getRealisticTimestamp(1),
    time: formatTime(getRealisticTimestamp(1)),
    ip: "10.20.1.88",
    location: "Dubai Finance HQ - Floor 8",
    device: "iPhone - Mobile App"
  },
  { 
    id: 'AUD-000240', 
    user: "Compliance Monitor", 
    action: "Flag", 
    document: "Suspicious Transaction Invoice #INV-2024-9920", 
    timestamp: getRealisticTimestamp(2),
    time: formatTime(getRealisticTimestamp(2)),
    ip: "10.20.3.25",
    location: "Compliance Center",
    device: "Security Workstation"
  },
];

export const stats = {
  staff: [
    { name: "My Documents", value: 128 },
    { name: "Pending", value: 3 },
    { name: "Drafts", value: 12 },
  ],
  manager: [
    { name: "Pending Approvals", value: 7 },
    { name: "Reviewed", value: 45 },
    { name: "Rejected", value: 2 },
  ],
  records: [
    { name: "Due for Archival", value: 24 },
    { name: "Archived", value: 180 },
    { name: "Disposed", value: 5 },
  ],
  compliance: [
    { name: "Audit Events", value: 214 },
    { name: "Violations", value: 2 },
    { name: "High Risk", value: 0 },
  ]
};