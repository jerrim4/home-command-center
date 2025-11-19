import { TrendingUp, DollarSign, Zap, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <TrendingUp className="h-6 w-6 text-primary" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics & Reports</h1>
          <p className="text-sm text-muted-foreground">Detailed energy usage insights</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="h-5 w-5 text-primary" />
            <p className="text-sm text-muted-foreground">Total Energy</p>
          </div>
          <p className="text-3xl font-bold text-foreground">387.5 kWh</p>
          <p className="text-sm text-success mt-1">↓ 8% vs last month</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="h-5 w-5 text-accent" />
            <p className="text-sm text-muted-foreground">Total Cost</p>
          </div>
          <p className="text-3xl font-bold text-foreground">₹3,293</p>
          <p className="text-sm text-success mt-1">↓ 8% vs last month</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="h-5 w-5 text-chart-1" />
            <p className="text-sm text-muted-foreground">Peak Usage</p>
          </div>
          <p className="text-3xl font-bold text-foreground">2.8 kW</p>
          <p className="text-sm text-muted-foreground mt-1">at 8:30 PM</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="h-5 w-5 text-chart-2" />
            <p className="text-sm text-muted-foreground">Avg Daily</p>
          </div>
          <p className="text-3xl font-bold text-foreground">12.9 kWh</p>
          <p className="text-sm text-muted-foreground mt-1">₹109.65/day</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Device Breakdown</h3>
          <div className="space-y-3">
            {[
              { name: 'Air Conditioner', usage: 45, cost: 1481, color: 'bg-chart-1' },
              { name: 'Water Heater', usage: 25, cost: 823, color: 'bg-chart-2' },
              { name: 'Refrigerator', usage: 18, cost: 593, color: 'bg-chart-3' },
              { name: 'Others', usage: 12, cost: 395, color: 'bg-chart-4' },
            ].map((device) => (
              <div key={device.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-foreground">{device.name}</span>
                  <span className="text-sm font-semibold text-foreground">
                    {device.usage}% • ₹{device.cost}
                  </span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className={`${device.color} h-2 rounded-full transition-all`}
                    style={{ width: `${device.usage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Energy Saving Tips</h3>
          <div className="space-y-4">
            <div className="p-4 bg-success/10 rounded-lg border border-success/20">
              <h4 className="font-medium text-success mb-1">💡 Optimize AC Usage</h4>
              <p className="text-sm text-muted-foreground">
                Your AC consumes 45% of total energy. Set it to 24°C to save up to ₹400/month.
              </p>
            </div>
            
            <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
              <h4 className="font-medium text-primary mb-1">⏰ Schedule Water Heater</h4>
              <p className="text-sm text-muted-foreground">
                Turn off heater during peak hours (6-10 PM) to save ₹150/month.
              </p>
            </div>

            <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
              <h4 className="font-medium text-accent mb-1">🌙 Night Mode Active</h4>
              <p className="text-sm text-muted-foreground">
                Auto-off at 11 PM saved you ₹85 last month. Keep it enabled!
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
