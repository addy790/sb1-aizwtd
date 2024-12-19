import { FACEBOOK_CONFIG } from '../../../config/facebook';
import { toast } from 'react-hot-toast';

export class FacebookSDKLoader {
  private static instance: FacebookSDKLoader;

  private constructor() {}

  static getInstance(): FacebookSDKLoader {
    if (!FacebookSDKLoader.instance) {
      FacebookSDKLoader.instance = new FacebookSDKLoader();
    }
    return FacebookSDKLoader.instance;
  }

  async loadSDK(): Promise<void> {
    return new Promise<void>((resolve) => {
      // @ts-ignore
      window.fbAsyncInit = () => {
        this.initializeSDK();
        this.checkLoginStatus().then(resolve);
      };

      this.injectSDKScript();
    });
  }

  private initializeSDK(): void {
    // @ts-ignore
    FB.init({
      appId: FACEBOOK_CONFIG.appId,
      cookie: true,
      xfbml: true,
      version: FACEBOOK_CONFIG.version,
      status: true
    });
  }

  private async checkLoginStatus(): Promise<void> {
    return new Promise((resolve) => {
      // @ts-ignore
      FB.getLoginStatus((response) => {
        if (response.status === 'connected') {
          toast.success('Connected to Facebook');
        }
        resolve();
      });
    });
  }

  private injectSDKScript(): void {
    const script = document.createElement('script');
    script.id = 'facebook-jssdk';
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    script.crossOrigin = 'anonymous';
    
    const firstScript = document.getElementsByTagName('script')[0];
    firstScript?.parentNode?.insertBefore(script, firstScript);
  }
}