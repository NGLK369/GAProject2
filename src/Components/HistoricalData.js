import React, { useState } from 'react';

const HistoricalData = ({ showAll, historyData, handleToggleCurrencies }) => {
  const itemsPerPage = 10;

  const totalCurrencies = Object.entries(historyData).length;

  const displayedCurrencies = showAll
    ? Object.entries(historyData)
    : Object.entries(historyData).slice(0, itemsPerPage);

  const tableStyle = {
    border: '1px solid #ccc',
    borderCollapse: 'collapse',
    width: '100%',
    marginTop: '10px',
  };

  const thStyle = {
    border: '1px solid #ccc',
    padding: '8px',
    backgroundColor: '#f2f2f2',
  };

  const tdStyle = {
    border: '1px solid #ccc',
    padding: '8px',
  };

  const tableContainerStyle = {
    maxHeight: '300px', // Set the maximum height of the table container
    overflowY: 'auto',  // Enable vertical scrolling when content exceeds the height
  };

  const formatRate = (rate) => {
    return Number(rate).toFixed(5);
  };

  return (
    <div className="historical-data">
      <h2>Historical exchange rates</h2>
      <div style={tableContainerStyle}> {/* Wrap the table with the scrolling container */}
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Currency Code</th>
              <th style={thStyle}>Rate</th>
            </tr>
          </thead>
          <tbody>
            {displayedCurrencies.map(([currencyCode, rate]) => (
              <tr key={currencyCode}>
                <td style={tdStyle}>{currencyCode}</td>
                <td style={tdStyle}>{formatRate(rate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalCurrencies > itemsPerPage && (
        <div style={{ marginTop: '10px' }}>
          <button onClick={handleToggleCurrencies} className="show-all-button">
            {showAll ? 'Unshow All' : 'Show All'}
          </button>
        </div>
      )}
    </div>
  );
};

export default HistoricalData;
