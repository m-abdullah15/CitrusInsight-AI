import Navbar from '../../components/common/Navbar';
import { Microscope, TrendingUp, Calendar, History } from 'lucide-react';

const OurServices = () => {
  const services = [
    {
      icon: Microscope,
      title: 'Disease Detection',
      description: 'Advanced AI-powered citrus disease detection system that identifies plant diseases with remarkable accuracy. Upload images of your citrus plants and receive instant diagnosis with detailed information about the disease, its symptoms, and recommended treatments.',
      features: [
        'Real-time disease identification',
        'High accuracy AI models',
        'Detailed disease information',
        'Treatment recommendations',
        'Multiple disease detection'
      ],
      gradient: 'from-green-400 to-emerald-600',
      bgGradient: 'from-green-50 to-emerald-50'
    },
    {
      icon: TrendingUp,
      title: 'Trade Dashboard',
      description: 'Comprehensive analytics and insights for your citrus farming business. Monitor market trends, track prices, analyze demand patterns, and make data-driven decisions to maximize your profits and optimize your farming operations.',
      features: [
        'Real-time market prices',
        'Demand forecasting',
        'Profit analytics',
        'Market trend analysis',
        'Export opportunities'
      ],
      gradient: 'from-blue-400 to-indigo-600',
      bgGradient: 'from-blue-50 to-indigo-50'
    },
    {
      icon: Calendar,
      title: 'Yearly Planner',
      description: 'Smart agricultural planning tool designed specifically for citrus farmers. Plan your entire farming calendar with precision - from planting schedules to harvest times, irrigation cycles, fertilization routines, and pest control measures.',
      features: [
        'Seasonal planning guides',
        'Automated reminders',
        'Weather-based suggestions',
        'Resource management',
        'Harvest optimization'
      ],
      gradient: 'from-amber-400 to-orange-600',
      bgGradient: 'from-amber-50 to-orange-50'
    },
    {
      icon: History,
      title: 'Scan History',
      description: 'Complete record of all your disease detection scans in one place. Track disease patterns over time, monitor treatment effectiveness, and maintain a comprehensive health record of your citrus orchards for better long-term management.',
      features: [
        'Unlimited scan storage',
        'Historical trend analysis',
        'Treatment tracking',
        'Export reports',
        'Visual timeline view'
      ],
      gradient: 'from-purple-400 to-pink-600',
      bgGradient: 'from-purple-50 to-pink-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-yellow-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-9 pb-12">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-green-600">Services</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering citrus farmers with cutting-edge technology and intelligent solutions for healthier crops and better yields
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                {/* Content */}
                <div className="relative p-8">
                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${service.gradient} shadow-lg mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg
                            className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Decorative Element */}
                  <div className={`absolute -bottom-2 -right-2 w-32 h-32 bg-gradient-to-br ${service.gradient} opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity duration-300`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Citrus Farming?
          </h2>
          <p className="text-green-50 text-lg mb-8">
            Join thousands of farmers who are already using our platform to grow healthier crops
          </p>
          <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors duration-200 shadow-lg">
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
