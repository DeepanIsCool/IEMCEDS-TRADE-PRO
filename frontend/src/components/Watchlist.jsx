import React from 'react';
import StockCard from './StockCard';

const Watchlist = () => {
  const watchlistStocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 150.25, change: 2.5 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2750.80, change: -1.2 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 3300.00, change: 1.8 },
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Watchlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {watchlistStocks.map((stock) => (
          <StockCard
            key={stock.symbol}
            stockSymbol={stock.symbol}
            stockName={stock.name}
            stockPrice={stock.price}
            stockChange={stock.change}
          />
        ))}
      </div>
    </div>
  );
};

export default Watchlist;