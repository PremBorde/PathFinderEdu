import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styled, { keyframes } from 'styled-components';

const pulseAnimation = keyframes`
  0% { box-shadow: 0 4px 12px rgba(44, 62, 80, 0.1); }
  50% { box-shadow: 0 8px 24px rgba(44, 62, 80, 0.15); }
  100% { box-shadow: 0 4px 12px rgba(44, 62, 80, 0.1); }
`;

const ChartContainer = styled.div`
  height: 400px;
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  }

  .recharts-text {
    fill: #4a5568;
    font-size: 12px;
    font-weight: 500;
  }

  .recharts-cartesian-grid-horizontal line,
  .recharts-cartesian-grid-vertical line {
    stroke: #e2e8f0;
  }

  .recharts-tooltip-wrapper {
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

const data = [
  { name: 'Science', 'Placement Rate': 85, 'Avg. Salary (LPA)': 8.5 },
  { name: 'Commerce', 'Placement Rate': 78, 'Avg. Salary (LPA)': 6.2 },
  { name: 'Arts', 'Placement Rate': 65, 'Avg. Salary (LPA)': 4.8 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: '#2c3e50',
        padding: '12px',
        border: 'none',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
      }}>
        <p style={{ color: '#fff', fontWeight: '600', marginBottom: '8px' }}>{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: '#fff', margin: '4px 0' }}>
            <span style={{ color: entry.color }}>{entry.name}</span>: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const CareerInsightsChart = () => {
  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            tick={{ fill: '#2c3e50', fontWeight: 500 }}
          />
          <YAxis 
            tick={{ fill: '#2c3e50', fontWeight: 500 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{
              paddingTop: '20px',
              fontWeight: 500
            }}
          />
          <Bar dataKey="Placement Rate" fill="#3498db" />
          <Bar dataKey="Avg. Salary (LPA)" fill="#2c3e50" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default CareerInsightsChart; 