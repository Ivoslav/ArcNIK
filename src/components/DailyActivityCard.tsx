import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Clock, MapPin, Users, Anchor } from "lucide-react";

interface DailyActivityCardProps {
  time: string;
  title: string;
  type: "landing" | "lecture" | "meal" | "zodiac" | "sailing";
  location?: string;
  guide?: string;
  capacity?: string;
  description?: string;
}

export function DailyActivityCard({
  time,
  title,
  type,
  location,
  guide,
  capacity,
  description,
}: DailyActivityCardProps) {
  const typeConfig = {
    landing: { color: "bg-green-100 text-green-800", icon: Anchor, label: "Shore Landing" },
    lecture: { color: "bg-blue-100 text-blue-800", icon: Users, label: "Lecture" },
    meal: { color: "bg-orange-100 text-orange-800", icon: Clock, label: "Meal" },
    zodiac: { color: "bg-purple-100 text-purple-800", icon: Anchor, label: "Zodiac Cruise" },
    sailing: { color: "bg-cyan-100 text-cyan-800", icon: Anchor, label: "Sailing" },
  };

  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        <div className="flex flex-col items-center pt-1">
          <div className={`${config.color} p-2 rounded-lg mb-2`}>
            <Icon className="w-5 h-5" />
          </div>
          <div className="text-sm text-center">{time}</div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-lg">{title}</h3>
            <Badge className={config.color} variant="outline">
              {config.label}
            </Badge>
          </div>

          {description && (
            <p className="text-sm text-gray-600 mb-3">{description}</p>
          )}

          <div className="flex flex-wrap gap-3 text-sm text-gray-600">
            {location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{location}</span>
              </div>
            )}
            {guide && (
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>Led by {guide}</span>
              </div>
            )}
            {capacity && (
              <div className="flex items-center gap-1">
                <span>Capacity: {capacity}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
