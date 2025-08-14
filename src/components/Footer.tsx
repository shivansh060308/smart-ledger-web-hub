
import { Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-navy-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Smart Ledger</h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Empowering Indian businesses with smart, simple, and powerful business management tools. 
              Join thousands of businesses growing with Smart Ledger.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center hover:bg-teal-500 transition-colors cursor-pointer">
                <span className="text-sm font-bold">f</span>
              </div>
              <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center hover:bg-teal-500 transition-colors cursor-pointer">
                <span className="text-sm font-bold">t</span>
              </div>
              <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center hover:bg-teal-500 transition-colors cursor-pointer">
                <span className="text-sm font-bold">in</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-300 hover:text-teal-400 transition-colors">Home</Link></li>
              <li><a href="#features" className="text-gray-300 hover:text-teal-400 transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-gray-300 hover:text-teal-400 transition-colors">Pricing</a></li>
              <li><a href="#comparison" className="text-gray-300 hover:text-teal-400 transition-colors">Compare</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-teal-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div id="contact">
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-teal-400 mr-3" />
                <span className="text-gray-300">support@smartledger.in</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-teal-400 mr-3" />
                <span className="text-gray-300">+91 99999 88888</span>
              </div>
              <div className="text-gray-300">
                <p>Business Hours:</p>
                <p className="text-sm">Mon-Sat: 9:00 AM - 8:00 PM</p>
                <p className="text-sm">24/7 Chat Support</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Smart Ledger. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-teal-400 text-sm transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-400 hover:text-teal-400 text-sm transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="text-gray-400 hover:text-teal-400 text-sm transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
