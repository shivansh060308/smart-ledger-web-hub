import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit3, Check, X } from "lucide-react";

interface EditableCardProps {
  title: string;
  icon: React.ReactNode;
  value: string | number;
  extra?: React.ReactNode;
  onSave: (value: number) => void;
  isEditing?: boolean;
  onEditToggle?: (editing: boolean) => void;
  loading?: boolean;
}

export const EditableCard = ({ 
  title, 
  icon, 
  value, 
  extra, 
  onSave, 
  isEditing = false,
  onEditToggle,
  loading = false 
}: EditableCardProps) => {
  const [editValue, setEditValue] = useState('');
  const [localEditing, setLocalEditing] = useState(false);

  const editing = isEditing || localEditing;

  const handleEdit = () => {
    const currentValue = typeof value === 'string' ? 
      value.replace(/[₹,]/g, '') : 
      value.toString();
    setEditValue(currentValue);
    setLocalEditing(true);
    onEditToggle?.(true);
  };

  const handleSave = () => {
    const numValue = parseFloat(editValue);
    if (!isNaN(numValue)) {
      onSave(numValue);
    }
    setLocalEditing(false);
    onEditToggle?.(false);
  };

  const handleCancel = () => {
    setLocalEditing(false);
    onEditToggle?.(false);
    setEditValue('');
  };

  return (
    <Card className="flex-1 min-w-[180px] flex flex-col hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center gap-2 pb-2">
        <span className="bg-teal-100 text-teal-700 rounded-full p-2">{icon}</span>
        <CardTitle className="text-base font-medium flex-1">{title}</CardTitle>
        {!editing && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleEdit}
            className="h-8 w-8 p-0 text-gray-400 hover:text-teal-600"
          >
            <Edit3 className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between">
        {editing ? (
          <div className="space-y-2">
            <Input
              type="number"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              placeholder="Enter amount"
              className="text-lg font-bold"
              autoFocus
            />
            <div className="flex gap-2">
              <Button
                onClick={handleSave}
                size="sm"
                className="flex-1"
                disabled={loading}
              >
                <Check className="h-4 w-4 mr-1" />
                Save
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                size="sm"
                className="flex-1"
                disabled={loading}
              >
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="text-lg font-bold">{value}</div>
            {extra && <div className="mt-2 text-xs text-gray-500">{extra}</div>}
          </>
        )}
      </CardContent>
    </Card>
  );
};