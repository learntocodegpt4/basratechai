import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CTO, TechVentures Inc",
    content: "BasraTech AI transformed our data analytics capabilities. Their machine learning solutions helped us increase efficiency by 40% within the first quarter.",
    rating: 5,
    avatar: "SJ",
  },
  {
    name: "Michael Chen",
    role: "CEO, DataFlow Systems",
    content: "The team at BasraTech AI delivered beyond our expectations. Their AI-powered automation saved us hundreds of hours monthly on repetitive tasks.",
    rating: 5,
    avatar: "MC",
  },
  {
    name: "Emily Williams",
    role: "Head of Innovation, GlobalCorp",
    content: "Working with BasraTech AI was a game-changer. Their expertise in AI security helped us protect our sensitive data while improving customer experience.",
    rating: 5,
    avatar: "EW",
  },
  {
    name: "David Rodriguez",
    role: "VP Engineering, NextGen Solutions",
    content: "The cloud AI services from BasraTech AI scaled perfectly with our growth. Their 24/7 support ensured zero downtime during critical operations.",
    rating: 5,
    avatar: "DR",
  },
  {
    name: "Lisa Thompson",
    role: "Director of AI, FutureTech Labs",
    content: "BasraTech AI's custom ML models exceeded our accuracy benchmarks. Their team's deep expertise in neural networks is truly impressive.",
    rating: 5,
    avatar: "LT",
  },
  {
    name: "James Wilson",
    role: "Founder, AI Startups Hub",
    content: "From ideation to deployment, BasraTech AI was with us every step. Their process automation solutions revolutionized our operations.",
    rating: 5,
    avatar: "JW",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-[#0f172a] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-cyan-500/10 rounded-full border border-cyan-500/30 mb-6">
            <span className="text-sm text-cyan-300">Client Testimonials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-white">Trusted by </span>
            <span className="gradient-text">Industry Leaders</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Hear from our clients who have experienced the transformative power 
            of our AI solutions firsthand.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative p-8 bg-[#111827] rounded-2xl border border-gray-800 hover:border-cyan-500/30 transition-all duration-300 card-hover group"
            >
              {/* Quote icon */}
              <Quote className="absolute top-6 right-6 w-8 h-8 text-cyan-500/20" />

              {/* Stars */}
              <div className="flex space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-300 mb-6 leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-indigo-500 flex items-center justify-center text-white font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-20 text-center">
          <p className="text-gray-500 mb-8 text-sm uppercase tracking-widest">Trusted by leading companies</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50">
            {["TechCorp", "DataFlow", "GlobalAI", "FutureSoft", "InnovateLab"].map((company, index) => (
              <div key={index} className="text-2xl font-bold text-gray-600">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
