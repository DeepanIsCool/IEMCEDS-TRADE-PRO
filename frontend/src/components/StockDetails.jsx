import React from 'react';
import { useParams } from 'react-router-dom';

const StockDetails = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Stock Details: {id}</h1>
      </header>
      <main className="mt-6">
        <section className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700">Stock Information</h2>
          {/* information {id} gulo ekhane */}
        </section>
        <section className="bg-white p-6 rounded-lg shadow-lg mt-6">
          <h2 className="text-xl font-semibold text-gray-700">Interactive Chart</h2>
          {/* chart {id} gulo ekhane */}
        </section>
        <section className="bg-white p-6 rounded-lg shadow-lg mt-6">
          <h2 className="text-xl font-semibold text-gray-700">News and Analysis</h2>
          {/* news and analysis ekhane */}
        </section>
      </main>
    </div>
  );
}

export default StockDetails;
