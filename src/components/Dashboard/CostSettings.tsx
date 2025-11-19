import { useState } from 'react';
import { Settings } from 'lucide-react';
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
import { CostSettings as CostSettingsType } from '@/types/smarthome';

interface CostSettingsProps {
  settings: CostSettingsType;
  onUpdate: (settings: CostSettingsType) => void;
}

export const CostSettings = ({ settings, onUpdate }: CostSettingsProps) => {
  const [price, setPrice] = useState(settings.pricePerKwh.toString());
  const [currency, setCurrency] = useState(settings.currency);

  const handleSave = () => {
    onUpdate({
      pricePerKwh: parseFloat(price),
      currency,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cost Settings</DialogTitle>
          <DialogDescription>
            Configure your electricity pricing for accurate cost calculations
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label>Price per kWh</Label>
            <Input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="8.5"
            />
          </div>
          <div className="space-y-2">
            <Label>Currency Symbol</Label>
            <Input
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              placeholder="₹"
              maxLength={3}
            />
          </div>
          <Button onClick={handleSave} className="w-full">
            Save Settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
