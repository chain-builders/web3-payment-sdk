import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAccount } from "wagmi";
import { Currency } from "../types";

interface CurrencyDropdownProps {
  currencies: Currency[];
  selectedCurrency: Currency;
  onSelect: (currency: Currency) => void;
  amount: string;
  balance: number;
  show?: boolean;
}

const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({
  currencies,
  selectedCurrency,
  onSelect,
  amount,
  balance,
  show = true
}) => {
  const { address } = useAccount();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (currency: Currency) => {
    onSelect(currency);
    setIsOpen(false);
  };

  const isInsufficientBalance = parseFloat(amount) > balance;

  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full">
      <div className="relative w-full flex justify-center">
        <motion.div
          className="py-1 px-4 flex gap-1 items-center text-xs border border-[#0052FF] bg-[#0052FF]/20 rounded-full cursor-pointer"
          onClick={toggleDropdown}
          whileTap={{ scale: 0.97 }}
        >
          {selectedCurrency.network?.icon && (
            <img
              src={selectedCurrency.network.icon}
              className="h-3"
              alt={selectedCurrency.network.name}
            />
          )}
          {selectedCurrency.network?.name} <span className="px-2">|</span>{" "}
          <img
            src={selectedCurrency.icon}
            alt={selectedCurrency.name}
            className="h-3 w-3"
          />{" "}
          {selectedCurrency.name}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5"
            >
              <path
                fillRule="evenodd"
                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute top-8 z-10 bg-white rounded-lg shadow-lg w-48 overflow-hidden"
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              {currencies.map((currency) => (
                <motion.div
                  key={currency.id}
                  className={`px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100 ${
                    selectedCurrency.id === currency.id ? "bg-gray-50" : ""
                  }`}
                  onClick={() => handleSelect(currency)}
                  whileHover={{ backgroundColor: "#f3f4f6" }}
                  whileTap={{ backgroundColor: "#e5e7eb" }}
                >
                  <img
                    src={currency.icon}
                    alt={currency.name}
                    className="h-5 w-5"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-medium">
                      {currency.symbol}
                    </span>
                    <span className="text-[10px] text-gray-500">
                      {currency.network?.name}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

{show && (
  <>
      <motion.h2
        className={`text-2xl font-semibold ${
          isInsufficientBalance ? "text-red-600" : "text-gray-900"
        }`}
        key={selectedCurrency.id + amount}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {amount} {selectedCurrency.symbol}
      </motion.h2>
      <p
        className={`text-sm ${
          isInsufficientBalance ? "text-red-600" : "text-green-700"
        } `}
      >
        Your balance: {balance}{" "}
      </p>
  </>
)}
    </div>
  );
};

export default CurrencyDropdown;
