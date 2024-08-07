import React, { useState } from "react";

import { Currency } from "../services/upholdService";

interface CurrencySelectorProps {
  currency: string;
  onCurrencyChange: (currency: string) => void;
  currencies: Currency[];
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  currency,
  onCurrencyChange,
  currencies,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedCurrency = currencies.find((c) => c.code === currency);

  return (
    <div className="absolute right-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 bg-white rounded-full px-2 py-2 shadow-sm  hover:bg-slate-300"
      >
        {selectedCurrency && (
          <img
            src={selectedCurrency.image}
            alt={currency}
            className="w-5 h-5"
          />
        )}
        <span className="font-semibold text-sm">{currency}</span>
        <span className="text-gray-400 text-xs">▼</span>
      </button>
      {isOpen && (
        <div className="absolute bg-white rounded-md">
          {currencies.map((curr) => (
            <button
              key={curr.code}
              className="rounded-md flex items-center w-full p-2 text-left  hover:bg-slate-300"
              onClick={() => {
                onCurrencyChange(curr.code);
                setIsOpen(false);
              }}
            >
              <img src={curr.image} alt={curr.code} className="w-6 h-6 mr-2" />
              <span>{curr.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrencySelector;
