import React from 'react';
import { Shield, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { PatternMatch, RiskLevel } from '../../types/ai';
import { Line } from 'react-chartjs-2';

interface Props {
  patterns: PatternMatch[];
}

export const RiskAnalysisDashboard: React.FC<Props> = ({ patterns }) => {
  const getRiskColor = (risk: RiskLevel): string => {
    const colors = {
      critical: 'text-red-600',
      high: 'text-orange-500',
      medium: 'text-yellow-500',
      low: 'text-green-500'
    };
    return colors[risk] || colors.medium;
  };

  const getRiskBgColor = (risk: RiskLevel): string => {
    const colors = {
      critical: 'bg-red-100',
      high: 'bg-orange-100',
      medium: 'bg-yellow-100',
      low: 'bg-green-100'
    };
    return colors[risk] || colors.medium;
  };

  const chartData = {
    labels: patterns.map(p => p.field),
    datasets: [
      {
        label: 'Risk Score',
        data: patterns.map(p => p.impactScore * 100),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Confidence',
        data: patterns.map(p => p.confidence * 100),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Risk Analysis Metrics'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Summary Cards */}
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
          <p className="text-2xl font-bold mt-2">
            {(patterns.reduce((acc, p) => acc + p.impactScore, 0) / patterns.length * 100).toFixed(1)}%
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <h3 className="font-semibold">Compliance</h3>
          </div>
          <p className="text-2xl font-bold mt-2">
            {new Set(patterns.flatMap(p => p.complianceFlags)).size}
          </p>
        </div>
      </div>

      {/* Risk Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <Line options={chartOptions} data={chartData} />
      </div>

      {/* Detailed Analysis */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Detailed Pattern Analysis</h2>
        <div className="space-y-4">
          {patterns.map((pattern) => (
            <div key={pattern.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Shield className={`w-5 h-5 ${getRiskColor(pattern.riskLevel)}`} />
                  <span className="font-medium">{pattern.field}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-sm ${getRiskBgColor(pattern.riskLevel)} ${getRiskColor(pattern.riskLevel)}`}>
                  {pattern.riskLevel.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-sm text-gray-600">Pattern Type</p>
                  <p className="font-medium">{pattern.dataType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Impact Score</p>
                  <p className="font-medium">{(pattern.impactScore * 100).toFixed(1)}%</p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Compliance Requirements</p>
                <div className="flex flex-wrap gap-2">
                  {pattern.complianceFlags.map((flag) => (
                    <span key={flag} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {flag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Suggested Actions</p>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {pattern.suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};