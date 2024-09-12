import React, { useState } from 'react';
import axios from 'axios';

const CreatePortfolioModal = ({ onClose, onCreate }) => {
  const [portfolioName, setPortfolioName] = useState('');
  const [error, setError] = useState('');

  const handleCreatePortfolio = async () => {
    if (!portfolioName) {
      setError('Portfolio name is required');
      return;
    }

    try {
      const response = await axios.post('/api/portfolios', { portfolio_name: portfolioName });
      onCreate(response.data);
      onClose();
    } catch (error) {
      console.error('Error creating portfolio:', error);
      setError('Failed to create portfolio');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Create Portfolio</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          placeholder="Portfolio Name"
          value={portfolioName}
          onChange={(e) => setPortfolioName(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleCreatePortfolio}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePortfolioModal;