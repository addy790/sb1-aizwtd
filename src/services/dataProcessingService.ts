import { v4 as uuidv4 } from 'uuid';
import { ProcessingOptions, ProcessedResult } from '../types/processing';
import { DataAnonymizer } from '../utils/anonymizer';
import { calculateProcessingMetrics } from '../utils/metrics';

export const processData = async (
  data: any,
  options: ProcessingOptions
): Promise<ProcessedResult> => {
  const startTime = performance.now();
  const anonymizer = DataAnonymizer.getInstance();

  let processedData;
  switch (options.method) {
    case 'mask':
      processedData = anonymizer.maskData(data, options.sensitiveFields || []);
      break;
    case 'randomize':
      processedData = anonymizer.randomizeData(data);
      break;
    case 'perturb':
      processedData = anonymizer.perturbData(data, options.perturbationPercentage);
      break;
    default:
      throw new Error('Invalid processing method');
  }

  const endTime = performance.now();
  const metrics = calculateProcessingMetrics(data, processedData, endTime - startTime);

  return {
    id: uuidv4(),
    timestamp: Date.now(),
    originalData: data,
    processedData,
    method: options.method,
    metrics
  };
};