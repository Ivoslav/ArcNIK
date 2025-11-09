import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Alert, AlertDescription } from "./ui/alert";
import { Slider } from "./ui/slider";
import { FlaskConical, Radio, Waves, Cloud, Award, AlertCircle, CheckCircle2 } from "lucide-react";

interface Project {
  id: string;
  title: string;
  field: string;
  description: string;
  icon: React.ElementType;
  duration: number; // days
  difficulty: "beginner" | "intermediate" | "advanced";
  objectives: string[];
}

interface Decision {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
    impact: { budget: number; time: number; quality: number };
  }[];
}

export function ScienceProjectSim() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectStarted, setProjectStarted] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [resources, setResources] = useState({ budget: 100, time: 14, quality: 0 });
  const [decisions, setDecisions] = useState<string[]>([]);
  const [projectComplete, setProjectComplete] = useState(false);

  const projects: Project[] = [
    {
      id: "meteorology",
      title: "Gerlache Strait Storm Dynamics",
      field: "Meteorology - NIK 421",
      description: "Use the NIK 421's meteorological station to study katabatic wind patterns and storm formation in the Gerlache Strait using ship-mounted sensors and satellite data integration.",
      icon: Cloud,
      duration: 7,
      difficulty: "intermediate",
      objectives: [
        "Calibrate NIK 421 weather station sensors",
        "Monitor katabatic wind patterns from ice sheet",
        "Track temperature anomalies vs historical data",
        "Correlate findings with Dr. Martinez's marine observations",
      ],
    },
    {
      id: "radio-astronomy",
      title: "Antarctic Ionosphere Study",
      field: "Radio Astronomy - NIK 421",
      description: "Monitor solar radio emissions using NIK 421's radio equipment and measure ionospheric effects on ship communications in high-latitude conditions.",
      icon: Radio,
      duration: 7,
      difficulty: "advanced",
      objectives: [
        "Set up radio astronomy receivers on NIK 421",
        "Monitor solar flare events during expedition",
        "Document communication disruptions",
        "Compare with global space weather data",
      ],
    },
    {
      id: "oceanography",
      title: "Gerlache Strait Oceanography",
      field: "Oceanography - NIK 421",
      description: "Use NIK 421's CTD rosette and multi-beam sonar to map ocean currents, temperature gradients, and plankton distribution in the Gerlache Strait ecosystem.",
      icon: Waves,
      duration: 7,
      difficulty: "beginner",
      objectives: [
        "Deploy NIK 421's CTD at 10 stations",
        "Collect water samples using Niskin bottles",
        "Map Gerlache Strait current patterns with sonar",
        "Analyze nutrient upwelling zones",
      ],
    },
    {
      id: "biology",
      title: "Antarctic Krill Population Study",
      field: "Marine Biology - NIK 421",
      description: "Assess Antarctic krill population in the Gerlache Strait using NIK 421's acoustic monitoring equipment and net sampling as a key indicator of ecosystem health.",
      icon: FlaskConical,
      duration: 7,
      difficulty: "intermediate",
      objectives: [
        "Deploy NIK 421's acoustic monitoring system",
        "Conduct plankton net tows at feeding sites",
        "Analyze krill size distribution and maturity",
        "Link findings to penguin breeding success data",
      ],
    },
  ];

  const phases = [
    {
      name: "Planning & Setup",
      decisions: [
        {
          id: "equipment",
          question: "How should you allocate your equipment budget?",
          options: [
            { id: "premium", text: "Premium equipment (high reliability, high cost)", impact: { budget: -40, time: 0, quality: 30 } },
            { id: "standard", text: "Standard equipment (balanced approach)", impact: { budget: -25, time: 0, quality: 20 } },
            { id: "budget", text: "Budget equipment (save funds for more samples)", impact: { budget: -15, time: 0, quality: 10 } },
          ],
        },
        {
          id: "team",
          question: "How many field days should you allocate for data collection?",
          options: [
            { id: "intensive", text: "10 intensive field days (thorough but time-consuming)", impact: { budget: -20, time: -10, quality: 35 } },
            { id: "moderate", text: "7 moderate field days (balanced approach)", impact: { budget: -15, time: -7, quality: 25 } },
            { id: "minimal", text: "4 focused field days (efficient but limited data)", impact: { budget: -10, time: -4, quality: 15 } },
          ],
        },
      ],
    },
    {
      name: "Data Collection",
      decisions: [
        {
          id: "weather",
          question: "A storm is approaching. How do you proceed?",
          options: [
            { id: "wait", text: "Wait for better conditions (safer but loses time)", impact: { budget: 0, time: -3, quality: 0 } },
            { id: "modified", text: "Modify protocol for storm conditions", impact: { budget: -10, time: 0, quality: -5 } },
            { id: "continue", text: "Continue as planned (risky but maintains schedule)", impact: { budget: 0, time: 0, quality: -15 } },
          ],
        },
        {
          id: "samples",
          question: "You have budget for additional samples. What do you do?",
          options: [
            { id: "more-samples", text: "Collect more samples at current locations", impact: { budget: -15, time: -2, quality: 20 } },
            { id: "new-sites", text: "Expand to new collection sites", impact: { budget: -20, time: -3, quality: 25 } },
            { id: "save", text: "Save budget for analysis equipment", impact: { budget: 0, time: 0, quality: 15 } },
          ],
        },
      ],
    },
    {
      name: "Analysis & Reporting",
      decisions: [
        {
          id: "analysis",
          question: "How should you approach data analysis?",
          options: [
            { id: "advanced", text: "Advanced statistical modeling (time-intensive)", impact: { budget: -15, time: -4, quality: 30 } },
            { id: "standard", text: "Standard analysis protocols", impact: { budget: -10, time: -2, quality: 20 } },
            { id: "basic", text: "Basic analysis to meet minimum requirements", impact: { budget: -5, time: -1, quality: 10 } },
          ],
        },
      ],
    },
  ];

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    setProjectStarted(false);
    setCurrentPhase(0);
    setResources({ budget: 100, time: project.duration, quality: 0 });
    setDecisions([]);
    setProjectComplete(false);
  };

  const handleDecision = (decisionId: string, optionId: string) => {
    const phase = phases[currentPhase];
    const decision = phase.decisions.find(d => d.id === decisionId);
    const option = decision?.options.find(o => o.id === optionId);

    if (option) {
      setResources({
        budget: Math.max(0, resources.budget + option.impact.budget),
        time: Math.max(0, resources.time + option.impact.time),
        quality: Math.max(0, resources.quality + option.impact.quality),
      });
      setDecisions([...decisions, optionId]);
    }
  };

  const handleNextPhase = () => {
    if (currentPhase < phases.length - 1) {
      setCurrentPhase(currentPhase + 1);
    } else {
      setProjectComplete(true);
    }
  };

  const getSuccessLevel = () => {
    if (resources.quality >= 80) return { level: "Excellent", color: "text-green-600", badge: "bg-green-600" };
    if (resources.quality >= 60) return { level: "Good", color: "text-blue-600", badge: "bg-blue-600" };
    if (resources.quality >= 40) return { level: "Adequate", color: "text-yellow-600", badge: "bg-yellow-600" };
    return { level: "Needs Improvement", color: "text-orange-600", badge: "bg-orange-600" };
  };

  if (projectComplete && selectedProject) {
    const success = getSuccessLevel();
    return (
      <div>
        <div className="mb-8">
          <h1 className="mb-2">Project Complete!</h1>
          <p className="text-gray-600">Review your research outcomes</p>
        </div>

        <Card className="p-8 text-center mb-6">
          <div className={`inline-flex p-4 rounded-full mb-4 ${success.level === "Excellent" ? "bg-green-100" : "bg-blue-100"}`}>
            <Award className={`w-16 h-16 ${success.color}`} />
          </div>
          <h2 className={`mb-2 ${success.color}`}>{success.level} Project Execution!</h2>
          <p className="text-xl mb-6">{selectedProject.title}</p>
          
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Research Quality</p>
              <p className="text-3xl mb-2">{resources.quality}%</p>
              <Progress value={resources.quality} className="h-2" />
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Budget Efficiency</p>
              <p className="text-3xl mb-2">{resources.budget}%</p>
              <Progress value={resources.budget} className="h-2" />
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Time Remaining</p>
              <p className="text-3xl mb-2">{resources.time}</p>
              <p className="text-sm text-gray-600">days</p>
            </div>
          </div>

          <Badge className={`${success.badge} text-white text-lg px-6 py-2 mb-6`}>
            Certificate of Completion Earned
          </Badge>

          <div className="flex gap-4 justify-center">
            <Button onClick={() => setProjectComplete(false)}>
              View Detailed Results
            </Button>
            <Button variant="outline" onClick={() => handleProjectSelect(selectedProject)}>
              Restart Project
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (!selectedProject) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="mb-2">My Science Project Simulator</h1>
          <p className="text-gray-600">
            Join the R/V NIK 421 scientific crew and manage real research projects being conducted during the November 2025 Antarctic Peninsula Expedition. Make decisions, allocate resources, and earn certificates based on actual NIK 421 research protocols.
          </p>
          <div className="mt-3 flex items-center gap-3">
            <Badge className="bg-blue-600">NIK 421 Science Team</Badge>
            <Badge variant="outline">4 Active Research Projects</Badge>
            <Badge variant="outline">7-Day Simulations</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => {
            const Icon = project.icon;
            return (
              <Card key={project.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1">{project.title}</h3>
                    <p className="text-sm text-gray-600">{project.field}</p>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{project.description}</p>

                <div className="mb-4">
                  <p className="text-sm mb-2">Objectives:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {project.objectives.map((obj, index) => (
                      <li key={index}>• {obj}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex gap-2">
                    <Badge variant="outline">{project.duration} days</Badge>
                    <Badge variant="outline" className="capitalize">{project.difficulty}</Badge>
                  </div>
                  <Button onClick={() => { handleProjectSelect(project); setProjectStarted(true); }}>
                    Start Project
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  if (!projectStarted) {
    const Icon = selectedProject.icon;
    return (
      <div>
        <Button variant="ghost" onClick={() => setSelectedProject(null)} className="mb-6">
          ← Back to Projects
        </Button>

        <Card className="p-8">
          <div className="flex items-start gap-6 mb-6">
            <div className="p-4 bg-blue-100 rounded-lg">
              <Icon className="w-12 h-12 text-blue-600" />
            </div>
            <div className="flex-1">
              <h2 className="mb-2">{selectedProject.title}</h2>
              <p className="text-gray-600 mb-4">{selectedProject.description}</p>
              <div className="flex gap-2">
                <Badge>{selectedProject.field}</Badge>
                <Badge variant="outline">{selectedProject.duration} days</Badge>
                <Badge variant="outline" className="capitalize">{selectedProject.difficulty}</Badge>
              </div>
            </div>
          </div>

          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              You'll manage resources including budget, time, and research quality. Each decision impacts your final outcomes. Choose wisely!
            </AlertDescription>
          </Alert>

          <div className="mb-6">
            <h3 className="mb-3">Project Objectives</h3>
            <div className="space-y-2">
              {selectedProject.objectives.map((obj, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-gray-400 mt-0.5" />
                  <span className="text-sm">{obj}</span>
                </div>
              ))}
            </div>
          </div>

          <Button size="lg" className="w-full" onClick={() => setProjectStarted(true)}>
            Begin Research Project
          </Button>
        </Card>
      </div>
    );
  }

  const currentPhaseData = phases[currentPhase];
  const currentDecisionIndex = decisions.length - (currentPhase === 0 ? 0 : phases.slice(0, currentPhase).reduce((acc, p) => acc + p.decisions.length, 0));
  const currentDecision = currentPhaseData.decisions[currentDecisionIndex];
  const allPhaseDecisionsMade = currentDecisionIndex >= currentPhaseData.decisions.length;

  return (
    <div>
      <Button variant="ghost" onClick={() => setProjectStarted(false)} className="mb-6">
        ← Back to Overview
      </Button>

      {/* Resources Dashboard */}
      <Card className="p-6 mb-6 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="flex items-center justify-between mb-4">
          <h3>Project Resources</h3>
          <Badge>Phase {currentPhase + 1} of {phases.length}</Badge>
        </div>
        
        <div className="grid grid-cols-3 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Budget</span>
              <span className="text-sm">{resources.budget}%</span>
            </div>
            <Progress value={resources.budget} className="h-3" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Time Remaining</span>
              <span className="text-sm">{resources.time} days</span>
            </div>
            <Progress value={(resources.time / selectedProject.duration) * 100} className="h-3" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Research Quality</span>
              <span className="text-sm">{resources.quality}%</span>
            </div>
            <Progress value={resources.quality} className="h-3" />
          </div>
        </div>
      </Card>

      {/* Current Phase */}
      <Card className="p-6 mb-6">
        <h3 className="mb-4">Phase: {currentPhaseData.name}</h3>
        
        {!allPhaseDecisionsMade && currentDecision ? (
          <div>
            <p className="text-lg mb-6">{currentDecision.question}</p>
            
            <div className="space-y-3">
              {currentDecision.options.map((option) => (
                <Card
                  key={option.id}
                  className="p-4 hover:shadow-md transition-shadow cursor-pointer hover:border-blue-300"
                  onClick={() => handleDecision(currentDecision.id, option.id)}
                >
                  <p className="mb-3">{option.text}</p>
                  <div className="flex gap-4 text-sm">
                    <span className={option.impact.budget < 0 ? "text-red-600" : "text-gray-600"}>
                      Budget: {option.impact.budget > 0 ? "+" : ""}{option.impact.budget}%
                    </span>
                    <span className={option.impact.time < 0 ? "text-red-600" : "text-gray-600"}>
                      Time: {option.impact.time > 0 ? "+" : ""}{option.impact.time} days
                    </span>
                    <span className={option.impact.quality > 0 ? "text-green-600" : "text-gray-600"}>
                      Quality: {option.impact.quality > 0 ? "+" : ""}{option.impact.quality}%
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="mb-2">Phase Complete!</h3>
            <p className="text-gray-600 mb-6">You've made all decisions for this phase</p>
            <Button onClick={handleNextPhase} size="lg">
              {currentPhase < phases.length - 1 ? "Continue to Next Phase" : "Complete Project"}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
