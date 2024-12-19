import React from 'react';
import { Shield, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { PatternMatch } from '../../../types/ai';

interface Props {
  patterns: PatternMatch[];
}

export const SummaryCards: React.FC<Props> = ({ patterns }) => {
  const calculateAverageImpact = () => {
    if (patterns.length === 0) return 0;
    return (patterns.reduce((acc, p) => acc + p.impactScore, 0) / patterns.length * 100).toFixed(1);
  };

  const uniqueComplianceCount = () => {
    return new Set(patterns.flatMap(p => p.complianceFlags)).size;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-blue-500" />
          <h3 className="font-semibold">Total Patterns</h3>
        </div>
        <p className="text-2xl font-bold mt-2">{patterns.length}</p>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          <h3 className="font-semibold">Critical Risks</h3>
        </div>
        <p className="text-2xl font-bold mt-2">
          {patterns.filter(p => p.riskLevel === 'critical').length}
        </p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center space-x-2">
          <Info className="w-5 h-5 text-yellow-500" />
          <h3 className="font-semibold">Avg. Impact</h3>
        </div>
        <p className="text-2xl font-bold mt-2">{calculateAverageImpact()}%</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center space-x-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <h3 className="font-semibold">Compliance</h3>
        </div>
        <p className="text-2xl font-bold mt-2">{uniqueComplianceCount()}</p>
      </div>
    </div>
  );
};