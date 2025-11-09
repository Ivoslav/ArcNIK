import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { MapPin, Info, Download, CheckCircle, Navigation, Clock } from "lucide-react";

interface LandingSiteCardProps {
  name: string;
  location: string;
  image: string;
  difficulty: "easy" | "moderate" | "challenging" | "extreme";
  highlights: string[];
  wildlife: string[];
  regulations: string[];
  status?: "completed" | "upcoming" | "current";
  onViewDetails?: () => void;
}

export function LandingSiteCard({
  name,
  location,
  image,
  difficulty,
  highlights,
  wildlife,
  regulations,
  status = "upcoming",
  onViewDetails,
}: LandingSiteCardProps) {
  const difficultyColors = {
    easy: "bg-green-100 text-green-800 border-green-200",
    moderate: "bg-yellow-100 text-yellow-800 border-yellow-200",
    challenging: "bg-red-100 text-red-800 border-red-200",
    extreme: "bg-purple-100 text-purple-800 border-purple-200",
  };

  const statusColors = {
    completed: "bg-green-600 text-white",
    current: "bg-blue-600 text-white animate-pulse",
    upcoming: "bg-gray-600 text-white",
  };

  const statusIcons = {
    completed: CheckCircle,
    current: Navigation,
    upcoming: Clock,
  };

  const StatusIcon = statusIcons[status];

  return (
    <Card className={`overflow-hidden hover:shadow-lg transition-shadow ${status === 'completed' ? 'opacity-80' : ''}`}>
      <div className="relative h-48">
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        <Badge className={`absolute top-3 left-3 ${statusColors[status]}`}>
          <StatusIcon className="w-3 h-3 mr-1" />
          {status === 'completed' ? 'Passed' : status === 'current' ? 'Current' : 'Upcoming'}
        </Badge>
        <Badge className={`absolute top-3 right-3 ${difficultyColors[difficulty]}`} variant="outline">
          {difficulty}
        </Badge>
      </div>

      <div className="p-5">
        <div className="mb-3">
          <h3 className="mb-1">{name}</h3>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div>
            <p className="text-sm mb-1">Highlights</p>
            <div className="flex flex-wrap gap-1">
              {highlights.map((highlight, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {highlight}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm mb-1">Wildlife</p>
            <div className="flex flex-wrap gap-1">
              {wildlife.map((animal, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {animal}
                </Badge>
              ))}
            </div>
          </div>

          <div className={`${status === 'completed' ? 'bg-green-50 border-green-200' : status === 'current' ? 'bg-blue-50 border-blue-200' : 'bg-orange-50 border-orange-200'} border rounded-md p-3`}>
            <p className="text-xs mb-1">
              {status === 'completed' ? '✓ Port Information' : status === 'current' ? '⏩ Next Stop Details' : '📋 Port Information'}
            </p>
            <ul className="text-xs text-gray-700 space-y-1">
              {regulations.slice(0, 2).map((reg, index) => (
                <li key={index}>• {reg}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Offline Guide
          </Button>
          <Button className="flex-1" size="sm" onClick={onViewDetails}>
            <Info className="w-4 h-4 mr-2" />
            Full Details
          </Button>
        </div>
      </div>
    </Card>
  );
}
