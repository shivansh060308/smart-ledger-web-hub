import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit3, Check, X } from "lucide-react";

interface EditableOrdersCardProps {
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  onSave: (data: { total_orders: number; pending: number; completed: number }) => void;
  loading?: boolean;
}

export const EditableOrdersCard = ({ 
  totalOrders, 
  pendingOrders, 
  completedOrders, 
  onSave, 
  loading = false 
}: EditableOrdersCardProps) => {
  const [editing, setEditing] = useState(false);
  const [total, setTotal] = useState(totalOrders.toString());
  const [pending, setPending] = useState(pendingOrders.toString());
  const [completed, setCompleted] = useState(completedOrders.toString());

  const handleEdit = () => {
    setTotal(totalOrders.toString());
    setPending(pendingOrders.toString());
    setCompleted(completedOrders.toString());
    setEditing(true);
  };

  const handleSave = () => {
    const totalNum = parseInt(total) || 0;
    const pendingNum = parseInt(pending) || 0;
    const completedNum = parseInt(completed) || 0;
    
    onSave({
      total_orders: totalNum,
      pending: pendingNum,
      completed: completedNum
    });
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
    setTotal(totalOrders.toString());
    setPending(pendingOrders.toString());
    setCompleted(completedOrders.toString());
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Orders Overview</CardTitle>
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
      <CardContent>
        {editing ? (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="total">Total Orders</Label>
                <Input
                  id="total"
                  type="number"
                  value={total}
                  onChange={(e) => setTotal(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pending">Pending</Label>
                <Input
                  id="pending"
                  type="number"
                  value={pending}
                  onChange={(e) => setPending(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="completed">Completed</Label>
                <Input
                  id="completed"
                  type="number"
                  value={completed}
                  onChange={(e) => setCompleted(e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>
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
          <div className="flex gap-8 text-base">
            <div>
              <div className="font-semibold text-navy-700">{totalOrders}</div>
              <div className="text-xs text-gray-600">Total Orders</div>
            </div>
            <div>
              <div className="font-semibold text-orange-600">{pendingOrders}</div>
              <div className="text-xs text-gray-600">Pending</div>
            </div>
            <div>
              <div className="font-semibold text-green-600">{completedOrders}</div>
              <div className="text-xs text-gray-600">Completed</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};