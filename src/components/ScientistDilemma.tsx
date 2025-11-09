import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { MessageSquare, ThumbsUp, ThumbsDown, TrendingUp, Users, Sparkles } from "lucide-react";

interface Dilemma {
  id: string;
  title: string;
  description: string;
  context: string;
  category: string;
  options: {
    id: string;
    text: string;
    description: string;
  }[];
  votes: {
    [key: string]: number;
  };
  totalVotes: number;
  aiAnalysis: string;
  relatedResearch: string[];
}

export function ScientistDilemma() {
  const [selectedDilemma, setSelectedDilemma] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [userComment, setUserComment] = useState("");
  const [hasVoted, setHasVoted] = useState(false);

  const dilemmas: Dilemma[] = [
    {
      id: "tourism-impact",
      title: "Antarctic Tourism Growth & Environmental Impact",
      description: "How should we balance increasing Antarctic tourism with conservation?",
      context: "Antarctic tourism has grown from 5,000 visitors in 1992 to over 74,000 in 2020. While it raises awareness and funds conservation, it also impacts wildlife, introduces biosecurity risks, and increases carbon emissions from ships.",
      category: "Conservation",
      options: [
        {
          id: "strict-limits",
          text: "Implement strict visitor caps and seasonal restrictions",
          description: "Limit annual visitors to current levels with strict seasonal closures during breeding periods",
        },
        {
          id: "managed-growth",
          text: "Allow managed growth with enhanced regulations",
          description: "Permit gradual increase with strengthened guidelines, mandatory training, and larger exclusion zones",
        },
        {
          id: "virtual-access",
          text: "Shift focus to virtual tourism experiences",
          description: "Develop high-quality VR and remote experiences to reduce physical visits while maintaining engagement",
        },
        {
          id: "research-only",
          text: "Restrict access to scientific research only",
          description: "Phase out tourism entirely, reserving Antarctica exclusively for scientific purposes",
        },
      ],
      votes: {
        "strict-limits": 342,
        "managed-growth": 567,
        "virtual-access": 189,
        "research-only": 124,
      },
      totalVotes: 1222,
      aiAnalysis: "This dilemma highlights the tension between conservation, education, and accessibility. Research shows tourism can positively impact conservation funding and public awareness, but unmanaged growth poses real risks. A balanced approach combining managed access with technology might optimize both goals. Community voting suggests preference for maintaining access while enhancing protections.",
      relatedResearch: [
        "IAATO Tourism Statistics 2020",
        "Environmental Impact Assessment by Antarctic Treaty",
        "Antarctic Visitor Behavior Studies",
      ],
    },
    {
      id: "ice-core-extraction",
      title: "Ice Core Drilling vs. Pristine Preservation",
      description: "Should we extract more ice cores for climate research or preserve untouched ice?",
      context: "Ice cores provide irreplaceable climate data spanning hundreds of thousands of years. However, drilling disrupts pristine environments and extracted ice can never be replaced. With improving technology, future drilling might be more efficient and less invasive.",
      category: "Research Ethics",
      options: [
        {
          id: "drill-now",
          text: "Maximize ice core extraction with current technology",
          description: "Collect as much data as possible now while ice is still accessible and stable",
        },
        {
          id: "minimal-impact",
          text: "Limited drilling in designated research zones only",
          description: "Restrict drilling to specific areas, leaving vast regions untouched",
        },
        {
          id: "wait-tech",
          text: "Delay until less invasive technology develops",
          description: "Preserve most ice for future extraction with better methods",
        },
        {
          id: "alternative-methods",
          text: "Focus on alternative climate proxies",
          description: "Prioritize other research methods like sediment cores and satellite data",
        },
      ],
      votes: {
        "drill-now": 423,
        "minimal-impact": 678,
        "wait-tech": 234,
        "alternative-methods": 189,
      },
      totalVotes: 1524,
      aiAnalysis: "This ethical dilemma balances immediate scientific need against preservation for future generations. Ice cores are time-capsules that can't be recreated once lost. The urgency comes from climate change potentially altering or destroying ice before we can study it. Most researchers favor the 'minimal-impact' approach, extracting cores strategically while preserving large pristine areas.",
      relatedResearch: [
        "EPICA Ice Core Project",
        "Future Technology in Glaciology",
        "Non-invasive Climate Research Methods",
      ],
    },
  ];

  const currentDilemma = dilemmas.find(d => d.id === selectedDilemma) || dilemmas[0];

  const handleVote = () => {
    if (selectedOption) {
      setHasVoted(true);
      // In real app, this would submit vote to backend
    }
  };

  const getVotePercentage = (optionId: string) => {
    return ((currentDilemma.votes[optionId] / currentDilemma.totalVotes) * 100).toFixed(1);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2">The Scientist's Dilemma</h1>
        <p className="text-gray-600">
          Engage with real scientific and ethical dilemmas facing Antarctic research
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Dilemma List */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <h3 className="text-sm mb-4">Active Debates</h3>
            <div className="space-y-2">
              {dilemmas.map((dilemma) => (
                <Button
                  key={dilemma.id}
                  variant={selectedDilemma === dilemma.id ? "default" : "outline"}
                  size="sm"
                  className="w-full justify-start text-left h-auto py-3"
                  onClick={() => {
                    setSelectedDilemma(dilemma.id);
                    setHasVoted(false);
                    setSelectedOption("");
                    setUserComment("");
                  }}
                >
                  <div>
                    <p className="text-xs mb-1">{dilemma.title}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Users className="w-3 h-3" />
                      <span>{dilemma.totalVotes} votes</span>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </Card>

          <Card className="p-4 mt-4 bg-gradient-to-br from-purple-50 to-pink-50">
            <h3 className="text-sm mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              Community Impact
            </h3>
            <p className="text-xs text-gray-600">
              Your votes help researchers understand public perspectives on Antarctic science ethics
            </p>
          </Card>
        </div>

        {/* Dilemma Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Dilemma Description */}
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="mb-2">{currentDilemma.title}</h2>
                <p className="text-gray-700 mb-4">{currentDilemma.description}</p>
              </div>
              <Badge>{currentDilemma.category}</Badge>
            </div>
            
            <div className="bg-white p-4 rounded-lg">
              <p className="text-sm mb-2">Context:</p>
              <p className="text-sm text-gray-700">{currentDilemma.context}</p>
            </div>
          </Card>

          {/* Voting or Results */}
          {!hasVoted ? (
            <Card className="p-6">
              <h3 className="mb-4">Cast Your Vote</h3>
              <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
                <div className="space-y-4">
                  {currentDilemma.options.map((option) => (
                    <div
                      key={option.id}
                      className={`p-4 border-2 rounded-lg transition-colors cursor-pointer ${
                        selectedOption === option.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedOption(option.id)}
                    >
                      <div className="flex items-start gap-3">
                        <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor={option.id} className="cursor-pointer">
                            <p className="mb-2">{option.text}</p>
                            <p className="text-sm text-gray-600">{option.description}</p>
                          </Label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </RadioGroup>

              <div className="mt-6">
                <Label>Optional: Share your reasoning (anonymous)</Label>
                <Textarea
                  placeholder="Why did you choose this option? Your perspective helps researchers understand public views..."
                  value={userComment}
                  onChange={(e) => setUserComment(e.target.value)}
                  rows={3}
                  className="mt-2"
                />
              </div>

              <Button
                onClick={handleVote}
                disabled={!selectedOption}
                className="w-full mt-6"
                size="lg"
              >
                <ThumbsUp className="w-4 h-4 mr-2" />
                Submit Vote
              </Button>
            </Card>
          ) : (
            <>
              {/* Results */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3>Community Vote Distribution</h3>
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    ✓ You Voted: {currentDilemma.options.find(o => o.id === selectedOption)?.text}
                  </Badge>
                </div>

                <div className="space-y-4">
                  {currentDilemma.options.map((option) => {
                    const percentage = parseFloat(getVotePercentage(option.id));
                    const votes = currentDilemma.votes[option.id];
                    const isUserChoice = option.id === selectedOption;

                    return (
                      <div key={option.id} className={`p-4 rounded-lg ${isUserChoice ? "bg-blue-50 border-2 border-blue-300" : "bg-gray-50"}`}>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p>{option.text}</p>
                              {isUserChoice && <Badge className="bg-blue-600">Your Vote</Badge>}
                            </div>
                            <p className="text-sm text-gray-600">{option.description}</p>
                          </div>
                        </div>
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-gray-600">{votes} votes</span>
                            <span>{percentage}%</span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {currentDilemma.totalVotes.toLocaleString()} community members have voted
                  </p>
                </div>
              </Card>

              {/* AI Analysis */}
              <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-purple-600 rounded-lg">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <h3>AI Analysis & Summary</h3>
                </div>
                <p className="text-gray-700 mb-4">{currentDilemma.aiAnalysis}</p>
                
                <div className="mt-4 pt-4 border-t border-purple-200">
                  <p className="text-sm mb-2">Related Research:</p>
                  <div className="space-y-1">
                    {currentDilemma.relatedResearch.map((research, index) => (
                      <Button key={index} variant="link" size="sm" className="h-auto p-0 text-xs text-purple-700">
                        → {research}
                      </Button>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Discussion */}
              <Card className="p-6">
                <h3 className="mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Community Perspectives
                </h3>
                <div className="space-y-3">
                  {[
                    { author: "Marine Biologist", comment: "We need to prioritize ecosystem health, but education through tourism has proven invaluable for conservation funding." },
                    { author: "Climate Researcher", comment: "Virtual experiences can't replace the transformative impact of actually being there. Personal connection drives conservation action." },
                    { author: "Policy Expert", comment: "The data shows managed tourism with strict protocols can coexist with conservation if we enforce regulations consistently." },
                  ].map((item, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">{item.author}</p>
                      <p className="text-sm text-gray-700">"{item.comment}"</p>
                    </div>
                  ))}
                </div>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
