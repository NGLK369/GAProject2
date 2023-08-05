import React from 'react';
import './App.css';
import CurrencyConverter from './Components/CurrencyConverter';
import HistoricalData from './Components/HistoricalData';

const App = () => {
  return (
    <div className="App">
      <div className="container">
        <CurrencyConverter />
      </div>
    </div>
  );
};

export default App;
