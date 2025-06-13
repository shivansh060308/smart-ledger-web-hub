
import { Check, CircleDollarSign, Users, FileText, Home } from "lucide-react";

const ProblemsSection = () => {
  const problems = [
    {
      icon: Check,
      title: "No need for accounting knowledge",
      description: "Simple interface designed for business owners, not accountants"
    },
    {
      icon: FileText,
      title: "Track all finances and orders in one place",
      description: "Complete visibility into your business operations from a single dashboard"
    },
    {
      icon: CircleDollarSign,
      title: "Understand growth via smart insights",
      description: "AI-powered analytics that show you exactly how your business is performing"
    },
    {
      icon: Home,
      title: "Real-time bank syncing",
      description: "Automatic transaction import from all major Indian banks"
    },
    {
      icon: Users,
      title: "Built for Indian SMBs",
      description: "Designed specifically for Indian business practices and compliance needs"
    }
  ];

  return (
    <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-navy-900 mb-4">Why Smart Ledger?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We understand the unique challenges of running a business in India. 
            That's why we built a platform that just works.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <div 
              key={index} 
              className="group p-8 rounded-2xl border border-gray-100 hover:border-teal-200 hover:shadow-lg transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-navy-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <problem.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">{problem.title}</h3>
              <p className="text-gray-600 leading-relaxed">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemsSection;
