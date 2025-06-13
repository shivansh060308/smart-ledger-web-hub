
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/">
                <h1 className="text-2xl font-bold text-navy-800">Smart Ledger</h1>
              </Link>
            </div>
          </div>
          
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#features" className="text-gray-600 hover:text-navy-800 px-3 py-2 text-sm font-medium transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-navy-800 px-3 py-2 text-sm font-medium transition-colors">
                Pricing
              </a>
              <a href="#comparison" className="text-gray-600 hover:text-navy-800 px-3 py-2 text-sm font-medium transition-colors">
                Compare
              </a>
              <a href="#contact" className="text-gray-600 hover:text-navy-800 px-3 py-2 text-sm font-medium transition-colors">
                Contact
              </a>
            </div>
          </nav>

          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
                Login
              </Button>
            </Link>
            <Button className="bg-teal-600 hover:bg-teal-700 text-white">
              Start Free Trial
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
