import React from 'react';
import Navbar from './components/Navbar/Navbar';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <AppRoutes />
    </div>
  );
};

export default App;
