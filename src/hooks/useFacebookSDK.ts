import { useState, useEffect } from 'react';
import { FacebookSDKLoader } from '../services/facebook/sdk/FacebookSDKLoader';
import { FacebookDomainValidator } from '../services/facebook/validation/FacebookDomainValidator';

export const useFacebookSDK = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [domainStatus, setDomainStatus] = useState({ valid: false, domain: '' });

  useEffect(() => {
    const initSDK = async () => {
      try {
        const validator = FacebookDomainValidator.getInstance();
        const status = validator.getDomainStatus();
        setDomainStatus(status);

        if (!status.valid) {
          setError('Invalid domain for Facebook SDK');
          return;
        }

        const loader = FacebookSDKLoader.getInstance();
        await loader.loadSDK();
        setIsInitialized(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize Facebook SDK');
      }
    };

    initSDK();
  }, []);

  return {
    isInitialized,
    error,
    domainStatus
  };
};