import React, { useState } from 'react';
import axios from 'axios';
import HistoricalData from './HistoricalData';

const ViewHistory = ({ appId, getFormattedDate }) => {
  const [showHistory, setShowHistory] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [showAllCurrencies, setShowAllCurrencies] = useState(false);

  const handleViewHistory = async () => {
    const historyUrl = `https://openexchangerates.org/api/historical/${getFormattedDate()}.json?app_id=${appId}`;

    try {
      const response = await axios.get(historyUrl);
      setHistoryData(response.data.rates);
      setShowHistory(true);
      setShowAllCurrencies(false); // Reset showAllCurrencies to false initially
    } catch (error) {
      console.error('Error fetching historical exchange rates:', error);
    }
  };

  const handleToggleCurrencies = () => {
    setShowAllCurrencies((prevShowAll) => !prevShowAll);
  };

  return (
    <div>
      <div className="view-history-container">
        <button onClick={handleViewHistory} className="view-history-button">
          View History
        </button>
      </div>
      {showHistory && (
        <div>
          <HistoricalData
            showAll={showAllCurrencies}
            historyData={historyData}
            handleToggleCurrencies={handleToggleCurrencies}
          />
        </div>
      )}
    </div>
  );
};

export default ViewHistory;
