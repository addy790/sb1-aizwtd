import React from 'react';
import { Clock, FileText, Activity } from 'lucide-react';
import { ProcessedResult } from '../types/processing';

interface Props {
  history: ProcessedResult[];
  onClearHistory: () => void;
}

export const ProcessingHistory: React.FC<Props> = ({ history, onClearHistory }) => {
  if (!history.length) return null;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Processing History</h2>
        <button
          onClick={onClearHistory}
          className="text-red-600 hover:text-red-700 text-sm"
        >
          Clear History
        </button>
      </div>
      <div className="space-y-4">
        {history.map((result) => (
          <div key={result.id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {new Date(result.timestamp).toLocaleString()}
                </span>
              </div>
              <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-sm">
                {result.method}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">Data Metrics</span>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Fields Processed: {result.metrics.fieldsProcessed}</p>
                  <p>Sensitive Fields: {result.metrics.sensitiveFieldsFound}</p>
                  <p>Size Reduction: {Math.round((1 - result.metrics.dataSize.processed / result.metrics.dataSize.original) * 100)}%</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">Performance</span>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Processing Time: {result.metrics.processingTime.toFixed(2)}ms</p>
                  <p>Original Size: {(result.metrics.dataSize.original / 1024).toFixed(2)}KB</p>
                  <p>Processed Size: {(result.metrics.dataSize.processed / 1024).toFixed(2)}KB</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};