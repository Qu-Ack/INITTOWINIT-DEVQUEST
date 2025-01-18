"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function ReportPage() {
  const [report, setReport] = useState<MedicalReport | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // Simulating API call to fetch report data
    const fetchReport = async () => {
      // In a real application, this would be an API call
      const reportData: MedicalReport = {
        disease: "Calcium Deficiency",
        dosha_analysis: {
          vata: "severely imbalanced",
          pitta: "balanced",
          kapha: "balanced",
        },
        observations: [
          "Peeling nails and dry skin indicate calcium deficiency.",
          "Slow nail growth suggests systemic Vata imbalance.",
        ],
        recommendations: {
          diet: [
            "Include calcium-rich foods like milk, almonds, and leafy greens.",
            "Consume sesame seeds for bone health.",
          ],
          lifestyle: [
            "Avoid overexertion and prioritize restful sleep.",
            "Use warm mustard oil for skin hydration.",
          ],
          herbal_remedies: [
            "Ashwagandha for improving bone strength.",
            "Musta for aiding digestion and nutrient absorption.",
            "Licorice tea for reducing dryness.",
          ],
        },
      };
      setReport(reportData);
    };

    fetchReport();
  }, []);

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { role: "user", content: input }]);
      setInput("");
      // Simulating AI response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            content:
              "I understand your question. How else can I assist you with the medical report?",
          },
        ]);
      }, 1000);
    }
  };

  if (!report) {
    return <div>Loading...</div>;
  }

  return (
    <main className="container mx-auto px-4 py-8 flex">
      {/* Chatbox */}
      <div className="w-1/2 p-4 border-r">
        <Card className="h-full flex flex-col">
          <CardHeader>
            <CardTitle>AI Assistant</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col">
            <ScrollArea className="flex-grow mb-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 ${message.role === "ai" ? "text-blue-600" : "text-green-600"}`}
                >
                  <strong>{message.role === "ai" ? "AI: " : "You: "}</strong>
                  {message.content}
                </div>
              ))}
            </ScrollArea>
            <div className="flex mt-auto">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow mr-2"
              />
              <Button onClick={handleSendMessage}>Send</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Medical Report */}
      <div className="w-1/2 p-4">
        <Card>
          <CardHeader>
            <CardTitle>Medical Report</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Disease</h3>
                <p>{report.disease}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Dosha Analysis</h3>
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(report.dosha_analysis).map(
                    ([dosha, status]) => (
                      <div
                        key={dosha}
                        className="text-center p-2 border rounded"
                      >
                        <div className="font-medium capitalize">{dosha}</div>
                        <div>{status}</div>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Observations</h3>
                <ul className="list-disc pl-5">
                  {report.observations.map((observation, index) => (
                    <li key={index}>{observation}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Recommendations</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Diet</h4>
                    <ul className="list-disc pl-5">
                      {report.recommendations.diet.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium">Lifestyle</h4>
                    <ul className="list-disc pl-5">
                      {report.recommendations.lifestyle.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium">Herbal Remedies</h4>
                    <ul className="list-disc pl-5">
                      {report.recommendations.herbal_remedies.map(
                        (item, index) => (
                          <li key={index}>{item}</li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
