import { FACEBOOK_CONFIG } from '../config/facebook';
import { toast } from 'react-hot-toast';

export const initFacebookSDK = () => {
  return new Promise<void>((resolve) => {
    // @ts-ignore
    window.fbAsyncInit = function() {
      // @ts-ignore
      FB.init({
        appId: FACEBOOK_CONFIG.appId,
        cookie: true,
        xfbml: true,
        version: FACEBOOK_CONFIG.version,
        status: true // Enable status checking
      });
      
      // @ts-ignore
      FB.getLoginStatus((response) => {
        if (response.status === 'connected') {
          toast.success('Facebook SDK initialized and connected');
        }
        resolve();
      });
    };

    // Load Facebook SDK with domain verification
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s) as HTMLScriptElement;
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      js.crossOrigin = "anonymous"; // Add CORS support
      fjs.parentNode?.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  });
};

export const loginWithFacebook = () => {
  return new Promise((resolve, reject) => {
    if (!FACEBOOK_CONFIG.domains.includes(window.location.hostname)) {
      toast.error('Invalid domain for Facebook SDK');
      reject('Invalid domain');
      return;
    }

    // @ts-ignore
    FB.login((response) => {
      if (response.authResponse) {
        toast.success('Successfully logged in with Facebook');
        resolve(response.authResponse);
      } else {
        toast.error('Facebook login failed or was cancelled');
        reject('User cancelled login or did not fully authorize.');
      }
    }, { 
      scope: FACEBOOK_CONFIG.scope,
      return_scopes: true,
      enable_profile_selector: true
    });
  });
};

export const getFacebookUserData = () => {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    FB.api('/me', { fields: FACEBOOK_CONFIG.fields.join(',') }, (response) => {
      if (!response || response.error) {
        toast.error('Failed to fetch Facebook user data');
        reject(response?.error || 'Error fetching user data');
        return;
      }
      toast.success('Successfully retrieved Facebook user data');
      resolve(response);
    });
  });
};

export const getFacebookFriends = () => {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    FB.api('/me/friends', (response) => {
      if (!response || response.error) {
        toast.error('Failed to fetch Facebook friends');
        reject(response?.error || 'Error fetching friends data');
        return;
      }
      toast.success(`Retrieved ${response.data.length} friends`);
      resolve(response.data);
    });
  });
};

// Add domain validation utility
export const validateDomain = (): boolean => {
  const currentDomain = window.location.hostname;
  return FACEBOOK_CONFIG.domains.includes(currentDomain);
};