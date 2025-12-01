import Image from "next/image";
import { ArrowRight, Play, Sparkles, Zap, Shield } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center circuit-bg overflow-hidden pt-20"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-cyan-500/10 rounded-full border border-cyan-500/30">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-300">AI-Powered Innovation</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-white">Transform Your </span>
              <span className="gradient-text">Business</span>
              <br />
              <span className="text-white">With </span>
              <span className="gradient-text">AI Excellence</span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-gray-400 max-w-xl mx-auto lg:mx-0">
              BasraTech AI delivers cutting-edge artificial intelligence solutions 
              that drive innovation, efficiency, and growth for enterprises worldwide.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="#contact"
                className="group flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="flex items-center space-x-3 px-6 py-4 text-gray-300 hover:text-white transition-colors group">
                <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-cyan-500/50 group-hover:border-cyan-400 transition-colors">
                  <Play className="w-5 h-5 text-cyan-400 ml-1" />
                </div>
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-800">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold gradient-text">500+</div>
                <div className="text-sm text-gray-500">Clients Worldwide</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold gradient-text">99%</div>
                <div className="text-sm text-gray-500">Success Rate</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold gradient-text">24/7</div>
                <div className="text-sm text-gray-500">Expert Support</div>
              </div>
            </div>
          </div>

          {/* Right Content - Logo/Visual */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-lg aspect-square">
              {/* Glow effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 rounded-full blur-3xl animate-pulse" />
              
              {/* Main logo container */}
              <div className="relative z-10 w-full h-full flex items-center justify-center animate-float">
                <div className="relative w-80 h-80 sm:w-96 sm:h-96">
                  <Image
                    src="/Main_Logo.png"
                    alt="BasraTech AI - Future Ready"
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute top-10 right-10 p-3 bg-[#111827] rounded-xl border border-cyan-500/30 shadow-lg animate-float">
                <Zap className="w-6 h-6 text-cyan-400" />
              </div>
              <div className="absolute bottom-20 left-5 p-3 bg-[#111827] rounded-xl border border-indigo-500/30 shadow-lg animate-float delay-300">
                <Shield className="w-6 h-6 text-indigo-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-xs text-gray-500 uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 border-2 border-gray-700 rounded-full flex items-start justify-center p-1">
            <div className="w-1.5 h-3 bg-cyan-400 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
