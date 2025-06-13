
import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Check, CreditCard, Shield, Lock } from "lucide-react";

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
  });

  const planName = searchParams.get("plan") || "Business";
  const cycle = searchParams.get("cycle") || "monthly";

  useEffect(() => {
    setBillingCycle(cycle);
  }, [cycle]);

  const plans = {
    "Starter": {
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
      ]
    },
    "Business": {
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
      ]
    },
    "Premium": {
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
      ]
    }
  };

  const addOns = [
    { name: "CRM Module", price: 499, features: ["Lead management", "Sales pipeline", "Customer communication"] },
    { name: "E-commerce Sync", price: 399, features: ["Amazon/Flipkart sync", "Order management", "Inventory tracking"] },
    { name: "Tax Filing", price: 599, features: ["GST filing", "TDS management", "Compliance alerts"] },
    { name: "Staff Tracker", price: 299, features: ["Attendance tracking", "Payroll integration", "Performance metrics"] },
    { name: "Multi-location", price: 799, features: ["Branch management", "Consolidated reporting", "Inter-branch transfers"] },
    { name: "Advanced Analytics", price: 699, features: ["Custom dashboards", "Predictive analytics", "Competitor insights"] }
  ];

  const selectedPlan = plans[planName as keyof typeof plans] || plans.Business;

  const getDiscount = (cycle: string) => {
    if (cycle === "halfYearly") return "17% OFF";
    if (cycle === "yearly") return "25% OFF";
    return "";
  };

  const calculateTotal = () => {
    const planPrice = selectedPlan.price[billingCycle as keyof typeof selectedPlan.price];
    const addOnTotal = selectedAddOns.reduce((total, addonName) => {
      const addon = addOns.find(a => a.name === addonName);
      return total + (addon?.price || 0);
    }, 0);
    
    let addOnMultiplier = 1;
    if (billingCycle === "halfYearly") addOnMultiplier = 6;
    if (billingCycle === "yearly") addOnMultiplier = 12;
    
    return planPrice + (addOnTotal * addOnMultiplier);
  };

  const handleAddOnChange = (addonName: string, checked: boolean) => {
    if (checked) {
      setSelectedAddOns([...selectedAddOns, addonName]);
    } else {
      setSelectedAddOns(selectedAddOns.filter(name => name !== addonName));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Checkout submission:", {
      plan: planName,
      billingCycle,
      selectedAddOns,
      customerInfo,
      total: calculateTotal()
    });
    // Here you would typically integrate with Stripe or another payment processor
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/#pricing" 
            className="inline-flex items-center text-sm text-gray-600 hover:text-teal-600 transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Pricing
          </Link>
          <h1 className="text-3xl font-bold text-navy-900 mb-2">Complete Your Order</h1>
          <p className="text-gray-600">Secure checkout for Smart Ledger {planName} plan</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Plan Details */}
                <div className="border-b pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-navy-900">{planName} Plan</h3>
                      <p className="text-sm text-gray-600">
                        {billingCycle === "monthly" ? "Monthly" : billingCycle === "halfYearly" ? "6 Months" : "1 Year"} billing
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold">₹{selectedPlan.price[billingCycle as keyof typeof selectedPlan.price]}</span>
                      {billingCycle !== "monthly" && (
                        <div className="text-xs text-green-600">{getDiscount(billingCycle)}</div>
                      )}
                    </div>
                  </div>
                  
                  {/* Billing Cycle Selector */}
                  <div className="mt-4">
                    <Label className="text-sm font-medium">Billing Cycle</Label>
                    <div className="grid grid-cols-1 gap-2 mt-2">
                      {[
                        { key: "monthly", label: "Monthly", price: selectedPlan.price.monthly },
                        { key: "halfYearly", label: "6 Months", price: selectedPlan.price.halfYearly, discount: "17% OFF" },
                        { key: "yearly", label: "1 Year", price: selectedPlan.price.yearly, discount: "25% OFF" }
                      ].map((option) => (
                        <div
                          key={option.key}
                          className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                            billingCycle === option.key ? "border-teal-500 bg-teal-50" : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => setBillingCycle(option.key)}
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{option.label}</span>
                            <div className="text-right">
                              <span className="font-semibold">₹{option.price}</span>
                              {option.discount && (
                                <span className="ml-2 text-xs text-green-600">{option.discount}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Add-ons */}
                {selectedAddOns.length > 0 && (
                  <div className="border-b pb-4">
                    <h4 className="font-semibold mb-3">Add-ons</h4>
                    {selectedAddOns.map((addonName) => {
                      const addon = addOns.find(a => a.name === addonName);
                      const multiplier = billingCycle === "monthly" ? 1 : billingCycle === "halfYearly" ? 6 : 12;
                      return (
                        <div key={addonName} className="flex justify-between text-sm mb-2">
                          <span>{addon?.name}</span>
                          <span>₹{(addon?.price || 0) * multiplier}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Total */}
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total</span>
                  <span className="text-teal-600">₹{calculateTotal()}</span>
                </div>

                {/* Trust Badges */}
                <div className="pt-4 border-t">
                  <div className="flex items-center space-x-4 text-xs text-gray-600">
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 mr-1" />
                      SSL Secured
                    </div>
                    <div className="flex items-center">
                      <Lock className="h-4 w-4 mr-1" />
                      256-bit Encryption
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-2 order-1 lg:order-2 space-y-6">
            {/* Add-ons Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="bg-teal-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">1</span>
                  Select Add-ons (Optional)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addOns.map((addon) => (
                    <div key={addon.name} className="border rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id={addon.name}
                          checked={selectedAddOns.includes(addon.name)}
                          onCheckedChange={(checked) => handleAddOnChange(addon.name, !!checked)}
                        />
                        <div className="flex-1">
                          <Label htmlFor={addon.name} className="font-medium cursor-pointer">
                            {addon.name}
                          </Label>
                          <p className="text-sm text-teal-600 font-semibold">₹{addon.price}/month</p>
                          <ul className="text-xs text-gray-600 mt-2 space-y-1">
                            {addon.features.map((feature, idx) => (
                              <li key={idx} className="flex items-center">
                                <Check className="h-3 w-3 mr-1" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="bg-teal-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">2</span>
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={customerInfo.firstName}
                        onChange={(e) => setCustomerInfo({...customerInfo, firstName: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={customerInfo.lastName}
                        onChange={(e) => setCustomerInfo({...customerInfo, lastName: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Company Name (Optional)</Label>
                    <Input
                      id="company"
                      value={customerInfo.company}
                      onChange={(e) => setCustomerInfo({...customerInfo, company: e.target.value})}
                    />
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Payment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="bg-teal-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">3</span>
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={handleSubmit}
                  className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white font-medium text-lg"
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  Proceed to Payment - ₹{calculateTotal()}
                </Button>
                <p className="text-xs text-gray-600 text-center mt-3">
                  By proceeding, you agree to our Terms of Service and Privacy Policy. 
                  Your subscription will start with a 14-day free trial.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
