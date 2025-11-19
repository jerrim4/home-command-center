import { useSmartHome } from '@/hooks/useSmartHome';
import { AppLayout } from '@/components/Layout/AppLayout';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Analytics from './Analytics';
import Automation from './Automation';
import Settings from './Settings';

const Index = () => {
  const {
    devices,
    energyData,
    costSettings,
    addDevice,
    removeDevice,
    toggleDevice,
    updateDeviceName,
    setDeviceSchedule,
    setDeviceTimer,
    updateCostSettings,
    getTotalPower,
    getTodayCost,
  } = useSmartHome();

  return (
    <AppLayout costSettings={costSettings} onCostUpdate={updateCostSettings}>
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              devices={devices}
              energyData={energyData}
              costSettings={costSettings}
              getTotalPower={getTotalPower}
              getTodayCost={getTodayCost}
              toggleDevice={toggleDevice}
              updateDeviceName={updateDeviceName}
              setDeviceSchedule={setDeviceSchedule}
              setDeviceTimer={setDeviceTimer}
              addDevice={addDevice}
              removeDevice={removeDevice}
            />
          }
        />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/automation" element={<Automation />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </AppLayout>
  );
};

export default Index;
