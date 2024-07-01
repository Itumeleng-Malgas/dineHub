"use client";
import React from 'react';
import { Card, Statistic } from 'antd';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

interface StatisticCardProps {
  title: string;
  value: number;
  data: {
    labels: string[];
    values: number[];
  };
}

const StatisticCard: React.FC<StatisticCardProps> = ({ title, value, data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: title,
        data: data.values,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        fill: false,
      },
    ],
  };

  return (
    <Card className="mb-4">
      <div className="flex flex-col lg:flex-row items-center justify-between">
        <div className='mr-1'>
          <Statistic title={title} value={value} />
        </div>
        <div>
          {title === 'Total Sales' ? (
            <Bar data={chartData} />
          ) : (
            <Line data={chartData} />
          )}
        </div>
      </div>
    </Card>
  );
};

export default StatisticCard;