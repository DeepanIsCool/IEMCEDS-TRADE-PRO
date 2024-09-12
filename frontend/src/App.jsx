import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import StockDetails from './components/StockDetails';
import Portfolio from './components/Portfolio';
import Watchlist from './components/Watchlist';
import News from './components/News';
import Learn from './components/Learn';
import Profile from './components/Profile';
import AuthPage from './components/AuthPage';
import Trading from './components/Trading/Trading';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/stock/:id" element={<StockDetails />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/news" element={<News />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/trading" element={<Trading />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;