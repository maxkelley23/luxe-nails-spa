export const APP_CONFIG = {
  name: 'ProdSafe',
  description: 'Security scanning for AI-generated code',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  supportEmail: 'support@prodsafe.com',
  maxFileSize: 100 * 1024 * 1024, // 100MB
  allowedFileTypes: ['.zip', '.tar', '.gz', '.rar'],
  freeScansLimit: 3,
}

export const SUBSCRIPTION_PLANS = {
  free: {
    name: 'Free',
    price: 0,
    scansPerMonth: 3,
    features: [
      'Basic vulnerability detection',
      'Email support',
      'PDF reports',
      '3 scans per month'
    ]
  },
  pro: {
    name: 'Pro',
    price: 2900, // in cents
    scansPerMonth: -1, // unlimited
    features: [
      'Advanced vulnerability detection',
      'Priority support',
      'API access',
      'Unlimited scans',
      'Custom integrations',
      'Detailed analytics'
    ]
  }
} as const

export const VULNERABILITY_SEVERITY = {
  critical: {
    label: 'Critical',
    color: 'text-red-600 bg-red-50 border-red-200',
    icon: '🔴'
  },
  high: {
    label: 'High',
    color: 'text-orange-600 bg-orange-50 border-orange-200',
    icon: '🟠'
  },
  medium: {
    label: 'Medium',
    color: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    icon: '🟡'
  },
  low: {
    label: 'Low',
    color: 'text-blue-600 bg-blue-50 border-blue-200',
    icon: '🔵'
  }
} as const

export const VULNERABILITY_TYPES = {
  exposed_secret: 'Exposed Secret',
  sql_injection: 'SQL Injection',
  xss: 'Cross-Site Scripting',
  outdated_dependency: 'Outdated Dependency',
  insecure_config: 'Insecure Configuration',
  weak_authentication: 'Weak Authentication',
  data_exposure: 'Data Exposure',
  insecure_transport: 'Insecure Transport'
} as const

export const SCAN_STATUS = {
  pending: {
    label: 'Pending',
    color: 'text-gray-600 bg-gray-50',
    icon: '⏳'
  },
  scanning: {
    label: 'Scanning',
    color: 'text-blue-600 bg-blue-50',
    icon: '🔍'
  },
  completed: {
    label: 'Completed',
    color: 'text-green-600 bg-green-50',
    icon: '✅'
  },
  failed: {
    label: 'Failed',
    color: 'text-red-600 bg-red-50',
    icon: '❌'
  }
} as const