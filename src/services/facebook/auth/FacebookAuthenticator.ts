import { FACEBOOK_CONFIG } from '../../../config/facebook';
import { toast } from 'react-hot-toast';
import { FacebookDomainValidator } from '../validation/FacebookDomainValidator';

export class FacebookAuthenticator {
  private static instance: FacebookAuthenticator;
  private domainValidator: FacebookDomainValidator;

  private constructor() {
    this.domainValidator = FacebookDomainValidator.getInstance();
  }

  static getInstance(): FacebookAuthenticator {
    if (!FacebookAuthenticator.instance) {
      FacebookAuthenticator.instance = new FacebookAuthenticator();
    }
    return FacebookAuthenticator.instance;
  }

  async login(): Promise<any> {
    if (!this.domainValidator.isValidDomain()) {
      const error = 'Invalid domain for Facebook SDK';
      toast.error(error);
      throw new Error(error);
    }

    return new Promise((resolve, reject) => {
      // @ts-ignore
      FB.login((response) => {
        if (response.authResponse) {
          toast.success('Successfully logged in to Facebook');
          resolve(response.authResponse);
        } else {
          const error = 'Facebook login failed or was cancelled';
          toast.error(error);
          reject(error);
        }
      }, {
        scope: FACEBOOK_CONFIG.scope,
        return_scopes: true,
        enable_profile_selector: true
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
}