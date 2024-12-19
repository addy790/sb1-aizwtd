import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { ProcessedResult } from '../../types/processing';

interface Props {
  processingHistory: ProcessedResult[];
}

export const DataDashboard: React.FC<Props> = ({ processingHistory }) => {
  const processingTimes = processingHistory.map(result => result.metrics.processingTime);
  const dataSizes = processingHistory.map(result => ({
    original: result.metrics.dataSize.original,
    processed: result.metrics.dataSize.processed
  }));

  const timeData = {
    labels: processingHistory.map((_, index) => `Operation ${index + 1}`),
    datasets: [{
      label: 'Processing Time (ms)',
      data: processingTimes,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  const sizeData = {
    labels: processingHistory.map((_, index) => `Operation ${index + 1}`),
    datasets: [
      {
        label: 'Original Size (KB)',
        data: dataSizes.map(size => size.original / 1024),
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      },
      {
        label: 'Processed Size (KB)',
        data: dataSizes.map(size => size.processed / 1024),
        backgroundColor: 'rgba(75, 192, 192, 0.5)'
      }
    ]
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Processing Performance</h3>
        <Line data={timeData} />
      </div>
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Data Size Comparison</h3>
        <Bar data={sizeData} />
      </div>
    </div>
  );
};