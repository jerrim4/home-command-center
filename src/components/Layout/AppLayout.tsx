import { ReactNode } from 'react';
import { Home, BarChart3, Sparkles, TrendingUp, Settings as SettingsIcon } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLocation, useNavigate } from 'react-router-dom';
import { CostSettings } from '@/components/Dashboard/CostSettings';
import { CostSettings as CostSettingsType } from '@/types/smarthome';

interface AppLayoutProps {
  children: ReactNode;
  costSettings: CostSettingsType;
  onCostUpdate: (settings: CostSettingsType) => void;
}

export const AppLayout = ({ children, costSettings, onCostUpdate }: AppLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const tabs = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/analytics', label: 'Analytics', icon: TrendingUp },
    { path: '/automation', label: 'Automation', icon: Sparkles },
    { path: '/settings', label: 'Settings', icon: SettingsIcon },
  ];

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
            <CostSettings settings={costSettings} onUpdate={onCostUpdate} />
          </div>

          {/* Navigation Tabs */}
          <div className="mt-4">
            <Tabs value={currentPath} onValueChange={navigate} className="w-full">
              <TabsList className="w-full max-w-2xl">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.path}
                    value={tab.path}
                    className="flex-1 gap-2"
                  >
                    <tab.icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
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
