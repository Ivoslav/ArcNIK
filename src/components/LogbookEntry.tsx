import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Calendar, MapPin, Eye } from "lucide-react";

interface LogbookEntryProps {
  date: string;
  location: string;
  coordinates: string;
  weather: string;
  activities: string[];
  wildlifeSightings: Array<{
    species: string;
    count: number;
  }>;
  highlights: string;
  photos?: number;
  previewImage?: string;
}

export function LogbookEntry({
  date,
  location,
  coordinates,
  weather,
  activities,
  wildlifeSightings,
  highlights,
  photos = 0,
  previewImage,
}: LogbookEntryProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      {previewImage && (
        <div className="relative h-48">
          <ImageWithFallback
            src={previewImage}
            alt={location}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <h3 className="text-white">{location}</h3>
          </div>
        </div>
      )}
      
      <div className="p-6">
        {!previewImage && (
          <div className="mb-4">
            <h3 className="mb-1">{location}</h3>
          </div>
        )}
        
        <div className="flex items-center gap-3 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{coordinates}</span>
          </div>
          {photos > 0 && (
            <Badge variant="outline" className="bg-blue-50 ml-auto">
              📷 {photos} photos
            </Badge>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Weather</p>
            <p className="text-sm">{weather}</p>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-2">Activities</p>
            <div className="flex flex-wrap gap-2">
              {activities.map((activity, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {activity}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-2">Wildlife Sightings</p>
            <div className="space-y-1">
              {wildlifeSightings.map((sighting, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <Eye className="w-4 h-4 text-blue-600" />
                  <span>
                    {sighting.species} ({sighting.count})
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Highlights</p>
            <p className="text-sm italic text-gray-700">"{highlights}"</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
