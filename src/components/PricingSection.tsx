
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const PricingSection = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const plans = [
    {
      name: "Starter",
      price: {
        monthly: 999,
        halfYearly: 4995,
        yearly: 8990
      },
      originalPrice: {
        monthly: 999,
        halfYearly: 5994,
        yearly: 11988
      },
      features: [
        "Manual entry only",
        "Basic reporting",
        "1 user access",
        "Email support",
        "Mobile app access"
      ],
      popular: false
    },
    {
      name: "Business",
      price: {
        monthly: 1999,
        halfYearly: 9995,
        yearly: 17990
      },
      originalPrice: {
        monthly: 1999,
        halfYearly: 11994,
        yearly: 23988
      },
      features: [
        "Bank sync (2 accounts)",
        "Advanced analytics",
        "3 user access",
        "Priority support",
        "Inventory management",
        "Custom branding"
      ],
      popular: true
    },
    {
      name: "Premium",
      price: {
        monthly: 3999,
        halfYearly: 19995,
        yearly: 35990
      },
      originalPrice: {
        monthly: 3999,
        halfYearly: 23994,
        yearly: 47988
      },
      features: [
        "Unlimited bank sync",
        "AI insights & predictions",
        "Unlimited users",
        "24/7 phone support",
        "All premium features",
        "White-label solution",
        "API access"
      ],
      popular: false
    }
  ];

  const addOns = [
    { name: "CRM Module", price: 499, features: ["Lead management", "Sales pipeline", "Customer communication"] },
    { name: "E-commerce Sync", price: 399, features: ["Amazon/Flipkart sync", "Order management", "Inventory tracking"] },
    { name: "Tax Filing", price: 599, features: ["GST filing", "TDS management", "Compliance alerts"] },
    { name: "Staff Tracker", price: 299, features: ["Attendance tracking", "Payroll integration", "Performance metrics"] },
    { name: "Multi-location", price: 799, features: ["Branch management", "Consolidated reporting", "Inter-branch transfers"] },
    { name: "Advanced Analytics", price: 699, features: ["Custom dashboards", "Predictive analytics", "Competitor insights"] }
  ];

  const getDiscount = (cycle: string) => {
    if (cycle === "halfYearly") return "17% OFF";
    if (cycle === "yearly") return "25% OFF";
    return "";
  };

  return (
    <section id="pricing" className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-navy-900 mb-4">Pricing Plans</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your business. All plans include 14-day free trial.
          </p>
          
          <div className="inline-flex p-1 bg-white rounded-lg border border-gray-200 shadow-sm">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                billingCycle === "monthly" 
                ? "bg-teal-600 text-white shadow-sm" 
                : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("halfYearly")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all relative ${
                billingCycle === "halfYearly" 
                ? "bg-teal-600 text-white shadow-sm" 
                : "text-gray-600 hover:text-gray-900"
              }`}
            >
              6 Months
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                17% OFF
              </span>
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all relative ${
                billingCycle === "yearly" 
                ? "bg-teal-600 text-white shadow-sm" 
                : "text-gray-600 hover:text-gray-900"
              }`}
            >
              1 Year
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                25% OFF
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative overflow-hidden border-2 transition-all duration-300 hover:shadow-xl ${
                plan.popular 
                ? "border-teal-500 shadow-lg scale-105" 
                : "border-gray-200 hover:border-teal-300"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-teal-500 to-navy-600 text-white text-center py-2 text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <CardHeader className={`text-center ${plan.popular ? "pt-12" : "pt-6"}`}>
                <CardTitle className="text-2xl font-bold text-navy-900">{plan.name}</CardTitle>
                <div className="mt-4">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-navy-900">₹{plan.price[billingCycle]}</span>
                    <span className="text-gray-600 ml-2">
                      /{billingCycle === "monthly" ? "month" : billingCycle === "halfYearly" ? "6 months" : "year"}
                    </span>
                  </div>
                  {billingCycle !== "monthly" && (
                    <div className="mt-2">
                      <span className="text-sm text-gray-500 line-through">₹{plan.originalPrice[billingCycle]}</span>
                      <span className="ml-2 text-sm font-medium text-green-600">{getDiscount(billingCycle)}</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-teal-600 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link to={`/checkout?plan=${plan.name}&cycle=${billingCycle}`}>
                  <Button 
                    className={`w-full mt-6 ${
                      plan.popular 
                      ? "bg-teal-600 hover:bg-teal-700 text-white" 
                      : "border border-teal-600 text-teal-600 hover:bg-teal-50"
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    Start Free Trial
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add-ons Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-navy-900 mb-4">Power Up with Add-Ons</h3>
            <p className="text-lg text-gray-600">Extend your Smart Ledger with specialized modules</p>
            <div className="mt-4 inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-50 to-navy-50 rounded-full">
              <span className="text-teal-700 font-medium">Bundle Deal: Any 4 modules for ₹1,599/mo</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addOns.map((addon, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 border border-gray-200">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-bold text-navy-900">{addon.name}</CardTitle>
                    <span className="text-2xl font-bold text-teal-600">₹{addon.price}</span>
                  </div>
                  <span className="text-sm text-gray-500">/month</span>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {addon.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <Check className="w-4 h-4 text-teal-600 mr-2 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to={`/checkout?plan=Business&cycle=monthly&addon=${addon.name}`}>
                    <Button variant="outline" size="sm" className="w-full mt-4 border-teal-600 text-teal-600 hover:bg-teal-50">
                      Add to Plan
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
