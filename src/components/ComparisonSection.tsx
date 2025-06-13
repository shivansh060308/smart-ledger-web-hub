
import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ComparisonSection = () => {
  const comparisonData = [
    {
      feature: "Ease of Use",
      smartLedger: "Simple, intuitive interface",
      tally: "Complex, requires training",
      marg: "Moderate learning curve"
    },
    {
      feature: "Bank Sync",
      smartLedger: "Real-time automatic sync",
      tally: "Manual import only",
      marg: "Limited bank support"
    },
    {
      feature: "Analytics",
      smartLedger: "AI-powered insights & predictions",
      tally: "Basic reports",
      marg: "Standard reports"
    },
    {
      feature: "Role-Based Views",
      smartLedger: "4 role types with custom permissions",
      tally: "Limited user management",
      marg: "Basic user access"
    },
    {
      feature: "Mobile Access",
      smartLedger: "Full mobile app with all features",
      tally: "Limited mobile functionality",
      marg: "Basic mobile view"
    },
    {
      feature: "Customer Support",
      smartLedger: "24/7 chat, phone & video support",
      tally: "Business hours only",
      marg: "Email support"
    }
  ];

  return (
    <section id="comparison" className="py-20 bg-white px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-navy-900 mb-4">Smart Ledger vs Tally & Marg</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See why thousands of businesses are switching to Smart Ledger
          </p>
        </div>

        <Card className="overflow-hidden shadow-2xl border-0">
          <CardHeader className="bg-gradient-to-r from-teal-500 to-navy-600 text-white">
            <CardTitle className="text-center text-2xl">Feature Comparison</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-4 text-left font-semibold text-navy-900">Feature</th>
                    <th className="p-4 text-center font-semibold text-teal-600 bg-teal-50">Smart Ledger</th>
                    <th className="p-4 text-center font-semibold text-gray-600">Tally</th>
                    <th className="p-4 text-center font-semibold text-gray-600">Marg</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-25"}>
                      <td className="p-4 font-medium text-navy-900 border-r border-gray-100">
                        {row.feature}
                      </td>
                      <td className="p-4 text-center bg-teal-25 border-r border-gray-100">
                        <div className="flex items-center justify-center space-x-2">
                          <Check className="w-5 h-5 text-teal-600" />
                          <span className="text-sm font-medium text-teal-700">{row.smartLedger}</span>
                        </div>
                      </td>
                      <td className="p-4 text-center text-sm text-gray-600 border-r border-gray-100">
                        {row.tally}
                      </td>
                      <td className="p-4 text-center text-sm text-gray-600">
                        {row.marg}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-12">
          <div className="inline-flex items-center px-6 py-3 bg-teal-50 rounded-full">
            <Check className="w-5 h-5 text-teal-600 mr-2" />
            <span className="text-teal-700 font-medium">30-day money-back guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
