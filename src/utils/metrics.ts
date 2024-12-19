import { ProcessingMetrics } from '../types/processing';

export const calculateProcessingMetrics = (
  originalData: any,
  processedData: any,
  processingTime: number
): ProcessingMetrics => {
  const sensitivePatterns = [
    /email/i,
    /phone/i,
    /ssn/i,
    /password/i,
    /credit.*card/i,
    /address/i
  ];

  const countSensitiveFields = (obj: any): number => {
    let count = 0;
    for (const key in obj) {
      if (sensitivePatterns.some(pattern => pattern.test(key))) {
        count++;
      }
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        count += countSensitiveFields(obj[key]);
      }
    }
    return count;
  };

  return {
    fieldsProcessed: Object.keys(processedData).length,
    sensitiveFieldsFound: countSensitiveFields(originalData),
    processingTime,
    dataSize: {
      original: new Blob([JSON.stringify(originalData)]).size,
      processed: new Blob([JSON.stringify(processedData)]).size
    }
  };
};