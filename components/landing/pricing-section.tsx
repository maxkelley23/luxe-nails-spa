import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, Star, Zap } from 'lucide-react'
import { SUBSCRIPTION_PLANS } from '@/lib/utils/constants'

const plans = [
  {
    name: SUBSCRIPTION_PLANS.free.name,
    price: SUBSCRIPTION_PLANS.free.price,
    description: 'Perfect for trying out ProdSafe',
    features: SUBSCRIPTION_PLANS.free.features,
    cta: 'Start Free',
    ctaVariant: 'outline' as const,
    popular: false,
    scansPerMonth: SUBSCRIPTION_PLANS.free.scansPerMonth,
  },
  {
    name: SUBSCRIPTION_PLANS.pro.name,
    price: SUBSCRIPTION_PLANS.pro.price,
    description: 'For teams and growing startups',
    features: SUBSCRIPTION_PLANS.pro.features,
    cta: 'Start Pro Trial',
    ctaVariant: 'default' as const,
    popular: true,
    scansPerMonth: SUBSCRIPTION_PLANS.pro.scansPerMonth,
  },
]

export function PricingSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start free, scale as you grow. No hidden fees or complex tiers.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                plan.popular 
                  ? 'ring-2 ring-blue-500 transform scale-105' 
                  : 'hover:shadow-lg'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <Badge className="rounded-none rounded-bl-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-gray-600 mt-2">
                  {plan.description}
                </CardDescription>
                
                {/* Price */}
                <div className="mt-6">
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold text-gray-900">
                      ${plan.price === 0 ? '0' : (plan.price / 100).toString()}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-xl text-gray-600 ml-1">/month</span>
                    )}
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    {plan.scansPerMonth === -1 
                      ? 'Unlimited scans' 
                      : `${plan.scansPerMonth} scans per month`
                    }
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Features List */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link href="/sign-up" className="block">
                  <Button 
                    className={`w-full py-6 text-lg font-semibold ${
                      plan.ctaVariant === 'default' 
                        ? 'gradient-security text-white border-0 hover:opacity-90' 
                        : 'hover:bg-blue-50 border-blue-200'
                    }`}
                    variant={plan.ctaVariant}
                  >
                    {plan.cta}
                    {plan.popular && <Zap className="ml-2 w-5 h-5" />}
                  </Button>
                </Link>

                {/* Additional Info */}
                {plan.name === 'Free' && (
                  <p className="text-center text-sm text-gray-500 mt-4">
                    No credit card required
                  </p>
                )}
                {plan.name === 'Pro' && (
                  <p className="text-center text-sm text-gray-500 mt-4">
                    14-day free trial • Cancel anytime
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              All plans include:
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                'Multi-language support',
                'Plain-English explanations',
                'AI fix prompts',
                'PDF report generation',
                'Email support',
                'SOC 2 compliant'
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-center md:justify-start">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-gray-600">
                Questions about our pricing?{' '}
                <Link href="/contact" className="text-blue-600 hover:underline font-medium">
                  Contact our team
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}