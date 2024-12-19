import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { useDataStore } from '../store/useDataStore';

const complianceRules = {
  GDPR: [
    { field: 'email', required: true, masked: true },
    { field: 'phone', required: true, masked: true },
    { field: 'address', required: true, masked: true },
    { field: 'ip_address', required: true, masked: true }
  ],
  HIPAA: [
    { field: 'medical_record', required: true, masked: true },
    { field: 'health_plan', required: true, masked: true },
    { field: 'ssn', required: true, masked: true }
  ],
  CCPA: [
    { field: 'personal_info', required: true, masked: true },
    { field: 'biometric_data', required: true, masked: true },
    { field: 'geolocation', required: true, masked: true }
  ]
};

export const ComplianceChecker = () => {
  const { processedData } = useDataStore();
  const [selectedStandard, setSelectedStandard] = useState('GDPR');

  const checkCompliance = (data: any, standard: keyof typeof complianceRules) => {
    const rules = complianceRules[standard];
    const results = rules.map(rule => {
      const fieldExists = data && Object.keys(data).some(key => 
        key.toLowerCase().includes(rule.field.toLowerCase())
      );
      const isMasked = fieldExists && typeof data[rule.field] === 'string' && 
        data[rule.field].includes('*');
      
      return {
        field: rule.field,
        status: !rule.required || (fieldExists && (!rule.masked || isMasked)),
        message: !fieldExists ? 'Field not found' : 
          (!isMasked && rule.masked) ? 'Field not properly masked' : 'Compliant'
      };
    });

    return results;
  };

  const complianceResults = processedData ? 
    checkCompliance(processedData, selectedStandard as keyof typeof complianceRules) : [];

  const getComplianceScore = () => {
    if (!complianceResults.length) return 0;
    const compliantRules = complianceResults.filter(r => r.status).length;
    return Math.round((compliantRules / complianceResults.length) * 100);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Compliance Checker</h2>
        <select
          className="bg-white border border-gray-300 rounded-lg px-4 py-2"
          value={selectedStandard}
          onChange={(e) => setSelectedStandard(e.target.value)}
        >
          <option value="GDPR">GDPR</option>
          <option value="HIPAA">HIPAA</option>
          <option value="CCPA">CCPA</option>
        </select>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
          <span className="text-lg font-semibold">Overall Compliance Score:</span>
          <span className="text-2xl font-bold text-blue-600">{getComplianceScore()}%</span>
        </div>
      </div>

      <div className="space-y-4">
        {complianceResults.map((result, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              {result.status ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : (
                <XCircle className="w-6 h-6 text-red-500" />
              )}
              <span className="font-medium capitalize">{result.field.replace('_', ' ')}</span>
            </div>
            <span className={`text-sm ${
              result.status ? 'text-green-600' : 'text-red-600'
            }`}>
              {result.message}
            </span>
          </div>
        ))}
      </div>

      {!processedData && (
        <div className="flex items-center justify-center space-x-2 text-yellow-600 mt-4">
          <AlertTriangle className="w-5 h-5" />
          <span>Process data first to check compliance</span>
        </div>
      )}
    </div>
  );
};