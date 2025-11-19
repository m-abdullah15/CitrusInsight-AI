import { Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import diseaseDetectionImg from '../../assets/disease detection.jpg';
import dashboardImg from '../../assets/dashboard.jpeg';
import yearlyPlannerImg from '../../assets/yearly panner.webp';
import backgroundImg from '../../assets/background.jpg';
import logo from '../../assets/logo.png';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-yellow-50">
      <Navbar />
      {/* Hero Section with Background Image */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 via-green-900/85 to-teal-900/90"></div>
          <img 
            src={backgroundImg} 
            alt="Citrus Background" 
            className="w-full h-full object-cover opacity-40"
          />
          {/* Animated Floating Elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white animate-fade-in-up">
              <div className="flex items-center mb-6">
                <img src={logo} alt="Logo" className="w-16 h-16 mr-4 animate-bounce-slow" />
                <span className="text-2xl font-bold">CitrusInsight AI</span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
                <span className="block">Protect Your</span>
                <span className="block text-yellow-400 mt-2">Citrus Harvest</span>
              </h1>
              <p className="text-xl sm:text-2xl text-green-100 mb-8 leading-relaxed">
                AI-powered disease detection system that helps you identify and treat citrus diseases before they spread
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/signup"
                  className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-xl shadow-2xl hover:shadow-yellow-500/50 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 text-center"
                >
                  Get Started
                </Link>
                <Link
                  to="/services"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border-2 border-white/30 hover:bg-white/20 transform hover:-translate-y-1 transition-all duration-300 text-center"
                >
                  Explore Features
                </Link>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-400">95%+</div>
                  <div className="text-sm text-green-200 mt-1">Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-400">&lt;5s</div>
                  <div className="text-sm text-green-200 mt-1">Analysis</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-400">24/7</div>
                  <div className="text-sm text-green-200 mt-1">Available</div>
                </div>
              </div>
            </div>
            
            {/* Right Analysis Card */}
            <div className="relative animate-fade-in-up -mt-20" style={{ animationDelay: '0.2s' }}>
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-6 max-w-sm mx-auto transform hover:scale-105 transition-transform duration-500">
                {/* Window Controls */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-800 mb-4">AI Analysis</h3>

                {/* Image Preview Area */}
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-2 mb-4 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10"></div>
                  <div className="relative w-40 h-40 bg-white rounded-xl shadow-xl flex items-center justify-center transform hover:rotate-6 transition-transform duration-300 overflow-hidden">
                    <img 
                      src={diseaseDetectionImg} 
                      alt="Leaf Analysis" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Analysis Results */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {/* Probability */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-1">Probability</h4>
                    <div className="text-3xl font-bold text-emerald-600 mb-2">95.6%</div>
                    <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" style={{ width: '95.6%' }}></div>
                    </div>
                  </div>

                  {/* Severity */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-1">Severity</h4>
                    <div className="text-3xl font-bold text-amber-500 mb-2">High</div>
                    <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                
                <Link 
                to="/signup"
                >
                  <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">View Analysis</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Images */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-green-100 rounded-full filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-100 rounded-full filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16 animate-fade-in-down">
            <h2 className="text-4xl font-bold text-gray-900">Powerful Features</h2>
            <p className="mt-4 text-xl text-gray-600">Everything you need to protect your citrus crops</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 - Disease Detection */}
            <div className="group relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="relative h-48 overflow-hidden">
                <img src={diseaseDetectionImg} alt="Disease Detection" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="p-6">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mb-4 shadow-lg -mt-14 relative z-10">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Disease Detection</h3>
                <p className="text-gray-600 leading-relaxed">
                  Upload leaf images and get instant AI-powered disease identification with 95%+ accuracy in under 5 seconds.
                </p>
              </div>
            </div>

            {/* Feature 2 - Dashboard */}
            <div className="group relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="relative h-48 overflow-hidden">
                <img src={dashboardImg} alt="Dashboard" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="p-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 shadow-lg -mt-14 relative z-10">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Trade Dashboard</h3>
                <p className="text-gray-600 leading-relaxed">
                  Monitor market trends, track prices, and analyze demand patterns to maximize your farming profits.
                </p>
              </div>
            </div>

            {/* Feature 3 - Yearly Planner */}
            <div className="group relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="relative h-48 overflow-hidden">
                <img src={yearlyPlannerImg} alt="Yearly Planner" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="p-6">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 shadow-lg -mt-14 relative z-10">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Yearly Planner</h3>
                <p className="text-gray-600 leading-relaxed">
                  Plan your farming calendar with precision - from planting to harvest, irrigation to pest control schedules.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">Why Choose CitrusInsight AI</h2>
            <p className="mt-4 text-xl text-gray-600">Trusted by citrus growers worldwide</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center transform hover:scale-105 transition-transform duration-200">
              <div className="text-5xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-2">
                95%+
              </div>
              <div className="text-gray-600 font-medium">Accuracy Rate</div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center transform hover:scale-105 transition-transform duration-200">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                &lt;5s
              </div>
              <div className="text-gray-600 font-medium">Analysis Time</div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center transform hover:scale-105 transition-transform duration-200">
              <div className="text-5xl font-bold bg-gradient-to-r from-accent-600 to-yellow-600 bg-clip-text text-transparent mb-2">
                24/7
              </div>
              <div className="text-gray-600 font-medium">Availability</div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center transform hover:scale-105 transition-transform duration-200">
              <div className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                10+
              </div>
              <div className="text-gray-600 font-medium">Diseases Detected</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Protect Your Citrus Investment</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900">Early Detection</h3>
                    <p className="mt-2 text-gray-600">Identify diseases before they spread, saving your entire crop from potential devastation.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900">Expert Recommendations</h3>
                    <p className="mt-2 text-gray-600">Get professional treatment advice tailored to each specific disease detected.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900">Track History</h3>
                    <p className="mt-2 text-gray-600">Monitor your scans over time and track the health of your citrus orchard.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400/30 to-secondary-400/30 rounded-3xl transform rotate-3"></div>
              <div className="relative bg-gradient-to-br from-primary-500 to-secondary-500 rounded-3xl p-12 shadow-2xl">
                <div className="text-white">
                  <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
                  <p className="text-lg mb-8 text-white/90">Join thousands of citrus growers protecting their crops with AI technology.</p>
                  <Link
                    to="/signup"
                    className="inline-block px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                  >
                    Create Free Account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 py-12 overflow-hidden">
        {/* Background Logo */}
        <img 
          src={logo} 
          alt="Citrus" 
          className="absolute bottom-2 right-2 w-20 h-20 opacity-10 pointer-events-none select-none" 
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {/* Brand */}
            <div>
              <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-[#ffa600] to-yellow-500 bg-clip-text text-transparent">
                CitrusInsight AI
              </h2>
              <p className="text-sm text-gray-400">
                Empowering farmers with smart citrus insights.
              </p>
              <div className="flex space-x-3 mt-4 text-xl">
                <a href="#" className="text-[#ffa600] hover:text-yellow-500 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-[#ffa600] hover:text-yellow-500 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="text-[#ffa600] hover:text-yellow-500 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Get Help */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-[#ffa600]">Get Help</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-[#ffa600] transition-colors">FAQs</a></li>
                <li><a href="#" className="hover:text-[#ffa600] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#ffa600] transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-[#ffa600] transition-colors">Support</a></li>
              </ul>
            </div>

            {/* Discover */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-[#ffa600]">Discover</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/services" className="hover:text-[#ffa600] transition-colors">Trade Dashboard</Link></li>
                <li><Link to="/detection" className="hover:text-[#ffa600] transition-colors">Disease Detection</Link></li>
                <li><Link to="/planner" className="hover:text-[#ffa600] transition-colors">Yearly Planner</Link></li>
                <li><Link to="/dashboard" className="hover:text-[#ffa600] transition-colors">Dashboard</Link></li>
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-[#ffa600]">Contact Us</h3>
              <div className="space-y-2 text-sm">
                <p className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-[#ffa600]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  m.abdullah3042@gmail.com
                </p>
                <p className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-[#ffa600]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +92-305-2686065
                </p>
                <p className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-[#ffa600]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Sargodha, Pakistan
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-400 relative z-10">
            <p>© 2025 CitrusInsight AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
