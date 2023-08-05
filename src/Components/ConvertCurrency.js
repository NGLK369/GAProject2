import React from 'react';

const ConvertCurrency = ({ baseCurrency, targetCurrency, amount, exchangeRates, setConvertedAmount }) => {
  // Function to convert currency
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

  return (
    <button onClick={convertCurrency} className="button">
      Convert
    </button>
  );
};

export default ConvertCurrency;
