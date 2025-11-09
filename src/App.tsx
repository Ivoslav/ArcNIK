import { useState } from "react";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Progress } from "./components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Avatar, AvatarFallback } from "./components/ui/avatar";
import { Toaster } from "./components/ui/sonner";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./components/ui/dialog";
import { LiveDashboard } from "./components/LiveDashboard";
import { WeatherWidget } from "./components/WeatherWidget";
import { WildlifeLogCard } from "./components/WildlifeLogCard";
import { GearChecklistManager } from "./components/GearChecklistManager";
import { DailyActivityCard } from "./components/DailyActivityCard";
import { LandingSiteCard } from "./components/LandingSiteCard";
import { LabOfTheDay } from "./components/LabOfTheDay";
import { ScienceProjectSim } from "./components/ScienceProjectSim";
import { LogbookEntry } from "./components/LogbookEntry";
import { VRShipTour } from "./components/VRShipTour";
import { Nick421Panorama } from "./components/Nick421Panorama";
import { StoriesBehindShot } from "./components/StoriesBehindShot";
import { WeatherLookback } from "./components/WeatherLookback";
import { AIScientistChat } from "./components/AIScientistChat";
import { ScientistDilemma } from "./components/ScientistDilemma";
import { InteractiveKnowledgeMap } from "./components/InteractiveKnowledgeMap";
import { PhotoGallery } from "./components/PhotoGallery";
import { ResearchHub } from "./components/ResearchHub";
import { SubscriptionPlans } from "./components/SubscriptionPlans";
import varnaImage from 'figma:asset/178b061ca13cb671c456d3f7a5cff3c01ad53583.png';
import {
  Ship,
  Backpack,
  GraduationCap,
  FileText,
  MapPin,
  Compass,
  Camera,
  BookOpen,
  Award,
  Image,
  TrendingUp,
  Search,
  Bell,
  ChevronRight,
  Download,
  Play,
  Bot,
  Map,
  MessageSquare,
  Cloud,
  Microscope,
  CreditCard,
} from "lucide-react";

export default function App() {
  const [activePhase, setActivePhase] = useState<"pre" | "onboard" | "post">("onboard");
  const [activeSection, setActiveSection] = useState("dashboard");
  
  const [gearChecklist, setGearChecklist] = useState([
    { id: 1, item: "Waterproof parka", category: "Outerwear", priority: "essential" as const, status: "complete" as const, tip: "Provided by expedition - ensure proper fit during embarkation" },
    { id: 2, item: "Thermal base layers (3 sets)", category: "Clothing", priority: "essential" as const, status: "complete" as const, tip: "Merino wool or synthetic recommended" },
    { id: 3, item: "Insulated boots", category: "Footwear", priority: "essential" as const, status: "in-progress" as const, tip: "Must be waterproof and rated for -20°C" },
    { id: 4, item: "Polarized sunglasses", category: "Accessories", priority: "essential" as const, status: "not-started" as const, tip: "UV protection essential due to ice reflection" },
    { id: 5, item: "Sunscreen SPF 50+", category: "Personal Care", priority: "essential" as const, status: "complete" as const, tip: "UV rays stronger due to ozone hole" },
    { id: 6, item: "Binoculars", category: "Equipment", priority: "recommended" as const, status: "not-started" as const, tip: "8x42 or 10x42 recommended for wildlife viewing" },
    { id: 7, item: "Camera with extra batteries", category: "Equipment", priority: "recommended" as const, status: "complete" as const, tip: "Batteries drain faster in cold temperatures" },
    { id: 8, item: "Seasickness medication", category: "Medical", priority: "recommended" as const, status: "not-started" as const, tip: "Drake Passage can be rough" },
  ]);

  const [wildlifeSightings, setWildlifeSightings] = useState([
    { id: 1, species: "Gentoo Penguin", type: "penguin", count: 45, location: "Neko Harbor", timestamp: "2025-11-01 10:30" },
    { id: 2, species: "Humpback Whale", type: "whale", count: 2, location: "Gerlache Strait", timestamp: "2025-11-01 14:15" },
    { id: 3, species: "Weddell Seal", type: "seal", count: 3, location: "Cuverville Island", timestamp: "2025-10-31 16:45" },
  ]);

  const toggleGearItem = (id: number) => {
    setGearChecklist(gearChecklist.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const handleSaveSighting = (sighting: any) => {
    setWildlifeSightings([
      ...wildlifeSightings,
      { 
        id: wildlifeSightings.length + 1, 
        ...sighting, 
        timestamp: new Date().toISOString().slice(0, 16).replace('T', ' ')
      }
    ]);
  };

  const landingSites = [
    {
      name: "Varna, Bulgaria",
      location: "43.2141°N 27.9147°E",
      image: varnaImage,
      difficulty: "easy" as const,
      highlights: ["Expedition Start", "Black Sea Port", "Departure Nov 7, 2025"],
      wildlife: ["Seagulls", "Dolphins"],
      regulations: ["✓ Departed", "Home port", "NIK 421 launch point"],
      status: "completed" as const,
    },
    {
      name: "Istanbul, Turkey",
      location: "41.0082°N 28.9784°E",
      image: "https://images.unsplash.com/photo-1657257532231-befe476dc655?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJc3RhbmJ1bCUyMGJvc3Bob3J1cyUyMHN0cmFpdHxlbnwxfHx8fDE3NjI2ODU5OTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      difficulty: "moderate" as const,
      highlights: ["Bosphorus Passage", "Historic City", "Passed Nov 8, 2025"],
      wildlife: ["Dolphins", "Seabirds", "Flying Fish"],
      regulations: ["✓ Completed", "Strategic waterway transit", "Cultural stop"],
      status: "completed" as const,
    },
    {
      name: "Cartagena, Spain",
      location: "37.6256°N 0.9959°W",
      image: "https://images.unsplash.com/photo-1723988432763-d9c3e68b7697?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDYXJ0YWdlbmElMjBTcGFpbiUyMHBvcnR8ZW58MXx8fHwxNzYyNjg1OTk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      difficulty: "easy" as const,
      highlights: ["Mediterranean Port", "NEXT STOP - Nov 23", "Resupply & Crew Rest"],
      wildlife: ["Mediterranean Seals", "Sea Turtles", "Tuna"],
      regulations: ["⏩ Next Destination", "Estimated Nov 23, 2025", "2-day port call planned"],
      status: "upcoming" as const,
    },
    {
      name: "Gibraltar",
      location: "36.1408°N 5.3536°W",
      image: "https://images.unsplash.com/photo-1619165166178-25e8a9ab2d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHaWJyYWx0YXIlMjByb2NrJTIwc3RyYWl0fGVufDF8fHx8MTc2MjY4NTk5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      difficulty: "moderate" as const,
      highlights: ["Atlantic Gateway", "Strategic Passage", "Est. Nov 26"],
      wildlife: ["Dolphins", "Pilot Whales", "Barbary Macaques"],
      regulations: ["Atlantic Ocean entry", "Weather checkpoint", "Refuel stop"],
      status: "upcoming" as const,
    },
    {
      name: "Mar del Plata, Argentina",
      location: "38.0°S 57.5°W",
      image: "https://images.unsplash.com/photo-1587856618088-bdef3070c750?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNYXIlMjBkZWwlMjBQbGF0YSUyMEFyZ2VudGluYXxlbnwxfHx8fDE3NjI2ODU5OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      difficulty: "moderate" as const,
      highlights: ["South Atlantic", "Final Resupply", "Est. Feb 15, 2026"],
      wildlife: ["Sea Lions", "Elephant Seals", "Southern Right Whales"],
      regulations: ["Last major port", "Antarctic preparation", "Scientific equipment check"],
      status: "upcoming" as const,
    },
    {
      name: "Livingston Island, Antarctica",
      location: "62.6°S 60.5°W",
      image: "https://images.unsplash.com/photo-1637327911321-7fb8bb5a8730?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBbnRhcmN0aWNhJTIwTGl2aW5nc3RvbiUyMElzbGFuZHxlbnwxfHx8fDE3NjI2ODYwOTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      difficulty: "extreme" as const,
      highlights: ["FINAL DESTINATION", "Antarctic Research", "Est. May 5, 2026"],
      wildlife: ["Gentoo Penguins", "Weddell Seals", "Humpback Whales", "Antarctic Terns"],
      regulations: ["5m distance from wildlife", "IAATO protocols", "Extreme weather preparation"],
      status: "upcoming" as const,
    },
  ];

  const dailyActivities = [
    { time: "07:00", title: "Breakfast", type: "meal" as const, location: "Main Dining Room" },
    { time: "08:30", title: "Shore Landing - Port Lockroy", type: "landing" as const, location: "Port Lockroy Historic Site", guide: "Dr. Sarah Martinez", capacity: "60 guests", description: "Visit the historic British base and operating post office" },
    { time: "12:30", title: "Lunch", type: "meal" as const, location: "Main Dining Room" },
    { time: "14:00", title: "Lecture: Antarctic Marine Life", type: "lecture" as const, location: "Theater Deck", guide: "Marine Biologist Dr. James Chen", description: "Deep dive into the unique adaptations of Antarctic marine species" },
    { time: "16:00", title: "Zodiac Cruise - Glacier Viewing", type: "zodiac" as const, location: "Paradise Harbor", guide: "Expedition Team", capacity: "All guests" },
    { time: "19:00", title: "Captain's Dinner", type: "meal" as const, location: "Main Dining Room" },
  ];

  const quizQuestions = [
    {
      question: "What is the minimum distance you must maintain from wildlife in Antarctica?",
      options: ["2 meters", "5 meters", "10 meters", "15 meters"],
      correctAnswer: 1,
      explanation: "According to IAATO guidelines, visitors must maintain a minimum distance of 5 meters (15 feet) from all wildlife to minimize disturbance."
    },
    {
      question: "Why is boot washing mandatory before and after each landing?",
      options: [
        "To keep the ship clean",
        "To prevent the spread of non-native species and diseases",
        "For safety reasons only",
        "It's just a tradition"
      ],
      correctAnswer: 1,
      explanation: "Biosecurity is critical in Antarctica. Boot washing prevents the introduction of invasive species and diseases that could devastate the pristine ecosystem."
    },
    {
      question: "What should you do if a penguin approaches you?",
      options: [
        "Take photos and pet it",
        "Stay still and let it pass",
        "Walk away immediately",
        "Feed it"
      ],
      correctAnswer: 1,
      explanation: "If wildlife approaches you, remain still and quiet. Never approach, feed, or touch wildlife. Let animals maintain control of the encounter."
    },
  ];

  const logbookEntries = [
    {
      date: "Nov 9, 2025",
      location: "Istanbul, Turkey",
      coordinates: "41°01'N 28°58'E",
      weather: "Clear skies, 18°C, light breeze",
      activities: ["Port Call", "City Tour", "Crew Rest Day", "Final Provisions"],
      wildlifeSightings: [
        { species: "European Seagull", count: 25 },
        { species: "Common Dolphin (Bosphorus)", count: 4 },
      ],
      highlights: "Magnificent passage through the Bosphorus Strait connecting Europe and Asia, the Black Sea and the Mediterranean. The crew explored the historic city - visited Hagia Sophia, Blue Mosque, and Grand Bazaar. Final major provisions loaded before continuing west through the Mediterranean toward the Atlantic and eventually Antarctica.",
      photos: 134,
      previewImage: "https://images.unsplash.com/photo-1657257532231-befe476dc655?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc3RhbmJ1bCUyMGJvc3Bob3J1cyUyMHN0cmFpdHxlbnwxfHx8fDE3NjI2MTY3NTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      date: "Nov 7, 2025",
      location: "Varna, Bulgaria",
      coordinates: "43°12'N 27°55'E",
      weather: "Mild autumn weather, 16°C, calm Black Sea",
      activities: ["Departure Ceremony", "Final Safety Drill", "Route Planning"],
      wildlifeSightings: [
        { species: "Black Sea Gull", count: 32 },
        { species: "Cormorant", count: 8 },
      ],
      highlights: "NIK 421 departed from Varna Port with great fanfare! Official send-off ceremony attended by Bulgarian officials, families, and well-wishers. The entire crew assembled on deck as we left the Black Sea coast, beginning our epic 6-month journey to Antarctica. Final safety briefings completed and all systems green. The adventure begins!",
      photos: 156,
      previewImage: varnaImage,
    },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center">
              <Ship className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-xl">ArcNIK</div>
              <p className="text-xs text-gray-500">NIK 421 Expedition</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            {/* Phase Selection */}
            <div className="mb-6">
              <p className="text-xs text-gray-500 mb-3 px-2">EXPEDITION PHASE</p>
              <div className="space-y-1">
                <button
                  onClick={() => { setActivePhase("onboard"); setActiveSection("dashboard"); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    activePhase === "onboard" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Ship className="w-5 h-5" />
                  <div className="flex-1 text-left">
                    <div className="text-sm">On-Board</div>
                    <div className="text-xs text-gray-500">Active Expedition</div>
                  </div>
                  <Badge className="bg-green-500 text-white">Live</Badge>
                </button>

                <button
                  onClick={() => { setActivePhase("post"); setActiveSection("logbook"); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    activePhase === "post" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <BookOpen className="w-5 h-5" />
                  <div className="flex-1 text-left">
                    <div className="text-sm">Post-Expedition</div>
                    <div className="text-xs text-gray-500">Memories</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Section Navigation */}
            {activePhase === "onboard" && (
              <nav className="space-y-1">
                <p className="text-xs text-gray-500 mb-2 px-2">EXPEDITION HUB</p>
                <button
                  onClick={() => setActiveSection("dashboard")}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeSection === "dashboard" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Compass className="w-4 h-4" />
                  <span>Live Dashboard</span>
                </button>
                <button
                  onClick={() => setActiveSection("vr-tour")}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeSection === "vr-tour" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Play className="w-4 h-4" />
                  <span>VR Ship Tour</span>
                </button>

                <button
                  onClick={() => setActiveSection("weather-lookback")}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeSection === "weather-lookback" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Cloud className="w-4 h-4" />
                  <span>Weather Analysis</span>
                </button>


                <button
                  onClick={() => setActiveSection("knowledge-map")}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeSection === "knowledge-map" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Map className="w-4 h-4" />
                  <span>Knowledge Map</span>
                </button>
                <button
                  onClick={() => setActiveSection("research-hub")}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeSection === "research-hub" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Microscope className="w-4 h-4" />
                  <span>Research Hub</span>
                </button>
                <button
                  onClick={() => setActiveSection("landing-sites")}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeSection === "landing-sites" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span>Landing Sites</span>
                </button>
                <button
                  onClick={() => setActiveSection("daily-program")}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeSection === "daily-program" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Daily Program</span>
                </button>
              </nav>
            )}

            {activePhase === "post" && (
              <nav className="space-y-1">
                <p className="text-xs text-gray-500 mb-2 px-2">MEMORIES & IMPACT</p>
                <button
                  onClick={() => setActiveSection("logbook")}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeSection === "logbook" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Expedition Logbook</span>
                </button>
                <button
                  onClick={() => setActiveSection("photos")}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeSection === "photos" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Image className="w-4 h-4" />
                  <span>Photo Gallery</span>
                </button>
              </nav>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-gray-200">
          <Button 
            onClick={() => setActiveSection("subscription")}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white gap-2 mb-4"
          >
            <CreditCard className="w-4 h-4" />
            Upgrade Plan
          </Button>
          
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-blue-100 text-blue-600">EX</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm truncate">Expedition Member</p>
              <p className="text-xs text-gray-500">Cabin 205</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input type="search" placeholder="Search guides, sites, activities..." className="pl-10" />
            </div>
            <div className="flex items-center gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white gap-2">
                    <CreditCard className="w-4 h-4" />
                    Subscribe
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[95vw] w-full max-h-[90vh] overflow-y-auto">
                  <DialogTitle className="sr-only">Subscription Plans</DialogTitle>
                  <DialogDescription className="sr-only">
                    Choose your ArcNIK subscription plan to access exclusive content from the NIK 421 Antarctic Expedition
                  </DialogDescription>
                  <SubscriptionPlans />
                </DialogContent>
              </Dialog>
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* VR Ship Tour - Available in On-Board */}
          {activePhase === "onboard" && activeSection === "vr-tour" && (
            <VRShipTour />
          )}

          {/* 360° Panorama - Available in On-Board */}
          {activePhase === "onboard" && activeSection === "panorama" && (
            <Nick421Panorama />
          )}

          {/* On-Board Content */}
          {activePhase === "onboard" && activeSection === "dashboard" && (
            <div>
              <div className="mb-8">
                <h1 className="mb-2">Live Dashboard</h1>
                <p className="text-gray-600">
                  Real-time expedition tracking and mission control for R/V NIK 421
                </p>
              </div>

              <LiveDashboard />

              <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h2 className="mb-4">Today's Activities</h2>
                  <div className="space-y-4">
                    {dailyActivities.slice(0, 3).map((activity, index) => (
                      <DailyActivityCard key={index} {...activity} />
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="mb-4">Weather Conditions</h2>
                  <WeatherWidget />
                </div>
              </div>
            </div>
          )}

          {/* Stories Behind the Shot */}
          {(activePhase === "onboard" || activePhase === "post") && activeSection === "stories" && (
            <StoriesBehindShot />
          )}

          {/* Missions & Games */}
          {activePhase === "onboard" && activeSection === "missions" && (
            <MissionsGames />
          )}

          {activePhase === "onboard" && activeSection === "citizen-science" && (
            <div>
              <div className="mb-8">
                <h1 className="mb-2">Citizen Science</h1>
                <p className="text-gray-600">
                  Contribute to research by logging your wildlife observations
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <Card className="p-6 text-center">
                  <div className="text-4xl mb-2">{wildlifeSightings.length}</div>
                  <p className="text-gray-600">Total Sightings Logged</p>
                </Card>
                <Card className="p-6 text-center">
                  <div className="text-4xl mb-2">{new Set(wildlifeSightings.map(s => s.species)).size}</div>
                  <p className="text-gray-600">Unique Species</p>
                </Card>
                <Card className="p-6 text-center">
                  <div className="text-4xl mb-2">3</div>
                  <p className="text-gray-600">Research Projects</p>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <WildlifeLogCard onSave={handleSaveSighting} />

                <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="mb-2">Cloud Observation</h3>
                      <p className="text-sm text-gray-600">
                        Log cloud types for atmospheric research
                      </p>
                    </div>
                    <Badge className="bg-purple-600">Active</Badge>
                  </div>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <Camera className="w-4 h-4 mr-2" />
                    Log Cloud Data
                  </Button>
                </Card>
              </div>

              <div>
                <h2 className="mb-4">Your Wildlife Sightings</h2>
                <Card className="overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs text-gray-600">Species</th>
                          <th className="px-6 py-3 text-left text-xs text-gray-600">Type</th>
                          <th className="px-6 py-3 text-left text-xs text-gray-600">Count</th>
                          <th className="px-6 py-3 text-left text-xs text-gray-600">Location</th>
                          <th className="px-6 py-3 text-left text-xs text-gray-600">Time</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {wildlifeSightings.map((sighting) => (
                          <tr key={sighting.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">{sighting.species}</td>
                            <td className="px-6 py-4">
                              <Badge variant="outline" className="capitalize">{sighting.type}</Badge>
                            </td>
                            <td className="px-6 py-4">{sighting.count}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{sighting.location}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{sighting.timestamp}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {activePhase === "onboard" && activeSection === "landing-sites" && (
            <div>
              <div className="mb-8">
                <h1 className="mb-2">Port Stops & Landing Sites Guide</h1>
                <p className="text-gray-600">
                  Complete NIK 421 expedition route from Varna, Bulgaria to Livingston Island, Antarctica - track our journey across two hemispheres
                </p>
                <div className="mt-3 flex items-center gap-3 flex-wrap">
                  <Badge className="bg-green-600">✓ 2 Ports Passed</Badge>
                  <Badge className="bg-blue-600">⏩ Next: Cartagena, Spain (Nov 23)</Badge>
                  <Badge variant="outline">4 Remaining Stops</Badge>
                  <Badge variant="outline">Day 3 of 180 • Nov 9, 2025</Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {landingSites.map((site, index) => (
                  <LandingSiteCard key={index} {...site} />
                ))}
              </div>
            </div>
          )}

          {activePhase === "onboard" && activeSection === "daily-program" && (
            <div>
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="mb-2">Daily Program</h1>
                    <p className="text-gray-600">Saturday, November 1, 2025</p>
                  </div>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download Schedule
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {dailyActivities.map((activity, index) => (
                  <DailyActivityCard key={index} {...activity} />
                ))}
              </div>
            </div>
          )}

          {/* Weather & 10-Day Lookback */}
          {activePhase === "onboard" && activeSection === "weather-lookback" && (
            <WeatherLookback />
          )}

          {/* Interactive Knowledge Map */}
          {activePhase === "onboard" && activeSection === "knowledge-map" && (
            <InteractiveKnowledgeMap />
          )}

          {/* Research Hub */}
          {activePhase === "onboard" && activeSection === "research-hub" && (
            <ResearchHub />
          )}

          {/* Subscription Plans Page */}
          {activeSection === "subscription" && (
            <SubscriptionPlans />
          )}

          {/* Post-Expedition Content */}
          {activePhase === "post" && activeSection === "logbook" && (
            <div>
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="mb-2">Expedition Logbook</h1>
                    <p className="text-gray-600">
                      Your personal journey through Antarctica
                    </p>
                  </div>
                  <Button>
                    <Download className="w-4 h-4 mr-2" />
                    Export Logbook
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {logbookEntries.map((entry, index) => (
                  <LogbookEntry key={index} {...entry} />
                ))}
              </div>
            </div>
          )}

          {activePhase === "post" && activeSection === "photos" && (
            <PhotoGallery />
          )}

          {activePhase === "post" && activeSection === "impact" && (
            <div>
              <div className="mb-8">
                <h1 className="mb-2">Impact Tracker</h1>
                <p className="text-gray-600">
                  See how your contributions support Antarctic research
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                  <TrendingUp className="w-10 h-10 mb-4" />
                  <div className="text-3xl mb-2">{wildlifeSightings.length}</div>
                  <p className="text-blue-100">Data Points Contributed</p>
                </Card>
                <Card className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white">
                  <Award className="w-10 h-10 mb-4" />
                  <div className="text-3xl mb-2">3</div>
                  <p className="text-green-100">Research Projects Supported</p>
                </Card>
                <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                  <Camera className="w-10 h-10 mb-4" />
                  <div className="text-3xl mb-2">229</div>
                  <p className="text-purple-100">Photos Documented</p>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Camera className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2">Happy Whale Project</h3>
                      <p className="text-gray-600 mb-3">
                        Your whale sightings have been added to the global database, helping researchers track migration patterns and population health.
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge>2 Sightings</Badge>
                        <Badge variant="outline">Humpback Whale</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      <strong>Impact:</strong> Your data contributed to identifying whale migration routes in the Antarctic Peninsula region.
                    </p>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <MapPin className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2">Penguin Watch</h3>
                      <p className="text-gray-600 mb-3">
                        Your penguin colony observations help scientists monitor breeding success and population trends across Antarctica.
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge>3 Sightings</Badge>
                        <Badge variant="outline">Multiple Species</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      <strong>Impact:</strong> Your observations added to the 2025 breeding season monitoring dataset.
                    </p>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <Cloud className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2">Antarctic Cloud Observations</h3>
                      <p className="text-gray-600 mb-3">
                        Cloud observations from expedition ships help atmospheric scientists understand climate patterns in this data-sparse region.
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge>Coming Soon</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      <strong>Next Steps:</strong> Consider participating in cloud observations during your next expedition.
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      <Toaster position="top-right" richColors />
    </div>
  );
}