import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Play, RotateCcw, Zap, Beaker, Info } from "lucide-react";

interface LabModule {
  id: string;
  date: string;
  title: string;
  category: string;
  instrument?: string;
  species?: string;
  description: string;
  funFact: string;
  model3DAvailable: boolean;
  simulationAvailable: boolean;
  quiz: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  };
}

export function LabOfTheDay() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [simulationRunning, setSimulationRunning] = useState(false);

  const todayLab: LabModule = {
    id: "sonar-nov1",
    date: "November 1, 2025 - R/V NIK 421",
    title: "Multi-Beam Sonar System",
    category: "NIK 421 Research Equipment",
    instrument: "Kongsberg EM2040 Multi-Beam Echo Sounder",
    description: "The NIK 421's Kongsberg EM2040 multi-beam sonar system maps the Gerlache Strait ocean floor by sending 400 sound beams that bounce off the seafloor and return to hull-mounted receivers. Currently mapping bathymetry around Neko Harbor and Paradise Harbor, creating detailed 3D maps essential for understanding underwater canyons, glacial deposits, and benthic habitats in the Antarctic Peninsula.",
    funFact: "The NIK 421's EM2040 can detect features as small as 0.5 meters on the seafloor at depths up to 600 meters - perfect for mapping the Gerlache Strait's glacially-carved underwater landscape!",
    model3DAvailable: true,
    simulationAvailable: true,
    quiz: {
      question: "How does the NIK 421's multi-beam sonar determine the depth of the ocean floor?",
      options: [
        "By measuring light reflection",
        "By measuring the time sound takes to travel to the seafloor and back",
        "By using GPS coordinates",
        "By measuring water temperature changes"
      ],
      correctAnswer: 1,
      explanation: "The NIK 421's EM2040 sonar measures depth by calculating the time it takes for sound waves to travel from the ship's hull to the seafloor and back. Sound travels through Antarctic water at approximately 1,450 meters per second (slightly slower than warmer waters due to temperature), so by measuring the round-trip time, the system accurately calculates depth and creates 3D bathymetric maps."
    }
  };

  const handleQuizAnswer = (index: number) => {
    setSelectedAnswer(index);
    setQuizAnswered(true);
  };

  const toggleSimulation = () => {
    setSimulationRunning(!simulationRunning);
  };

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2">Lab of the Day</h1>
            <p className="text-gray-600">{todayLab.date}</p>
          </div>
          <Badge className="bg-blue-600 text-lg px-4 py-2">Today's Feature</Badge>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="3d-model">3D Model</TabsTrigger>
          <TabsTrigger value="simulation">Simulation</TabsTrigger>
          <TabsTrigger value="quiz">Knowledge Quiz</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="overflow-hidden mb-6">
                <div className="relative h-80 bg-gradient-to-br from-blue-900 to-cyan-900">
                  {/* Sonar visualization placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="w-32 h-32 bg-cyan-500 rounded-full animate-ping absolute opacity-20"></div>
                      <div className="w-32 h-32 bg-cyan-400 rounded-full flex items-center justify-center relative">
                        <Beaker className="w-16 h-16 text-white" />
                      </div>
                    </div>
                  </div>
                  <Badge className="absolute top-4 left-4 bg-cyan-600">{todayLab.category}</Badge>
                </div>
                <div className="p-6">
                  <h2 className="mb-2">{todayLab.title}</h2>
                  <p className="text-sm text-gray-600 mb-4">{todayLab.instrument}</p>
                  <p className="text-gray-700">{todayLab.description}</p>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-yellow-400 rounded-lg">
                    <Zap className="w-5 h-5 text-yellow-900" />
                  </div>
                  <div>
                    <p className="mb-1">💡 Fun Fact</p>
                    <p className="text-sm text-gray-700">{todayLab.funFact}</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="mb-4">Key Features</h3>
                <div className="space-y-3">
                  {[
                    { label: "Depth Range", value: "20 - 11,000 m" },
                    { label: "Swath Width", value: "Up to 6x depth" },
                    { label: "Frequency", value: "12 kHz" },
                    { label: "Resolution", value: "1m accuracy" },
                    { label: "Coverage", value: "200+ beams" },
                  ].map((feature, index) => (
                    <div key={index} className="flex justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">{feature.label}</span>
                      <span className="text-sm">{feature.value}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50">
                <h3 className="mb-3">Research Applications</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Seafloor habitat mapping</li>
                  <li>• Submarine canyon detection</li>
                  <li>• Ice shelf monitoring</li>
                  <li>• Navigation safety</li>
                  <li>• Climate change research</li>
                </ul>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="3d-model">
          <Card className="p-8">
            <div className="text-center mb-6">
              <h2 className="mb-2">Interactive 3D Model</h2>
              <p className="text-gray-600">Explore the equipment from all angles</p>
            </div>

            <div className="relative h-[500px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden mb-6">
              {/* 3D Model placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-48 h-48 border-4 border-cyan-400 rounded-lg mb-6 mx-auto relative">
                    <div className="absolute inset-4 border-2 border-cyan-500 rounded-lg transform rotate-45"></div>
                    <div className="absolute inset-8 border border-cyan-600 rounded-lg transform rotate-12"></div>
                    <Beaker className="w-20 h-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-300" />
                  </div>
                  <p className="text-xl mb-2">Interactive 3D View</p>
                  <p className="text-sm text-gray-400">Drag to rotate • Scroll to zoom</p>
                </div>
              </div>

              {/* Controls overlay */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                <Button variant="secondary" size="sm">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset View
                </Button>
                <Button variant="secondary" size="sm">
                  <Info className="w-4 h-4 mr-2" />
                  Show Labels
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {["Front View", "Side View", "Top View", "Detail View"].map((view, index) => (
                <Button key={index} variant="outline" size="sm" className="w-full">
                  {view}
                </Button>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="simulation">
          <Card className="p-8">
            <div className="text-center mb-6">
              <h2 className="mb-2">Sonar Mapping Simulation</h2>
              <p className="text-gray-600">See how multi-beam sonar creates bathymetric maps</p>
            </div>

            <div className="relative h-[500px] bg-gradient-to-b from-blue-900 via-blue-700 to-blue-500 rounded-lg overflow-hidden mb-6">
              {/* Simulation visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                {simulationRunning ? (
                  <div className="w-full h-full relative">
                    {/* Ship at top */}
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10">
                      <div className="w-16 h-8 bg-white rounded-lg shadow-lg"></div>
                    </div>

                    {/* Sonar beams */}
                    {[...Array(9)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute top-16 left-1/2 h-96 w-1 bg-cyan-300 origin-top opacity-50"
                        style={{
                          transform: `translateX(-50%) rotate(${-40 + i * 10}deg)`,
                          animation: `pulse 2s infinite ${i * 0.1}s`
                        }}
                      />
                    ))}

                    {/* Seafloor profile */}
                    <svg className="absolute bottom-0 w-full h-48" viewBox="0 0 100 30">
                      <path
                        d="M0,20 Q10,15 20,18 T40,25 T60,20 T80,22 T100,18 L100,30 L0,30 Z"
                        fill="#1e40af"
                        className="opacity-70"
                      />
                    </svg>

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center">
                      <p className="text-lg mb-2">Scanning Seafloor...</p>
                      <p className="text-sm text-cyan-200">Depth: 2,847 meters</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-white">
                    <Play className="w-20 h-20 mx-auto mb-4 opacity-50" />
                    <p className="text-xl">Click Start to begin simulation</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Button onClick={toggleSimulation} size="lg">
                {simulationRunning ? (
                  <>
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Reset Simulation
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Start Simulation
                  </>
                )}
              </Button>
            </div>

            <Card className="p-4 mt-6 bg-blue-50">
              <h3 className="text-sm mb-3">How it Works</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>1. <strong>Sound Emission:</strong> The ship emits multiple sonar beams in a fan pattern</p>
                <p>2. <strong>Echo Detection:</strong> Beams bounce off the seafloor and return to receivers</p>
                <p>3. <strong>Time Calculation:</strong> System measures round-trip time for each beam</p>
                <p>4. <strong>Map Creation:</strong> Data is processed to create a 3D bathymetric map</p>
              </div>
            </Card>
          </Card>
        </TabsContent>

        <TabsContent value="quiz">
          <Card className="p-8 max-w-3xl mx-auto">
            <h2 className="mb-6 text-center">Test Your Knowledge</h2>

            <div className="mb-8">
              <p className="text-lg mb-6">{todayLab.quiz.question}</p>

              <div className="space-y-3">
                {todayLab.quiz.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => !quizAnswered && handleQuizAnswer(index)}
                    disabled={quizAnswered}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                      quizAnswered
                        ? index === todayLab.quiz.correctAnswer
                          ? "border-green-500 bg-green-50"
                          : index === selectedAnswer
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200 bg-gray-50"
                        : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {quizAnswered && index === todayLab.quiz.correctAnswer && (
                        <Badge className="bg-green-600">Correct</Badge>
                      )}
                      {quizAnswered && index === selectedAnswer && index !== todayLab.quiz.correctAnswer && (
                        <Badge className="bg-red-600">Incorrect</Badge>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {quizAnswered && (
              <div className={`p-6 rounded-lg ${
                selectedAnswer === todayLab.quiz.correctAnswer
                  ? "bg-green-50 border-2 border-green-200"
                  : "bg-blue-50 border-2 border-blue-200"
              }`}>
                <h3 className="mb-3">
                  {selectedAnswer === todayLab.quiz.correctAnswer ? "🎉 Correct!" : "📚 Learn More"}
                </h3>
                <p className="text-gray-700">{todayLab.quiz.explanation}</p>
              </div>
            )}

            {quizAnswered && (
              <div className="mt-6 text-center">
                <Button
                  onClick={() => {
                    setQuizAnswered(false);
                    setSelectedAnswer(null);
                  }}
                >
                  Try Again
                </Button>
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
