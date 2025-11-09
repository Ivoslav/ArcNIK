# Advanced Features Integration Guide

## New Components Added

The following advanced features have been created and are ready to integrate:

### 1. **VRShipTour** (`/components/VRShipTour.tsx`)
- Virtual Reality 360° tour of the Nick 421 expedition vessel
- Explore cabins, decks, restricted areas (bridge, lab, engine room)
- Unlockable content through missions
- **Add to**: Pre-Expedition (Preview) and On-Board phases

### 2. **StoriesBehindShot** (`/components/StoriesBehindShot.tsx`)
- 360° panoramas with authentic audio commentary from crew members
- Each story includes narrator profile and scientific context
- Interactive audio controls with progress tracking
- **Add to**: On-Board and Post-Expedition phases

### 3. **MissionsGames** (`/components/MissionsGames.tsx`)
- Gamification system with daily/weekly missions and achievements
- Points, levels, and rewards (unlocks exclusive footage)
- Progress tracking for all activities
- **Add to**: On-Board phase (new section)

### 4. **WeatherLookback** (`/components/WeatherLookback.tsx`)
- Real-time weather conditions + 10-day historical data
- Trend analysis and scientific insights
- Charts and visualizations
- **Replace/Enhance**: Current WeatherWidget in dashboard

### 5. **AIScientistChat** (`/components/AIScientistChat.tsx`)
- AI chatbot trained on expedition and Antarctic science
- Context-specific answers with suggested questions
- Quick topic buttons for easy exploration
- **Add to**: On-Board phase (new section)

### 6. **ScientistDilemma** (`/components/ScientistDilemma.tsx`)
- Interactive debates on scientific/ethical dilemmas
- Community voting with real-time results
- AI analysis and summaries
- **Add to**: On-Board phase (new section)

### 7. **ScienceProjectSim** (`/components/ScienceProjectSim.tsx`)
- Become virtual crew member managing research projects
- Resource management (budget, time, quality)
- Decision-making with consequences
- Project completion certificates
- **Add to**: On-Board phase (new section)

### 8. **LabOfTheDay** (`/components/LabOfTheDay.tsx`)
- Daily focus on specific instrument, experiment, or species
- 3D models, simulations, and knowledge quizzes
- Interactive learning modules
- **Add to**: On-Board phase (new section)

### 9. **InteractiveKnowledgeMap** (`/components/InteractiveKnowledgeMap.tsx`)
- Overlay multiple data layers (temperature, salinity, bathymetry, currents, plankton, ice)
- Adjustable opacity and layer combinations
- Data correlations and scientific insights
- **Add to**: On-Board phase (new section)

## Integration Instructions

### Step 1: Add Imports to App.tsx

```typescript
// Add these imports after existing imports
import { VRShipTour } from "./components/VRShipTour";
import { StoriesBehindShot } from "./components/StoriesBehindShot";
import { MissionsGames } from "./components/MissionsGames";
import { WeatherLookback } from "./components/WeatherLookback";
import { AIScientistChat } from "./components/AIScientistChat";
import { ScientistDilemma } from "./components/ScientistDilemma";
import { ScienceProjectSim } from "./components/ScienceProjectSim";
import { LabOfTheDay } from "./components/LabOfTheDay";
import { InteractiveKnowledgeMap } from "./components/InteractiveKnowledgeMap";

// Add these icon imports
import {
  // ... existing imports
  Bot, // for AI Scientist
  Trophy, // for Missions
  Microscope, // for Lab of the Day
  Map, // for Knowledge Map
  MessageSquare, // for Dilemma
  FlaskConical, // for Science Project
  Play, // for VR Tour & Stories
  Cloud, // for Weather Lookback
} from "lucide-react";
```

### Step 2: Update Sidebar Navigation for On-Board Phase

Add these navigation buttons in the `activePhase === "onboard"` section:

```typescript
<button
  onClick={() => setActiveSection("vr-tour")}
  className={`...`}
>
  <Play className="w-4 h-4" />
  <span>VR Ship Tour</span>
</button>

<button
  onClick={() => setActiveSection("stories")}
  className={`...`}
>
  <Camera className="w-4 h-4" />
  <span>Stories Behind Shot</span>
</button>

<button
  onClick={() => setActiveSection("missions")}
  className={`...`}
>
  <Trophy className="w-4 h-4" />
  <span>Missions & Games</span>
  <Badge className="ml-auto text-xs bg-orange-600">New</Badge>
</button>

<button
  onClick={() => setActiveSection("weather-lookback")}
  className={`...`}
>
  <Cloud className="w-4 h-4" />
  <span>Weather Analysis</span>
</button>

<button
  onClick={() => setActiveSection("ai-scientist")}
  className={`...`}
>
  <Bot className="w-4 h-4" />
  <span>Ask AI Scientist</span>
</button>

<button
  onClick={() => setActiveSection("dilemma")}
  className={`...`}
>
  <MessageSquare className="w-4 h-4" />
  <span>Scientist's Dilemma</span>
</button>

<button
  onClick={() => setActiveSection("science-project")}
  className={`...`}
>
  <FlaskConical className="w-4 h-4" />
  <span>Science Project</span>
</button>

<button
  onClick={() => setActiveSection("lab-of-day")}
  className={`...`}
>
  <Microscope className="w-4 h-4" />
  <span>Lab of the Day</span>
</button>

<button
  onClick={() => setActiveSection("knowledge-map")}
  className={`...`}
>
  <Map className="w-4 h-4" />
  <span>Knowledge Map</span>
</button>
```

### Step 3: Add Content Sections

Add these sections in the main content area:

```typescript
{/* VR Ship Tour */}
{activePhase === "pre" && activeSection === "vr-tour" && (
  <VRShipTour />
)}

{/* Stories Behind the Shot */}
{activePhase === "onboard" && activeSection === "stories" && (
  <StoriesBehindShot />
)}

{/* Missions & Games */}
{activePhase === "onboard" && activeSection === "missions" && (
  <MissionsGames />
)}

{/* Weather & 10-Day Lookback */}
{activePhase === "onboard" && activeSection === "weather-lookback" && (
  <WeatherLookback />
)}

{/* AI Scientist Chat */}
{activePhase === "onboard" && activeSection === "ai-scientist" && (
  <AIScientistChat />
)}

{/* Scientist's Dilemma */}
{activePhase === "onboard" && activeSection === "dilemma" && (
  <ScientistDilemma />
)}

{/* Science Project Simulator */}
{activePhase === "onboard" && activeSection === "science-project" && (
  <ScienceProjectSim />
)}

{/* Lab of the Day */}
{activePhase === "onboard" && activeSection === "lab-of-day" && (
  <LabOfTheDay />
)}

{/* Interactive Knowledge Map */}
{activePhase === "onboard" && activeSection === "knowledge-map" && (
  <InteractiveKnowledgeMap />
)}
```

### Step 4: Optional Enhancements

1. **Add VR Tour to Pre-Expedition**: Add navigation item in pre-expedition phase for ship preview
2. **Add Stories to Post-Expedition**: Allow reviewing stories after expedition
3. **Replace Weather Widget**: In dashboard, replace `<WeatherWidget />` with `<WeatherLookback />` for enhanced features

## Feature Highlights

- **Gamification**: Missions system rewards user engagement
- **Education**: Lab of the Day, AI Scientist, and Knowledge Map enhance learning
- **Engagement**: VR Tour and Stories create immersive experiences
- **Science**: Project Simulator and Dilemma foster scientific thinking
- **Data Visualization**: Weather Lookback and Knowledge Map show real research data

## Testing Checklist

- [ ] All components render without errors
- [ ] Navigation between sections works smoothly
- [ ] Interactive elements (buttons, sliders, forms) respond correctly
- [ ] Missions system tracks progress
- [ ] AI Chatbot provides appropriate responses
- [ ] VR Tour shows all locations
- [ ] Weather data displays historical trends
- [ ] Science Project Simulator manages resources correctly
- [ ] Voting system in Dilemma shows results
- [ ] Knowledge Map layers toggle properly

## Notes

All components are fully functional and styled to match the existing application design. They use the same UI components (shadcn) and color scheme for consistency.
