import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Thermometer, Droplets, Anchor, Wind, Layers, MapPin, Navigation, TrendingUp, TrendingDown } from "lucide-react";
import { ComposableMap, Geographies, Geography, Line, Marker } from "react-simple-maps";

interface DataLayer {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  enabled: boolean;
  opacity: number;
  unit: string;
  currentValue: string;
  gradient: {
    min: number;
    max: number;
    colors: string[];
    labels: string[];
  };
}

interface RoutePoint {
  name: string;
  lat: number;
  lon: number;
  isPassed: boolean;
  // Oceanographic data for each location
  temp: number;
  salinity: number;
  depth: number;
  currentSpeed: number;
  iceCoverage: number;
}

// TopoJSON URL for world map data
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export function InteractiveKnowledgeMap() {
  // Real route points with oceanographic data
  const routePoints: RoutePoint[] = [
    {
      name: "Varna, Bulgaria",
      lat: 43.2141,
      lon: 27.9147,
      isPassed: true,
      temp: 12,
      salinity: 18.2,
      depth: 2100,
      currentSpeed: 0.2,
      iceCoverage: 0,
    },
    {
      name: "Aegean Sea (Current)",
      lat: 40.43446,
      lon: 26.74311,
      isPassed: true,
      temp: 13,
      salinity: 38.5,
      depth: 450,
      currentSpeed: 0.3,
      iceCoverage: 0,
    },
    {
      name: "Istanbul, Turkey",
      lat: 41.0082,
      lon: 28.9784,
      isPassed: false,
      temp: 14,
      salinity: 22.5,
      depth: 80,
      currentSpeed: 0.5,
      iceCoverage: 0,
    },
    {
      name: "Messina, Italy",
      lat: 38.1938,
      lon: 15.5540,
      isPassed: false,
      temp: 17,
      salinity: 38.0,
      depth: 1200,
      currentSpeed: 0.4,
      iceCoverage: 0,
    },
    {
      name: "Gibraltar",
      lat: 36.1408,
      lon: -5.3536,
      isPassed: false,
      temp: 19,
      salinity: 36.5,
      depth: 900,
      currentSpeed: 0.8,
      iceCoverage: 0,
    },
    {
      name: "Mid-Atlantic",
      lat: 15.0,
      lon: -35.0,
      isPassed: false,
      temp: 23,
      salinity: 36.0,
      depth: 4500,
      currentSpeed: 0.6,
      iceCoverage: 0,
    },
    {
      name: "Equator Crossing",
      lat: 0.0,
      lon: -38.0,
      isPassed: false,
      temp: 27,
      salinity: 35.5,
      depth: 4200,
      currentSpeed: 0.3,
      iceCoverage: 0,
    },
    {
      name: "South Atlantic",
      lat: -30.0,
      lon: -45.0,
      isPassed: false,
      temp: 18,
      salinity: 35.8,
      depth: 3800,
      currentSpeed: 0.7,
      iceCoverage: 0,
    },
    {
      name: "Drake Passage",
      lat: -58.0,
      lon: -65.0,
      isPassed: false,
      temp: 5,
      salinity: 34.2,
      depth: 3200,
      currentSpeed: 1.2,
      iceCoverage: 15,
    },
    {
      name: "Livingston Island",
      lat: -62.6,
      lon: -60.5,
      isPassed: false,
      temp: -2,
      salinity: 33.8,
      depth: 800,
      currentSpeed: 0.4,
      iceCoverage: 45,
    },
  ];

  // Current position (Aegean Sea - Nov 9)
  const currentPosition = routePoints[1];

  const [layers, setLayers] = useState<DataLayer[]>([
    {
      id: "temperature",
      name: "Water Temperature",
      icon: Thermometer,
      color: "from-blue-500 to-red-500",
      enabled: true,
      opacity: 80,
      unit: "°C",
      currentValue: `${currentPosition.temp}°C at surface`,
      gradient: {
        min: -2,
        max: 27,
        colors: ['#1e3a8a', '#3b82f6', '#06b6d4', '#10b981', '#fbbf24', '#f97316', '#dc2626'],
        labels: ['-2°C (Antarctica)', '5°C', '12°C', '18°C', '23°C', '27°C (Equator)']
      }
    },
    {
      id: "salinity",
      name: "Salinity",
      icon: Droplets,
      color: "from-cyan-300 to-purple-500",
      enabled: false,
      opacity: 70,
      unit: "PSU",
      currentValue: `${currentPosition.salinity} PSU`,
      gradient: {
        min: 18,
        max: 39,
        colors: ['#67e8f9', '#06b6d4', '#0284c7', '#7c3aed', '#6b21a8'],
        labels: ['18 PSU (Black Sea)', '25 PSU', '32 PSU', '36 PSU', '39 PSU (Mediterranean)']
      }
    },
    {
      id: "bathymetry",
      name: "Bathymetry (Depth)",
      icon: Anchor,
      color: "from-green-200 to-blue-900",
      enabled: false,
      opacity: 60,
      unit: "m",
      currentValue: `${currentPosition.depth}m depth`,
      gradient: {
        min: 0,
        max: 4500,
        colors: ['#bbf7d0', '#4ade80', '#22c55e', '#0891b2', '#0c4a6e', '#1e3a8a'],
        labels: ['0m (Shallow)', '500m', '1500m', '3000m', '4500m (Deep Ocean)']
      }
    },
    {
      id: "currents",
      name: "Ocean Currents",
      icon: Wind,
      color: "from-yellow-400 to-orange-600",
      enabled: false,
      opacity: 75,
      unit: "m/s",
      currentValue: `${currentPosition.currentSpeed} m/s`,
      gradient: {
        min: 0,
        max: 1.2,
        colors: ['#fef3c7', '#fbbf24', '#f59e0b', '#f97316', '#ea580c'],
        labels: ['0 m/s (Calm)', '0.3 m/s', '0.6 m/s', '0.9 m/s', '1.2 m/s (Strong)']
      }
    },
    {
      id: "ice",
      name: "Ice Coverage",
      icon: Layers,
      color: "from-white to-blue-200",
      enabled: false,
      opacity: 50,
      unit: "%",
      currentValue: `${currentPosition.iceCoverage}% coverage`,
      gradient: {
        min: 0,
        max: 100,
        colors: ['#f0f9ff', '#bae6fd', '#7dd3fc', '#38bdf8', '#0284c7'],
        labels: ['0% (Ice-free)', '25%', '50%', '75%', '100% (Complete)']
      }
    },
  ]);

  const [selectedPoint, setSelectedPoint] = useState<RoutePoint | null>(currentPosition);
  const [hoveredPoint, setHoveredPoint] = useState<RoutePoint | null>(null);

  const toggleLayer = (id: string) => {
    setLayers(layers.map(layer =>
      layer.id === id ? { ...layer, enabled: !layer.enabled } : layer
    ));
  };

  const selectPoint = (point: RoutePoint) => {
    setSelectedPoint(point);
    // Update layer values based on selected point
    setLayers(layers.map(layer => {
      switch(layer.id) {
        case "temperature":
          return { ...layer, currentValue: `${point.temp}°C at surface` };
        case "salinity":
          return { ...layer, currentValue: `${point.salinity} PSU` };
        case "bathymetry":
          return { ...layer, currentValue: `${point.depth}m depth` };
        case "currents":
          return { ...layer, currentValue: `${point.currentSpeed} m/s` };
        case "ice":
          return { ...layer, currentValue: `${point.iceCoverage}% coverage` };
        default:
          return layer;
      }
    }));
  };

  const enabledLayers = layers.filter(l => l.enabled);
  const primaryLayer = enabledLayers[0] || layers[0];

  // Get value for a specific layer and point
  const getLayerValue = (point: RoutePoint, layerId: string): number => {
    switch(layerId) {
      case "temperature": return point.temp;
      case "salinity": return point.salinity;
      case "bathymetry": return point.depth;
      case "currents": return point.currentSpeed;
      case "ice": return point.iceCoverage;
      default: return 0;
    }
  };

  // Calculate color based on value and gradient
  const getColorForValue = (value: number, layer: DataLayer): string => {
    const { min, max, colors } = layer.gradient;
    const normalized = Math.max(0, Math.min(1, (value - min) / (max - min)));
    const index = Math.floor(normalized * (colors.length - 1));
    return colors[index];
  };

  // Calculate marker color based on active layers
  const getPointColor = (point: RoutePoint): string => {
    if (enabledLayers.length === 0) {
      return point.isPassed ? "#10b981" : "#3b82f6";
    }
    
    const value = getLayerValue(point, primaryLayer.id);
    return getColorForValue(value, primaryLayer);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2">Interactive Knowledge Map</h1>
        <p className="text-gray-600">
          Visualize real-time oceanographic data collected by NIK 421 along the complete expedition route from the Black Sea to Antarctica
        </p>
        <div className="mt-3 flex items-center gap-3 flex-wrap">
          <Badge className="bg-blue-600">NIK 421 Route Data</Badge>
          <Badge variant="outline">10 Major Waypoints</Badge>
          <Badge variant="outline">Current: {currentPosition.name}</Badge>
          <Badge className="bg-green-600">Live Oceanography</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Layer Controls */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="p-4">
            <h3 className="mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5" />
              Data Layers
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Toggle layers to visualize different oceanographic parameters. Values update automatically based on selected location.
            </p>
            <div className="space-y-4">
              {layers.map((layer) => {
                const Icon = layer.icon;
                return (
                  <div key={layer.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-gray-600" />
                        <Label htmlFor={layer.id} className="text-sm cursor-pointer">
                          {layer.name}
                        </Label>
                      </div>
                      <Switch
                        id={layer.id}
                        checked={layer.enabled}
                        onCheckedChange={() => toggleLayer(layer.id)}
                      />
                    </div>
                    {layer.enabled && (
                      <div className="ml-6 space-y-2">
                        {/* Current value display */}
                        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded p-2">
                          <p className="text-xs text-gray-600 mb-1">Current Location Value</p>
                          <p className="font-semibold">{layer.currentValue}</p>
                        </div>
                        {/* Gradient scale */}
                        <div className="mt-2">
                          <div 
                            className="h-3 rounded"
                            style={{
                              background: `linear-gradient(to right, ${layer.gradient.colors.join(', ')})`
                            }}
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>{layer.gradient.min}{layer.unit}</span>
                            <span>{layer.gradient.max}{layer.unit}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50">
            <h3 className="text-sm mb-3">Route Waypoints</h3>
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {routePoints.map((point, index) => {
                const pointColor = getPointColor(point);
                return (
                  <Button
                    key={index}
                    variant={selectedPoint?.name === point.name ? "default" : "outline"}
                    size="sm"
                    className="w-full justify-start text-xs"
                    onClick={() => selectPoint(point)}
                    onMouseEnter={() => setHoveredPoint(point)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  >
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: pointColor }}
                    />
                    {point.name}
                    {point.isPassed && <span className="ml-auto text-green-600">✓</span>}
                  </Button>
                );
              })}
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50">
            <h3 className="text-sm mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => setLayers(layers.map(l => ({ ...l, enabled: true })))}
              >
                Enable All Layers
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => setLayers(layers.map(l => ({ ...l, enabled: false })))}
              >
                Disable All Layers
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => selectPoint(currentPosition)}
              >
                <MapPin className="w-3 h-3 mr-2" />
                Go to Current Position
              </Button>
            </div>
          </Card>
        </div>

        {/* Map Visualization */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="overflow-hidden">
            <div className="relative h-[700px] bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900">
              {/* Real world map */}
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                  scale: 140,
                  center: [0, 10],
                }}
                className="w-full h-full"
                width={800}
                height={600}
              >
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="#1e293b"
                        stroke="#334155"
                        strokeWidth={0.5}
                        style={{
                          default: { outline: "none" },
                          hover: { outline: "none", fill: "#334155" },
                          pressed: { outline: "none" },
                        }}
                      />
                    ))
                  }
                </Geographies>

                  {/* Data layer visualization - heat zones */}
                  {enabledLayers.map((layer) => (
                    <g key={layer.id}>
                      {routePoints.map((point, index) => {
                        const value = getLayerValue(point, layer.id);
                        const color = getColorForValue(value, layer);
                        const radius = 3 + (layer.opacity / 100) * 2;
                        
                        return (
                          <circle
                            key={`heatzone-${index}`}
                            cx={0}
                            cy={0}
                            r={radius}
                            fill={color}
                            opacity={layer.opacity / 150}
                            transform={`translate(${point.lon}, ${point.lat})`}
                            style={{
                              filter: 'blur(8px)',
                            }}
                          />
                        );
                      })}
                    </g>
                  ))}

                  {/* Route lines */}
                  {routePoints.slice(0, -1).map((point, index) => {
                    const nextPoint = routePoints[index + 1];
                    return (
                      <Line
                        key={`line-${index}`}
                        from={[point.lon, point.lat]}
                        to={[nextPoint.lon, nextPoint.lat]}
                        stroke={point.isPassed ? "#10b981" : "#3b82f6"}
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeDasharray={point.isPassed ? "0" : "5,5"}
                        style={{
                          default: { outline: "none" },
                          hover: { outline: "none" },
                          pressed: { outline: "none" },
                        }}
                      />
                    );
                  })}

                  {/* Route points */}
                  {routePoints.map((point, index) => {
                    const isCurrent = point.name === currentPosition.name;
                    const isHovered = hoveredPoint?.name === point.name;
                    const isSelected = selectedPoint?.name === point.name;
                    const pointColor = getPointColor(point);
                    
                    return (
                      <Marker
                        key={index}
                        coordinates={[point.lon, point.lat]}
                        onClick={() => selectPoint(point)}
                        onMouseEnter={() => setHoveredPoint(point)}
                        onMouseLeave={() => setHoveredPoint(null)}
                        style={{ cursor: "pointer" }}
                      >
                        {/* Glow for current position */}
                        {isCurrent && (
                          <>
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
                          </>
                        )}
                        {/* Selection ring */}
                        {isSelected && !isCurrent && (
                          <circle
                            r={8}
                            fill="none"
                            stroke="#ffffff"
                            strokeWidth={2}
                            opacity={0.8}
                          />
                        )}
                        {/* Point marker */}
                        <circle
                          r={isCurrent ? 5 : isHovered ? 5 : 4}
                          fill={isCurrent ? "#06b6d4" : pointColor}
                          stroke="#ffffff"
                          strokeWidth={1.5}
                        />
                        {/* Label for selected/current/hovered point */}
                        {(isCurrent || isSelected || isHovered) && (
                          <text
                            textAnchor="middle"
                            y={-12}
                            style={{
                              fontFamily: "system-ui",
                              fontSize: "10px",
                              fill: "#ffffff",
                              fontWeight: "bold",
                              textShadow: "0 0 3px rgba(0,0,0,0.8)",
                            }}
                          >
                            {point.name.split(',')[0]}
                          </text>
                        )}
                        {/* Value label for hovered point with active layer */}
                        {isHovered && enabledLayers.length > 0 && (
                          <text
                            textAnchor="middle"
                            y={18}
                            style={{
                              fontFamily: "system-ui",
                              fontSize: "9px",
                              fill: "#ffffff",
                              fontWeight: "bold",
                              textShadow: "0 0 3px rgba(0,0,0,0.8)",
                            }}
                          >
                            {getLayerValue(point, primaryLayer.id)}{primaryLayer.unit}
                          </text>
                        )}
                      </Marker>
                    );
                  })}
              </ComposableMap>

              {/* Legend */}
              <div className="absolute top-4 right-4 space-y-2 max-w-xs">
                <Badge className="bg-green-600 text-white">
                  ● Passed Route
                </Badge>
                <Badge className="bg-blue-600 text-white">
                  ● Future Route
                </Badge>
                <Badge className="bg-cyan-600 text-white animate-pulse">
                  ● Current Position
                </Badge>
                {enabledLayers.map((layer) => {
                  const Icon = layer.icon;
                  return (
                    <div key={layer.id} className="space-y-1">
                      <Badge
                        variant="secondary"
                        className="bg-white/90 backdrop-blur-sm flex items-center gap-2 w-full"
                      >
                        <Icon className="w-3 h-3" />
                        <span className="text-xs">{layer.name}</span>
                      </Badge>
                      {/* Mini gradient legend */}
                      <div className="bg-white/90 backdrop-blur-sm rounded p-2">
                        <div 
                          className="h-2 rounded mb-1"
                          style={{
                            background: `linear-gradient(to right, ${layer.gradient.colors.join(', ')})`
                          }}
                        />
                        <div className="flex justify-between text-xs text-gray-700">
                          <span>{layer.gradient.min}{layer.unit}</span>
                          <span>{layer.gradient.max}{layer.unit}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Selected point info */}
              {selectedPoint && (
                <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm text-white p-4 rounded-lg max-w-xs">
                  <p className="text-xs text-gray-300 mb-1">Selected Location</p>
                  <p className="font-semibold mb-2">{selectedPoint.name}</p>
                  <p className="text-sm text-gray-300 mb-3">
                    {selectedPoint.lat.toFixed(4)}°{selectedPoint.lat >= 0 ? 'N' : 'S'}, {Math.abs(selectedPoint.lon).toFixed(4)}°{selectedPoint.lon >= 0 ? 'E' : 'W'}
                  </p>
                  {selectedPoint.isPassed && (
                    <Badge className="mb-2 bg-green-600">✓ Passed</Badge>
                  )}
                  {/* Active layer info */}
                  {enabledLayers.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-gray-600">
                      <p className="text-xs text-gray-400 mb-1">Active Layer Data:</p>
                      {enabledLayers.map((layer) => {
                        const value = getLayerValue(selectedPoint, layer.id);
                        const Icon = layer.icon;
                        return (
                          <div key={layer.id} className="flex items-center gap-2 text-sm mb-1">
                            <Icon className="w-3 h-3" />
                            <span>{layer.name}:</span>
                            <span className="font-semibold">{value}{layer.unit}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Scale indicator */}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-20 h-1 bg-gray-800"></div>
                  <span className="text-xs">1000 km</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Data Insights for Selected Point */}
          {selectedPoint && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {layers.map((layer) => {
                  const Icon = layer.icon;
                  const value = getLayerValue(selectedPoint, layer.id);
                  const color = getColorForValue(value, layer);
                  
                  // Calculate if value is high/low/medium
                  const normalized = (value - layer.gradient.min) / (layer.gradient.max - layer.gradient.min);
                  const trend = normalized > 0.66 ? 'high' : normalized < 0.33 ? 'low' : 'medium';
                  
                  return (
                    <Card 
                      key={layer.id} 
                      className={`p-4 transition-all ${layer.enabled ? 'border-2 ring-2 ring-blue-200' : ''}`}
                      style={layer.enabled ? { borderColor: color } : {}}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className={`w-5 h-5 ${layer.enabled ? 'text-blue-600' : 'text-gray-400'}`} />
                        <span className="text-sm text-gray-600">{layer.name}</span>
                        {layer.enabled && (
                          trend === 'high' ? <TrendingUp className="w-4 h-4 text-red-500 ml-auto" /> :
                          trend === 'low' ? <TrendingDown className="w-4 h-4 text-blue-500 ml-auto" /> :
                          null
                        )}
                      </div>
                      <div className="flex items-baseline gap-2">
                        <p className="text-2xl">{value}</p>
                        <Badge variant="outline" className="text-xs">{layer.unit}</Badge>
                      </div>
                      {layer.enabled && (
                        <div className="mt-2">
                          <div 
                            className="h-1.5 rounded-full"
                            style={{
                              background: `linear-gradient(to right, ${layer.gradient.colors.join(', ')})`,
                              opacity: 0.3
                            }}
                          />
                          <div 
                            className="h-1.5 w-2 rounded-full -mt-1.5 transition-all"
                            style={{
                              backgroundColor: color,
                              marginLeft: `${normalized * 100}%`
                            }}
                          />
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>

              {/* Ecological Insights */}
              <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50">
                <h3 className="mb-4">🔬 Oceanographic Analysis: {selectedPoint.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedPoint.temp > 20 && (
                    <div className="p-4 bg-white rounded-lg">
                      <p className="font-semibold mb-2 flex items-center gap-2">
                        <Thermometer className="w-4 h-4 text-red-500" />
                        🌡️ Tropical Waters
                      </p>
                      <p className="text-sm text-gray-600">
                        Water temperatures above 20°C indicate tropical maritime conditions. These warm waters support diverse marine ecosystems with high biodiversity.
                      </p>
                    </div>
                  )}
                  {selectedPoint.temp < 5 && (
                    <div className="p-4 bg-white rounded-lg">
                      <p className="font-semibold mb-2 flex items-center gap-2">
                        <Thermometer className="w-4 h-4 text-blue-500" />
                        ❄️ Cold Polar Waters
                      </p>
                      <p className="text-sm text-gray-600">
                        Water temperatures below 5°C characterize polar and sub-polar regions. Despite low temperatures, these waters are highly productive due to nutrient upwelling.
                      </p>
                    </div>
                  )}
                  {selectedPoint.depth > 3000 && (
                    <div className="p-4 bg-white rounded-lg">
                      <p className="font-semibold mb-2 flex items-center gap-2">
                        <Anchor className="w-4 h-4 text-blue-600" />
                        🌊 Deep Ocean Basin
                      </p>
                      <p className="text-sm text-gray-600">
                        Ocean depth exceeding 3000m indicates abyssal plain conditions. These deep waters are characterized by stable temperatures, high pressure, and unique deep-sea ecosystems.
                      </p>
                    </div>
                  )}

                  {selectedPoint.iceCoverage > 20 && (
                    <div className="p-4 bg-white rounded-lg">
                      <p className="font-semibold mb-2 flex items-center gap-2">
                        <Layers className="w-4 h-4 text-cyan-600" />
                        🧊 Ice-Influenced Environment
                      </p>
                      <p className="text-sm text-gray-600">
                        Ice coverage above 20% significantly impacts local oceanography. Ice melt creates stratification, influences salinity gradients, and creates unique habitats along ice edges.
                      </p>
                    </div>
                  )}
                  {selectedPoint.currentSpeed > 0.8 && (
                    <div className="p-4 bg-white rounded-lg">
                      <p className="font-semibold mb-2 flex items-center gap-2">
                        <Wind className="w-4 h-4 text-orange-600" />
                        🌀 Strong Ocean Currents
                      </p>
                      <p className="text-sm text-gray-600">
                        Current speeds exceeding 0.8 m/s indicate dynamic oceanographic conditions. Strong currents transport nutrients, influence navigation, and create zones of high biological activity.
                      </p>
                    </div>
                  )}
                  {selectedPoint.salinity < 25 && (
                    <div className="p-4 bg-white rounded-lg">
                      <p className="font-semibold mb-2 flex items-center gap-2">
                        <Droplets className="w-4 h-4 text-cyan-600" />
                        💧 Brackish Water Conditions
                      </p>
                      <p className="text-sm text-gray-600">
                        Salinity below 25 PSU indicates significant freshwater influence from rivers, ice melt, or precipitation. These conditions create unique estuarine-like environments.
                      </p>
                    </div>
                  )}
                  {selectedPoint.depth < 200 && (
                    <div className="p-4 bg-white rounded-lg">
                      <p className="font-semibold mb-2 flex items-center gap-2">
                        <Anchor className="w-4 h-4 text-green-600" />
                        🏝️ Shallow Continental Shelf
                      </p>
                      <p className="text-sm text-gray-600">
                        Depths under 200m indicate continental shelf regions. These shallow areas receive abundant sunlight, supporting high biological productivity and diverse benthic communities.
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
