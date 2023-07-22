import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyConverter = () => {
  const [baseCurrency, setBaseCurrency] = useState('SGD');
  const [targetCurrency, setTargetCurrency] = useState('MYR');
  const [amount, setAmount] = useState(0);
  const [exchangeRates, setExchangeRates] = useState({});
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [conversionTimestamp, setConversionTimestamp] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [historyData, setHistoryData] = useState([]);

  const currencies = [
    "SGD",
    "MYR",
    "EUR",
    "USD",
    "AUD",
    "JPY",
    "CNH",
    "HKD",
    "CAD",
    "INR",
    "DKK",
    "GBP",
    "RUB",
    "NZD",
    "MXN",
    "IDR",
    "TWD",
    "THB",
    "VND",
  ];

  const appId = '06c38c7636b64372843be67c14d79ed0'; // Replace with your Open Exchange Rates App ID

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  const fetchExchangeRates = async () => {
    const url = `https://openexchangerates.org/api/latest.json?app_id=${appId}`;

    try {
      const response = await axios.get(url);
      setExchangeRates(response.data.rates);
      setConversionTimestamp(new Date(response.data.timestamp * 1000).toString());
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
    }
  };

  const handleBaseCurrencyChange = (event) => {
    setBaseCurrency(event.target.value);
  };

  const handleTargetCurrencyChange = (event) => {
    setTargetCurrency(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const convertCurrency = () => {
    const baseRate = exchangeRates[baseCurrency];
    const targetRate = exchangeRates[targetCurrency];

    if (baseRate && targetRate && !isNaN(baseRate) && !isNaN(targetRate)) {
      const convertedValue = (parseFloat(amount) / baseRate) * targetRate;
      setConvertedAmount(convertedValue.toFixed(2));
    } else {
      setConvertedAmount('Invalid exchange rate');
    }
  };

  const resetConverter = () => {
    setAmount(0);
    setConvertedAmount(0);
  };

  const reverseConversion = () => {
    setBaseCurrency(targetCurrency);
    setTargetCurrency(baseCurrency);
    setConvertedAmount(0);
  };

  const handleViewHistory = async () => {
    const historyUrl = `https://openexchangerates.org/api/historical/${getFormattedDate()}.json?app_id=${appId}`;

    try {
      const response = await axios.get(historyUrl);
      setHistoryData(response.data.rates);
      setShowHistory(true);
      setShowAllCurrencies(false); // Reset showAllCurrencies to false
    } catch (error) {
      console.error('Error fetching historical exchange rates:', error);
    }
  };

  const getFormattedDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    let day = today.getDate();
    day = day < 10 ? `0${day}` : day;
    return `${year}-${month}-${day}`;
  };

  const HistoricalData = ({ showAll }) => {
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

  const [showAllCurrencies, setShowAllCurrencies] = useState(false);

  const handleToggleCurrencies = () => {
    setShowAllCurrencies((prevShowAll) => !prevShowAll);
  };

  return (
    <div>
      <h2 className="currency-converter-header">Currency Converter</h2>
      <div className="container">
        <div className="form-group">
          <label className="label">
            Base Currency:
            <select
              value={baseCurrency}
              onChange={handleBaseCurrencyChange}
              className="select"
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="form-group">
          <label className="label">
            Target Currency:
            <select
              value={targetCurrency}
              onChange={handleTargetCurrencyChange}
              className="select"
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="form-group">
          <label className="label">
            Amount:
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              className="input input-smaller"
            />
          </label>
        </div>
        <div className="form-group">
          <button onClick={reverseConversion} className="button">
            Reverse Conversion
          </button>
        </div>
      </div>
      <div className="buttons-container">
        <button onClick={convertCurrency}>
          Convert
        </button>
        <button onClick={resetConverter}>
          Reset
        </button>
        <button onClick={handleViewHistory} className="view-history-button">
          View History
        </button>
      </div>
      <div>
        <h3 className="converted-amount">
          Converted Amount: {convertedAmount} {targetCurrency}
        </h3>
        {conversionTimestamp && (
          <p className="conversion-timestamp">Conversion Rate as of: {conversionTimestamp}</p>
        )}
      </div>
      {showHistory && (
        <div>
          <HistoricalData showAll={showAllCurrencies} />
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
