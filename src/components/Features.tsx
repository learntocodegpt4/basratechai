import { Check, Zap, Lock, Globe, Headphones, BarChart, RefreshCw, Code } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Our AI models are optimized for speed, delivering real-time insights and responses.",
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description: "Bank-grade security with end-to-end encryption and compliance with global standards.",
  },
  {
    icon: Globe,
    title: "Global Scalability",
    description: "Scale seamlessly across regions with our distributed cloud infrastructure.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock expert support to ensure your AI systems run smoothly.",
  },
  {
    icon: BarChart,
    title: "Advanced Analytics",
    description: "Deep insights and comprehensive reporting to track AI performance metrics.",
  },
  {
    icon: RefreshCw,
    title: "Continuous Learning",
    description: "Models that improve over time with automated retraining and optimization.",
  },
  {
    icon: Code,
    title: "Easy Integration",
    description: "Seamless API integration with your existing tech stack and workflows.",
  },
  {
    icon: Check,
    title: "99.9% Uptime",
    description: "Reliable infrastructure with guaranteed uptime and disaster recovery.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 circuit-bg opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-cyan-500/10 rounded-full border border-cyan-500/30">
              <span className="text-sm text-cyan-300">Why Choose Us</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              <span className="text-white">Features That </span>
              <span className="gradient-text">Set Us Apart</span>
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed">
              Our platform is built with cutting-edge technology and designed to deliver 
              exceptional results. Here&apos;s what makes BasraTech AI the preferred choice 
              for enterprises worldwide.
            </p>

            {/* Feature highlights */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-cyan-500/20">
                  <Check className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="text-gray-300">State-of-the-art AI models</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-cyan-500/20">
                  <Check className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="text-gray-300">Custom solutions for every industry</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-cyan-500/20">
                  <Check className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="text-gray-300">Transparent pricing with no hidden fees</span>
              </div>
            </div>
          </div>

          {/* Right - Features Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-[#111827]/80 rounded-xl border border-gray-800 hover:border-cyan-500/30 transition-all duration-300 card-hover group"
              >
                <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 group-hover:from-cyan-500/30 group-hover:to-indigo-500/30 transition-colors">
                  <feature.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
