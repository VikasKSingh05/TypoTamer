import React from 'react';  
import { Line } from 'react-chartjs-2';
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

const ResultsGraph = ({ wpmHistory }) => {
  const data = {
    labels: wpmHistory.map((_, index) => index + 1),
    datasets: [
      {
        label: 'WPM',
        data: wpmHistory,
        borderColor: '#E2B714',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'WPM Over Time',
        color: '#D1D0C5',
        font: {
          size: 16,
          family: "'Inter', sans-serif",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(100, 102, 105, 0.1)',
        },
        ticks: {
          color: '#D1D0C5',
          font: {
            family: "'Inter', sans-serif",
          },
        },
      },
      x: {
        grid: {
          color: 'rgba(100, 102, 105, 0.1)',
        },
        ticks: {
          color: '#D1D0C5',
          font: {
            family: "'Inter', sans-serif",
          },
        },
      },
    },
  };

  return (
    <div className="bg-secondary p-6 rounded-xl shadow-lg mt-8 animate-fade-in h-[300px]">
      <Line data={data} options={options} />
    </div>
  );
};

export default ResultsGraph;