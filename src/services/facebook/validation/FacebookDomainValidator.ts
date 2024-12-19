import { FACEBOOK_CONFIG } from '../../../config/facebook';

export class FacebookDomainValidator {
  private static instance: FacebookDomainValidator;

  private constructor() {}

  static getInstance(): FacebookDomainValidator {
    if (!FacebookDomainValidator.instance) {
      FacebookDomainValidator.instance = new FacebookDomainValidator();
    }
    return FacebookDomainValidator.instance;
  }

  isValidDomain(): boolean {
    const currentDomain = window.location.hostname;
    return FACEBOOK_CONFIG.domains.includes(currentDomain);
  }

  getDomainStatus(): { valid: boolean; domain: string } {
    const currentDomain = window.location.hostname;
    return {
      valid: this.isValidDomain(),
      domain: currentDomain
    };
  }
}