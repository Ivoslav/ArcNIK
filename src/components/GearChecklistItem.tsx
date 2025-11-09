import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface GearChecklistItemProps {
  item: string;
  category: string;
  priority: "essential" | "recommended" | "optional";
  checked: boolean;
  tip?: string;
  onToggle: () => void;
}

export function GearChecklistItem({
  item,
  category,
  priority,
  checked,
  tip,
  onToggle,
}: GearChecklistItemProps) {
  const priorityColors = {
    essential: "bg-red-100 text-red-800 border-red-200",
    recommended: "bg-yellow-100 text-yellow-800 border-yellow-200",
    optional: "bg-gray-100 text-gray-800 border-gray-200",
  };

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
      <Checkbox checked={checked} onCheckedChange={onToggle} className="mt-1" />
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={checked ? "line-through text-gray-400" : ""}>{item}</span>
          {tip && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-sm">{tip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {category}
          </Badge>
          <Badge variant="outline" className={`text-xs ${priorityColors[priority]}`}>
            {priority}
          </Badge>
        </div>
      </div>
    </div>
  );
}
