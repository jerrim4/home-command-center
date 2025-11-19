import { Device, CostSettings, DailySummary, EnergyData } from '@/types/smarthome';

const getStorageKeys = (username: string) => ({
  DEVICES: `smarthome_devices_${username}`,
  COST_SETTINGS: `smarthome_cost_settings_${username}`,
  DAILY_SUMMARY: `smarthome_daily_summary_${username}`,
  ENERGY_DATA: `smarthome_energy_data_${username}`,
});

const getCurrentUser = (): string | null => {
  const session = localStorage.getItem('smarthome_session');
  if (session) {
    const user = JSON.parse(session);
    return user.username;
  }
  return null;
};

export const storage = {
  getDevices: (): Device[] => {
    const username = getCurrentUser();
    if (!username) return [];
    const STORAGE_KEYS = getStorageKeys(username);
    const data = localStorage.getItem(STORAGE_KEYS.DEVICES);
    return data ? JSON.parse(data) : getDefaultDevices();
  },

  saveDevices: (devices: Device[]) => {
    const username = getCurrentUser();
    if (!username) return;
    const STORAGE_KEYS = getStorageKeys(username);
    localStorage.setItem(STORAGE_KEYS.DEVICES, JSON.stringify(devices));
  },

  getCostSettings: (): CostSettings => {
    const username = getCurrentUser();
    if (!username) return { pricePerKwh: 8.5, currency: '₹' };
    const STORAGE_KEYS = getStorageKeys(username);
    const data = localStorage.getItem(STORAGE_KEYS.COST_SETTINGS);
    return data ? JSON.parse(data) : { pricePerKwh: 8.5, currency: '₹' };
  },

  saveCostSettings: (settings: CostSettings) => {
    const username = getCurrentUser();
    if (!username) return;
    const STORAGE_KEYS = getStorageKeys(username);
    localStorage.setItem(STORAGE_KEYS.COST_SETTINGS, JSON.stringify(settings));
  },

  getDailySummary: (): DailySummary[] => {
    const username = getCurrentUser();
    if (!username) return [];
    const STORAGE_KEYS = getStorageKeys(username);
    const data = localStorage.getItem(STORAGE_KEYS.DAILY_SUMMARY);
    return data ? JSON.parse(data) : [];
  },

  saveDailySummary: (summary: DailySummary[]) => {
    const username = getCurrentUser();
    if (!username) return;
    const STORAGE_KEYS = getStorageKeys(username);
    localStorage.setItem(STORAGE_KEYS.DAILY_SUMMARY, JSON.stringify(summary));
  },

  getEnergyData: (): EnergyData[] => {
    const username = getCurrentUser();
    if (!username) return [];
    const STORAGE_KEYS = getStorageKeys(username);
    const data = localStorage.getItem(STORAGE_KEYS.ENERGY_DATA);
    return data ? JSON.parse(data) : [];
  },

  saveEnergyData: (data: EnergyData[]) => {
    const username = getCurrentUser();
    if (!username) return;
    const STORAGE_KEYS = getStorageKeys(username);
    localStorage.setItem(STORAGE_KEYS.ENERGY_DATA, JSON.stringify(data));
  },
};

function getDefaultDevices(): Device[] {
  return [
    {
      id: 1,
      name: 'Living Room Light',
      isOn: false,
      currentPower: 0,
      currentAmp: 0,
      todayUsage: 0,
      todayCost: 0,
    },
    {
      id: 2,
      name: 'Air Conditioner',
      isOn: false,
      currentPower: 0,
      currentAmp: 0,
      todayUsage: 0,
      todayCost: 0,
    },
    {
      id: 3,
      name: 'Water Heater',
      isOn: false,
      currentPower: 0,
      currentAmp: 0,
      todayUsage: 0,
      todayCost: 0,
    },
    {
      id: 4,
      name: 'Refrigerator',
      isOn: true,
      currentPower: 150,
      currentAmp: 0.68,
      todayUsage: 0,
      todayCost: 0,
    },
  ];
}
