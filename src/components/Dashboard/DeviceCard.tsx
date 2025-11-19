import { useState } from 'react';
import { Power, Edit2, Clock, Calendar, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Device } from '@/types/smarthome';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

interface DeviceCardProps {
  device: Device;
  currency: string;
  onToggle: (id: number) => void;
  onNameChange: (id: number, name: string) => void;
  onSchedule: (id: number, time: string, action: 'on' | 'off') => void;
  onTimer: (id: number, minutes: number, action: 'on' | 'off') => void;
  onRemove: (id: number) => void;
}

export const DeviceCard = ({
  device,
  currency,
  onToggle,
  onNameChange,
  onSchedule,
  onTimer,
  onRemove,
}: DeviceCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(device.name);
  const [scheduleTime, setScheduleTime] = useState('');
  const [timerMinutes, setTimerMinutes] = useState('');

  const handleNameSave = () => {
    if (editName.trim()) {
      onNameChange(device.id, editName);
      setIsEditing(false);
    }
  };

  return (
    <Card className="p-6 bg-card hover:bg-secondary/50 transition-all duration-300 border-border hover:border-primary/30 hover:shadow-xl animate-slide-up">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          {isEditing ? (
            <div className="flex gap-2">
              <Input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onBlur={handleNameSave}
                onKeyDown={(e) => e.key === 'Enter' && handleNameSave()}
                className="text-lg font-semibold"
                autoFocus
              />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-foreground">{device.name}</h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => setIsEditing(true)}
              >
                <Edit2 className="h-3 w-3" />
              </Button>
            </div>
        )}
      </div>

      <Button
        variant="ghost"
        size="sm"
        className="w-full mt-2 text-destructive hover:text-destructive hover:bg-destructive/10"
        onClick={() => onRemove(device.id)}
      >
        <Trash2 className="h-4 w-4 mr-2" />
        Remove Device
      </Button>
        <Switch
          checked={device.isOn}
          onCheckedChange={() => onToggle(device.id)}
          className="data-[state=checked]:bg-primary"
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Power Now</span>
          <span className="text-xl font-bold text-primary">
            {device.currentPower} W
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Current</span>
          <span className="text-lg font-semibold text-foreground">
            {device.currentAmp} A
          </span>
        </div>

        <div className="border-t border-border pt-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Today's Usage</span>
            <span className="text-lg font-semibold text-foreground">
              {(device.todayUsage / 1000).toFixed(2)} kWh
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Today's Cost</span>
            <span className="text-xl font-bold text-accent">
              {currency}{device.todayCost.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1">
                <Calendar className="h-4 w-4 mr-1" />
                Schedule
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Set Schedule for {device.name}</DialogTitle>
                <DialogDescription>
                  Turn device on or off at a specific time daily
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Time</Label>
                  <Input
                    type="time"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      onSchedule(device.id, scheduleTime, 'on');
                      setScheduleTime('');
                    }}
                    className="flex-1"
                  >
                    Turn ON
                  </Button>
                  <Button
                    onClick={() => {
                      onSchedule(device.id, scheduleTime, 'off');
                      setScheduleTime('');
                    }}
                    variant="secondary"
                    className="flex-1"
                  >
                    Turn OFF
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1">
                <Clock className="h-4 w-4 mr-1" />
                Timer
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Set Timer for {device.name}</DialogTitle>
                <DialogDescription>
                  Turn device on or off after specified minutes
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Minutes</Label>
                  <Input
                    type="number"
                    placeholder="60"
                    value={timerMinutes}
                    onChange={(e) => setTimerMinutes(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      onTimer(device.id, parseInt(timerMinutes), 'on');
                      setTimerMinutes('');
                    }}
                    className="flex-1"
                  >
                    Turn ON
                  </Button>
                  <Button
                    onClick={() => {
                      onTimer(device.id, parseInt(timerMinutes), 'off');
                      setTimerMinutes('');
                    }}
                    variant="secondary"
                    className="flex-1"
                  >
                    Turn OFF
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {device.timer?.enabled && (
          <div className="mt-2 p-2 bg-primary/10 rounded-md text-xs text-primary border border-primary/20">
            Timer: Turn {device.timer.action} in{' '}
            {Math.round((device.timer.endTime - Date.now()) / 60000)} min
          </div>
        )}

        {device.schedule?.enabled && (
          <div className="mt-2 p-2 bg-accent/10 rounded-md text-xs text-accent border border-accent/20">
            Scheduled: Turn {device.schedule.action} at {device.schedule.time}
          </div>
        )}
      </div>

      {device.isOn && (
        <div className="absolute top-2 right-2">
          <div className="h-3 w-3 bg-success rounded-full animate-pulse-glow" />
        </div>
      )}
    </Card>
  );
};
