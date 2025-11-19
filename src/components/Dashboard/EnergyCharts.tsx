import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { EnergyData } from '@/types/smarthome';

interface EnergyChartsProps {
  energyData: EnergyData[];
}

export const EnergyCharts = ({ energyData }: EnergyChartsProps) => {
  // Process real-time data (last 60 minutes)
  const realtimeData = energyData
    .slice(-60)
    .reduce((acc: any[], curr, idx) => {
      if (idx % 5 === 0) {
        // Group every 5 data points (1 minute)
        const time = new Date(curr.timestamp).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });
        const existing = acc.find((d) => d.time === time);
        if (existing) {
          existing.power += curr.power;
        } else {
          acc.push({ time, power: curr.power });
        }
      }
      return acc;
    }, []);

  // Process daily data (last 24 hours)
  const dailyData = Array.from({ length: 24 }, (_, hour) => {
    const hourData = energyData.filter((d) => {
      const dataHour = new Date(d.timestamp).getHours();
      return dataHour === hour;
    });
    const avgPower = hourData.reduce((sum, d) => sum + d.power, 0) / (hourData.length || 1);
    return {
      hour: `${hour}:00`,
      power: Math.round(avgPower),
    };
  });

  // Mock weekly data
  const weeklyData = [
    { day: 'Mon', energy: 12.5, cost: 106.25 },
    { day: 'Tue', energy: 11.8, cost: 100.3 },
    { day: 'Wed', energy: 13.2, cost: 112.2 },
    { day: 'Thu', energy: 10.5, cost: 89.25 },
    { day: 'Fri', energy: 14.1, cost: 119.85 },
    { day: 'Sat', energy: 15.6, cost: 132.6 },
    { day: 'Sun', energy: 16.2, cost: 137.7 },
  ];

  return (
    <Card className="p-6 bg-card border-border">
      <Tabs defaultValue="realtime" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="realtime">Real-time</TabsTrigger>
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>

        <TabsContent value="realtime" className="mt-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Last 60 Minutes</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={realtimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="power"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
                name="Power (W)"
              />
            </LineChart>
          </ResponsiveContainer>
        </TabsContent>

        <TabsContent value="daily" className="mt-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Last 24 Hours</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="power" fill="hsl(var(--chart-1))" name="Power (W)" />
            </BarChart>
          </ResponsiveContainer>
        </TabsContent>

        <TabsContent value="weekly" className="mt-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">This Week</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
              <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" />
              <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="energy" fill="hsl(var(--chart-1))" name="Energy (kWh)" />
              <Bar yAxisId="right" dataKey="cost" fill="hsl(var(--chart-2))" name="Cost (₹)" />
            </BarChart>
          </ResponsiveContainer>
        </TabsContent>

        <TabsContent value="monthly" className="mt-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Monthly Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="p-4 bg-secondary rounded-lg border border-border">
              <p className="text-sm text-muted-foreground">This Month</p>
              <p className="text-2xl font-bold text-chart-1">387.5 kWh</p>
              <p className="text-lg text-chart-2">₹3,293.75</p>
            </div>
            <div className="p-4 bg-secondary rounded-lg border border-border">
              <p className="text-sm text-muted-foreground">Last Month</p>
              <p className="text-2xl font-bold text-chart-1">412.3 kWh</p>
              <p className="text-lg text-chart-2">₹3,504.55</p>
            </div>
            <div className="p-4 bg-secondary rounded-lg border border-border">
              <p className="text-sm text-muted-foreground">Projected</p>
              <p className="text-2xl font-bold text-chart-1">425.8 kWh</p>
              <p className="text-lg text-chart-2">₹3,619.30</p>
            </div>
            <div className="p-4 bg-secondary rounded-lg border border-border">
              <p className="text-sm text-muted-foreground">Avg. Daily</p>
              <p className="text-2xl font-bold text-chart-1">12.9 kWh</p>
              <p className="text-lg text-chart-2">₹109.65</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};
