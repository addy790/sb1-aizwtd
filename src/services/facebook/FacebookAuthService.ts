import { FACEBOOK_CONFIG } from '../../config/facebook';
import { toast } from 'react-hot-toast';

export class FacebookAuthService {
  private static instance: FacebookAuthService;

  private constructor() {}

  static getInstance(): FacebookAuthService {
    if (!FacebookAuthService.instance) {
      FacebookAuthService.instance = new FacebookAuthService();
    }
    return FacebookAuthService.instance;
  }

  async initialize(): Promise<void> {
    return new Promise((resolve) => {
      // @ts-ignore
      window.fbAsyncInit = () => {
        // @ts-ignore
        FB.init({
          appId: FACEBOOK_CONFIG.appId,
          cookie: true,
          xfbml: true,
          version: FACEBOOK_CONFIG.version
        });
        
        this.checkLoginStatus().then(resolve);
      };

      // Load Facebook SDK
      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s) as HTMLScriptElement;
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode?.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
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

  async login(): Promise<any> {
    return new Promise((resolve, reject) => {
      // @ts-ignore
      FB.login((response) => {
        if (response.authResponse) {
          toast.success('Successfully logged in to Facebook');
          resolve(response.authResponse);
        } else {
          toast.error('Facebook login failed or was cancelled');
          reject('Login failed or cancelled');
        }
      }, {
        scope: FACEBOOK_CONFIG.scope,
        ...FACEBOOK_CONFIG.loginOptions
      });
    });
  }

  async logout(): Promise<void> {
    return new Promise((resolve) => {
      // @ts-ignore
      FB.logout(() => {
        toast.success('Logged out from Facebook');
        resolve();
      });
    });
  }

  async getUserData(): Promise<any> {
    return new Promise((resolve, reject) => {
      // @ts-ignore
      FB.api('/me', { fields: FACEBOOK_CONFIG.fields.join(',') }, (response) => {
        if (!response || response.error) {
          toast.error('Failed to fetch user data');
          reject(response?.error || 'Error fetching user data');
          return;
        }
        resolve(response);
      });
    });
  }
}