import { AlertTriangle, Code, Shield } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const problems = [
  {
    icon: AlertTriangle,
    title: 'AI Makes Security Mistakes',
    description: 'ChatGPT and Claude generate code with common vulnerabilities like exposed secrets, SQL injection, and weak authentication.',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
  },
  {
    icon: Code,
    title: 'Complex Security Jargon',
    description: 'Traditional security tools give you cryptic error messages that require years of experience to understand.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
  {
    icon: Shield,
    title: 'Expensive Security Audits',
    description: 'Hiring security experts costs $10,000+ and takes weeks. Most founders skip security until its too late.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
]

export function ProblemSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            78% of AI-Generated Code
            <br />
            Contains Security Vulnerabilities
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            AI tools like ChatGPT and Claude are incredible for speed, but they create code 
            with serious security flaws that could expose your business to attacks.
          </p>
        </div>

        {/* Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, index) => {
            const Icon = problem.icon
            return (
              <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className={`flex items-center justify-center w-16 h-16 rounded-full ${problem.bgColor} mb-6`}>
                    <Icon className={`w-8 h-8 ${problem.color}`} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {problem.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {problem.description}
                  </p>
                  
                  {/* Decorative Element */}
                  <div className={`absolute top-0 right-0 w-20 h-20 ${problem.bgColor} rounded-full -mr-10 -mt-10 opacity-20`}></div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Stats */}
        <div className="mt-16 bg-gray-50 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">78%</div>
              <div className="text-gray-600">of AI code has vulnerabilities</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">$4.5M</div>
              <div className="text-gray-600">average cost of a data breach</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">60%</div>
              <div className="text-gray-600">of startups ignore security</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}