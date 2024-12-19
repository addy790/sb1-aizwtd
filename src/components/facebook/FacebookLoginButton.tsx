import React from 'react';
import { Facebook } from 'lucide-react';
import { useFacebookAuth } from '../../hooks/useFacebookAuth';

export const FacebookLoginButton = () => {
  const { handleLogin } = useFacebookAuth();

  return (
    <button 
      onClick={handleLogin}
      className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
    >
      <Facebook className="w-5 h-5" />
      <span>Connect FB</span>
    </button>
  );
};