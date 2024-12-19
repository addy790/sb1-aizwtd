import React, { useEffect } from 'react';
import { Shield, Database, Lock } from 'lucide-react';
import { initFacebookSDK } from '../utils/facebook';
import { FacebookLoginButton } from './facebook/FacebookLoginButton';
import { FacebookUserProfile } from './facebook/FacebookUserProfile';
import { useFacebookAuth } from '../hooks/useFacebookAuth';

export const Header = () => {
  const { isLoggedIn } = useFacebookAuth();

  useEffect(() => {
    initFacebookSDK().catch(console.error);
  }, []);

  return (
    <header className="bg-gradient-to-r from-purple-800 to-indigo-900 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="w-8 h-8" />
            <span className="text-2xl font-bold">DataShield</span>
          </div>
          <div className="flex items-center space-x-4">
            {!isLoggedIn ? <FacebookLoginButton /> : <FacebookUserProfile />}
            <button className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors">
              <Database className="w-5 h-5" />
              <span>Database</span>
            </button>
            <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors">
              <Lock className="w-5 h-5" />
              <span>Vault</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};