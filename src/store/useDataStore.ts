import { create } from 'zustand';
import { DataAnonymizer } from '../utils/anonymizer';

interface DataState {
  inputData: any;
  processedData: any;
  sensitiveFields: string[];
  isProcessing: boolean;
  setInputData: (data: any) => void;
  setProcessedData: (data: any) => void;
  setSensitiveFields: (fields: string[]) => void;
  processData: (method: string) => void;
  recoverData: (key: string) => any;
}

export const useDataStore = create<DataState>((set, get) => ({
  inputData: null,
  processedData: null,
  sensitiveFields: ['email', 'phone', 'ssn', 'creditCard'],
  isProcessing: false,

  setInputData: (data) => set({ inputData: data }),
  setProcessedData: (data) => set({ processedData: data }),
  setSensitiveFields: (fields) => set({ sensitiveFields: fields }),

  processData: (method) => {
    const { inputData, sensitiveFields } = get();
    const anonymizer = DataAnonymizer.getInstance();
    
    set({ isProcessing: true });
    
    try {
      let result;
      switch (method) {
        case 'mask':
          result = anonymizer.maskData(inputData, sensitiveFields);
          break;
        case 'randomize':
          result = anonymizer.randomizeData(inputData);
          break;
        case 'perturb':
          result = anonymizer.perturbData(inputData);
          break;
        default:
          result = inputData;
      }
      set({ processedData: result });
    } catch (error) {
      console.error('Error processing data:', error);
    } finally {
      set({ isProcessing: false });
    }
  },

  recoverData: (key) => {
    const anonymizer = DataAnonymizer.getInstance();
    return anonymizer.recoverData(key);
  },
}));