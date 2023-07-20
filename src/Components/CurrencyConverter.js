import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyConverter = () => {
  const [baseCurrency, setBaseCurrency] = useState('SGD');
  const [targetCurrency, setTargetCurrency] = useState('MYR');
  const [amount, setAmount] = useState(0);
  const [exchangeRates, setExchangeRates] = useState({});
  const [convertedAmount, setConvertedAmount] = useState(0);

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

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  const fetchExchangeRates = async () => {
    const appId = '06c38c7636b64372843be67c14d79ed0'; // Replace with your Open Exchange Rates App ID
    const url = `https://openexchangerates.org/api/latest.json?app_id=${appId}`;

    try {
      const response = await axios.get(url);
      setExchangeRates(response.data.rates);
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

  return (
    <div>
      <h2>Currency Converter</h2>
      <div>
        <label>
          Base Currency:
          <select value={baseCurrency} onChange={handleBaseCurrencyChange}>
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Target Currency:
          <select value={targetCurrency} onChange={handleTargetCurrencyChange}>
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Amount:
          <input type="number" value={amount} onChange={handleAmountChange} />
        </label>
      </div>
      <div>
        <button onClick={convertCurrency}>Convert</button>
        <button onClick={resetConverter}>Reset</button>
      </div>
      <div>
        <h3>
          Converted Amount: {convertedAmount} {targetCurrency}
        </h3>
      </div>
    </div>
  );
};

export default CurrencyConverter;
