import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { MapPin, Camera, Save, X } from "lucide-react";
import { Badge } from "./ui/badge";

interface WildlifeSighting {
  id: number;
  species: string;
  type: string;
  count: number;
  location: string;
  notes: string;
  timestamp: string;
  image?: string;
}

interface WildlifeLogCardProps {
  onSave?: (sighting: Omit<WildlifeSighting, "id" | "timestamp">) => void;
}

export function WildlifeLogCard({ onSave }: WildlifeLogCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [species, setSpecies] = useState("");
  const [type, setType] = useState("");
  const [count, setCount] = useState("1");
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    if (species && type) {
      onSave?.({
        species,
        type,
        count: parseInt(count),
        location: "Current GPS Location",
        notes,
      });
      // Reset form
      setSpecies("");
      setType("");
      setCount("1");
      setNotes("");
      setIsOpen(false);
    }
  };

  if (!isOpen) {
    return (
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 hover:border-blue-300 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="mb-2">Wildlife Logging</h3>
            <p className="text-sm text-gray-600">
              Contribute to citizen science by logging your sightings
            </p>
          </div>
          <Badge className="bg-blue-600">Active</Badge>
        </div>
        <Button onClick={() => setIsOpen(true)} className="w-full">
          <Camera className="w-4 h-4 mr-2" />
          Log New Sighting
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-white border-2 border-blue-300">
      <div className="flex items-center justify-between mb-6">
        <h3>Log Wildlife Sighting</h3>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Wildlife Type</Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="penguin">Penguin</SelectItem>
              <SelectItem value="whale">Whale</SelectItem>
              <SelectItem value="seal">Seal</SelectItem>
              <SelectItem value="bird">Seabird</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Species</Label>
          <Select value={species} onValueChange={setSpecies}>
            <SelectTrigger>
              <SelectValue placeholder="Select species" />
            </SelectTrigger>
            <SelectContent>
              {type === "penguin" && (
                <>
                  <SelectItem value="emperor">Emperor Penguin</SelectItem>
                  <SelectItem value="adelie">Adélie Penguin</SelectItem>
                  <SelectItem value="gentoo">Gentoo Penguin</SelectItem>
                  <SelectItem value="chinstrap">Chinstrap Penguin</SelectItem>
                </>
              )}
              {type === "whale" && (
                <>
                  <SelectItem value="humpback">Humpback Whale</SelectItem>
                  <SelectItem value="minke">Minke Whale</SelectItem>
                  <SelectItem value="orca">Orca</SelectItem>
                  <SelectItem value="blue">Blue Whale</SelectItem>
                </>
              )}
              {type === "seal" && (
                <>
                  <SelectItem value="weddell">Weddell Seal</SelectItem>
                  <SelectItem value="crabeater">Crabeater Seal</SelectItem>
                  <SelectItem value="leopard">Leopard Seal</SelectItem>
                  <SelectItem value="elephant">Elephant Seal</SelectItem>
                </>
              )}
              {type === "bird" && (
                <>
                  <SelectItem value="albatross">Albatross</SelectItem>
                  <SelectItem value="petrel">Petrel</SelectItem>
                  <SelectItem value="skua">Skua</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Count</Label>
          <Input
            type="number"
            min="1"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
        </div>

        <div>
          <Label>GPS Location</Label>
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-md text-sm">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span>64.8°S, 63.5°W (Auto-captured)</span>
          </div>
        </div>

        <div>
          <Label>Notes (Optional)</Label>
          <Textarea
            placeholder="Behavior, activity, or other observations..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Button variant="outline" className="flex-1" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button className="flex-1" onClick={handleSave} disabled={!species || !type}>
            <Save className="w-4 h-4 mr-2" />
            Save Sighting
          </Button>
        </div>
      </div>
    </Card>
  );
}
