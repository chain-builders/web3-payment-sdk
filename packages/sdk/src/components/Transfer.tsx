import React, { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import CurrencyDropdown from "./CurrencyDropdown";
import { sampleCurrencies } from "../utils";
import { Currency, PaymentOptions } from "../types";

const Transfer = ({ options }: { options: PaymentOptions }) => {
  const [timeLeft, setTimeLeft] = useState(900);
  const walletAddress = "0x1234...5678";
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(
    sampleCurrencies[0]
  );
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <div className="relative">
        <div className="h-full">
          <CurrencyDropdown
            currencies={sampleCurrencies}
            selectedCurrency={selectedCurrency}
            onSelect={setSelectedCurrency}
            amount={options.amount || "14.00"}
            balance={0}
            show={false}
          />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <QRCodeSVG value={walletAddress} size={200} />
      </div>

      <div className="flex items-center space-x-2">
        <span className="font-meidum text-sm">{walletAddress}</span>
        <button
          onClick={copyToClipboard}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
            />
          </svg>
        </button>
      </div>

      <div className="flex gap-2 items-center mb-4 w-5/6 bg-blue-600/10 p-3 rounded-xl border border-blue-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
          />
        </svg>

        <p className="text-xs text-gray-600">
          Please deposit{" "} exactly
          <span className="text-black font-semibold">
            {options.amount} {selectedCurrency.symbol}
          </span>{" "}
          into the wallet address above
        </p>
      </div>

      <div className="text-center">
        <p className="text-xl font-semibold">{formatTime(timeLeft)}</p>
        <p className="text-sm text-gray-500">Time remaining</p>
      </div>

      <button className="mb-4 py-3 w-5/6 bg-[#6750A4] text-white rounded-lg text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
        I have sent it
      </button>
    </div>
  );
};

export default Transfer;
