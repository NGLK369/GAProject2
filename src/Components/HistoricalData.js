import React from 'react';

const HistoricalData = ({ showAll, historyData, handleToggleCurrencies }) => {
  const displayData = showAll
    ? Object.keys(historyData)
    : Object.keys(historyData).slice(0, 10);
  const moreThan10Currencies = Object.keys(historyData).length > 10;

  return (
    <div>
      <h3>Historical Exchange Rates</h3>
      <div className="historical-data-container">
        <table>
          <thead>
            <tr>
              <th>Currency</th>
              <th>Exchange Rate</th>
            </tr>
          </thead>
          <tbody>
            {displayData.map((currency) => (
              <tr key={currency}>
                <td>{currency}</td>
                <td>{historyData[currency]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {moreThan10Currencies && !showAll && (
        <button onClick={handleToggleCurrencies} className="button view-history-button">
          Show All Currencies
        </button>
      )}
    </div>
  );
};

export default HistoricalData;
