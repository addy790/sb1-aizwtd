import React from 'react';
import { AlertTriangle, Shield, Zap } from 'lucide-react';
import { PatternMatch } from '../../services/ai/patternRecognition';

interface Props {
  patterns: PatternMatch[];
}

export const PatternAnalysis: React.FC<Props> = ({ patterns }) => {
  const getRiskColor = (risk: PatternMatch['risk']) => {
    switch (risk) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      default:
        return 'text-blue-500';
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex items-center space-x-2 mb-6">
        <Zap className="w-6 h-6 text-purple-600" />
        <h2 className="text-2xl font-bold">AI Pattern Analysis</h2>
      </div>

      {patterns.length === 0 ? (
        <div className="text-center text-gray-500 py-4">
          No sensitive patterns detected
        </div>
      ) : (
        <div className="space-y-4">
          {patterns.map((pattern) => (
            <div
              key={pattern.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Shield className={`w-5 h-5 ${getRiskColor(pattern.risk)}`} />
                  <span className="font-medium">{pattern.field}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  pattern.risk === 'high' ? 'bg-red-100 text-red-800' :
                  pattern.risk === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {pattern.risk.toUpperCase()} RISK
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>Pattern:</span>
                  <code className="bg-gray-100 px-2 py-1 rounded">
                    {pattern.pattern.replace(/_/g, ' ')}
                  </code>
                </div>

                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  <p className="text-sm text-gray-700">{pattern.suggestion}</p>
                </div>

                <div className="bg-gray-50 rounded p-2">
                  <div className="text-xs text-gray-500 mb-1">Confidence Score</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${pattern.confidence * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};