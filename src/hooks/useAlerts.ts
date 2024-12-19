import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface Alert {
  id: string;
  type: 'warning' | 'error' | 'info';
  message: string;
  timestamp: Date;
}

export const useAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const addAlert = useCallback((type: Alert['type'], message: string) => {
    const newAlert: Alert = {
      id: uuidv4(),
      type,
      message,
      timestamp: new Date()
    };
    setAlerts(prev => [...prev, newAlert]);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      dismissAlert(newAlert.id);
    }, 5000);
  }, []);

  const dismissAlert = useCallback((id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  }, []);

  return {
    alerts,
    addAlert,
    dismissAlert
  };
};