import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const Portfolio = () => {
  const [portfolioData, setPortfolioData] = useState([]);

  useEffect(() => {
    // Simulated data fetch
    setPortfolioData([
      { name: 'AAPL', value: 5000 },
      { name: 'GOOGL', value: 4000 },
      { name: 'AMZN', value: 3000 },
      { name: 'MSFT', value: 2000 },
      { name: 'FB', value: 1000 },
    ]);
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Portfolio</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Portfolio Allocation</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={portfolioData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {portfolioData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Holdings</h2>
          <ul>
            {portfolioData.map((stock, index) => (
              <li key={index} className="flex justify-between items-center mb-2">
                <span>{stock.name}</span>
                <span>${stock.value.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

export default Portfolio;