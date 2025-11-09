import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Send, Bot, User, Lightbulb, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  suggested?: string[];
}

export function AIScientistChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      text: "Hello! I'm your AI Science Assistant, trained specifically on the R/V NIK 421's Antarctic Peninsula Expedition (Nov 1-8, 2025), its scientific objectives, equipment, and crew expertise. I can answer questions about our current voyage, the research being conducted, and general Antarctic science. What would you like to know?",
      timestamp: "14:30",
      suggested: [
        "What is NIK 421's primary research mission?",
        "Why is Gerlache Strait important?",
        "What equipment does NIK 421 have?",
        "Tell me about the NIK 421 crew"
      ],
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const predefinedResponses: { [key: string]: { response: string; suggestions: string[] } } = {
    "nick421": {
      response: "The R/V NIK 421 is a ice-strengthened research vessel built in 2018, specifically designed for polar expeditions. This November 2025 expedition focuses on three primary research areas: marine ecosystem mapping in the Gerlache Strait, krill population dynamics studies, and multi-beam sonar bathymetry of the Antarctic Peninsula shelf. Captain James Wilson leads a crew of 8 scientists and 12 support staff.",
      suggestions: ["What is the ship's route?", "Who are the lead scientists?", "What data is being collected?"],
    },
    "weather": {
      response: "The NIK 421's onboard meteorological station is recording critical data in the Gerlache Strait. Current conditions show -8°C with SW winds at 28 km/h. We're tracking a temperature anomaly 2°C below seasonal norms, which Dr. Martinez's team believes is linked to increased katabatic winds from the Antarctic ice sheet. This data feeds directly into global climate models.",
      suggestions: ["What are katabatic winds?", "How does NIK 421 measure weather?", "Impact on the expedition"],
    },
    "ice": {
      response: "The NIK 421's multi-beam sonar is mapping ice shelf dynamics around Paradise Harbor and Neko Harbor. Dr. Elena Petrov's glaciology team is using the data to study how warming ocean temperatures (measured by our CTD casts) are affecting ice shelf melt rates. The Gerlache Strait provides a perfect natural laboratory for this research.",
      suggestions: ["What is multi-beam sonar?", "Ice melt rates this year", "Gerlache Strait geology"],
    },
    "equipment": {
      response: "The NIK 421 carries specialized Antarctic research equipment: a Kongsberg EM2040 multi-beam sonar for seafloor mapping, Sea-Bird CTD sensors for oceanographic profiles, Niskin bottles for water sampling, plankton tows for biological sampling, and a meteorological station. All instruments are ruggedized for sub-zero operations and integrated with our onboard data management system.",
      suggestions: ["How does the sonar work?", "What is CTD sampling?", "Lab equipment onboard"],
    },
    "penguin": {
      response: "During the NIK 421 expedition, we've documented three penguin species: Gentoo penguins at Neko Harbor (colony of ~2,500), Chinstrap penguins at Half Moon Island, and Adélie penguins near Cuverville Island. Dr. Sarah Martinez is conducting behavioral observations and has logged feeding patterns that suggest healthy krill populations in the Gerlache Strait this season.",
      suggestions: ["Penguin population trends", "What do they eat?", "How are they counted?"],
    },
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      let response = predefinedResponses["nick421"]; // default
      
      if (lowerInput.includes("nick") || lowerInput.includes("421") || lowerInput.includes("ship") || lowerInput.includes("vessel") || lowerInput.includes("mission") || lowerInput.includes("crew")) {
        response = predefinedResponses["nick421"];
      } else if (lowerInput.includes("weather") || lowerInput.includes("temperature") || lowerInput.includes("anomaly") || lowerInput.includes("wind")) {
        response = predefinedResponses["weather"];
      } else if (lowerInput.includes("ice") || lowerInput.includes("glacier") || lowerInput.includes("sonar")) {
        response = predefinedResponses["ice"];
      } else if (lowerInput.includes("equipment") || lowerInput.includes("instrument") || lowerInput.includes("sensor") || lowerInput.includes("ctd")) {
        response = predefinedResponses["equipment"];
      } else if (lowerInput.includes("penguin") || lowerInput.includes("wildlife") || lowerInput.includes("adapt") || lowerInput.includes("krill")) {
        response = predefinedResponses["penguin"];
      } else {
        response = {
          response: "That's an interesting question! As the AI assistant for the R/V NIK 421 expedition, I can help you understand our research mission, the science we're conducting, and Antarctic ecosystems. Could you be more specific about what you'd like to know?",
          suggestions: ["NIK 421's research goals", "Gerlache Strait conditions", "Marine biology work", "Ice dynamics research"],
        };
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: response.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggested: response.suggestions,
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestion = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2">Ask the AI Scientist</h1>
        <p className="text-gray-600">
          AI assistant trained on R/V NIK 421 expedition data, crew expertise, and Antarctic science. Ask context-specific questions about the voyage, research equipment, and scientific findings.
        </p>
        <div className="mt-3">
          <Badge className="bg-purple-600">NIK 421 AI Assistant</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Quick Topics */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <h3 className="text-sm mb-4 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-yellow-500" />
              Quick Topics
            </h3>
            <div className="space-y-2">
              {[
                { icon: "🌊", topic: "Ocean Science", query: "Tell me about ocean research" },
                { icon: "🐧", topic: "Wildlife", query: "How do penguins adapt to cold?" },
                { icon: "❄️", topic: "Ice & Climate", query: "What makes Antarctic ice unique?" },
                { icon: "🚢", topic: "Ship Tech", query: "Explain the ship's research equipment" },
                { icon: "☁️", topic: "Weather", query: "Why is this weather anomaly important?" },
                { icon: "🔬", topic: "Research Goals", query: "What are the expedition's goals?" },
              ].map((item, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-left"
                  onClick={() => handleSuggestion(item.query)}
                >
                  <span className="mr-2">{item.icon}</span>
                  <span className="text-xs">{item.topic}</span>
                </Button>
              ))}
            </div>
          </Card>

          <Card className="p-4 mt-4 bg-gradient-to-br from-blue-50 to-cyan-50">
            <h3 className="text-sm mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              AI Capabilities
            </h3>
            <ul className="text-xs text-gray-600 space-y-2">
              <li>• Ship & mission info</li>
              <li>• Scientific explanations</li>
              <li>• Weather analysis</li>
              <li>• Wildlife behavior</li>
              <li>• Research context</li>
            </ul>
          </Card>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="flex flex-col h-[600px]">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-cyan-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3>AI Science Assistant</h3>
                  <p className="text-xs text-gray-600">Online • Responds instantly</p>
                </div>
                <Badge className="ml-auto bg-green-600">Active</Badge>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.sender === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className={message.sender === "ai" ? "bg-blue-100 text-blue-600" : "bg-gray-200"}>
                        {message.sender === "ai" ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className={`flex-1 ${message.sender === "user" ? "flex justify-end" : ""}`}>
                      <div
                        className={`inline-block max-w-[80%] p-3 rounded-lg ${
                          message.sender === "ai"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-blue-600 text-white"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className={`text-xs mt-1 ${message.sender === "ai" ? "text-gray-500" : "text-blue-100"}`}>
                          {message.timestamp}
                        </p>
                      </div>

                      {/* Suggested Questions */}
                      {message.sender === "ai" && message.suggested && (
                        <div className="mt-3 space-y-2">
                          <p className="text-xs text-gray-600 mb-2">Suggested questions:</p>
                          {message.suggested.map((suggestion, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="mr-2 text-xs"
                              onClick={() => handleSuggestion(suggestion)}
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        <Bot className="w-5 h-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about science, weather, wildlife, equipment..."
                  className="flex-1"
                />
                <Button onClick={handleSend} disabled={!input.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Powered by AI trained on NIK 421 expedition data and Antarctic science
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
