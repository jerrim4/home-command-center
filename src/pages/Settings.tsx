import { Settings as SettingsIcon, Wifi, Bell, Shield } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Settings = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <SettingsIcon className="h-6 w-6 text-primary" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground">Configure your smart home</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Wifi className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">ESP32 Configuration</h3>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>ESP32 IP Address</Label>
              <Input defaultValue="192.168.4.1" placeholder="192.168.4.1" />
            </div>
            <div className="space-y-2">
              <Label>WebSocket Port</Label>
              <Input defaultValue="8080" placeholder="8080" type="number" />
            </div>
            <div className="flex items-center justify-between">
              <Label>Auto-reconnect</Label>
              <Switch defaultChecked />
            </div>
            <Button className="w-full">Test Connection</Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>High Power Usage Alerts</Label>
                <p className="text-sm text-muted-foreground">Notify when exceeds 2000W</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Schedule Reminders</Label>
                <p className="text-sm text-muted-foreground">Notify before scheduled events</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Device Offline Alerts</Label>
                <p className="text-sm text-muted-foreground">Notify when device disconnects</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Daily Reports</Label>
                <p className="text-sm text-muted-foreground">Email daily energy summary</p>
              </div>
              <Switch />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Security</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Require PIN for Control</Label>
                <p className="text-sm text-muted-foreground">PIN needed to toggle devices</p>
              </div>
              <Switch />
            </div>
            <div className="space-y-2">
              <Label>API Key</Label>
              <Input type="password" defaultValue="••••••••••••••••" />
            </div>
            <Button variant="outline" className="w-full">Generate New API Key</Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <SettingsIcon className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">General</h3>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Currency Symbol</Label>
              <Input defaultValue="₹" placeholder="₹" />
            </div>
            <div className="space-y-2">
              <Label>Price per kWh</Label>
              <Input defaultValue="8.5" placeholder="8.5" type="number" step="0.01" />
            </div>
            <div className="space-y-2">
              <Label>Time Zone</Label>
              <Input defaultValue="Asia/Kolkata" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>24-hour Format</Label>
                <p className="text-sm text-muted-foreground">Use 24-hour time display</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Data Management</h3>
        <div className="flex gap-3">
          <Button variant="outline">Export Data (CSV)</Button>
          <Button variant="outline">Clear History</Button>
          <Button variant="destructive">Reset All Settings</Button>
        </div>
      </Card>
    </div>
  );
};

export default Settings;
