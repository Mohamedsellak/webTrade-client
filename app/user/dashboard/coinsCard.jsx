// components/CoinCard.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

// Register ChartJS components
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const CoinCard = ({ coin }) => {
  // Prepare the chart data
  const chartData = {
    labels: Array.from({ length: coin.sparkline.length }, (_, i) => `Day ${i + 1}`), // Create labels for each point
    datasets: [
      {
        label: 'Price',
        data: coin.sparkline.map(price => parseFloat(price)), // Convert sparkline data to numbers
        borderColor: '#ff6600',
        backgroundColor: 'rgba(255, 102, 0, 0.2)',
        fill: true,
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="bg-neutral-800 p-4 rounded-lg shadow-md mb-4">
      <div className="flex items-center mb-4">
        <img src={coin.iconUrl} alt={coin.name} className="h-10 w-10 mr-4" />
        <div>
          <h3 className="text-lg font-semibold text-white">{coin.name}</h3>
          <p className="text-sm text-gray-400">{coin.symbol}</p>
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xl font-bold text-white">${parseFloat(coin.price).toFixed(2)}</p>
        <p className={`text-sm ${parseFloat(coin.change) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {parseFloat(coin.change).toFixed(2)}%
          {parseFloat(coin.change) >= 0 ? <FaArrowUp className="inline ml-1" /> : <FaArrowDown className="inline ml-1" />}
        </p>
      </div>
      <div className="w-full h-32">
        <Line data={chartData} options={{
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              grid: {
                color: 'rgba(255, 255, 255, 0.2)',
              },
              ticks: {
                color: '#ffffff',
              },
            },
          },
        }} />
      </div>
    </div>
  );
};

export default CoinCard;
