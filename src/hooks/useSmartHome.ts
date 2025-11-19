import { useState, useEffect, useCallback } from 'react';
import { Device, EnergyData, CostSettings, DailySummary } from '@/types/smarthome';
import { storage } from '@/lib/storage';
import { esp32Api } from '@/lib/esp32';
import { toast } from '@/hooks/use-toast';

const VOLTAGE = 220; // Standard voltage

export const useSmartHome = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [energyData, setEnergyData] = useState<EnergyData[]>([]);
  const [costSettings, setCostSettings] = useState<CostSettings>({ pricePerKwh: 8.5, currency: '₹' });
  const [dailySummary, setDailySummary] = useState<DailySummary[]>([]);

  // Load data from localStorage
  useEffect(() => {
    setDevices(storage.getDevices());
    setEnergyData(storage.getEnergyData());
    setCostSettings(storage.getCostSettings());
    setDailySummary(storage.getDailySummary());
  }, []);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setDevices((prev) => {
        const updated = prev.map((device) => {
          if (device.isOn) {
            // Simulate power fluctuation ±10%
            const basePower = getBasePower(device.name);
            const fluctuation = basePower * 0.1 * (Math.random() * 2 - 1);
            const newPower = Math.max(0, basePower + fluctuation);
            const newAmp = newPower / VOLTAGE;

            // Update today's usage (add Wh for 5 seconds interval)
            const usageIncrement = (newPower * 5) / 3600; // Convert to Wh
            const newTodayUsage = device.todayUsage + usageIncrement;
            const newTodayCost = (newTodayUsage / 1000) * costSettings.pricePerKwh;

            return {
              ...device,
              currentPower: Math.round(newPower),
              currentAmp: parseFloat(newAmp.toFixed(2)),
              todayUsage: newTodayUsage,
              todayCost: newTodayCost,
            };
          }
          return { ...device, currentPower: 0, currentAmp: 0 };
        });

        storage.saveDevices(updated);
        return updated;
      });

      // Add energy data point
      setEnergyData((prev) => {
        const newData = devices.map((device) => ({
          timestamp: Date.now(),
          power: device.currentPower,
          device: device.id,
        }));

        const combined = [...prev, ...newData].slice(-720); // Keep last 1 hour (60 min * 12 points/min)
        storage.saveEnergyData(combined);
        return combined;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [devices, costSettings.pricePerKwh]);

  // Check timers and schedules
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const currentTime = new Date().toTimeString().slice(0, 5);

      setDevices((prev) =>
        prev.map((device) => {
          let newDevice = { ...device };

          // Check timer
          if (device.timer?.enabled && now >= device.timer.endTime) {
            newDevice.isOn = device.timer.action === 'on';
            newDevice.timer = undefined;
            toast({
              title: `Timer completed: ${device.name}`,
              description: `Device turned ${device.timer.action}`,
            });
          }

          // Check schedule
          if (device.schedule?.enabled && device.schedule.time === currentTime) {
            newDevice.isOn = device.schedule.action === 'on';
            toast({
              title: `Schedule executed: ${device.name}`,
              description: `Device turned ${device.schedule.action}`,
            });
          }

          return newDevice;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const toggleDevice = useCallback(async (deviceId: number) => {
    setDevices((prev) =>
      prev.map((device) => {
        if (device.id === deviceId) {
          const newState = !device.isOn;
          // Call ESP32 API (will fail gracefully in demo)
          esp32Api.toggleRelay(deviceId, newState);
          return { ...device, isOn: newState };
        }
        return device;
      })
    );
  }, []);

  const updateDeviceName = useCallback((deviceId: number, newName: string) => {
    setDevices((prev) => {
      const updated = prev.map((device) =>
        device.id === deviceId ? { ...device, name: newName } : device
      );
      storage.saveDevices(updated);
      return updated;
    });
  }, []);

  const setDeviceSchedule = useCallback((deviceId: number, time: string, action: 'on' | 'off') => {
    setDevices((prev) => {
      const updated = prev.map((device) =>
        device.id === deviceId
          ? { ...device, schedule: { enabled: true, time, action } }
          : device
      );
      storage.saveDevices(updated);
      return updated;
    });
  }, []);

  const setDeviceTimer = useCallback((deviceId: number, minutes: number, action: 'on' | 'off') => {
    setDevices((prev) => {
      const updated = prev.map((device) =>
        device.id === deviceId
          ? {
              ...device,
              timer: {
                enabled: true,
                endTime: Date.now() + minutes * 60 * 1000,
                action,
              },
            }
          : device
      );
      storage.saveDevices(updated);
      return updated;
    });
  }, []);

  const updateCostSettings = useCallback((settings: CostSettings) => {
    setCostSettings(settings);
    storage.saveCostSettings(settings);
  }, []);

  const getTotalPower = useCallback(() => {
    return devices.reduce((sum, device) => sum + device.currentPower, 0);
  }, [devices]);

  const getTodayCost = useCallback(() => {
    return devices.reduce((sum, device) => sum + device.todayCost, 0);
  }, [devices]);

  return {
    devices,
    energyData,
    costSettings,
    dailySummary,
    toggleDevice,
    updateDeviceName,
    setDeviceSchedule,
    setDeviceTimer,
    updateCostSettings,
    getTotalPower,
    getTodayCost,
  };
};

function getBasePower(deviceName: string): number {
  const lowerName = deviceName.toLowerCase();
  if (lowerName.includes('light')) return 60;
  if (lowerName.includes('ac') || lowerName.includes('conditioner')) return 1500;
  if (lowerName.includes('heater')) return 2000;
  if (lowerName.includes('fridge') || lowerName.includes('refrigerator')) return 150;
  return 100;
}
