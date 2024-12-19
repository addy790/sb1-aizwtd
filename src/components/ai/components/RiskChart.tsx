import React from 'react';
import { Line } from 'react-chartjs-2';
import { PatternMatch } from '../../../types/ai';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  patterns: PatternMatch[];
}

export const RiskChart: React.FC<Props> = ({ patterns }) => {
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
    <div className="bg-white p-6 rounded-lg shadow-md">
      <Line options={chartOptions} data={chartData} />
    </div>
  );
};