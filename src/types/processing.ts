export interface ProcessingOptions {
  method: 'mask' | 'randomize' | 'perturb';
  sensitiveFields?: string[];
  perturbationPercentage?: number;
  preserveFormat?: boolean;
}

export interface ProcessedResult {
  id: string;
  timestamp: number;
  originalData: any;
  processedData: any;
  method: string;
  metrics: ProcessingMetrics;
}

export interface ProcessingMetrics {
  fieldsProcessed: number;
  sensitiveFieldsFound: number;
  processingTime: number;
  dataSize: {
    original: number;
    processed: number;
  };
}