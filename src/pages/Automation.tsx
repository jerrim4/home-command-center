import { Sparkles, Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Automation = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Sparkles className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Automation & Scenes</h1>
            <p className="text-sm text-muted-foreground">Create smart rules and scenes</p>
          </div>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Rule
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Sample Automation Rules</h3>
          <div className="space-y-4">
            <div className="p-4 bg-secondary rounded-lg border border-border">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-foreground">Good Morning</h4>
                <span className="text-xs bg-success/20 text-success px-2 py-1 rounded">Active</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Turn on lights at 7:00 AM on weekdays
              </p>
            </div>
            
            <div className="p-4 bg-secondary rounded-lg border border-border">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-foreground">Energy Saver</h4>
                <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">Inactive</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Turn off AC when power exceeds 2000W
              </p>
            </div>

            <div className="p-4 bg-secondary rounded-lg border border-border">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-foreground">Night Mode</h4>
                <span className="text-xs bg-success/20 text-success px-2 py-1 rounded">Active</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Turn off all lights at 11:00 PM
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Scenes</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <span className="text-2xl">🌅</span>
              <span className="text-sm">Morning</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <span className="text-2xl">🏠</span>
              <span className="text-sm">Home</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <span className="text-2xl">🚪</span>
              <span className="text-sm">Away</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <span className="text-2xl">🌙</span>
              <span className="text-sm">Sleep</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <span className="text-2xl">🎬</span>
              <span className="text-sm">Movie</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <span className="text-2xl">💡</span>
              <span className="text-sm">All Off</span>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Automation;
