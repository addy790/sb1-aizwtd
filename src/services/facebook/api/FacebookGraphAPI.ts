import { FACEBOOK_CONFIG } from '../../../config/facebook';
import { toast } from 'react-hot-toast';
import { FacebookUserData } from '../types';

export class FacebookGraphAPI {
  private static instance: FacebookGraphAPI;

  private constructor() {}

  static getInstance(): FacebookGraphAPI {
    if (!FacebookGraphAPI.instance) {
      FacebookGraphAPI.instance = new FacebookGraphAPI();
    }
    return FacebookGraphAPI.instance;
  }

  async getUserProfile(): Promise<FacebookUserData | null> {
    return new Promise((resolve, reject) => {
      // @ts-ignore
      FB.api('/me', { fields: FACEBOOK_CONFIG.fields.join(',') }, (response) => {
        if (!response || response.error) {
          toast.error('Failed to fetch user profile');
          reject(response?.error || 'Error fetching user data');
          return;
        }
        resolve(response);
      });
    });
  }

  async getFriends(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      // @ts-ignore
      FB.api('/me/friends', (response) => {
        if (!response || response.error) {
          toast.error('Failed to fetch friends');
          reject(response?.error || 'Error fetching friends');
          return;
        }
        resolve(response.data || []);
      });
    });
  }

  async getPermissions(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      // @ts-ignore
      FB.api('/me/permissions', (response) => {
        if (!response || response.error) {
          reject(response?.error || 'Error fetching permissions');
          return;
        }
        const grantedPermissions = response.data
          .filter((perm: any) => perm.status === 'granted')
          .map((perm: any) => perm.permission);
        resolve(grantedPermissions);
      });
    });
  }
}