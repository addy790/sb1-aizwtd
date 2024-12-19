import React, { useState } from 'react';
import { PatternAnalysisService } from '../services/ai/patternAnalysis';
import { RiskAnalysisDashboard } from './ai/RiskAnalysisDashboard';
import { PatternMatch } from '../types/ai';
import { useDataStore } from '../store/useDataStore';
import { toast } from 'react-hot-toast';

export const DataProcessor: React.FC = () => {
  const { inputData, processedData, setInputData, processData } = useDataStore();
  const [patterns, setPatterns] = useState<PatternMatch[]>([]);

  const handleInputChange = (value: string) => {
    try {
      const parsed = JSON.parse(value);
      setInputData(parsed);
      
      // Analyze patterns
      const patternService = PatternAnalysisService.getInstance();
      const detectedPatterns = patternService.analyzeData(parsed);
      setPatterns(detectedPatterns);
      
      if (detectedPatterns.length > 0) {
        const highRiskPatterns = detectedPatterns.filter(p => p.riskLevel === 'high' || p.riskLevel === 'critical');
        if (highRiskPatterns.length > 0) {
          toast.warning(`Detected ${highRiskPatterns.length} high-risk data patterns`);
        }
      }
      
      toast.success('Data format validated successfully');
    } catch (error) {
      console.error('Error parsing/cleaning data:', error);
      toast.error('Invalid JSON format');
    }
  };

  const handleProcessing = (method: string) => {
    try {
      processData(method);
      toast.success(`Data processed using ${method} method`);
    } catch (error) {
      console.error('Error processing data:', error);
      toast.error('Failed to process data');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Data Processor</h2>
        <textarea
          className="w-full h-48 p-4 border rounded-lg font-mono text-sm"
          placeholder="Paste your JSON data here..."
          onChange={(e) => handleInputChange(e.target.value)}
        />
        <div className="mt-4 space-x-4">
          <button
            onClick={() => handleProcessing('mask')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            disabled={!inputData}
          >
            Mask Data
          </button>
          <button
            onClick={() => handleProcessing('randomize')}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            disabled={!inputData}
          >
            Randomize
          </button>
          <button
            onClick={() => handleProcessing('perturb')}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
            disabled={!inputData}
          >
            Perturb
          </button>
        </div>
      </div>

      {patterns.length > 0 && <RiskAnalysisDashboard patterns={patterns} />}
    </div>
  );
};