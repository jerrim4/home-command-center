export interface Device {
  id: number;
  name: string;
  isOn: boolean;
  currentPower: number; // Watts
  currentAmp: number; // Amperes
  todayUsage: number; // Wh
  todayCost: number;
  schedule?: {
    enabled: boolean;
    time: string;
    action: 'on' | 'off';
  };
  timer?: {
    enabled: boolean;
    endTime: number;
    action: 'on' | 'off';
  };
}

export interface EnergyData {
  timestamp: number;
  power: number;
  device: number;
}

export interface CostSettings {
  pricePerKwh: number;
  currency: string;
}

export interface DailySummary {
  date: string;
  energy: number;
  cost: number;
}
