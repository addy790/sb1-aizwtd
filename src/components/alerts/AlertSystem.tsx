import React from 'react';
import { AlertTriangle, Bell, Shield } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Alert {
  id: string;
  type: 'warning' | 'error' | 'info';
  message: string;
  timestamp: Date;
}

interface Props {
  alerts: Alert[];
  onDismiss: (id: string) => void;
}

export const AlertSystem: React.FC<Props> = ({ alerts, onDismiss }) => {
  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <Shield className="w-5 h-5 text-red-500" />;
      default:
        return <Bell className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 space-y-2">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className="flex items-center space-x-2 bg-white p-4 rounded-lg shadow-lg border-l-4 border-blue-500"
        >
          {getAlertIcon(alert.type)}
          <div className="flex-1">
            <p className="text-sm font-medium">{alert.message}</p>
            <p className="text-xs text-gray-500">
              {alert.timestamp.toLocaleString()}
            </p>
          </div>
          <button
            onClick={() => onDismiss(alert.id)}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};