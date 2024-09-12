import React from 'react';
import { Link } from 'react-router-dom';
import BuyStock from '../modals/BuyStock';

const StockCard = ({ stockSymbol, stockName, stockPrice, stockChange }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      <h3 className="text-xl font-semibold text-gray-800">{stockName}</h3>
      <p className="text-gray-600">Symbol: {stockSymbol}</p>
      <div className="mt-2">
        <span className="text-2xl font-bold text-gray-900">${stockPrice}</span>
        <span className={`ml-2 text-sm ${stockChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {stockChange >= 0 ? '+' : ''}{stockChange}%
        </span>
      </div>
      <Link
        to={`/stock/${stockSymbol}`}
        className="mt-4 mr-2 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg text-center"
      >
        View Details
      </Link>
      <BuyStock/>
      <Link
        to={`/stock/${stockSymbol}`}
        className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg text-center"
      >
        SELL 
      </Link>
    </div>
  );
};

export default StockCard;
