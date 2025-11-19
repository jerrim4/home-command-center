import { Home, BarChart3 } from 'lucide-react';
import { useSmartHome } from '@/hooks/useSmartHome';
import { PowerDisplay } from '@/components/Dashboard/PowerDisplay';
import { DeviceCard } from '@/components/Dashboard/DeviceCard';
import { EnergyCharts } from '@/components/Dashboard/EnergyCharts';
import { CostSettings } from '@/components/Dashboard/CostSettings';

const Index = () => {
  const {
    devices,
    energyData,
    costSettings,
    toggleDevice,
    updateDeviceName,
    setDeviceSchedule,
    setDeviceTimer,
    updateCostSettings,
    getTotalPower,
    getTodayCost,
  } = useSmartHome();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
                <Home className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Smart Home</h1>
                <p className="text-sm text-muted-foreground">Energy Management Dashboard</p>
              </div>
            </div>
            <CostSettings settings={costSettings} onUpdate={updateCostSettings} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Power Display */}
        <PowerDisplay
          totalPower={getTotalPower()}
          todayCost={getTodayCost()}
          currency={costSettings.currency}
        />

        {/* Devices Grid */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Devices</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {devices.map((device) => (
              <DeviceCard
                key={device.id}
                device={device}
                currency={costSettings.currency}
                onToggle={toggleDevice}
                onNameChange={updateDeviceName}
                onSchedule={setDeviceSchedule}
                onTimer={setDeviceTimer}
              />
            ))}
          </div>
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
        <section className="mt-8 p-6 bg-secondary/50 rounded-lg border border-border">
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
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8 bg-card/50">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Smart Home Dashboard • Real-time Energy Monitoring & Control</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
