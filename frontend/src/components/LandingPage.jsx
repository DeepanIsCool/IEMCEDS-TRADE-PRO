import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const [stockTicker, setStockTicker] = useState([
    { symbol: 'AAPL', price: 150.25, change: '+2.5%' },
    { symbol: 'GOOGL', price: 2750.80, change: '-1.2%' },
    { symbol: 'AMZN', price: 3300.00, change: '+1.8%' },
    { symbol: 'MSFT', price: 300.50, change: '+0.5%' },
    { symbol: 'FB', price: 330.20, change: '-0.7%' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStockTicker(prevTicker => 
        prevTicker.map(stock => ({
          ...stock,
          price: +(stock.price + (Math.random() - 0.5) * 5).toFixed(2),
          change: `${(Math.random() - 0.5) > 0 ? '+' : '-'}${(Math.random() * 2).toFixed(1)}%`
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="text-3xl font-bold text-blue-600">TradePro</div>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#features" className="text-gray-600 hover:text-blue-600">Features</a></li>
              <li><a href="#testimonials" className="text-gray-600 hover:text-blue-600">Testimonials</a></li>
              <li><a href="#pricing" className="text-gray-600 hover:text-blue-600">Pricing</a></li>
            </ul>
          </nav>
          <Link
            to="/auth"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Login
          </Link>
        </div>
      </header>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-blue-600 text-white py-2 overflow-hidden"
      >
        <div className="flex animate-ticker">
          {stockTicker.map((stock, index) => (
            <div key={index} className="flex items-center space-x-4 mr-8">
              <span className="font-bold">{stock.symbol}</span>
              <span>${stock.price}</span>
              <span className={stock.change.startsWith('+') ? 'text-green-300' : 'text-red-300'}>{stock.change}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <main>
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-5xl font-bold text-gray-800 mb-6"
            >
              Trade Smarter, Faster, Better
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xl text-gray-600 mb-12"
            >
              Join millions of traders and investors making better decisions with TradePro.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link
                to="/auth"
                className="px-8 py-3 bg-green-500 text-white text-lg rounded-lg hover:bg-green-600 transition duration-300"
              >
                Get Started
              </Link>
            </motion.div>
          </div>
        </section>

        <section id="features" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose TradePro?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Real-time Data', description: 'Get up-to-the-second market data and insights.' },
                { title: 'Advanced Analytics', description: 'Powerful tools to analyze stocks and make informed decisions.' },
                { title: 'Secure Trading', description: 'Bank-level security to keep your investments safe.' },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 * index }}
                  className="bg-white p-6 rounded-lg shadow-lg"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { name: 'John D.', text: 'TradePro has completely transformed my trading experience. The insights and tools are unmatched!' },
                { name: 'Sarah M.', text: 'As a beginner, TradePro made it easy for me to start investing with confidence. Highly recommended!' },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 * index }}
                  className="bg-white p-6 rounded-lg shadow-lg"
                >
                  <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                  <p className="font-semibold text-gray-800">- {testimonial.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Choose Your Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: 'Basic', price: '$0', features: ['Real-time quotes', 'Basic charting', 'Market news'] },
                { name: 'Pro', price: '$29/mo', features: ['Advanced analytics', 'Real-time alerts', 'Portfolio tracking'] },
                { name: 'Elite', price: '$99/mo', features: ['AI-powered insights', 'Personalized strategy', '24/7 support'] },
              ].map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 * index }}
                  className="bg-white p-6 rounded-lg shadow-lg text-center"
                >
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{plan.name}</h3>
                  <p className="text-4xl font-bold text-blue-600 mb-6">{plan.price}</p>
                  <ul className="text-gray-600 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="mb-2">{feature}</li>
                    ))}
                  </ul>
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                    Choose Plan
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-4">TradePro</h3>
              <p>Empowering traders worldwide.</p>
            </div>
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul>
                <li><a href="#" className="hover:text-blue-400">About Us</a></li>
                <li><a href="#" className="hover:text-blue-400">Contact</a></li>
                <li><a href="#" className="hover:text-blue-400">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
              </ul>
            </div>
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-blue-400">Facebook</a>
                <a href="#" className="hover:text-blue-400">Twitter</a>
                <a href="#" className="hover:text-blue-400">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; 2024 TradePro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;