import { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Info, Plus, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface GearItem {
  id: number;
  item: string;
  category: string;
  priority: "essential" | "recommended" | "optional";
  status: "not-started" | "in-progress" | "complete";
  tip?: string;
}

interface GearChecklistManagerProps {
  items: GearItem[];
  onItemsChange: (items: GearItem[]) => void;
}

export function GearChecklistManager({ items, onItemsChange }: GearChecklistManagerProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    item: "",
    category: "Equipment",
    priority: "recommended" as "essential" | "recommended" | "optional",
    tip: ""
  });

  const categories = ["Equipment", "Clothing", "Outerwear", "Footwear", "Accessories", "Personal Care", "Medical"];

  const cycleStatus = (id: number) => {
    onItemsChange(items.map(item => {
      if (item.id === id) {
        const statusCycle = {
          "not-started": "in-progress",
          "in-progress": "complete",
          "complete": "not-started"
        } as const;
        return { ...item, status: statusCycle[item.status] as "not-started" | "in-progress" | "complete" };
      }
      return item;
    }));
  };

  const deleteItem = (id: number) => {
    onItemsChange(items.filter(item => item.id !== id));
  };

  const addItem = () => {
    if (newItem.item.trim()) {
      const newId = Math.max(...items.map(i => i.id), 0) + 1;
      onItemsChange([...items, {
        id: newId,
        item: newItem.item,
        category: newItem.category,
        priority: newItem.priority,
        status: "not-started",
        tip: newItem.tip || undefined
      }]);
      
      setNewItem({
        item: "",
        category: "Equipment",
        priority: "recommended",
        tip: ""
      });
      setIsAddDialogOpen(false);
    }
  };

  const priorityColors = {
    essential: "bg-red-100 text-red-800 border-red-200",
    recommended: "bg-yellow-100 text-yellow-800 border-yellow-200",
    optional: "bg-gray-100 text-gray-800 border-gray-200",
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center mb-4">
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Gear Item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Gear Item</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="item-name">Item Name *</Label>
                <Input
                  id="item-name"
                  placeholder="e.g., Waterproof gloves"
                  value={newItem.item}
                  onChange={(e) => setNewItem({ ...newItem, item: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={newItem.category}
                  onValueChange={(value) => setNewItem({ ...newItem, category: value })}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority *</Label>
                <Select
                  value={newItem.priority}
                  onValueChange={(value: "essential" | "recommended" | "optional") => 
                    setNewItem({ ...newItem, priority: value })
                  }
                >
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="essential">Essential</SelectItem>
                    <SelectItem value="recommended">Recommended</SelectItem>
                    <SelectItem value="optional">Optional</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tip">Additional Tip (Optional)</Label>
                <Input
                  id="tip"
                  placeholder="e.g., Must be rated for -20°C"
                  value={newItem.tip}
                  onChange={(e) => setNewItem({ ...newItem, tip: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={addItem} disabled={!newItem.item.trim()}>
                Add Item
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-2">
        {items.map(item => {
          const statusStyles = {
            "not-started": { bg: "bg-gray-100", text: "text-gray-700", label: "Not Started" },
            "in-progress": { bg: "bg-yellow-100", text: "text-yellow-700", label: "In Progress" },
            "complete": { bg: "bg-green-100", text: "text-green-700", label: "Complete" }
          };
          const currentStatus = statusStyles[item.status];

          return (
            <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group">
              <Button
                variant="outline"
                size="sm"
                className={`${currentStatus.bg} ${currentStatus.text} border-0 min-w-[110px] mt-0.5`}
                onClick={() => cycleStatus(item.id)}
              >
                {currentStatus.label}
              </Button>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={item.status === "complete" ? "line-through text-gray-400" : ""}>{item.item}</span>
                  {item.tip && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs text-sm">{item.tip}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {item.category}
                  </Badge>
                  <Badge variant="outline" className={`text-xs ${priorityColors[item.priority]}`}>
                    {item.priority}
                  </Badge>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => deleteItem(item.id)}
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
