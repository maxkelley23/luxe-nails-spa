'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: 'What types of code do you scan?',
    answer: 'ProdSafe supports 20+ programming languages including JavaScript/TypeScript, Python, Java, PHP, Go, Ruby, C#, and more. We scan web applications, APIs, mobile backends, and any code that AI tools like ChatGPT or Claude might generate.',
  },
  {
    question: 'How accurate is the scanning?',
    answer: 'Our AI-powered scanner has a 95% accuracy rate with minimal false positives. We use advanced machine learning models trained on millions of code samples, combined with industry-standard security tools like OWASP guidelines and CVE databases.',
  },
  {
    question: 'Can I scan private repositories?',
    answer: 'Yes! You can upload ZIP files or connect private GitHub repositories. Your code is processed securely in isolated containers and automatically deleted after scanning. We never store your code permanently.',
  },
  {
    question: 'What happens to my code after scanning?',
    answer: 'Your code is processed in secure, isolated containers and automatically deleted within 24 hours. We only retain the vulnerability report and metadata. ProdSafe is SOC 2 compliant and follows strict data protection protocols.',
  },
  {
    question: 'Do you store my code?',
    answer: 'No, we do not store your source code. Code is temporarily processed for scanning and then permanently deleted. Only the security report and anonymized metadata are retained for your account.',
  },
  {
    question: 'How is this different from other security tools?',
    answer: 'Traditional security tools are built for security experts with cryptic error messages. ProdSafe is designed for non-technical founders - we explain vulnerabilities in plain English and provide ready-to-use AI prompts for fixes.',
  },
  {
    question: 'Can I integrate ProdSafe with my development workflow?',
    answer: 'Yes! Pro users get API access to integrate ProdSafe into CI/CD pipelines, GitHub Actions, or development workflows. We also offer webhook notifications and custom integrations.',
  },
  {
    question: 'What if I need help understanding a vulnerability?',
    answer: 'Every vulnerability report includes plain-English explanations, impact assessments, and step-by-step fix instructions. Pro users also get priority email support from our security team.',
  },
]

export function FAQSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about securing your AI-generated code
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-gray-200 rounded-lg px-6"
            >
              <AccordionTrigger className="text-left hover:no-underline py-6 text-lg font-semibold text-gray-900">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-6 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12 border border-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our security experts are here to help. Get in touch for personalized support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:support@prodsafe.com" 
                className="inline-flex items-center justify-center px-6 py-3 border border-blue-200 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
              >
                Email Support
              </a>
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-security text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Schedule a Call
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}