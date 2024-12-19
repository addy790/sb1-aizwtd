import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useDataStore } from '../store/useDataStore';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const DataVisualization = () => {
  const { inputData, processedData } = useDataStore();

  const getDataMetrics = (data: any) => {
    if (!data) return null;
    const metrics = {
      totalFields: Object.keys(data).length,
      sensitiveFields: Object.keys(data).filter(key => 
        ['email', 'phone', 'ssn', 'creditCard'].includes(key.toLowerCase())
      ).length,
      dataSize: JSON.stringify(data).length,
    };
    return metrics;
  };

  const inputMetrics = getDataMetrics(inputData);
  const processedMetrics = getDataMetrics(processedData);

  const comparisonData = {
    labels: ['Total Fields', 'Sensitive Fields', 'Data Size (bytes)'],
    datasets: [
      {
        label: 'Original Data',
        data: inputMetrics ? [
          inputMetrics.totalFields,
          inputMetrics.sensitiveFields,
          inputMetrics.dataSize
        ] : [],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Processed Data',
        data: processedMetrics ? [
          processedMetrics.totalFields,
          processedMetrics.sensitiveFields,
          processedMetrics.dataSize
        ] : [],
        borderColor: 'rgb(153, 102, 255)',
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Data Transformation Analysis'
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Data Visualization</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Data Comparison</h3>
          <Bar options={options} data={comparisonData} />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Privacy Impact</h3>
          <Line 
            options={{
              ...options,
              plugins: {
                ...options.plugins,
                title: {
                  display: true,
                  text: 'Privacy Score Over Time'
                }
              }
            }} 
            data={{
              labels: ['Original', 'Masked', 'Randomized', 'Perturbed'],
              datasets: [{
                label: 'Privacy Score',
                data: [30, 70, 85, 95],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
              }]
            }} 
          />
        </div>
      </div>
    </div>
  );
};