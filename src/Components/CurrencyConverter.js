import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HistoricalData from './HistoricalData';
import ConvertCurrency from './ConvertCurrency';
import ViewHistory from './ViewHistory';

const CurrencyConverter = () => {
  const [baseCurrency, setBaseCurrency] = useState('SGD');
  const [targetCurrency, setTargetCurrency] = useState('MYR');
  const [amount, setAmount] = useState(0);
  const [exchangeRates, setExchangeRates] = useState({});
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [conversionTimestamp, setConversionTimestamp] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [showAllCurrencies, setShowAllCurrencies] = useState(true); // Default to showing all currencies

  // option list of currency
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

  const appId = '06c38c7636b64372843be67c14d79ed0'; // Open Exchange Rates App ID

  // fetch latest rate
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

  // reset function
  const resetConverter = () => {
    setAmount(0);
    setConvertedAmount(0);
  };

  // swap direction
  const reverseConversion = () => {
    setBaseCurrency(targetCurrency);
    setTargetCurrency(baseCurrency);
    setConvertedAmount(0);
  };

  // function to toggle
  const handleToggleCurrencies = () => {
    setShowAllCurrencies((prevShowAll) => !prevShowAll);
  };

  // date for fetching data
  const getFormattedDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    let day = today.getDate();
    day = day < 10 ? `0${day}` : day;
    return `${year}-${month}-${day}`;
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
        <div className="form-group button-row">
          <button onClick={reverseConversion} className="button">
            Reverse Conversion
          </button>
          <ConvertCurrency
            baseCurrency={baseCurrency}
            targetCurrency={targetCurrency}
            amount={amount}
            exchangeRates={exchangeRates}
            setConvertedAmount={setConvertedAmount}
          />
          <button onClick={resetConverter} className="button">
            Reset
          </button>
        </div>
      </div>
      <div>
        <h3 className="converted-amount">
          Converted Amount: {convertedAmount} {targetCurrency}
        </h3>
        {conversionTimestamp && (
          <p className="conversion-timestamp">Conversion Rate as of: {conversionTimestamp}</p>
        )}
      </div>
      <ViewHistory
        appId={appId}
        getFormattedDate={getFormattedDate} // Pass the getFormattedDate function to ViewHistory
        handleToggleCurrencies={handleToggleCurrencies}
      />
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

export default CurrencyConverter;
