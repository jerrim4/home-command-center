// ESP32 Integration
// Replace with your ESP32 IP address
const ESP32_BASE_URL = 'http://192.168.4.1';

export const esp32Api = {
  toggleRelay: async (relayId: number, state: boolean): Promise<boolean> => {
    try {
      const response = await fetch(
        `${ESP32_BASE_URL}/relay?${relayId}=${state ? 'on' : 'off'}`,
        {
          method: 'GET',
          mode: 'no-cors', // For demo purposes
        }
      );
      return true;
    } catch (error) {
      console.error(`Failed to toggle relay ${relayId}:`, error);
      return false;
    }
  },

  getSensorData: async (sensorId: number): Promise<{ power: number; current: number } | null> => {
    try {
      const response = await fetch(`${ESP32_BASE_URL}/sensor/${sensorId}`);
      const data = await response.json();
      return {
        power: data.power || 0,
        current: data.current || 0,
      };
    } catch (error) {
      console.error(`Failed to get sensor ${sensorId} data:`, error);
      return null;
    }
  },
};
