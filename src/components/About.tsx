import { Target, Users, Rocket, Award } from "lucide-react";
import Image from "next/image";

const stats = [
  { icon: Users, value: "500+", label: "Happy Clients" },
  { icon: Rocket, value: "1000+", label: "Projects Delivered" },
  { icon: Target, value: "99%", label: "Success Rate" },
  { icon: Award, value: "50+", label: "Awards Won" },
];

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 circuit-bg opacity-50" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image/Visual */}
          <div className="relative">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-cyan-500/20 rounded-2xl" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-indigo-500/20 rounded-2xl" />
              
              {/* Main image container */}
              <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden gradient-border bg-[#111827] p-8 flex items-center justify-center">
                <Image
                  src="/Main_Logo.png"
                  alt="BasraTech AI"
                  width={400}
                  height={400}
                  className="object-contain"
                />
              </div>
              
              {/* Floating stats card */}
              <div className="absolute -right-8 top-1/4 bg-[#111827] p-4 rounded-xl border border-cyan-500/30 shadow-xl">
                <div className="text-2xl font-bold gradient-text">10+</div>
                <div className="text-xs text-gray-400">Years Experience</div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-8">
            {/* Section badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-cyan-500/10 rounded-full border border-cyan-500/30">
              <span className="text-sm text-cyan-300">About Us</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              <span className="text-white">Pioneering the </span>
              <span className="gradient-text">Future of AI</span>
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed">
              At BasraTech AI, we are passionate about harnessing the power of artificial 
              intelligence to solve complex business challenges. Our team of experts combines 
              deep technical expertise with industry knowledge to deliver transformative solutions.
            </p>

            <p className="text-gray-400 text-lg leading-relaxed">
              Founded on the principles of innovation and excellence, we have helped hundreds 
              of organizations across the globe embrace the AI revolution. From startups to 
              Fortune 500 companies, our solutions drive measurable results.
            </p>

            {/* Key points */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2" />
                <span className="text-gray-300">Industry-leading AI solutions</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2" />
                <span className="text-gray-300">Expert team of 100+ engineers</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2" />
                <span className="text-gray-300">Global presence in 20+ countries</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2" />
                <span className="text-gray-300">24/7 dedicated support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-[#111827]/50 rounded-2xl border border-gray-800 card-hover"
            >
              <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20">
                <stat.icon className="w-7 h-7 text-cyan-400" />
              </div>
              <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
