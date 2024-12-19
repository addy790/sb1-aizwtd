import { useState, useCallback } from 'react';
import { ProcessingOptions, ProcessedResult } from '../types/processing';
import { processData } from '../services/dataProcessingService';
import { toast } from 'react-hot-toast';

export const useDataProcessing = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingHistory, setProcessingHistory] = useState<ProcessedResult[]>([]);

  const handleDataProcessing = useCallback(async (data: any, options: ProcessingOptions) => {
    setIsProcessing(true);
    try {
      const result = await processData(data, options);
      setProcessingHistory(prev => [...prev, result]);
      return result;
    } catch (error) {
      toast.error('Processing failed. Please check your data.');
      console.error('Processing error:', error);
      return null;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const clearHistory = useCallback(() => {
    setProcessingHistory([]);
    toast.success('Processing history cleared');
  }, []);

  return {
    isProcessing,
    processingHistory,
    handleDataProcessing,
    clearHistory
  };
};