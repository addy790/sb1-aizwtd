import React from 'react';
import { LogOut } from 'lucide-react';
import { useFacebookAuth } from '../../hooks/useFacebookAuth';

export const FacebookUserProfile = () => {
  const { userData, handleLogout } = useFacebookAuth();

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        {userData?.picture?.data?.url && (
          <img 
            src={userData.picture.data.url} 
            alt="Profile" 
            className="w-8 h-8 rounded-full"
          />
        )}
        <span>{userData?.name}</span>
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
      >
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </div>
  );
};