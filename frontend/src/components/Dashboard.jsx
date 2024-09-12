import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import StockCard from './StockCard'; // Assuming you have a StockCard component
import axios from 'axios';

const Dashboard = () => {
  const [userDetails, setUserDetails] = useState([]); // Store user details here
  const [loading, setLoading] = useState(true); // Track loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        console.log('User details:', response.data); // Log response for debugging
        setUserDetails(response.data); // Store data in state
        setLoading(false); // Stop loading once data is fetched
      } catch (error) {
        console.error('Error fetching user details:', error);
        setLoading(false); // Stop loading if an error occurs
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) {
    return <p>Loading user data...</p>; // Display loading state
  }

  // if (!userDetails) {
  //   return <p>No user data available. Please try again later.</p>; // Handle null or empty state
  // }
  const logout = () => {
    localStorage.removeItem('authToken');// Remove accessToken from localStorage
    console.clear() 
    navigate('/'); // Redirect to login page
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      <aside className="w-full md:w-1/5 bg-blue-600 text-white p-6">
        <nav>
          <ul>
            <motion.li whileHover={{ scale: 1.05 }} className="mb-4">
              <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.05 }} className="mb-4">
              <Link to="/portfolio" className="hover:text-gray-300">Portfolio</Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.05 }} className="mb-4">
              <Link to="/watchlist" className="hover:text-gray-300">Watchlist</Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.05 }} className="mb-4 font-extrabold">
              <Link to="/trading" className="hover:text-gray-300">TRADING</Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.05 }} className="mb-4">
              <Link to="/news" className="hover:text-gray-300">News</Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.05 }} className="mb-4">
              <Link to="/learn" className="hover:text-gray-300">Learn</Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.05 }} className="mb-4">
              <Link to="/profile" className="hover:text-gray-300">Profile</Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.05 }} className="mb-4">
              <button onClick={logout} className="hover:text-gray-300">Log Out</button>
            </motion.li>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 bg-white rounded-lg shadow-lg"
          >
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Cash Holdings</h2>
            <p className="text-3xl font-bold text-green-600">${userDetails.cash_holding.cash_in_hand}</p>
            <h2 className="text-xl font-semibold text-gray-700 my-4">Intraday Profit/Loss</h2>
            <p className="text-3xl font-bold text-green-600">${userDetails.cash_holding.intraday_profit_loss}</p>
            <h2 className="text-xl font-semibold text-gray-700 my-4">Intraday Buy</h2>
            <p className="text-3xl font-bold text-green-600">${userDetails.intraday_holdings.intraday_buy}</p>
            <h2 className="text-xl font-semibold text-gray-700 my-4">Intraday Sell</h2>
            <p className="text-3xl font-bold text-green-600">${userDetails.intraday_holdings.intraday_sell}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-6 bg-white rounded-lg shadow-lg"
          >
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Watchlist</h2>
            <StockCard stockSymbol="AAPL" stockName="Apple Inc." stockPrice={150.25} stockChange={2.5} />
            <StockCard stockSymbol="GOOGL" stockName="Alphabet Inc." stockPrice={2750.80} stockChange={-1.2} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="p-6 bg-white rounded-lg shadow-lg"
          >
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Market Overview</h2>
            <ul>
              <li className="flex justify-between items-center mb-2">
                <span>S&P 500</span>
                <span className="text-green-600">+1.2%</span>
              </li>
              <li className="flex justify-between items-center mb-2">
                <span>NASDAQ</span>
                <span className="text-red-600">-0.5%</span>
              </li>
              <li className="flex justify-between items-center">
                <span>DOW</span>
                <span className="text-green-600">+0.8%</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;