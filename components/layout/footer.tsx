import Link from 'next/link'
import { Shield } from 'lucide-react'

const footerLinks = {
  Product: [
    { name: 'How it Works', href: '/#how-it-works' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Security', href: '/security' },
  ],
  Company: [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
  ],
  Resources: [
    { name: 'Documentation', href: '/docs' },
    { name: 'API Reference', href: '/api-docs' },
    { name: 'Status', href: '/status' },
  ],
  Legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Logo and Description */}
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-8 h-8 bg-gradient-security rounded-lg">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">ProdSafe</span>
              </Link>
              <p className="mt-4 text-gray-400 max-w-md">
                Secure your AI-generated code with comprehensive vulnerability scanning. 
                Get plain-English fixes in 60 seconds.
              </p>
              <div className="mt-6 text-sm text-gray-400">
                <p>Trusted by 500+ developers</p>
                <p>1000+ vulnerabilities detected</p>
              </div>
            </div>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                  {category}
                </h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} ProdSafe. All rights reserved.
            </p>
            <div className="mt-4 sm:mt-0 flex items-center space-x-6">
              <p className="text-gray-400 text-sm">
                Built with security in mind
              </p>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span>All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}