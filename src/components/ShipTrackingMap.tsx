import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Ship, MapPin, Navigation, Clock, Cloud, Wind, Waves, Satellite } from "lucide-react";

export function ShipTrackingMap() {
  const [shipPosition, setShipPosition] = useState({ lat: 64.8, lon: -63.5, angle: 225 });
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather, setWeather] = useState({
    temp: -8,
    wind: 28,
    windDir: "SW",
    waves: 2.5,
    conditions: "Partly Cloudy"
  });

  // Simulate ship movement
  useEffect(() => {
    if (isSimulating) {
      const interval = setInterval(() => {
        setShipPosition(prev => ({
          lat: prev.lat + (Math.random() - 0.5) * 0.01,
          lon: prev.lon + (Math.random() - 0.5) * 0.01,
          angle: prev.angle + (Math.random() - 0.5) * 5
        }));
        
        // Simulate weather changes
        setWeather(prev => ({
          temp: prev.temp + (Math.random() - 0.5) * 0.2,
          wind: Math.max(15, Math.min(35, prev.wind + (Math.random() - 0.5) * 2)),
          windDir: prev.windDir,
          waves: Math.max(1.5, Math.min(4, prev.waves + (Math.random() - 0.5) * 0.1)),
          conditions: prev.conditions
        }));
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isSimulating]);

  // Update time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="overflow-hidden">
      {/* Satellite Map View */}
      <div className="relative h-96 bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-950">
        {/* Satellite background texture */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(14, 165, 233, 0.2) 0%, transparent 50%),
              linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%),
              linear-gradient(0deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)
            `,
            backgroundSize: '100% 100%, 100% 100%, 40px 40px, 40px 40px'
          }}
        />

        {/* Grid overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Antarctic Peninsula coastline */}
        <svg className="absolute inset-0 w-full h-full">
          <g opacity="0.5">
            <path
              d="M 100 120 Q 200 100 350 140 T 600 120 L 650 150 Q 650 200 630 250 L 580 280 Q 500 300 400 290 T 200 260 L 150 220 Q 120 180 100 120 Z"
              fill="#1e293b"
              stroke="#334155"
              strokeWidth="2"
            />
            {/* Ice shelves */}
            <path d="M 150 160 L 250 150 L 280 180 L 200 190 Z" fill="#cbd5e1" opacity="0.3" />
            <path d="M 520 140 L 600 135 L 620 165 L 560 175 Z" fill="#cbd5e1" opacity="0.3" />
          </g>
        </svg>

        {/* Route path */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <marker
              id="routearrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L0,6 L6,3 z" fill="#60a5fa" />
            </marker>
          </defs>
          <path
            d="M 80 340 Q 150 300, 220 260 T 350 200 T 500 180 T 650 160"
            stroke="#60a5fa"
            strokeWidth="3"
            strokeDasharray="8,4"
            fill="none"
            opacity="0.6"
            markerMid="url(#routearrow)"
          />
          {/* Start point */}
          <circle cx="80" cy="340" r="6" fill="#10b981" opacity="0.8" />
          <text x="90" y="345" fill="#10b981" fontSize="12">Ushuaia</text>
          
          {/* End point */}
          <circle cx="650" cy="160" r="6" fill="#ef4444" opacity="0.8" />
          <text x="600" y="150" fill="#ef4444" fontSize="12">Drake Passage</text>
        </svg>

        {/* Ship icon (animated) */}
        <div
          className="absolute transition-all duration-2000 ease-linear"
          style={{
            left: `${400 + (isSimulating ? Math.sin(Date.now() / 2000) * 20 : 0)}px`,
            top: `${240 + (isSimulating ? Math.cos(Date.now() / 2000) * 15 : 0)}px`,
            transform: `translate(-50%, -50%) rotate(${shipPosition.angle}deg)`
          }}
        >
          {/* Ship glow effect */}
          <div className="absolute inset-0 w-12 h-12 bg-cyan-400 rounded-full opacity-30 blur-xl animate-pulse"></div>
          <div className="relative bg-cyan-500 text-white p-3 rounded-full shadow-2xl">
            <Ship className="w-6 h-6" />
          </div>
        </div>

        {/* Ship label */}
        <div
          className="absolute bg-blue-600 text-white px-3 py-1 rounded-full text-xs shadow-lg"
          style={{
            left: `${400 + (isSimulating ? Math.sin(Date.now() / 2000) * 20 : 0)}px`,
            top: `${270 + (isSimulating ? Math.cos(Date.now() / 2000) * 15 : 0)}px`,
            transform: 'translateX(-50%)'
          }}
        >
          NIK 421
        </div>

        {/* Current location */}
        <Badge className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800">
          <Satellite className="w-3 h-3 mr-1" />
          Satellite View
        </Badge>

        {/* Weather overlay */}
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white p-4 rounded-lg space-y-2 min-w-[200px]">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-300">Live Weather</span>
            <Cloud className="w-4 h-4" />
          </div>
          <div className="text-2xl">{weather.temp.toFixed(1)}°C</div>
          <div className="space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Wind:</span>
              <span>{weather.wind.toFixed(1)} km/h {weather.windDir}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Waves:</span>
              <span>{weather.waves.toFixed(1)}m</span>
            </div>
            <div className="text-gray-400">{weather.conditions}</div>
          </div>
        </div>

        {/* Simulation controls */}
        <div className="absolute bottom-4 left-4">
          <Button
            size="sm"
            variant={isSimulating ? "destructive" : "default"}
            onClick={() => setIsSimulating(!isSimulating)}
          >
            {isSimulating ? "Stop Simulation" : "Start Live Simulation"}
          </Button>
        </div>

        {/* Time display */}
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs">
          <Clock className="w-3 h-3 inline mr-1" />
          {currentTime.toLocaleTimeString()} UTC
        </div>
      </div>

      <div className="p-5">
        <div className="mb-3 pb-3 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-sm">R/V NIK 421</h3>
            <Badge className={isSimulating ? "bg-green-500 text-white animate-pulse" : "bg-green-500 text-white"}>
              {isSimulating ? "Live Tracking Active" : "Live Tracking"}
            </Badge>
          </div>
          <p className="text-xs text-gray-500 mt-1">Antarctic Peninsula Scientific Expedition</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
              <MapPin className="w-4 h-4" />
              <span>Position</span>
            </div>
            <p className="text-sm">{shipPosition.lat.toFixed(2)}°S, {Math.abs(shipPosition.lon).toFixed(2)}°W</p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
              <Navigation className="w-4 h-4" />
              <span>Heading</span>
            </div>
            <p className="text-sm">{Math.round(shipPosition.angle)}° SW</p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
              <Ship className="w-4 h-4" />
              <span>Speed</span>
            </div>
            <p className="text-sm">{isSimulating ? "12.5" : "0.0"} knots</p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
              <Clock className="w-4 h-4" />
              <span>Next Stop</span>
            </div>
            <p className="text-sm">Neko Harbor (3.5h)</p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">NIK 421 Expedition Progress</span>
            <span>Day 5 of 11 • Nov 1-8, 2025</span>
          </div>
          <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full" style={{ width: "45%" }}></div>
          </div>
        </div>
      </div>
    </Card>
  );
}
