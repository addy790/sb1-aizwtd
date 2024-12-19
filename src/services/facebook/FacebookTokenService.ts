import { toast } from 'react-hot-toast';
import { FACEBOOK_CONFIG } from '../../config/facebook';

export class FacebookTokenService {
  private static instance: FacebookTokenService;
  private currentToken: string | null = null;

  private constructor() {}

  static getInstance(): FacebookTokenService {
    if (!FacebookTokenService.instance) {
      FacebookTokenService.instance = new FacebookTokenService();
    }
    return FacebookTokenService.instance;
  }

  setAccessToken(token: string): void {
    this.currentToken = token;
    localStorage.setItem('fb_access_token', token);
  }

  getAccessToken(): string | null {
    return this.currentToken || localStorage.getItem('fb_access_token');
  }

  async validateToken(token: string): Promise<boolean> {
    try {
      const response = await fetch(
        `https://graph.facebook.com/debug_token?input_token=${token}&access_token=${FACEBOOK_CONFIG.appId}|${FACEBOOK_CONFIG.appSecret}`
      );
      const data = await response.json();
      return data.data?.is_valid || false;
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  }

  clearToken(): void {
    this.currentToken = null;
    localStorage.removeItem('fb_access_token');
  }
}