import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Cloud, Wind, Thermometer, Waves, TrendingUp, TrendingDown, Minus, Droplets, Eye, Navigation } from "lucide-react";

interface WeatherData {
  date: string;
  location: string;
  temp: number;
  feelsLike: number;
  wind: number;
  windDir: string;
  waves: number;
  visibility: number;
  humidity: number;
  conditions: string;
  isPast: boolean;
}

// Route points with realistic weather data
const routeWeatherData: WeatherData[] = [
  {
    date: "Nov 7",
    location: "Varna, Bulgaria",
    temp: 12,
    feelsLike: 9,
    wind: 18,
    windDir: "NW",
    waves: 1.2,
    visibility: 15,
    humidity: 75,
    conditions: "Partly Cloudy",
    isPast: true
  },
  {
    date: "Nov 9",
    location: "Aegean Sea (Current)",
    temp: 13,
    feelsLike: 11,
    wind: 19,
    windDir: "SW",
    waves: 1.4,
    visibility: 14,
    humidity: 76,
    conditions: "Clear",
    isPast: true
  },
  {
    date: "Nov 10",
    location: "Istanbul, Turkey",
    temp: 14,
    feelsLike: 12,
    wind: 20,
    windDir: "NE",
    waves: 1.5,
    visibility: 12,
    humidity: 78,
    conditions: "Overcast",
    isPast: false
  },
  {
    date: "Nov 14",
    location: "Athens, Greece",
    temp: 16,
    feelsLike: 14,
    wind: 22,
    windDir: "N",
    waves: 1.8,
    visibility: 18,
    humidity: 70,
    conditions: "Clear",
    isPast: false
  },
  {
    date: "Nov 18",
    location: "Messina, Italy",
    temp: 17,
    feelsLike: 15,
    wind: 19,
    windDir: "W",
    waves: 1.6,
    visibility: 20,
    humidity: 72,
    conditions: "Sunny",
    isPast: false
  },
  {
    date: "Nov 23",
    location: "Cartagena, Spain",
    temp: 18,
    feelsLike: 16,
    wind: 24,
    windDir: "SW",
    waves: 2.1,
    visibility: 16,
    humidity: 68,
    conditions: "Partly Cloudy",
    isPast: false
  },
  {
    date: "Nov 26",
    location: "Tarifa, Spain",
    temp: 19,
    feelsLike: 16,
    wind: 28,
    windDir: "W",
    waves: 2.8,
    visibility: 14,
    humidity: 73,
    conditions: "Windy",
    isPast: false
  },
  {
    date: "Dec 10",
    location: "Mid-Atlantic",
    temp: 23,
    feelsLike: 21,
    wind: 30,
    windDir: "SW",
    waves: 3.5,
    visibility: 12,
    humidity: 80,
    conditions: "Partly Cloudy",
    isPast: false
  },
  {
    date: "Dec 28",
    location: "Equator Crossing",
    temp: 27,
    feelsLike: 29,
    wind: 15,
    windDir: "E",
    waves: 2.0,
    visibility: 25,
    humidity: 85,
    conditions: "Hot & Humid",
    isPast: false
  },
  {
    date: "Jan 20",
    location: "South Atlantic",
    temp: 24,
    feelsLike: 22,
    wind: 26,
    windDir: "SE",
    waves: 3.2,
    visibility: 15,
    humidity: 78,
    conditions: "Partly Cloudy",
    isPast: false
  },
  {
    date: "Feb 15",
    location: "Mar del Plata, Argentina",
    temp: 22,
    feelsLike: 19,
    wind: 32,
    windDir: "S",
    waves: 3.8,
    visibility: 10,
    humidity: 75,
    conditions: "Windy",
    isPast: false
  },
  {
    date: "Mar 25",
    location: "Drake Passage",
    temp: 5,
    feelsLike: -2,
    wind: 48,
    windDir: "SW",
    waves: 6.5,
    visibility: 8,
    humidity: 90,
    conditions: "Rough Seas",
    isPast: false
  },
  {
    date: "Apr 5",
    location: "Livingston Island, Antarctica",
    temp: -2,
    feelsLike: -8,
    wind: 38,
    windDir: "S",
    waves: 4.2,
    visibility: 12,
    humidity: 88,
    conditions: "Cold & Icy",
    isPast: false
  },
];

export function WeatherLookback() {
  const [currentTime, setCurrentTime] = useState(new Date('2025-11-09T07:02:50Z'));
  const [viewMode, setViewMode] = useState<"current" | "forecast">("current");

  // Calculate expedition start date (Nov 7, 2025)
  const expeditionStartDate = new Date('2025-11-07T08:00:00');
  
  // Determine which data to show based on current date (Nov 9, 2025)
  // Currently in Aegean Sea
  const todayData = routeWeatherData[1]; // Aegean Sea - Nov 9 (Current)
  const upcomingData = routeWeatherData.slice(2, 9); // Next 7 locations

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getTrend = (current: number, previous: number) => {
    if (current > previous) return <TrendingUp className="w-4 h-4 text-red-500" />;
    if (current < previous) return <TrendingDown className="w-4 h-4 text-blue-500" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  const getConditionColor = (conditions: string) => {
    if (conditions.includes("Clear") || conditions.includes("Sunny")) return "bg-yellow-100 text-yellow-800";
    if (conditions.includes("Cloudy")) return "bg-gray-100 text-gray-800";
    if (conditions.includes("Rough") || conditions.includes("Extreme")) return "bg-red-100 text-red-800";
    if (conditions.includes("Windy")) return "bg-blue-100 text-blue-800";
    if (conditions.includes("Cold") || conditions.includes("Icy")) return "bg-cyan-100 text-cyan-800";
    return "bg-blue-100 text-blue-800";
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2">Weather Analysis & Route Forecast</h1>
        <p className="text-gray-600">
          NIK 421 onboard meteorological station tracking weather conditions along the complete expedition route from Varna, Bulgaria to Livingston Island, Antarctica. Real-time data from ship-mounted sensors and satellite weather systems.
        </p>
        <div className="mt-3 flex items-center gap-3 flex-wrap">
          <Badge className="bg-blue-600">NIK 421 Weather Station</Badge>
          <Badge variant="outline">{todayData.location}</Badge>
          <Badge variant="outline">Day 3 of 180 • Nov 9, 2025</Badge>
          <Badge className="bg-green-600">Live Data</Badge>
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <Button
          variant={viewMode === "current" ? "default" : "outline"}
          onClick={() => setViewMode("current")}
        >
          Current Conditions
        </Button>
        <Button
          variant={viewMode === "forecast" ? "default" : "outline"}
          onClick={() => setViewMode("forecast")}
        >
          Route Forecast (7+ Locations)
        </Button>
      </div>

      {viewMode === "current" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Weather */}
          <div className="lg:col-span-2">
            <Card className="p-8 bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <p className="text-blue-100 mb-2">Current Location: {todayData.location}</p>
                  <div className="text-6xl mb-3">{todayData.temp}°C</div>
                  <p className="text-xl text-blue-100 mb-1">Feels like {todayData.feelsLike}°C</p>
                  <p className="text-blue-100">{todayData.conditions}</p>
                </div>
                <Cloud className="w-24 h-24 text-blue-200" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Wind className="w-5 h-5" />
                    <span className="text-sm text-blue-100">Wind</span>
                  </div>
                  <p className="text-2xl mb-1">{todayData.wind}</p>
                  <p className="text-sm text-blue-100">km/h {todayData.windDir}</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Waves className="w-5 h-5" />
                    <span className="text-sm text-blue-100">Waves</span>
                  </div>
                  <p className="text-2xl mb-1">{todayData.waves}</p>
                  <p className="text-sm text-blue-100">meters</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="w-5 h-5" />
                    <span className="text-sm text-blue-100">Visibility</span>
                  </div>
                  <p className="text-2xl mb-1">{todayData.visibility}</p>
                  <p className="text-sm text-blue-100">km</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Droplets className="w-5 h-5" />
                    <span className="text-sm text-blue-100">Humidity</span>
                  </div>
                  <p className="text-2xl mb-1">{todayData.humidity}%</p>
                  <p className="text-sm text-blue-100">relative</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-xs text-blue-100">Last updated: {currentTime.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })} UTC</p>
              </div>
            </Card>
          </div>

          {/* Next Locations Preview */}
          <div>
            <Card className="p-6">
              <h3 className="mb-4">🗺️ Upcoming Route</h3>
              <div className="space-y-3">
                {upcomingData.slice(0, 5).map((data, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">{data.date}</span>
                      <Navigation className="w-3 h-3 text-blue-600" />
                    </div>
                    <p className="text-sm mb-1">{data.location}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">{data.temp}°C</span>
                      <span className="text-gray-600">Wind: {data.wind} km/h</span>
                    </div>
                  </div>
                ))}
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => setViewMode("forecast")}
              >
                View Full Route Forecast
              </Button>
            </Card>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Route Forecast Table */}
          <Card className="overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-gray-200">
              <h3 className="mb-2">Complete Route Weather Forecast</h3>
              <p className="text-sm text-gray-600">
                Meteorological predictions for all major waypoints from Varna to Livingston Island (Nov 7, 2025 - Apr 5, 2026)
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs">Date</th>
                    <th className="px-6 py-3 text-left text-xs">Location</th>
                    <th className="px-6 py-3 text-left text-xs">Temp (°C)</th>
                    <th className="px-6 py-3 text-left text-xs">Feels Like</th>
                    <th className="px-6 py-3 text-left text-xs">Wind</th>
                    <th className="px-6 py-3 text-left text-xs">Waves (m)</th>
                    <th className="px-6 py-3 text-left text-xs">Visibility</th>
                    <th className="px-6 py-3 text-left text-xs">Humidity</th>
                    <th className="px-6 py-3 text-left text-xs">Conditions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {routeWeatherData.map((data, index) => (
                    <tr key={index} className={index === 1 ? "bg-blue-50" : index === 0 ? "bg-green-50" : "hover:bg-gray-50"}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{data.date}</span>
                          {index === 0 && <Badge className="bg-green-600">Departed</Badge>}
                          {index === 1 && <Badge className="bg-blue-600">Current</Badge>}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm">{data.location}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold">{data.temp}°</span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{data.feelsLike}°</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <Wind className="w-3 h-3 text-gray-500" />
                          <span className="text-sm">{data.wind} km/h</span>
                          <span className="text-xs text-gray-500">{data.windDir}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <Waves className="w-3 h-3 text-blue-500" />
                          <span className="text-sm">{data.waves}m</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">{data.visibility} km</td>
                      <td className="px-6 py-4">{data.humidity}%</td>
                      <td className="px-6 py-4">
                        <Badge variant="outline" className={getConditionColor(data.conditions)}>
                          {data.conditions}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Weather Trends Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="mb-4">Temperature Along Route</h3>
              <div className="h-64 flex items-end justify-between gap-1">
                {routeWeatherData.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-gradient-to-t from-blue-400 to-red-400 rounded-t hover:opacity-80 transition-opacity cursor-pointer relative group" 
                      style={{ 
                        height: `${((data.temp + 10) / 40) * 100}%`,
                        minHeight: "20px"
                      }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap z-10">
                        {data.temp}°C<br/>{data.location.split(',')[0]}
                      </div>
                    </div>
                    <p className="text-[10px] mt-2 text-gray-600 text-center leading-tight">{data.date.split(' ')[1]}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-xs text-gray-600 flex justify-between">
                <span>🔵 Cold: -2°C (Antarctica)</span>
                <span>🔴 Hot: 27°C (Equator)</span>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="mb-4">Wave Heights Along Route</h3>
              <div className="h-64 flex items-end justify-between gap-1">
                {routeWeatherData.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className={`w-full rounded-t hover:opacity-80 transition-opacity cursor-pointer relative group ${
                        data.waves > 5 ? 'bg-red-400' : data.waves > 3 ? 'bg-orange-400' : 'bg-cyan-400'
                      }`}
                      style={{ 
                        height: `${(data.waves / 7) * 100}%`,
                        minHeight: "10px"
                      }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap z-10">
                        {data.waves}m<br/>{data.location.split(',')[0]}
                      </div>
                    </div>
                    <p className="text-[10px] mt-2 text-gray-600 text-center leading-tight">{data.date.split(' ')[1]}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-xs text-gray-600 flex justify-between">
                <span>🟢 Calm: &lt;2m</span>
                <span>🟠 Moderate: 2-5m</span>
                <span>🔴 Rough: &gt;5m</span>
              </div>
            </Card>
          </div>

          {/* Route Warnings & Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200">
              <h3 className="mb-4">⚠️ Critical Weather Zones</h3>
              <div className="space-y-3">
                <div className="p-4 bg-white rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-red-600">Extreme</Badge>
                    <span className="font-semibold">Drake Passage</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Expected: March 25, 2026
                  </p>
                  <p className="text-sm text-gray-600">
                    Wind speeds up to 48 km/h with wave heights reaching 6.5m. Most challenging segment of the expedition. Crew should prepare for rough seas and secure all equipment.
                  </p>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-orange-600">Challenging</Badge>
                    <span className="font-semibold">South Atlantic</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Expected: January-February 2026
                  </p>
                  <p className="text-sm text-gray-600">
                    Open ocean conditions with moderate to rough seas (3-4m waves). Strong winds common in this region.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
              <h3 className="mb-4">✅ Favorable Conditions</h3>
              <div className="space-y-3">
                <div className="p-4 bg-white rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-green-600">Optimal</Badge>
                    <span className="font-semibold">Mediterranean Route</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Expected: November 10-26, 2025
                  </p>
                  <p className="text-sm text-gray-600">
                    Excellent conditions through Istanbul, Athens, Messina, and Cartagena. Clear skies, moderate winds, and calm seas ideal for smooth sailing.
                  </p>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-blue-600">Warm</Badge>
                    <span className="font-semibold">Equator Crossing</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Expected: December 28, 2025
                  </p>
                  <p className="text-sm text-gray-600">
                    Tropical conditions with temperatures reaching 27°C. Perfect for the traditional equator crossing ceremony. Calm seas and light winds.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Scientific Notes */}
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
            <h3 className="mb-4">🔬 Meteorological Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg">
                <p className="font-semibold mb-2">Temperature Gradient</p>
                <p className="text-sm text-gray-600">
                  The expedition will experience a 29°C temperature range - from 27°C at the equator to -2°C in Antarctica. This dramatic gradient offers unique opportunities for comparative climate studies.
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <p className="font-semibold mb-2">Sea State Patterns</p>
                <p className="text-sm text-gray-600">
                  Wave heights increase significantly from 1.2m in the Black Sea to 6.5m in Drake Passage, illustrating the correlation between latitude and ocean energy dynamics.
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <p className="font-semibold mb-2">Wind Systems</p>
                <p className="text-sm text-gray-600">
                  Route traverses multiple wind belts: Mediterranean breezes, Atlantic trade winds, equatorial doldrums, and Southern Ocean westerlies - a complete tour of Earth's atmospheric circulation.
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <p className="font-semibold mb-2">Seasonal Timing</p>
                <p className="text-sm text-gray-600">
                  Departure scheduled for optimal conditions: Mediterranean autumn, Atlantic winter crossing, and Antarctic late summer arrival - maximizing safety and scientific opportunities.
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
