"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { Button } from "@/components/button";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Auto-rotate features
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 4000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  const features = [
    {
      icon: "💬",
      title: "Real-time Messaging",
      description: "Send and receive messages instantly with real-time synchronization across all devices.",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-100",
      textColor: "text-blue-600"
    },
    {
      icon: "👥",
      title: "Group Chats",
      description: "Create and manage group conversations with friends, family, or team members.",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      iconBg: "bg-green-100",
      textColor: "text-green-600"
    },
    {
      icon: "🔒",
      title: "Secure & Private",
      description: "Your conversations are protected with end-to-end encryption and privacy controls.",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-100",
      textColor: "text-purple-600"
    }
  ];

  const stats = [
    { number: "10M+", label: "Active Users", icon: "👥" },
    { number: "99.9%", label: "Uptime", icon: "⚡" },
    { number: "256-bit", label: "Encryption", icon: "🔐" },
    { number: "24/7", label: "Support", icon: "🛟" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        
        {/* Interactive cursor glow */}
        <div 
          className="absolute w-96 h-96 bg-gradient-radial from-blue-500/10 to-transparent rounded-full pointer-events-none transition-all duration-300 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        ></div>
      </div>

      {/* Navigation */}
      <div className="relative z-10">
        <Navbar
          brandName={
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-[#171717] to-[#171717] rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-white font-bold text-xl">Messenger</span>
            </div>
          }
          navItems={[
            { label: "Home", href: "/" },
            { label: "Features", href: "#features" },
            { label: "About", href: "#about" },
          ]}
          rightItems={
            <div className="flex items-center gap-2 sm:gap-3 flex-col sm:flex-row w-full sm:w-auto">
              <Link
                href="/auth"
                className="w-full sm:w-auto px-4 sm:px-6 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 text-center text-sm sm:text-base"
              >
                Sign In
              </Link>
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 text-center text-sm sm:text-base"
              >
                Dashboard
              </Link>
            </div>
          }
          className="bg-black/20 backdrop-blur-md border-b border-white/10"
        />
      </div>

      {/* Hero Section */}
      <main className="relative z-10">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className={`text-center max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Floating Elements - Hidden on mobile for performance */}
            <div className="hidden lg:block absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-bounce animation-delay-1000"></div>
            <div className="hidden lg:block absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-20 animate-bounce animation-delay-2000"></div>
            <div className="hidden lg:block absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-20 animate-bounce animation-delay-3000"></div>

            <div className="mb-6 sm:mb-8">
              <span className="inline-block px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full text-blue-300 text-xs sm:text-sm font-medium backdrop-blur-sm border border-blue-500/30 mb-4 sm:mb-6">
                ✨ The Future of Communication is Here
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent leading-tight px-4 sm:px-0">
              Connect with
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
                Everyone
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              Experience the next generation of messaging with 
              <span className="text-blue-400 font-semibold"> real-time conversations</span>, 
              <span className="text-purple-400 font-semibold"> AI-powered features</span>, and 
              <span className="text-pink-400 font-semibold"> unbreakable security</span>.
            </p>
            
            <div className="flex gap-4 sm:gap-6 justify-center flex-col sm:flex-row mb-12 sm:mb-16 px-4 sm:px-0">
              <Link
                href="/auth"
                className="group px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold text-base sm:text-lg shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 relative overflow-hidden"
              >
                <span className="relative z-10">Get Started Free</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link
                href="/dashboard"
                className="group px-8 sm:px-10 py-3 sm:py-4 border-2 border-white/30 text-white rounded-full hover:bg-white/10 transition-all duration-300 font-semibold text-base sm:text-lg backdrop-blur-sm transform hover:scale-105"
              >
                <span className="flex items-center gap-2 justify-center">
                  View Demo
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </div>

            {/* Interactive Chat Preview */}
            <div className="relative max-w-4xl mx-auto px-4 sm:px-0">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/20 shadow-2xl">
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="flex gap-1.5 sm:gap-2">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-white/70 text-xs sm:text-sm">messenger.app</div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                  {/* Chat List - Hidden on mobile, shown on tablet+ */}
                  <div className="hidden sm:block lg:col-span-1 space-y-3">
                    <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex-shrink-0"></div>
                        <div className="min-w-0 flex-1">
                          <div className="text-white text-xs sm:text-sm font-medium truncate">Sarah Wilson</div>
                          <div className="text-gray-400 text-xs truncate">Hey! How's the project going?</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex-shrink-0"></div>
                        <div className="min-w-0 flex-1">
                          <div className="text-white text-xs sm:text-sm font-medium truncate">Team Chat</div>
                          <div className="text-gray-400 text-xs truncate">Meeting at 3 PM today</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Chat Messages */}
                  <div className="col-span-1 lg:col-span-2 bg-white/5 rounded-xl p-3 sm:p-4 border border-white/10">
                    {/* Mobile header */}
                    <div className="sm:hidden flex items-center gap-3 mb-4 pb-3 border-b border-white/10">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
                      <div>
                        <div className="text-white text-sm font-medium">Sarah Wilson</div>
                        <div className="text-gray-400 text-xs">Online</div>
                      </div>
                    </div>
                    
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex justify-end">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 sm:px-4 py-2 rounded-2xl rounded-br-md max-w-[80%] sm:max-w-xs">
                          <p className="text-xs sm:text-sm">The new design looks amazing! 🎨</p>
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="bg-white/10 text-white px-3 sm:px-4 py-2 rounded-2xl rounded-bl-md max-w-[80%] sm:max-w-xs">
                          <p className="text-xs sm:text-sm">Thanks! I'm really excited about it ✨</p>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 sm:px-4 py-2 rounded-2xl rounded-br-md max-w-[80%] sm:max-w-xs">
                          <p className="text-xs sm:text-sm">Let's ship it! 🚀</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Message Input */}
                    <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/10">
                      <input 
                        type="text" 
                        placeholder="Type a message..." 
                        className="flex-1 bg-white/10 text-white placeholder-gray-400 px-3 py-2 rounded-full border border-white/20 focus:outline-none focus:border-blue-400 text-xs sm:text-sm"
                        disabled
                      />
                      <button className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform flex-shrink-0">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-2xl sm:text-3xl lg:text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-xs sm:text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 px-4 sm:px-0">
              Powerful Features for
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"> Modern Communication</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4 sm:px-0">
              Discover the tools that make conversations more engaging, secure, and efficient
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/10 backdrop-blur-xl transition-all duration-500 hover:scale-105 cursor-pointer ${
                  activeFeature === index ? 'bg-white/10 shadow-2xl' : 'bg-white/5 hover:bg-white/10'
                }`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl sm:rounded-3xl"
                     style={{ backgroundImage: `linear-gradient(135deg, ${feature.color.split(' ')[1]}, ${feature.color.split(' ')[3]})` }}>
                </div>
                
                <div className="relative z-10">
                  <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Feature Showcase */}
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/20 backdrop-blur-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
                  Experience the Magic
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/10 rounded-xl border border-white/10">
                    <div className="text-xl sm:text-2xl flex-shrink-0">⚡</div>
                    <div className="min-w-0">
                      <div className="text-white font-semibold text-sm sm:text-base">Lightning Fast</div>
                      <div className="text-gray-400 text-xs sm:text-sm">Messages delivered in milliseconds</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/10 rounded-xl border border-white/10">
                    <div className="text-xl sm:text-2xl flex-shrink-0">🎨</div>
                    <div className="min-w-0">
                      <div className="text-white font-semibold text-sm sm:text-base">Beautiful Design</div>
                      <div className="text-gray-400 text-xs sm:text-sm">Crafted with attention to detail</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/10 rounded-xl border border-white/10">
                    <div className="text-xl sm:text-2xl flex-shrink-0">🤖</div>
                    <div className="min-w-0">
                      <div className="text-white font-semibold text-sm sm:text-base">AI Powered</div>
                      <div className="text-gray-400 text-xs sm:text-sm">Smart suggestions and automation</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative order-1 lg:order-2">
                <div className="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-white text-xs sm:text-sm">Live Demo</span>
                    </div>
                    
                    <div className="space-y-2 sm:space-y-3">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2.5 sm:p-3 rounded-xl rounded-br-md ml-6 sm:ml-8">
                        <p className="text-xs sm:text-sm">Check out this new feature! 🚀</p>
                      </div>
                      <div className="bg-white/20 text-white p-2.5 sm:p-3 rounded-xl rounded-bl-md mr-6 sm:mr-8">
                        <p className="text-xs sm:text-sm">Wow, that's incredible! 😍</p>
                      </div>
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2.5 sm:p-3 rounded-xl rounded-br-md ml-6 sm:ml-8">
                        <p className="text-xs sm:text-sm">Want to try it out?</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 pt-3 sm:pt-4 border-t border-white/10">
                      <input 
                        type="text" 
                        placeholder="Type a message..." 
                        className="flex-1 bg-white/10 text-white placeholder-gray-400 px-3 sm:px-4 py-2 rounded-full border border-white/20 focus:outline-none focus:border-blue-400 text-xs sm:text-sm"
                        disabled
                      />
                      <button className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform flex-shrink-0">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl sm:rounded-3xl p-8 sm:p-12 border border-white/20 backdrop-blur-xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              Ready to Start Connecting?
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4 sm:px-0">
              Join millions of users who trust our platform for their daily communications
            </p>
            <div className="flex gap-4 sm:gap-6 justify-center flex-col sm:flex-row">
              <Link
                href="/auth"
                className="group px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold text-base sm:text-lg shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105"
              >
                Start Messaging Now
              </Link>
              <Link
                href="#features"
                className="px-8 sm:px-10 py-3 sm:py-4 border-2 border-white/30 text-white rounded-full hover:bg-white/10 transition-all duration-300 font-semibold text-base sm:text-lg backdrop-blur-sm"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-black/40 backdrop-blur-xl border-t border-white/10 py-12 sm:py-16 mt-16 sm:mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-base sm:text-lg">M</span>
                </div>
                <span className="font-bold text-lg sm:text-xl text-white">Messenger</span>
              </div>
              <p className="text-gray-400 mb-4 text-sm sm:text-base">
                The future of communication is here. Connect, share, and collaborate like never before.
              </p>
              <div className="flex gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer">
                  <span className="text-sm sm:text-base">📱</span>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer">
                  <span className="text-sm sm:text-base">🐦</span>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer">
                  <span className="text-sm sm:text-base">📘</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3 sm:mb-4 text-white text-sm sm:text-base">Product</h3>
              <ul className="space-y-2 sm:space-y-3 text-gray-400 text-sm sm:text-base">
                <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Mobile App</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">API</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3 sm:mb-4 text-white text-sm sm:text-base">Company</h3>
              <ul className="space-y-2 sm:space-y-3 text-gray-400 text-sm sm:text-base">
                <li><Link href="#about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Terms</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3 sm:mb-4 text-white text-sm sm:text-base">Support</h3>
              <ul className="space-y-2 sm:space-y-3 text-gray-400 text-sm sm:text-base">
                <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Status</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Community</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-6 sm:pt-8 text-center text-gray-400 text-xs sm:text-sm">
            <p>&copy; 2024 Messenger. All rights reserved. Made with ❤️ for better communication.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
