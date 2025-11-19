import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AddDeviceDialogProps {
  onAdd: (name: string, type: string) => void;
}

const deviceTypes = [
  { value: 'light', label: 'Light', basePower: 60 },
  { value: 'ac', label: 'Air Conditioner', basePower: 1500 },
  { value: 'heater', label: 'Water Heater', basePower: 2000 },
  { value: 'fridge', label: 'Refrigerator', basePower: 150 },
  { value: 'fan', label: 'Fan', basePower: 75 },
  { value: 'tv', label: 'Television', basePower: 120 },
  { value: 'washer', label: 'Washing Machine', basePower: 500 },
  { value: 'dryer', label: 'Dryer', basePower: 3000 },
  { value: 'microwave', label: 'Microwave', basePower: 1200 },
  { value: 'oven', label: 'Oven', basePower: 2400 },
  { value: 'dishwasher', label: 'Dishwasher', basePower: 1800 },
  { value: 'router', label: 'Router/Modem', basePower: 15 },
  { value: 'computer', label: 'Computer', basePower: 300 },
  { value: 'other', label: 'Other Device', basePower: 100 },
];

export const AddDeviceDialog = ({ onAdd }: AddDeviceDialogProps) => {
  const [open, setOpen] = useState(false);
  const [deviceName, setDeviceName] = useState('');
  const [deviceType, setDeviceType] = useState('');

  const handleAdd = () => {
    if (deviceName.trim() && deviceType) {
      onAdd(deviceName, deviceType);
      setDeviceName('');
      setDeviceType('');
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Device
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Device</DialogTitle>
          <DialogDescription>
            Add a new smart device to your dashboard
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label>Device Name</Label>
            <Input
              placeholder="e.g., Living Room Light"
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Device Type</Label>
            <Select value={deviceType} onValueChange={setDeviceType}>
              <SelectTrigger>
                <SelectValue placeholder="Select device type" />
              </SelectTrigger>
              <SelectContent>
                {deviceTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleAdd} className="w-full">
            Add Device
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { deviceTypes };
