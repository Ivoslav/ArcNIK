import { Card } from "./ui/card";
import { Cloud, Wind, Thermometer, Waves, Eye, Navigation } from "lucide-react";

export function WeatherWidget() {
  return (
    <Card className="p-6 bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
      <div className="mb-6">
        <p className="text-sm text-blue-100 mb-1">NIK 421 Current Conditions</p>
        <p className="text-xs text-blue-200 mb-3">Gerlache Strait, Antarctic Peninsula</p>
        <div className="flex items-start justify-between">
          <div>
            <div className="text-5xl mb-2">-8°C</div>
            <p className="text-blue-100">Feels like -15°C</p>
          </div>
          <Cloud className="w-16 h-16 text-blue-200" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Wind className="w-4 h-4" />
            <span className="text-xs text-blue-100">Wind</span>
          </div>
          <p className="text-xl">28 km/h</p>
          <p className="text-xs text-blue-100">SW</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Waves className="w-4 h-4" />
            <span className="text-xs text-blue-100">Waves</span>
          </div>
          <p className="text-xl">2.5 m</p>
          <p className="text-xs text-blue-100">Moderate</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Eye className="w-4 h-4" />
            <span className="text-xs text-blue-100">Visibility</span>
          </div>
          <p className="text-xl">8 km</p>
          <p className="text-xs text-blue-100">Good</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Navigation className="w-4 h-4" />
            <span className="text-xs text-blue-100">Ice Extent</span>
          </div>
          <p className="text-xl">35%</p>
          <p className="text-xs text-blue-100">Light pack</p>
        </div>
      </div>

      <div className="text-xs text-blue-100">
        Last updated: Nov 1, 2025 14:30 UTC • NIK 421 Onboard Sensors
      </div>
    </Card>
  );
}
