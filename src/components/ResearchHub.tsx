import React, { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Fish, Bird, Waves, Snowflake, TreePine, Microscope, 
  FlaskConical, Database, TrendingUp, MapPin, Camera,
  ThermometerSun, Wind, Droplets, Activity, BarChart3,
  BookOpen, FileText, Download, Eye, AlertTriangle, Info,
  Zap, CloudRain
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface BiomeSpecies {
  name: string;
  scientificName: string;
  population: string;
  status: string;
  description: string;
  image: string;
  category: 'penguin' | 'seal' | 'whale' | 'bird' | 'marine';
}

interface ResearchProject {
  id: string;
  title: string;
  lead: string;
  status: 'active' | 'completed' | 'planned';
  category: 'oceanography' | 'climatology' | 'biology' | 'geology';
  description: string;
  progress: number;
  dataPoints: number;
  findings: string[];
}

export function ResearchHub() {
  const [selectedSpecies, setSelectedSpecies] = useState<BiomeSpecies | null>(null);
  const [activeTab, setActiveTab] = useState('biome');
  const [iceShelfExpanded, setIceShelfExpanded] = useState(true);

  // Antarctic Biome Species Data
  const biomeSpecies: BiomeSpecies[] = [
    {
      name: 'Emperor Penguin',
      scientificName: 'Aptenodytes forsteri',
      population: '~595,000 individuals',
      status: 'Near Threatened',
      description: 'The largest of all penguin species, breeding during Antarctic winter in temperatures as low as -40°C.',
      image: 'https://images.unsplash.com/photo-1739832204009-415a0363a552?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbXBlcm9yJTIwcGVuZ3VpbiUyMGFudGFyY3RpY2F8ZW58MXx8fHwxNzYyNjg2MTc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'penguin'
    },
    {
      name: 'Adélie Penguin',
      scientificName: 'Pygoscelis adeliae',
      population: '~3.8 million pairs',
      status: 'Least Concern',
      description: 'One of the most southerly distributed seabirds, named after Adélie Land in Antarctica.',
      image: 'https://images.unsplash.com/photo-1611920855276-06e04c91213a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZGVsaWUlMjBwZW5ndWlufGVufDF8fHx8MTc2MjY4NjE3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'penguin'
    },
    {
      name: 'Weddell Seal',
      scientificName: 'Leptonychotes weddellii',
      population: '~500,000 individuals',
      status: 'Least Concern',
      description: 'The most southerly breeding mammal, capable of diving to depths over 600m.',
      image: 'https://images.unsplash.com/photo-1537442950981-a6ecac8d8f94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkZWxsJTIwc2VhbCUyMGFudGFyY3RpY2F8ZW58MXx8fHwxNzYyNjg2MTc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'seal'
    },
    {
      name: 'Antarctic Minke Whale',
      scientificName: 'Balaenoptera bonaerensis',
      population: '~515,000 individuals',
      status: 'Near Threatened',
      description: 'The second smallest baleen whale, feeding on Antarctic krill in Southern Ocean waters.',
      image: 'https://images.unsplash.com/photo-1591735900307-7378525704ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5rZSUyMHdoYWxlJTIwb2NlYW58ZW58MXx8fHwxNzYyNjg2MTc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'whale'
    },
    {
      name: 'Snow Petrel',
      scientificName: 'Pagodroma nivea',
      population: '~4 million individuals',
      status: 'Least Concern',
      description: 'Pure white seabird endemic to Antarctica, breeds further south than any other bird.',
      image: 'https://images.unsplash.com/photo-1680354494364-96aed3cd96fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbm93JTIwcGV0cmVsJTIwYmlyZHxlbnwxfHx8fDE3NjI2ODYxNzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'bird'
    },
    {
      name: 'Antarctic Krill',
      scientificName: 'Euphausia superba',
      population: '~500 trillion individuals',
      status: 'Vulnerable',
      description: 'Keystone species of the Antarctic ecosystem, total biomass estimated at 379 million tonnes.',
      image: 'https://images.unsplash.com/photo-1725417810899-0d37bf04d647?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbnRhcmN0aWMlMjBrcmlsbHxlbnwxfHx8fDE3NjI2ODYxNzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'marine'
    }
  ];

  // Research Projects
  const researchProjects: ResearchProject[] = [
    {
      id: 'proj-001',
      title: 'Ocean Temperature Monitoring',
      lead: 'Dr. Elena Kovač',
      status: 'active',
      category: 'oceanography',
      description: 'Continuous monitoring of sea surface and deep ocean temperatures along NIK 421 route from Mediterranean to Antarctic waters.',
      progress: 68,
      dataPoints: 12847,
      findings: [
        'Mediterranean SST: 18-22°C (seasonal variation)',
        'Suez Canal: Stable 24-26°C',
        'Indian Ocean: 26-28°C warm waters',
        'Southern Ocean: Rapid drop to 2-4°C',
        'Antarctic waters: -1.8 to 0°C'
      ]
    },
    {
      id: 'proj-002',
      title: 'Marine Biodiversity Assessment',
      lead: 'Dr. James Morrison',
      status: 'active',
      category: 'biology',
      description: 'Documentation and cataloging of marine species encountered across different oceanic zones during the expedition.',
      progress: 54,
      dataPoints: 8932,
      findings: [
        '342 species documented across 6 oceanic zones',
        'Highest biodiversity in tropical Indian Ocean',
        'Unique Antarctic species: 87 documented',
        'New species candidates: 12 under review',
        'Phytoplankton bloom observations: 23 events'
      ]
    },
    {
      id: 'proj-003',
      title: 'Ice Sheet Dynamics Study',
      lead: 'Dr. Ingrid Olsen',
      status: 'planned',
      category: 'climatology',
      description: 'Analysis of Antarctic ice shelf stability, calving events, and climate change impacts on ice coverage.',
      progress: 12,
      dataPoints: 1456,
      findings: [
        'Pre-expedition satellite data analysis completed',
        'Equipment calibration in progress',
        'Collaboration with Antarctic research stations established',
        'Drone survey protocols finalized'
      ]
    },
    {
      id: 'proj-004',
      title: 'Seafloor Mapping Project',
      lead: 'Dr. Thomas Chen',
      status: 'active',
      category: 'geology',
      description: 'High-resolution bathymetric mapping of previously uncharted Southern Ocean regions.',
      progress: 41,
      dataPoints: 5621,
      findings: [
        'New underwater ridge discovered at 62°S',
        'Seafloor depths: 2,500-4,800m mapped',
        'Volcanic activity indicators detected',
        'Potential hydrothermal vent sites: 3 locations'
      ]
    }
  ];

  // Scientific Data - Temperature trends
  const temperatureData = [
    { location: 'Varna', lat: 43.2, temp: 20, salinity: 18 },
    { location: 'Bosphorus', lat: 41.1, temp: 19, salinity: 22 },
    { location: 'Aegean Sea', lat: 38.5, temp: 21, salinity: 38 },
    { location: 'Suez Canal', lat: 30.5, temp: 25, salinity: 42 },
    { location: 'Red Sea', lat: 22.0, temp: 27, salinity: 40 },
    { location: 'Indian Ocean', lat: 5.0, temp: 28, salinity: 35 },
    { location: 'Southern Indian', lat: -35.0, temp: 14, salinity: 35 },
    { location: 'Southern Ocean', lat: -50.0, temp: 6, salinity: 34 },
    { location: 'Antarctic Circle', lat: -66.5, temp: 0, salinity: 34 },
    { location: 'Antarctica', lat: -70.0, temp: -1.5, salinity: 34 }
  ];

  // Wildlife population trends
  const wildlifeData = [
    { year: '2015', emperorPenguin: 620, adeliePenguin: 3900, weddellSeal: 520, minkeWhale: 530 },
    { year: '2017', emperorPenguin: 610, adeliePenguin: 3850, weddellSeal: 515, minkeWhale: 525 },
    { year: '2019', emperorPenguin: 600, adeliePenguin: 3820, weddellSeal: 510, minkeWhale: 520 },
    { year: '2021', emperorPenguin: 598, adeliePenguin: 3800, weddellSeal: 505, minkeWhale: 517 },
    { year: '2023', emperorPenguin: 595, adeliePenguin: 3800, weddellSeal: 500, minkeWhale: 515 },
    { year: '2025', emperorPenguin: 595, adeliePenguin: 3800, weddellSeal: 500, minkeWhale: 515 }
  ];

  // Ice coverage data
  const iceData = [
    { month: 'Jan', coverage: 3.2, extent: 2.8 },
    { month: 'Feb', coverage: 2.4, extent: 2.1 },
    { month: 'Mar', coverage: 3.8, extent: 3.3 },
    { month: 'Apr', coverage: 6.5, extent: 5.9 },
    { month: 'May', coverage: 10.2, extent: 9.4 },
    { month: 'Jun', coverage: 13.8, extent: 12.7 },
    { month: 'Jul', coverage: 15.4, extent: 14.2 },
    { month: 'Aug', coverage: 16.1, extent: 14.9 },
    { month: 'Sep', coverage: 17.2, extent: 15.8 },
    { month: 'Oct', coverage: 15.9, extent: 14.6 },
    { month: 'Nov', coverage: 11.3, extent: 10.4 },
    { month: 'Dec', coverage: 5.8, extent: 5.1 }
  ];

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'penguin': return <Bird className="w-5 h-5" />;
      case 'seal': return <Fish className="w-5 h-5" />;
      case 'whale': return <Waves className="w-5 h-5" />;
      case 'bird': return <Bird className="w-5 h-5" />;
      case 'marine': return <Fish className="w-5 h-5" />;
      default: return <TreePine className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Least Concern': return 'bg-green-100 text-green-700 border-green-300';
      case 'Near Threatened': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'Vulnerable': return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'Endangered': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getProjectStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-500';
      case 'completed': return 'bg-blue-500';
      case 'planned': return 'bg-gray-400';
      default: return 'bg-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-cyan-50 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Microscope className="w-10 h-10 text-blue-600" />
            <h1 className="text-gray-900">Antarctic Research Hub</h1>
          </div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Comprehensive scientific research and biome analysis from NIK 421 Antarctic Expedition. 
            Explore biodiversity, climate data, and ongoing research projects.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Data Points</p>
                <p className="text-gray-900">28,856</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500 rounded-lg">
                <FlaskConical className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Projects</p>
                <p className="text-gray-900">12</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 border-2 border-purple-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500 rounded-lg">
                <Fish className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Species Logged</p>
                <p className="text-gray-900">342</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500 rounded-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Publications</p>
                <p className="text-gray-900">8</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* ICE SHELF MELTING ALERT - Interactive Educational Section */}
      <Card className="overflow-hidden border-2 border-red-400 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 animate-pulse-slow">
        <div className="bg-gradient-to-r from-red-600 to-orange-600 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white mb-1">🛰️ Copernicus Satellite Alert</h3>
                <p className="text-xs text-red-100">NIK 421 entered melting ice shelf zone • Position: 66.5°S 60.2°W</p>
              </div>
            </div>
            <Badge className="bg-white text-red-600 hover:bg-white">
              <Zap className="w-3 h-3 mr-1" />
              LIVE ZONE
            </Badge>
          </div>
        </div>
        
        <div className="p-6">
          <Button 
            onClick={() => setIceShelfExpanded(!iceShelfExpanded)}
            variant="outline"
            className="w-full mb-4 border-2 border-red-300 hover:bg-red-50 text-red-700"
          >
            <Info className="w-5 h-5 mr-2" />
            <span className="flex-1 text-left">What does this mean? Learn about ice shelves</span>
            <span className="text-2xl">{iceShelfExpanded ? '▲' : '▼'}</span>
          </Button>

          {iceShelfExpanded && (
            <div className="space-y-6 animate-in fade-in duration-500">
              {/* Definition */}
              <div className="bg-white rounded-lg p-5 border-2 border-blue-300 shadow-sm">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Snowflake className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-blue-900 mb-2">🧊 What are ice shelves?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Ice shelves are <strong>floating ice masses</strong> that form when glaciers 
                      flow from land into the ocean. They act as natural <strong>"brakes"</strong> for 
                      the glaciers behind them, slowing their movement towards the sea.
                    </p>
                  </div>
                </div>
                <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    💡 <strong>Scientific fact:</strong> Antarctic ice shelves contain about 60% of 
                    the world's freshwater reserves. The Larsen C ice shelf we're observing has an area 
                    larger than Bulgaria!
                  </p>
                </div>
              </div>

              {/* Why melting */}
              <div className="bg-white rounded-lg p-5 border-2 border-orange-300 shadow-sm">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <ThermometerSun className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="text-orange-900 mb-2">🔥 Why are they melting?</h4>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      <strong>Rising ocean and air temperatures</strong>, caused by 
                      <strong className="text-orange-700"> global warming</strong>, are causing these shelves 
                      to melt and break apart faster than before.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                        <span><strong>Melting from below:</strong> Warmer ocean water (0.5-2°C above normal)</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                        <span><strong>Melting from above:</strong> Higher summer temperatures create melt ponds</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                        <span><strong>Result:</strong> Cracks, disintegration and calving of massive icebergs</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 p-3 bg-orange-50 rounded-lg">
                  <p className="text-sm text-orange-800">
                    📊 <strong>NIK 421 Data:</strong> Our sensors record ocean temperature of +0.8°C 
                    in this zone - this is <strong>1.2°C above the historical average</strong> for November!
                  </p>
                </div>
              </div>

              {/* Sea level impact */}
              <div className="bg-white rounded-lg p-5 border-2 border-cyan-300 shadow-sm">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-cyan-100 rounded-lg">
                    <Waves className="w-6 h-6 text-cyan-600" />
                  </div>
                  <div>
                    <h4 className="text-cyan-900 mb-2">🌊 What does this mean for sea level?</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-cyan-50 rounded-lg border border-cyan-200">
                        <p className="text-sm text-cyan-900 mb-2">
                          <strong>❌ Common misconception:</strong>
                        </p>
                        <p className="text-gray-700 text-sm">
                          When <strong>ice shelves</strong> melt, sea level <strong>does NOT rise directly</strong> 
                          (because they're already floating in water - same principle as ice cubes in your glass).
                        </p>
                      </div>
                      
                      <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                        <p className="text-sm text-red-900 mb-2">
                          <strong>⚠️ The real danger:</strong>
                        </p>
                        <p className="text-gray-700 text-sm mb-2">
                          Their <strong>weakening and collapse</strong> allows the <strong>land-based glaciers</strong> 
                          behind them to move <strong>faster towards the ocean</strong>. When these glaciers enter the sea, 
                          <strong className="text-red-700"> sea level ACTUALLY RISES!</strong>
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-700 mt-2">
                          <TrendingUp className="w-4 h-4 text-red-600" />
                          <span>
                            Just the <strong>Pine Island Glacier</strong> in West Antarctica contributes <strong>1mm/year</strong> to sea level rise
                          </span>
                        </div>
                      </div>

                      <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <p className="text-sm text-yellow-900 mb-2">
                          <strong>🌍 Global consequences:</strong>
                        </p>
                        <ul className="space-y-1 text-sm text-gray-700">
                          <li className="flex items-start gap-2">
                            <span className="mt-1">•</span>
                            <span>Potential for <strong>3-5 meters</strong> sea level rise if West Antarctic Ice Sheet completely melts</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="mt-1">•</span>
                            <span>Threat to <strong>coastal cities</strong>: Varna, Burgas, New York, Shanghai, Venice</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="mt-1">•</span>
                            <span>Over <strong>200 million people</strong> live in areas threatened by sea level rise</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* What we can do */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-5 border-2 border-green-300">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Activity className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-green-900 mb-3">💚 NIK 421 Research in Action</h4>
                    <p className="text-gray-700 text-sm mb-3">
                      Our expedition collects critical data on ice shelf melting through:
                    </p>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="bg-white p-3 rounded-lg border border-green-200">
                        <div className="flex items-center gap-2 mb-1">
                          <Camera className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-green-900">Satellite imagery</span>
                        </div>
                        <p className="text-xs text-gray-600">Copernicus data on melting rates</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-green-200">
                        <div className="flex items-center gap-2 mb-1">
                          <ThermometerSun className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-green-900">Temperature profiles</span>
                        </div>
                        <p className="text-xs text-gray-600">Measuring ocean and atmospheric heat</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-green-200">
                        <div className="flex items-center gap-2 mb-1">
                          <Database className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-green-900">Bathymetric mapping</span>
                        </div>
                        <p className="text-xs text-gray-600">3D models of seafloor beneath shelves</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-green-200">
                        <div className="flex items-center gap-2 mb-1">
                          <Microscope className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-green-900">Chemical analysis</span>
                        </div>
                        <p className="text-xs text-gray-600">Samples of meltwater and salinity</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <Eye className="w-4 h-4 mr-2" />
                  View Real Satellite Images
                </Button>
                <Button variant="outline" className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50">
                  <Download className="w-4 h-4 mr-2" />
                  Download NIK 421 Report
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Main Content Tabs */}
      <div className="max-w-7xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white border border-gray-200">
            <TabsTrigger value="biome" className="flex items-center gap-2">
              <TreePine className="w-4 h-4" />
              Antarctic Biome
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <FlaskConical className="w-4 h-4" />
              Research Projects
            </TabsTrigger>
            <TabsTrigger value="data" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Scientific Data
            </TabsTrigger>
            <TabsTrigger value="findings" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Key Findings
            </TabsTrigger>
          </TabsList>

          {/* Antarctic Biome Tab */}
          <TabsContent value="biome" className="space-y-6">
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <Snowflake className="w-6 h-6 text-blue-600" />
                <h2 className="text-gray-900">Antarctic Ecosystem & Biodiversity</h2>
              </div>
              <p className="text-gray-600 mb-6">
                The Antarctic biome is one of Earth's most extreme yet fascinating ecosystems. Despite harsh conditions, 
                it supports a rich diversity of life uniquely adapted to survive in sub-zero temperatures and seasonal darkness.
              </p>

              {/* Species Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {biomeSpecies.map((species, idx) => (
                  <Card 
                    key={idx} 
                    className="overflow-hidden hover:shadow-lg transition-all cursor-pointer border-2 hover:border-blue-300"
                    onClick={() => setSelectedSpecies(species)}
                  >
                    <div className="h-48 relative overflow-hidden">
                      <ImageWithFallback 
                        src={species.image}
                        alt={species.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-white/90 p-2 rounded-full">
                        {getCategoryIcon(species.category)}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-gray-900 mb-1">{species.name}</h3>
                          <p className="text-xs text-gray-500 italic">{species.scientificName}</p>
                        </div>
                      </div>
                      
                      <Badge className={`text-xs mb-3 ${getStatusColor(species.status)}`}>
                        {species.status}
                      </Badge>
                      
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {species.description}
                      </p>
                      
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Activity className="w-4 h-4" />
                        <span>Population: {species.population}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Selected Species Details */}
              {selectedSpecies && (
                <div className="mt-6 p-6 bg-white rounded-lg border-2 border-blue-300 shadow-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-gray-900 mb-1">{selectedSpecies.name}</h3>
                      <p className="text-sm text-gray-500 italic">{selectedSpecies.scientificName}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setSelectedSpecies(null)}
                    >
                      ✕
                    </Button>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                      <p className="text-gray-600 mb-4">{selectedSpecies.description}</p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Activity className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-700">Population: {selectedSpecies.population}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-700">Conservation Status: {selectedSpecies.status}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-700">Habitat: Antarctic & Sub-Antarctic regions</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="rounded-lg overflow-hidden">
                      <ImageWithFallback 
                        src={selectedSpecies.image}
                        alt={selectedSpecies.name}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <Badge className="mt-3 bg-blue-500 text-white w-full justify-center">
                        <Download className="w-3 h-3 mr-1" />
                        View Research Images
                      </Badge>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Research Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="grid gap-6">
              {researchProjects.map((project) => (
                <Card key={project.id} className="p-6 hover:shadow-lg transition-all border-2">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${
                        project.category === 'oceanography' ? 'bg-blue-100' :
                        project.category === 'biology' ? 'bg-green-100' :
                        project.category === 'climatology' ? 'bg-cyan-100' :
                        'bg-orange-100'
                      }`}>
                        {project.category === 'oceanography' && <Waves className="w-6 h-6 text-blue-600" />}
                        {project.category === 'biology' && <Fish className="w-6 h-6 text-green-600" />}
                        {project.category === 'climatology' && <ThermometerSun className="w-6 h-6 text-cyan-600" />}
                        {project.category === 'geology' && <MapPin className="w-6 h-6 text-orange-600" />}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-gray-900">{project.title}</h3>
                          <Badge variant="outline" className="text-xs capitalize">
                            {project.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500 mb-3">Principal Investigator: {project.lead}</p>
                        <p className="text-gray-600 mb-4">{project.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <Badge className={`${getProjectStatusColor(project.status)} text-white capitalize`}>
                        {project.status}
                      </Badge>
                      <span className="text-xs text-gray-500">{project.id}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">Research Progress</span>
                      <span className="text-gray-900">{project.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Data Points */}
                  <div className="flex items-center gap-6 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Database className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">{project.dataPoints.toLocaleString()} data points collected</span>
                    </div>
                  </div>

                  {/* Findings */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Key Findings
                    </h4>
                    <ul className="space-y-1">
                      {project.findings.map((finding, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-blue-500 mt-1">•</span>
                          <span>{finding}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Scientific Data Tab */}
          <TabsContent value="data" className="space-y-6">
            {/* Temperature & Salinity Chart */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <ThermometerSun className="w-6 h-6 text-orange-600" />
                <div>
                  <h3 className="text-gray-900">Ocean Temperature & Salinity Profile</h3>
                  <p className="text-sm text-gray-600">Route from Black Sea to Antarctica</p>
                </div>
              </div>
              
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={temperatureData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="location" angle={-45} textAnchor="end" height={80} />
                  <YAxis yAxisId="left" label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }} />
                  <YAxis yAxisId="right" orientation="right" label={{ value: 'Salinity (PSU)', angle: 90, position: 'insideRight' }} />
                  <Tooltip />
                  <Legend />
                  <Area yAxisId="left" type="monotone" dataKey="temp" stroke="#f97316" fill="#fed7aa" name="Temperature (°C)" />
                  <Line yAxisId="right" type="monotone" dataKey="salinity" stroke="#3b82f6" name="Salinity (PSU)" />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            {/* Wildlife Population Trends */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Fish className="w-6 h-6 text-green-600" />
                <div>
                  <h3 className="text-gray-900">Antarctic Wildlife Population Trends</h3>
                  <p className="text-sm text-gray-600">Population estimates in thousands (2015-2025)</p>
                </div>
              </div>
              
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={wildlifeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis label={{ value: 'Population (thousands)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="emperorPenguin" stroke="#8b5cf6" strokeWidth={2} name="Emperor Penguin" />
                  <Line type="monotone" dataKey="adeliePenguin" stroke="#3b82f6" strokeWidth={2} name="Adélie Penguin" />
                  <Line type="monotone" dataKey="weddellSeal" stroke="#10b981" strokeWidth={2} name="Weddell Seal" />
                  <Line type="monotone" dataKey="minkeWhale" stroke="#f59e0b" strokeWidth={2} name="Minke Whale" />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Sea Ice Coverage */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Snowflake className="w-6 h-6 text-cyan-600" />
                <div>
                  <h3 className="text-gray-900">Antarctic Sea Ice Coverage (2025)</h3>
                  <p className="text-sm text-gray-600">Million square kilometers by month</p>
                </div>
              </div>
              
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={iceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis label={{ value: 'Area (Million km²)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="coverage" fill="#06b6d4" name="Ice Coverage" />
                  <Bar dataKey="extent" fill="#0284c7" name="Ice Extent" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          {/* Key Findings Tab */}
          <TabsContent value="findings" className="space-y-6">
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-6 h-6 text-blue-600" />
                <h2 className="text-gray-900">NIK 421 Expedition - Key Scientific Findings</h2>
              </div>

              <div className="space-y-6">
                {/* Oceanographic Findings */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Waves className="w-5 h-5 text-blue-600" />
                    <h3 className="text-gray-900">Oceanographic Discoveries</h3>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <ul className="space-y-2">
                      <li className="flex items-start gap-3">
                        <span className="text-blue-500 mt-1">▸</span>
                        <span className="text-gray-700">
                          <strong>Temperature Gradient:</strong> Documented 29.5°C temperature drop from Indian Ocean (28°C) to Antarctic waters (-1.5°C) over 35° of latitude
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-blue-500 mt-1">▸</span>
                        <span className="text-gray-700">
                          <strong>Salinity Anomaly:</strong> Detected unusual high-salinity pocket (42 PSU) in Suez Canal region due to evaporation rates
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-blue-500 mt-1">▸</span>
                        <span className="text-gray-700">
                          <strong>New Underwater Ridge:</strong> Discovered previously unmapped ridge at 62°S, potential site for unique ecosystems
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Biological Findings */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Fish className="w-5 h-5 text-green-600" />
                    <h3 className="text-gray-900">Marine Biology Insights</h3>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <ul className="space-y-2">
                      <li className="flex items-start gap-3">
                        <span className="text-green-500 mt-1">▸</span>
                        <span className="text-gray-700">
                          <strong>Biodiversity Hotspot:</strong> Tropical Indian Ocean showed highest species diversity with 156 documented species in single sampling event
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-500 mt-1">▸</span>
                        <span className="text-gray-700">
                          <strong>Antarctic Krill Decline:</strong> Observed 3% population decrease compared to 2023 baseline, linked to warming waters
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-500 mt-1">▸</span>
                        <span className="text-gray-700">
                          <strong>New Species Candidates:</strong> 12 potential new species identified, including 3 deep-sea fish and 9 invertebrates
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Climate Findings */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <ThermometerSun className="w-5 h-5 text-orange-600" />
                    <h3 className="text-gray-900">Climate Change Indicators</h3>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-orange-200">
                    <ul className="space-y-2">
                      <li className="flex items-start gap-3">
                        <span className="text-orange-500 mt-1">▸</span>
                        <span className="text-gray-700">
                          <strong>Sea Ice Reduction:</strong> 2025 minimum ice extent 8% below 10-year average, indicating continued warming trend
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-orange-500 mt-1">▸</span>
                        <span className="text-gray-700">
                          <strong>Ocean Acidification:</strong> pH levels in Southern Ocean measured at 8.05, down from 8.12 in pre-industrial era
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-orange-500 mt-1">▸</span>
                        <span className="text-gray-700">
                          <strong>Ice Shelf Stability:</strong> Satellite data shows accelerated calving events in Larsen C ice shelf region
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Publications */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="w-5 h-5 text-purple-600" />
                    <h3 className="text-gray-900">Research Publications</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="p-4 hover:shadow-md transition-all">
                      <Badge className="mb-2 bg-blue-500 text-white">Oceanography</Badge>
                      <p className="text-sm text-gray-900 mb-2">
                        "Temperature Stratification Patterns in Southern Ocean Transition Zone"
                      </p>
                      <p className="text-xs text-gray-500">Dr. Elena Kovač et al. • Marine Ecology Progress Series • 2025</p>
                      <Button variant="outline" size="sm" className="mt-3 w-full">
                        <Download className="w-3 h-3 mr-2" />
                        Download PDF
                      </Button>
                    </Card>

                    <Card className="p-4 hover:shadow-md transition-all">
                      <Badge className="mb-2 bg-green-500 text-white">Biology</Badge>
                      <p className="text-sm text-gray-900 mb-2">
                        "Novel Species Discoveries in Deep Antarctic Waters: A Preliminary Report"
                      </p>
                      <p className="text-xs text-gray-500">Dr. James Morrison et al. • Antarctic Science • In Review</p>
                      <Button variant="outline" size="sm" className="mt-3 w-full">
                        <Eye className="w-3 h-3 mr-2" />
                        View Preprint
                      </Button>
                    </Card>

                    <Card className="p-4 hover:shadow-md transition-all">
                      <Badge className="mb-2 bg-cyan-500 text-white">Climatology</Badge>
                      <p className="text-sm text-gray-900 mb-2">
                        "2025 Sea Ice Minimum: Trends and Climate Implications"
                      </p>
                      <p className="text-xs text-gray-500">Dr. Ingrid Olsen • Nature Climate Change • Submitted</p>
                      <Button variant="outline" size="sm" className="mt-3 w-full">
                        <Download className="w-3 h-3 mr-2" />
                        Download PDF
                      </Button>
                    </Card>

                    <Card className="p-4 hover:shadow-md transition-all">
                      <Badge className="mb-2 bg-orange-500 text-white">Geology</Badge>
                      <p className="text-sm text-gray-900 mb-2">
                        "High-Resolution Bathymetric Mapping of Southern Ocean Ridge Systems"
                      </p>
                      <p className="text-xs text-gray-500">Dr. Thomas Chen et al. • Geophysical Research Letters • 2025</p>
                      <Button variant="outline" size="sm" className="mt-3 w-full">
                        <Eye className="w-3 h-3 mr-2" />
                        View Online
                      </Button>
                    </Card>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}