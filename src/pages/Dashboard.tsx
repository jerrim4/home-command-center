import { BarChart3 } from 'lucide-react';
import { PowerDisplay } from '@/components/Dashboard/PowerDisplay';
import { DeviceCard } from '@/components/Dashboard/DeviceCard';
import { EnergyCharts } from '@/components/Dashboard/EnergyCharts';
import { AddDeviceDialog } from '@/components/Dashboard/AddDeviceDialog';

interface DashboardProps {
  devices: any[];
  energyData: any[];
  costSettings: any;
  getTotalPower: () => number;
  getTodayCost: () => number;
  toggleDevice: (id: number) => void;
  updateDeviceName: (id: number, name: string) => void;
  setDeviceSchedule: (id: number, time: string, action: 'on' | 'off') => void;
  setDeviceTimer: (id: number, minutes: number, action: 'on' | 'off') => void;
  addDevice: (name: string, type: string) => void;
  removeDevice: (id: number) => void;
}

const Dashboard = ({
  devices,
  energyData,
  costSettings,
  getTotalPower,
  getTodayCost,
  toggleDevice,
  updateDeviceName,
  setDeviceSchedule,
  setDeviceTimer,
  addDevice,
  removeDevice,
}: DashboardProps) => {
  return (
    <div className="space-y-8">
      {/* Power Display */}
      <PowerDisplay
        totalPower={getTotalPower()}
        todayCost={getTodayCost()}
        currency={costSettings.currency}
      />

      {/* Devices Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">
              Devices ({devices.length})
            </h2>
          </div>
          <AddDeviceDialog onAdd={addDevice} />
        </div>
        
        {devices.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-lg border border-border">
            <p className="text-muted-foreground mb-4">No devices added yet</p>
            <AddDeviceDialog onAdd={addDevice} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {devices.map((device) => (
              <DeviceCard
                key={device.id}
                device={device}
                currency={costSettings.currency}
                onToggle={toggleDevice}
                onNameChange={updateDeviceName}
                onSchedule={setDeviceSchedule}
                onTimer={setDeviceTimer}
                onRemove={removeDevice}
              />
            ))}
          </div>
        )}
      </section>

      {/* Energy Charts */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Energy Analytics</h2>
        </div>
        <EnergyCharts energyData={energyData} />
      </section>

      {/* ESP32 Integration Info */}
      <section className="p-6 bg-secondary/50 rounded-lg border border-border">
        <h3 className="text-lg font-semibold mb-4 text-foreground">ESP32 Integration</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            <strong className="text-foreground">Base URL:</strong> http://192.168.4.1
          </p>
          <p>
            <strong className="text-foreground">Toggle Relay:</strong> GET /relay?[1-4]=[on|off]
          </p>
          <p>
            <strong className="text-foreground">Get Sensor:</strong> GET /sensor/[1-4]
          </p>
          <p className="text-xs mt-4 text-muted-foreground">
            Update the ESP32_BASE_URL in src/lib/esp32.ts to match your device's IP address.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
