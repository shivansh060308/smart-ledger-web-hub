
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-navy-50 to-teal-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl sm:text-6xl font-bold text-navy-900 mb-6 leading-tight">
              Smarter Business 
              <span className="text-teal-600"> Starts Here</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Manage income, expenses, growth & customers in one place – no accountant needed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link to="/signup">
                <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 text-lg w-full sm:w-auto">
                  Start Free Trial
                </Button>
              </Link>
              <a href="#features">
                <Button size="lg" variant="outline" className="border-navy-600 text-navy-600 hover:bg-navy-50 px-8 py-4 text-lg w-full sm:w-auto">
                  See How It Works
                </Button>
              </a>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <span>✓ 14-day free trial</span>
              <span className="mx-4">✓ No credit card required</span>
              <span>✓ Setup in 5 minutes</span>
            </div>
          </div>
          
          <div className="relative animate-slide-up">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
              <div className="bg-gradient-to-r from-teal-500 to-navy-600 h-4 rounded-t-lg mb-6"></div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Total Revenue</span>
                  <span className="text-2xl font-bold text-teal-600">₹2,45,000</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Monthly Growth</span>
                  <span className="text-2xl font-bold text-navy-600">+23%</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-teal-50 rounded-lg text-center">
                    <div className="text-lg font-bold text-teal-700">₹45K</div>
                    <div className="text-sm text-gray-600">This Month</div>
                  </div>
                  <div className="p-4 bg-navy-50 rounded-lg text-center">
                    <div className="text-lg font-bold text-navy-700">156</div>
                    <div className="text-sm text-gray-600">Orders</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-16">
          <ArrowDown className="mx-auto text-gray-400 animate-bounce" size={24} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
