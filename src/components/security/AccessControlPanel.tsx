import React from 'react';
import { Shield, Users, Key } from 'lucide-react';
import { AccessControl } from '../../types/security';

interface Props {
  userControls: AccessControl[];
  onUpdateAccess: (control: AccessControl) => void;
}

export const AccessControlPanel: React.FC<Props> = ({ userControls, onUpdateAccess }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex items-center space-x-2 mb-6">
        <Shield className="w-6 h-6 text-purple-600" />
        <h2 className="text-2xl font-bold">Access Control</h2>
      </div>
      <div className="space-y-4">
        {userControls.map((control) => (
          <div key={control.userId} className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-gray-500" />
                <span className="font-medium">{control.userId}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Key className="w-4 h-4 text-blue-500" />
                <select
                  value={control.role}
                  onChange={(e) => onUpdateAccess({
                    ...control,
                    role: e.target.value as AccessControl['role']
                  })}
                  className="text-sm border rounded px-2 py-1"
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              Last access: {control.lastAccess.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};