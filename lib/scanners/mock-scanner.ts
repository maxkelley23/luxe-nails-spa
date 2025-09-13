import type { Vulnerability } from '@/types/database'

interface MockVulnerabilityTemplate {
  severity: 'critical' | 'high' | 'medium' | 'low'
  type: string
  title: string
  description: string
  file_path: string
  line_number: number
  code_snippet: string
  fix_description: string
  ai_fix_prompt: string
  cve_id?: string
}

const MOCK_VULNERABILITIES: MockVulnerabilityTemplate[] = [
  {
    severity: 'critical',
    type: 'exposed_secret',
    title: 'AWS Access Key Exposed in Environment File',
    description: 'Your AWS access key is hardcoded in a configuration file. This means anyone with access to your code can use your AWS account, potentially racking up charges or accessing sensitive data.',
    file_path: '.env',
    line_number: 12,
    code_snippet: 'AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE\nAWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
    fix_description: 'Remove hardcoded credentials from your code. Use environment variables or a secure secret management service instead.',
    ai_fix_prompt: 'Replace the hardcoded AWS credentials with environment variables. Update the code to use process.env.AWS_ACCESS_KEY_ID and process.env.AWS_SECRET_ACCESS_KEY instead of hardcoded values. Also add these variables to your deployment environment securely.'
  },
  {
    severity: 'high',
    type: 'sql_injection',
    title: 'SQL Injection Vulnerability in User Login',
    description: 'Your database query directly includes user input without sanitization. An attacker could manipulate the SQL query to access unauthorized data or modify your database.',
    file_path: 'src/auth/login.js',
    line_number: 45,
    code_snippet: 'const query = `SELECT * FROM users WHERE email = \'${email}\' AND password = \'${password}\'`;',
    fix_description: 'Use parameterized queries or prepared statements instead of string concatenation.',
    ai_fix_prompt: 'Replace this SQL query with a parameterized query using placeholders. For example: "SELECT * FROM users WHERE email = ? AND password = ?" and pass the email and password as parameters to prevent SQL injection attacks.'
  },
  {
    severity: 'high',
    type: 'weak_authentication',
    title: 'Passwords Stored Without Hashing',
    description: 'User passwords are being stored as plain text in the database. If your database is compromised, all user passwords would be immediately accessible.',
    file_path: 'src/auth/register.js',
    line_number: 23,
    code_snippet: 'await db.users.create({ email, password: password });',
    fix_description: 'Hash passwords before storing them using a secure hashing algorithm like bcrypt.',
    ai_fix_prompt: 'Install bcrypt library and hash the password before storing it. Replace the password storage with: "const hashedPassword = await bcrypt.hash(password, 10); await db.users.create({ email, password: hashedPassword });"'
  },
  {
    severity: 'medium',
    type: 'xss',
    title: 'Unescaped User Input in HTML Template',
    description: 'User-generated content is being displayed without proper escaping, which could allow attackers to inject malicious scripts.',
    file_path: 'src/components/UserProfile.jsx',
    line_number: 18,
    code_snippet: '<div dangerouslySetInnerHTML={{__html: userBio}} />',
    fix_description: 'Escape user input or use a safe HTML sanitizer before rendering.',
    ai_fix_prompt: 'Replace dangerouslySetInnerHTML with safe rendering. Either use regular JSX like "<div>{userBio}</div>" for plain text, or install and use a library like DOMPurify to sanitize HTML if you need to allow some HTML formatting.'
  },
  {
    severity: 'medium',
    type: 'insecure_transport',
    title: 'HTTP Used Instead of HTTPS',
    description: 'API calls are being made over HTTP instead of HTTPS, which means data is transmitted without encryption.',
    file_path: 'src/utils/api.js',
    line_number: 7,
    code_snippet: 'const API_BASE_URL = \'http://api.yourapp.com\';',
    fix_description: 'Always use HTTPS for API communications to encrypt data in transit.',
    ai_fix_prompt: 'Change the API base URL from HTTP to HTTPS: "const API_BASE_URL = \'https://api.yourapp.com\';" Also ensure your server supports HTTPS and redirects HTTP requests to HTTPS.'
  },
  {
    severity: 'medium',
    type: 'outdated_dependency',
    title: 'Vulnerable React Version Detected',
    description: 'Your project uses an outdated version of React with known security vulnerabilities.',
    file_path: 'package.json',
    line_number: 15,
    code_snippet: '"react": "^16.8.0"',
    fix_description: 'Update React to the latest stable version to get security patches.',
    ai_fix_prompt: 'Update your React dependency to the latest stable version. Run "npm update react react-dom" or update your package.json to use "react": "^18.0.0" and run npm install.',
    cve_id: 'CVE-2021-44906'
  },
  {
    severity: 'low',
    type: 'data_exposure',
    title: 'Console.log Statements Exposing User Data',
    description: 'Debug console.log statements are still present in production code, potentially exposing sensitive user information.',
    file_path: 'src/components/UserDashboard.jsx',
    line_number: 31,
    code_snippet: 'console.log("User data:", userData);',
    fix_description: 'Remove console.log statements from production code or use a proper logging service.',
    ai_fix_prompt: 'Remove all console.log statements that contain sensitive data. Replace with proper logging: either delete the console.log entirely, or use a logging library like Winston that can be configured differently for development and production.'
  },
  {
    severity: 'low',
    type: 'insecure_config',
    title: 'CORS Configuration Too Permissive',
    description: 'Your CORS policy allows requests from any origin, which could enable cross-site attacks.',
    file_path: 'server.js',
    line_number: 12,
    code_snippet: 'app.use(cors({ origin: "*" }));',
    fix_description: 'Restrict CORS to only allow requests from your specific domains.',
    ai_fix_prompt: 'Replace the wildcard CORS origin with specific domains: "app.use(cors({ origin: [\'https://yourapp.com\', \'https://www.yourapp.com\'] }));" Only include the domains that actually need to access your API.'
  }
]

export async function performMockScan(
  scanId: string,
  projectName: string,
  fileContent?: string
): Promise<{ vulnerabilities: Omit<Vulnerability, 'id' | 'created_at'>[], totalCount: number }> {
  
  await new Promise(resolve => setTimeout(resolve, Math.random() * 5000 + 3000))

  const vulnerabilityCount = Math.floor(Math.random() * 6) + 2
  const selectedVulnerabilities = MOCK_VULNERABILITIES
    .sort(() => 0.5 - Math.random())
    .slice(0, vulnerabilityCount)

  const vulnerabilities = selectedVulnerabilities.map(template => ({
    scan_id: scanId,
    severity: template.severity,
    type: template.type,
    title: template.title,
    description: template.description,
    file_path: template.file_path,
    line_number: template.line_number,
    code_snippet: template.code_snippet,
    fix_description: template.fix_description,
    ai_fix_prompt: template.ai_fix_prompt,
    cve_id: template.cve_id || null,
  }))

  const totalCount = vulnerabilities.length

  return {
    vulnerabilities,
    totalCount
  }
}

export function calculateVulnerabilityCount(vulnerabilities: Array<{ severity: string }>) {
  return {
    critical: vulnerabilities.filter(v => v.severity === 'critical').length,
    high: vulnerabilities.filter(v => v.severity === 'high').length,
    medium: vulnerabilities.filter(v => v.severity === 'medium').length,
    low: vulnerabilities.filter(v => v.severity === 'low').length,
  }
}