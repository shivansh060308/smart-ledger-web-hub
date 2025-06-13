
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FeaturesSection = () => {
  const features = [
    {
      id: "dashboard",
      title: "All-in-One Dashboard",
      description: "Complete business overview at a glance",
      content: "Get real-time insights into your revenue, expenses, customer behavior, and growth trends. Our intuitive dashboard brings all your business metrics together in one beautifully designed interface."
    },
    {
      id: "banking",
      title: "Bank Integration (Live Sync)",
      description: "Automatic transaction import from 50+ banks",
      content: "Connect your bank accounts and automatically import transactions. Support for all major Indian banks including SBI, HDFC, ICICI, Axis, and more. Real-time synchronization keeps your books always up to date."
    },
    {
      id: "analytics",
      title: "Growth Dashboard (AI Metrics)",
      description: "AI-powered insights for business growth",
      content: "Leverage artificial intelligence to understand your business patterns, predict trends, and get actionable recommendations for growth. Smart alerts notify you of important business events."
    },
    {
      id: "customers",
      title: "Offer Builder + Customer Insights",
      description: "Create offers and understand your customers",
      content: "Build custom offers and promotions with our visual builder. Deep customer analytics help you understand buying patterns, preferences, and lifetime value."
    },
    {
      id: "benchmarking",
      title: "Competitor Benchmarking",
      description: "See how you stack up against competitors",
      content: "Anonymous industry benchmarking shows how your business performs compared to similar businesses in your sector. Identify opportunities and stay competitive."
    },
    {
      id: "access",
      title: "Multi-Role Access System",
      description: "Team collaboration with role-based permissions",
      content: "Grant different access levels to team members, accountants, and stakeholders. Owner, Manager, Accountant, and Viewer roles ensure everyone sees what they need to see."
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-navy-900 mb-4">Core Features</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to run your business efficiently, all in one platform
          </p>
        </div>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-8">
            {features.map((feature) => (
              <TabsTrigger 
                key={feature.id} 
                value={feature.id}
                className="text-xs sm:text-sm p-2"
              >
                {feature.title.split(' ')[0]}
              </TabsTrigger>
            ))}
          </TabsList>

          {features.map((feature) => (
            <TabsContent key={feature.id} value={feature.id}>
              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-3xl font-bold text-navy-900">{feature.title}</CardTitle>
                  <CardDescription className="text-lg text-gray-600">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <p className="text-lg text-gray-600 leading-relaxed mb-6">{feature.content}</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm">Real-time</span>
                        <span className="px-3 py-1 bg-navy-100 text-navy-700 rounded-full text-sm">Automated</span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Secure</span>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-teal-50 to-navy-50 rounded-2xl p-8 text-center">
                      <div className="w-32 h-32 bg-gradient-to-br from-teal-500 to-navy-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                        <span className="text-white text-4xl font-bold">{feature.title.charAt(0)}</span>
                      </div>
                      <p className="text-gray-600">Interactive feature preview</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default FeaturesSection;
