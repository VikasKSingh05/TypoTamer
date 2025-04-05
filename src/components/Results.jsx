import React from 'react';
import { Line } from 'react-chartjs-2';

const Results = ({ stats, onRestart, mode }) => {
  const {
    wpm,
    accuracy,
    time,
    characters,
    correctChars,
    incorrectChars,
    wpmHistory
  } = stats;

  const chartData = {
    labels: wpmHistory.map((_, idx) => idx + 1),
    datasets: [{
      label: 'WPM',
      data: wpmHistory,
      borderColor: '#E2B714',
      tension: 0.1,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'WPM Over Time',
        color: 'var(--theme-text)',
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(100, 102, 105, 0.1)' },
        ticks: { color: 'var(--theme-text)' }
      },
      x: {
        grid: { color: 'rgba(100, 102, 105, 0.1)' },
        ticks: { color: 'var(--theme-text)' }
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-[var(--theme-secondary)] p-8 rounded-xl max-w-2xl w-full animate-fade-in">
        <h2 className="text-2xl font-bold text-accent mb-6">
          Test Results - {mode.category === 'Time' ? `${mode.value}s` : `${mode.value} words`}
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-[var(--theme-background)] p-6 rounded-xl">
            <div className="text-accent text-3xl md:text-4xl font-bold mb-2">
              {Math.round(wpm)}
            </div>
            <div className="text-[var(--theme-text-secondary)] text-sm uppercase tracking-wider">
              WPM
            </div>
          </div>
          <div className="stats-card">
            <div className="stats-value">{Math.round(accuracy)}%</div>
            <div className="stats-label">Accuracy</div>
          </div>
          <div className="stats-card">
            <div className="stats-value">{time}s</div>
            <div className="stats-label">Time</div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="stats-card">
            <div className="stats-value text-success">{correctChars}</div>
            <div className="stats-label">Correct</div>
          </div>
          <div className="stats-card">
            <div className="stats-value text-error">{incorrectChars}</div>
            <div className="stats-label">Incorrect</div>
          </div>
          <div className="stats-card">
            <div className="stats-value">{characters}</div>
            <div className="stats-label">Total</div>
          </div>
        </div>

        <div className="h-[200px] mb-8">
          <Line data={chartData} options={chartOptions} />
        </div>

        <div className="flex justify-center">
          <button
            onClick={onRestart}
            className="px-6 py-3 bg-accent text-primary rounded-lg hover:bg-accent-dark transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results; 