import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Check, Sparkles, Ship, Telescope, Microscope } from 'lucide-react';

const plans = [
  {
    name: 'Explorer Plan',
    price: 0,
    icon: Ship,
    color: 'from-gray-500 to-gray-600',
    badge: 'Free',
    badgeColor: 'bg-gray-600',
    features: [
      'Access to limited voyages',
      'Basic ship and destination info',
      'Teaser 360° clips and mission updates',
      'Includes ads',
    ],
  },
  {
    name: 'Voyager Plan',
    price: 4,
    icon: Compass,
    color: 'from-blue-500 to-blue-600',
    badge: 'Popular',
    badgeColor: 'bg-blue-600',
    features: [
      'Live ship tracking',
      'Basic crew info and voyage stats',
      'Partial 360° camera access (outside only)',
      'Access to community and discussions',
      'Ad-free experience',
      'Access to live ship tracking',
    ],
  },
  {
    name: 'Expedition Plan',
    price: 8,
    icon: Telescope,
    color: 'from-cyan-500 to-cyan-600',
    badge: 'Best Value',
    badgeColor: 'bg-cyan-600',
    features: [
      'Full real-time tracking and route data',
      'Detailed ship and crew information',
      'Questions to the ship\'s crew',
      'Extended 360° access (interior + exterior)',
      'Monthly behind-the-scenes briefings',
      'Water pollution and environmental data',
    ],
  },
  {
    name: 'Scientific Plan',
    price: 15,
    icon: Microscope,
    color: 'from-purple-500 to-purple-600',
    badge: 'Premium',
    badgeColor: 'bg-purple-600',
    features: [
      'Priority Q&A with captain and scientists',
      'Full 360° immersion access everywhere',
      'Access to raw scientific data and research updates',
      'Participation in live lectures and expedition briefings',
      'Digital certificate: Scientific Partner of the Antarctic Mission',
      'Completely ad-free',
    ],
  },
];

// Import Compass for Voyager icon
import { Compass } from 'lucide-react';

export function SubscriptionPlans() {
  return (
    <div className="py-4">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-4">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span className="text-sm text-blue-600">Choose Your Adventure</span>
        </div>
        <h1 className="mb-3">ArcNIK Subscription Plans</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Join the NIK 421 Antarctic Expedition with exclusive access to live tracking, 
          360° immersive content, and scientific data from the journey
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const isPopular = plan.badge === 'Best Value';
          
          return (
            <Card
              key={plan.name}
              className={`relative overflow-hidden transition-all hover:shadow-xl ${
                isPopular ? 'ring-2 ring-cyan-400' : ''
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute top-6 right-6 z-10">
                  <Badge className={`${plan.badgeColor} text-white text-sm px-3 py-1`}>
                    {plan.badge}
                  </Badge>
                </div>
              )}

              {/* Header */}
              <div className={`p-8 bg-gradient-to-br ${plan.color} text-white`}>
                <Icon className="w-12 h-12 mb-4" />
                <h3 className="text-2xl mb-3">{plan.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl">€{plan.price}</span>
                  <span className="text-xl text-white/80">/ month</span>
                </div>
              </div>

              {/* Features */}
              <div className="p-8">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                      <span className="text-base text-gray-700 leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Subscribe Button */}
                <Button
                  className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 text-white text-base py-6`}
                  size="lg"
                >
                  {plan.price === 0 ? 'Start Free' : 'Subscribe Now'}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <Ship className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg">Live from Antarctica</h3>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            Experience the NIK 421 expedition in real-time with exclusive access to ship tracking, 
            360° cameras, and crew communications.
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
              <Telescope className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg">Scientific Discovery</h3>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            Access real scientific data, environmental monitoring, and participate in 
            groundbreaking Antarctic research.
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
              <Microscope className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg">Cancel Anytime</h3>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            No long-term commitment required. Upgrade, downgrade, or cancel your subscription 
            at any time with full flexibility.
          </p>
        </Card>
      </div>

      {/* FAQ Section */}
      <div className="mt-8 text-center">
        <p className="text-gray-600 mb-4">
          Questions about our plans? <a href="#" className="text-blue-600 hover:underline">Contact our support team</a>
        </p>
        <p className="text-sm text-gray-500">
          All plans include access to the ArcNIK mobile app and web platform. 
          Prices are in EUR and billed monthly.
        </p>
      </div>
    </div>
  );
}