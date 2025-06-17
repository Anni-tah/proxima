import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, Cell
} from "recharts";

// Bright vibrant colors
const COLORS = [
  "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0",
  "#9966FF", "#FF9F40", "#00C49F", "#FF6F91",
  "#FFD700", "#7ED6DF"
];

const GroupSavingsChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/group-savings-summary")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((group, index) => ({
          name: group.group_name,
          total_savings: group.total_savings,
          fill: COLORS[index % COLORS.length]
        }));
        setChartData(formatted);
      })
      .catch((err) => console.error("Failed to fetch savings data", err));
  }, []);

  return (
    <div className="w-full h-80 bg-white p-4 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold text-[#265073] mb-4 text-center">Group Savings Overview</h2>
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-15} textAnchor="end" height={60} />
            <YAxis />
            <Tooltip formatter={(value) => `Ksh ${value}`} />
            <Legend />
            <Bar dataKey="total_savings" name="Total Savings" isAnimationActive fill="#2D9596">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center text-[#2D9596] font-medium">No savings data to display.</p>
      )}
    </div>
  );
};

export default GroupSavingsChart;
