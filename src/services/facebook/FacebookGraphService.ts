import { FacebookTokenService } from './FacebookTokenService';
import { FacebookUserData } from './types';
import { toast } from 'react-hot-toast';

export class FacebookGraphService {
  private static instance: FacebookGraphService;
  private tokenService: FacebookTokenService;

  private constructor() {
    this.tokenService = FacebookTokenService.getInstance();
  }

  static getInstance(): FacebookGraphService {
    if (!FacebookGraphService.instance) {
      FacebookGraphService.instance = new FacebookGraphService();
    }
    return FacebookGraphService.instance;
  }

  async fetchUserProfile(): Promise<FacebookUserData | null> {
    const token = this.tokenService.getAccessToken();
    if (!token) {
      toast.error('No access token available');
      return null;
    }

    try {
      const response = await fetch(
        `https://graph.facebook.com/v19.0/me?fields=id,name,email,picture,friends&access_token=${token}`
      );
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      toast.error('Failed to fetch user profile');
      return null;
    }
  }

  async fetchUserPosts(): Promise<any[]> {
    const token = this.tokenService.getAccessToken();
    if (!token) return [];

    try {
      const response = await fetch(
        `https://graph.facebook.com/v19.0/me/posts?access_token=${token}`
      );
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching user posts:', error);
      return [];
    }
  }

  async fetchUserPhotos(): Promise<any[]> {
    const token = this.tokenService.getAccessToken();
    if (!token) return [];

    try {
      const response = await fetch(
        `https://graph.facebook.com/v19.0/me/photos?access_token=${token}`
      );
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching user photos:', error);
      return [];
    }
  }
}