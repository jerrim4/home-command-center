import { Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface PowerDisplayProps {
  totalPower: number;
  todayCost: number;
  currency: string;
}

export const PowerDisplay = ({ totalPower, todayCost, currency }: PowerDisplayProps) => {
  return (
    <Card className="p-6 bg-gradient-to-br from-card to-secondary border-primary/20 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse-glow" />
            <div className="relative bg-primary/10 p-4 rounded-full border border-primary/30">
              <Zap className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Power Now</p>
            <h2 className="text-4xl font-bold text-foreground">
              {totalPower.toLocaleString()}{' '}
              <span className="text-2xl text-primary">W</span>
            </h2>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Today's Cost</p>
          <h3 className="text-3xl font-bold text-accent">
            {currency}{todayCost.toFixed(2)}
          </h3>
        </div>
      </div>
    </Card>
  );
};
