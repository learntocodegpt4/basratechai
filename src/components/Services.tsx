import { Brain, BarChart3, Shield, Cpu, Cloud, Database, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Brain,
    title: "Machine Learning",
    description: "Custom ML models tailored to your business needs, from predictive analytics to recommendation systems.",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: BarChart3,
    title: "Data Analytics",
    description: "Transform raw data into actionable insights with our advanced analytics and visualization solutions.",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: Shield,
    title: "AI Security",
    description: "Protect your digital assets with AI-powered threat detection and cybersecurity solutions.",
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: Cpu,
    title: "Process Automation",
    description: "Streamline operations with intelligent automation that reduces costs and increases efficiency.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Cloud,
    title: "Cloud AI Services",
    description: "Scalable cloud-based AI infrastructure designed for enterprise-grade performance and reliability.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Database,
    title: "Big Data Solutions",
    description: "Handle massive datasets with our distributed computing and big data processing capabilities.",
    color: "from-rose-500 to-orange-500",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-[#0f172a] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-cyan-500/10 rounded-full border border-cyan-500/30 mb-6">
            <span className="text-sm text-cyan-300">Our Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-white">Comprehensive </span>
            <span className="gradient-text">AI Solutions</span>
          </h2>
          <p className="text-gray-400 text-lg">
            From concept to deployment, we provide end-to-end AI services that 
            transform your business operations and drive sustainable growth.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative p-8 bg-[#111827] rounded-2xl border border-gray-800 hover:border-cyan-500/50 transition-all duration-300 card-hover"
            >
              {/* Icon */}
              <div className={`w-14 h-14 mb-6 flex items-center justify-center rounded-xl bg-gradient-to-br ${service.color} bg-opacity-20`}>
                <service.icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Link */}
              <Link
                href="#contact"
                className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors group/link"
              >
                <span className="text-sm font-medium">Learn More</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
              </Link>

              {/* Hover gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link
            href="#contact"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105"
          >
            <span>Explore All Services</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
