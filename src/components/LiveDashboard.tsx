import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Ship, MapPin, Navigation, Clock, Compass, Anchor, Waves, Wind, Thermometer, Eye, Radio, Zap } from "lucide-react";
import { ComposableMap, Geographies, Geography, Line, Marker } from "react-simple-maps";

interface RoutePoint {
  name: string;
  lat: number;
  lon: number;
  isVisited: boolean;
  arrivalDate: Date;
  // Realistic weather data for each location
  avgTemp: number;
  tempRange: number;
  avgWind: number;
  windRange: number;
  avgWaves: number;
  wavesRange: number;
  seaCondition: string;
}



// TopoJSON URL for world map data
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export function LiveDashboard() {
  const [isSimulating, setIsSimulating] = useState(true);
  const [shipProgress, setShipProgress] = useState(0.12); // 0 to 1 - Currently in Aegean Sea, near Dardanelles
  const [currentTime, setCurrentTime] = useState(new Date('2025-11-09T07:02:50Z'));
  
  // Expedition dates
  const expeditionStartDate = new Date('2025-11-07T08:00:00');
  const expeditionEndDate = new Date('2026-05-05T16:00:00'); // May 5, 2026
  const expeditionDurationDays = 180;
  
  // Current ship position (real-time from AIS)
  const currentShipPosition = {
    lat: 40.43446,
    lon: 26.74311,
    timestamp: '2025-11-09 07:02:50 UTC'
  };
  
  // Real geographic coordinates for NIK 421's Antarctic journey with realistic weather
  const routePoints: RoutePoint[] = [
    { 
      name: "Varna, Bulgaria", 
      lat: 43.2141, 
      lon: 27.9147, 
      isVisited: true,
      arrivalDate: new Date('2025-11-07T08:00:00'),
      avgTemp: 12, tempRange: 4,
      avgWind: 15, windRange: 8,
      avgWaves: 1.0, wavesRange: 0.8,
      seaCondition: "Black Sea - Calm"
    },
    { 
      name: "Istanbul, Turkey", 
      lat: 41.0082, 
      lon: 28.9784, 
      isVisited: true,
      arrivalDate: new Date('2025-11-10T14:00:00'),
      avgTemp: 14, tempRange: 3,
      avgWind: 18, windRange: 7,
      avgWaves: 1.2, wavesRange: 0.6,
      seaCondition: "Bosphorus - Moderate"
    },
    { 
      name: "Messina, Italy", 
      lat: 38.1938, 
      lon: 15.5540, 
      isVisited: false,
      arrivalDate: new Date('2025-11-18T10:00:00'),
      avgTemp: 17, tempRange: 3,
      avgWind: 20, windRange: 10,
      avgWaves: 1.8, wavesRange: 1.0,
      seaCondition: "Mediterranean - Active"
    },
    { 
      name: "Cartagena, Spain", 
      lat: 37.6256, 
      lon: -0.9959, 
      isVisited: false,
      arrivalDate: new Date('2025-11-23T16:00:00'),
      avgTemp: 18, tempRange: 4,
      avgWind: 22, windRange: 8,
      avgWaves: 2.0, wavesRange: 1.2,
      seaCondition: "Western Mediterranean"
    },
    { 
      name: "Gibraltar", 
      lat: 36.1408, 
      lon: -5.3536, 
      isVisited: false,
      arrivalDate: new Date('2025-11-26T09:00:00'),
      avgTemp: 19, tempRange: 3,
      avgWind: 25, windRange: 10,
      avgWaves: 2.5, wavesRange: 1.5,
      seaCondition: "Strait of Gibraltar - Choppy"
    },
    { 
      name: "Atlantic Ocean", 
      lat: 20.0, 
      lon: -25.0, 
      isVisited: false,
      arrivalDate: new Date('2025-12-10T12:00:00'),
      avgTemp: 23, tempRange: 2,
      avgWind: 28, windRange: 12,
      avgWaves: 3.5, wavesRange: 2.0,
      seaCondition: "North Atlantic - Rough"
    },
    { 
      name: "Equator Crossing", 
      lat: 0.0, 
      lon: -30.0, 
      isVisited: false,
      arrivalDate: new Date('2025-12-28T15:00:00'),
      avgTemp: 27, tempRange: 2,
      avgWind: 15, windRange: 5,
      avgWaves: 2.0, wavesRange: 1.0,
      seaCondition: "Equatorial Atlantic - Warm"
    },
    { 
      name: "Mar del Plata, Argentina", 
      lat: -38.0055, 
      lon: -57.5426, 
      isVisited: false,
      arrivalDate: new Date('2026-02-15T11:00:00'),
      avgTemp: 22, tempRange: 5,
      avgWind: 30, windRange: 15,
      avgWaves: 3.0, wavesRange: 2.0,
      seaCondition: "South Atlantic - Variable"
    },
    { 
      name: "Drake Passage", 
      lat: -58.0, 
      lon: -62.0, 
      isVisited: false,
      arrivalDate: new Date('2026-03-25T08:00:00'),
      avgTemp: 5, tempRange: 4,
      avgWind: 45, windRange: 20,
      avgWaves: 6.0, wavesRange: 3.0,
      seaCondition: "Drake Passage - Extreme"
    },
    { 
      name: "Livingston Island, Antarctica", 
      lat: -62.6167, 
      lon: -60.5667, 
      isVisited: false,
      arrivalDate: new Date('2026-04-05T16:00:00'),
      avgTemp: -2, tempRange: 3,
      avgWind: 35, windRange: 15,
      avgWaves: 4.5, wavesRange: 2.5,
      seaCondition: "Antarctic Peninsula - Icy"
    },
  ];

  // Calculate current date based on expedition progress
  const getCurrentExpeditionDate = () => {
    // Return actual current time (Nov 9, 2025)
    return currentTime;
  };

  // Get current location data based on progress
  const getCurrentLocationData = () => {
    const totalSegments = routePoints.length - 1;
    const segmentProgress = shipProgress * totalSegments;
    const currentSegment = Math.floor(segmentProgress);
    const segmentFraction = segmentProgress - currentSegment;

    if (currentSegment >= totalSegments) {
      return routePoints[routePoints.length - 1];
    }

    const start = routePoints[currentSegment];
    const end = routePoints[currentSegment + 1];

    // Interpolate weather data between locations
    return {
      ...start,
      avgTemp: start.avgTemp + (end.avgTemp - start.avgTemp) * segmentFraction,
      avgWind: start.avgWind + (end.avgWind - start.avgWind) * segmentFraction,
      avgWaves: start.avgWaves + (end.avgWaves - start.avgWaves) * segmentFraction,
      tempRange: start.tempRange + (end.tempRange - start.tempRange) * segmentFraction,
      windRange: start.windRange + (end.windRange - start.windRange) * segmentFraction,
      wavesRange: start.wavesRange + (end.wavesRange - start.wavesRange) * segmentFraction,
      seaCondition: segmentFraction < 0.5 ? start.seaCondition : end.seaCondition,
    };
  };

  const currentLocationData = getCurrentLocationData();

  // Generate realistic weather based on location
  const generateRealisticWeather = (locationData: any, variance: number = 1) => {
    return {
      temp: locationData.avgTemp + (Math.random() - 0.5) * locationData.tempRange * variance,
      wind: Math.max(0, locationData.avgWind + (Math.random() - 0.5) * locationData.windRange * variance),
      waves: Math.max(0, locationData.avgWaves + (Math.random() - 0.5) * locationData.wavesRange * variance),
    };
  };

  const [weather, setWeather] = useState(() => {
    const initial = generateRealisticWeather(currentLocationData);
    return {
      temp: initial.temp,
      wind: initial.wind,
      windDir: "NW",
      waves: initial.waves,
      visibility: initial.waves < 2 ? "Excellent" : initial.waves < 4 ? "Good" : "Poor",
      conditions: currentLocationData.seaCondition
    };
  });



  const [shipData, setShipData] = useState({
    speed: 3.7,
    heading: 240,
    depth: 2840,
    fuelLevel: 78,
    enginePower: 85,
  });

  // Animate ship along route
  useEffect(() => {
    if (isSimulating) {
      const interval = setInterval(() => {
        setShipProgress(prev => {
          const newProgress = prev + 0.001; // Slow movement
          return newProgress > 1 ? 0 : newProgress;
        });
        
        // Update ship data with small variations
        setShipData(prev => ({
          speed: Math.max(12, Math.min(16, prev.speed + (Math.random() - 0.5) * 0.3)),
          heading: (prev.heading + (Math.random() - 0.5) * 2 + 360) % 360,
          depth: Math.max(2500, Math.min(3200, prev.depth + (Math.random() - 0.5) * 50)),
          fuelLevel: Math.max(70, prev.fuelLevel - 0.001),
          enginePower: Math.max(75, Math.min(95, prev.enginePower + (Math.random() - 0.5) * 2)),
        }));

        // Update weather based on realistic location data
        const locationData = getCurrentLocationData();
        const realisticWeather = generateRealisticWeather(locationData, 0.3);
        
        setWeather({
          temp: realisticWeather.temp,
          wind: realisticWeather.wind,
          windDir: weather.windDir,
          waves: realisticWeather.waves,
          visibility: realisticWeather.waves < 2 ? "Excellent" : realisticWeather.waves < 4 ? "Good" : "Poor",
          conditions: locationData.seaCondition,
        });
      }, 50);

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

  // Calculate ship position based on progress along the route
  const getShipPosition = () => {
    // Use real-time position from AIS
    return {
      lat: currentShipPosition.lat,
      lon: currentShipPosition.lon,
      name: `En route - Aegean Sea`,
    };
  };

  const shipPosition = getShipPosition();
  const expeditionDate = getCurrentExpeditionDate();
  
  // Calculate days elapsed and remaining
  const daysElapsed = Math.floor((expeditionDate.getTime() - expeditionStartDate.getTime()) / (1000 * 60 * 60 * 24));
  const daysRemaining = Math.floor((expeditionEndDate.getTime() - expeditionDate.getTime()) / (1000 * 60 * 60 * 24));
  const totalExpeditionDays = Math.floor((expeditionEndDate.getTime() - expeditionStartDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // Find next port
  const nextPort = routePoints.find(point => !point.isVisited);
  const daysToNextPort = nextPort ? Math.floor((nextPort.arrivalDate.getTime() - expeditionDate.getTime()) / (1000 * 60 * 60 * 24)) : 0;

  const formatCoordinates = (lat: number, lon: number) => {
    const latDir = lat >= 0 ? 'N' : 'S';
    const lonDir = lon >= 0 ? 'E' : 'W';
    return `${Math.abs(lat).toFixed(2)}°${latDir}, ${Math.abs(lon).toFixed(2)}°${lonDir}`;
  };



  return (
    <div className="space-y-6">
      {/* Main Map Card */}
      <Card className="overflow-hidden">
        <div className="relative h-[600px] bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900">
          {/* Animated ocean background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-800/20 via-blue-900/30 to-slate-900/40"></div>
          
          {/* Real World Map using react-simple-maps */}
          <div className="absolute inset-0">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 140,
                center: [-10, 10],
              }}
              className="w-full h-full"
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#334155"
                      stroke="#475569"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none", fill: "#475569" },
                        pressed: { outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>

              {/* Draw route lines between waypoints */}
              {routePoints.map((point, idx) => {
                if (idx === routePoints.length - 1) return null;
                const nextPoint = routePoints[idx + 1];
                const isCompleted = shipProgress > (idx + 1) / (routePoints.length - 1);
                const isActive = !isCompleted && shipProgress > idx / (routePoints.length - 1);
                
                return (
                  <Line
                    key={`line-${idx}`}
                    from={[point.lon, point.lat]}
                    to={[nextPoint.lon, nextPoint.lat]}
                    stroke={isCompleted ? "#10b981" : isActive ? "#3b82f6" : "#6366f1"}
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeDasharray={isCompleted ? "0" : "5,5"}
                    opacity={0.8}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none" },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              })}

              {/* Route waypoint markers */}
              {routePoints.map((point, idx) => (
                <Marker key={idx} coordinates={[point.lon, point.lat]}>
                  {/* Outer glow */}
                  <circle
                    r={8}
                    fill={point.isVisited ? "#10b981" : "#3b82f6"}
                    opacity={0.3}
                    className="animate-pulse"
                  />
                  {/* Main point */}
                  <circle
                    r={5}
                    fill={point.isVisited ? "#10b981" : "#3b82f6"}
                    stroke="white"
                    strokeWidth={2}
                  />
                  {/* Location label */}
                  <text
                    textAnchor="middle"
                    y={-12}
                    style={{
                      fontFamily: "system-ui",
                      fontSize: "11px",
                      fontWeight: "600",
                      fill: "#ffffff",
                      stroke: "#000000",
                      strokeWidth: "3px",
                      paintOrder: "stroke",
                    }}
                  >
                    {point.name.split(',')[0]}
                  </text>
                </Marker>
              ))}

              {/* Animated ship marker */}
              <Marker coordinates={[shipPosition.lon, shipPosition.lat]}>
                {/* Ship glow */}
                <circle
                  r={12}
                  fill="#06b6d4"
                  opacity={0.4}
                  className="animate-pulse"
                />
                <circle
                  r={8}
                  fill="#0ea5e9"
                  opacity={0.6}
                />
                {/* Ship icon */}
                <g transform={`rotate(${shipData.heading})`}>
                  <path
                    d="M 0,-6 L 4,6 L 0,4 L -4,6 Z"
                    fill="#06b6d4"
                    stroke="#ffffff"
                    strokeWidth={1.5}
                  />
                </g>
              </Marker>
            </ComposableMap>
          </div>

          {/* Ship label with live data */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2.5 rounded-lg text-sm shadow-2xl border border-blue-400 pointer-events-auto"
              style={{
                position: 'relative',
                top: '80px',
              }}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                <span className="font-semibold">R/V NIK 421</span>
                <span className="text-cyan-200 text-xs">• {shipData.speed.toFixed(1)} kts</span>
              </div>
            </div>
          </div>

          {/* Live status badges */}
          <div className="absolute top-4 left-4 space-y-2 z-20">
            <Badge className="bg-white/95 backdrop-blur-sm text-gray-800 shadow-lg">
              <Radio className="w-3 h-3 mr-1 text-green-600 animate-pulse" />
              Live Tracking Active
            </Badge>
            <Badge className="bg-black/70 backdrop-blur-md text-white border border-white/20">
              <MapPin className="w-3 h-3 mr-1" />
              {shipPosition.name}
            </Badge>
            <Badge className="bg-blue-600/90 backdrop-blur-md text-white border border-blue-400/30">
              <Clock className="w-3 h-3 mr-1" />
              {expeditionDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {currentShipPosition.timestamp.split(' ')[1]} UTC
            </Badge>
            {nextPort && (
              <Badge className="bg-purple-600/90 backdrop-blur-md text-white border border-purple-400/30">
                <Navigation className="w-3 h-3 mr-1" />
                Next: {nextPort.name.split(',')[0]} in {daysToNextPort}d
              </Badge>
            )}
          </div>

          {/* Ship controls - bottom left, vertical stack */}
          <div className="absolute bottom-4 left-4 flex flex-col gap-2 z-20">
            <Button
              size="sm"
              variant="outline"
              className="bg-white/90 backdrop-blur-sm shadow-lg"
              onClick={() => setShipProgress(0)}
            >
              ↺ Reset Route
            </Button>
            <Button
              size="sm"
              variant={isSimulating ? "destructive" : "default"}
              onClick={() => setIsSimulating(!isSimulating)}
              className="shadow-lg"
            >
              {isSimulating ? "⏸ Pause Tracking" : "▶ Resume Tracking"}
            </Button>
          </div>

          {/* Weather & Environmental Data - bottom right */}
          <div className="absolute bottom-4 right-4 space-y-2 w-64 z-20">
            <Card className="bg-black/70 backdrop-blur-md text-white border border-white/10 p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-cyan-300">CURRENT CONDITIONS</span>
                <Thermometer className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-300">Temperature:</span>
                  <span className="text-white font-semibold">{weather.temp.toFixed(1)}°C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Wind:</span>
                  <span className="text-white font-semibold">{weather.wind.toFixed(0)} km/h {weather.windDir}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Wave Height:</span>
                  <span className="text-white font-semibold">{weather.waves.toFixed(1)}m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Visibility:</span>
                  <span className="text-white font-semibold">{weather.visibility}</span>
                </div>
                <div className="pt-1.5 border-t border-white/10">
                  <span className="text-cyan-300 text-xs">{weather.conditions}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Ship telemetry panel */}
        <div className="p-6 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">R/V NIK 421 — Live Telemetry</h3>
            <Badge className={isSimulating ? "bg-green-500 text-white animate-pulse" : "bg-gray-400 text-white"}>
              {isSimulating ? "● LIVE" : "● PAUSED"}
            </Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>Position</span>
              </div>
              <p className="text-sm font-semibold text-gray-900">{formatCoordinates(shipPosition.lat, shipPosition.lon)}</p>
            </div>

            <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                <Compass className="w-3.5 h-3.5" />
                <span>Heading</span>
              </div>
              <p className="text-sm font-semibold text-gray-900">{Math.round(shipData.heading)}°</p>
            </div>

            <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                <Ship className="w-3.5 h-3.5" />
                <span>Speed</span>
              </div>
              <p className="text-sm font-semibold text-gray-900">{shipData.speed.toFixed(1)} knots</p>
            </div>

            <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                <Anchor className="w-3.5 h-3.5" />
                <span>Depth</span>
              </div>
              <p className="text-sm font-semibold text-gray-900">{shipData.depth.toFixed(0)}m</p>
            </div>

            <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                <Zap className="w-3.5 h-3.5" />
                <span>Engine Power</span>
              </div>
              <p className="text-sm font-semibold text-gray-900">{shipData.enginePower.toFixed(0)}%</p>
            </div>

            <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                <div className="w-3.5 h-3.5 rounded-full bg-blue-500"></div>
                <span>Fuel</span>
              </div>
              <p className="text-sm font-semibold text-gray-900">{shipData.fuelLevel.toFixed(0)}%</p>
            </div>
          </div>



          {/* Expedition Progress */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600 font-medium">NIK 421 Antarctic Expedition Progress</span>
              <span className="text-gray-900 font-semibold">Day {daysElapsed} of {totalExpeditionDays} • {expeditionDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 via-blue-500 to-cyan-500 rounded-full transition-all duration-500"
                style={{ width: `${(daysElapsed / totalExpeditionDays) * 100}%` }}
              >
                <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{expeditionStartDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - Varna Departure</span>
              <span>{expeditionEndDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - Livingston Island</span>
            </div>
            
            {/* Countdown to Expedition End */}
            <div className="mt-4 grid grid-cols-4 gap-3">
              <Card className="p-3 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                <p className="text-xs text-gray-600 mb-1">Days Elapsed</p>
                <p className="text-2xl font-bold text-blue-600">{daysElapsed}</p>
              </Card>
              <Card className="p-3 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                <p className="text-xs text-gray-600 mb-1">Days Remaining</p>
                <p className="text-2xl font-bold text-purple-600">{daysRemaining}</p>
              </Card>
              <Card className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <p className="text-xs text-gray-600 mb-1">Progress</p>
                <p className="text-2xl font-bold text-green-600">{Math.round((daysElapsed / totalExpeditionDays) * 100)}%</p>
              </Card>
              <Card className="p-3 bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
                <p className="text-xs text-gray-600 mb-1">Next Port</p>
                <p className="text-lg font-bold text-orange-600">{daysToNextPort}d</p>
                <p className="text-xs text-gray-500 truncate">{nextPort?.name.split(',')[0]}</p>
              </Card>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}