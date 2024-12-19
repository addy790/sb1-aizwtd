import { useState, useCallback, useEffect } from 'react';
import { FacebookAuthService } from '../services/facebook/FacebookAuthService';
import { toast } from 'react-hot-toast';

export const useFacebookAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initFacebook = async () => {
      try {
        const authService = FacebookAuthService.getInstance();
        await authService.initialize();
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to initialize Facebook SDK:', error);
        toast.error('Failed to connect to Facebook');
        setIsLoading(false);
      }
    };

    initFacebook();
  }, []);

  const handleLogin = useCallback(async () => {
    try {
      setIsLoading(true);
      const authService = FacebookAuthService.getInstance();
      await authService.login();
      const data = await authService.getUserData();
      setUserData(data);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Facebook login error:', error);
      toast.error('Failed to login with Facebook');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      setIsLoading(true);
      const authService = FacebookAuthService.getInstance();
      await authService.logout();
      setIsLoggedIn(false);
      setUserData(null);
    } catch (error) {
      console.error('Facebook logout error:', error);
      toast.error('Failed to logout from Facebook');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoggedIn,
    userData,
    isLoading,
    handleLogin,
    handleLogout
  };
};