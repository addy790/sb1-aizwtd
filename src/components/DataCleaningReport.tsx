import React from 'react';
import { CleaningReport } from '../utils/dataCleaners';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface Props {
  report: CleaningReport[];
}

export const DataCleaningReport: React.FC<Props> = ({ report }) => {
  if (!report.length) {
    return (
      <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-600">
        No data cleaning operations performed
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Data Cleaning Report</h2>
      <div className="space-y-4">
        {report.map((item, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              {item.operations.length > 0 ? (
                <AlertCircle className="w-5 h-5 text-yellow-500" />
              ) : (
                <CheckCircle className="w-5 h-5 text-green-500" />
              )}
              <span className="font-semibold">{item.field}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-2">
              <div>
                <span className="text-sm text-gray-600">Original:</span>
                <pre className="mt-1 text-sm bg-gray-100 p-2 rounded">
                  {JSON.stringify(item.originalValue, null, 2)}
                </pre>
              </div>
              <div>
                <span className="text-sm text-gray-600">Cleaned:</span>
                <pre className="mt-1 text-sm bg-gray-100 p-2 rounded">
                  {JSON.stringify(item.cleanedValue, null, 2)}
                </pre>
              </div>
            </div>
            {item.operations.length > 0 && (
              <div>
                <span className="text-sm text-gray-600">Operations:</span>
                <ul className="mt-1 list-disc list-inside text-sm text-gray-700">
                  {item.operations.map((op, i) => (
                    <li key={i}>{op}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};