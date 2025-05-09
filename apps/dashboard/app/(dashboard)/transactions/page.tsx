"use client";
import React from "react";
import { useGetPayments } from "@/hooks/use-contract";
import { Loader2 } from "lucide-react";

const usdtLogo =
  "https://cdn.vectorstock.com/i/1000v/63/71/tether-symbol-icon-usdt-logo-crypto-vector-41056371.jpg";
const usdcLogo =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ43MuDqq54iD1ZCRL_uthAPkfwSSL-J5qI_Q&s";

const TransactionsPage = () => {
  const { payments, loadingpayments } = useGetPayments();
  const [currencyTab, setCurrencyTab] = React.useState<1 | 2 | null>(null);

  const filteredPayments = React.useMemo(() => {
    if (!payments) return [];
    if (!currencyTab) return payments;
    return payments.filter((item) => item.token === currencyTab);
  }, [payments, currencyTab]);

  if (loadingpayments) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader2 size="20" color="purple" className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4 mt-8 px-10">
      <header className="flex justify-between items-center px-4 mb-3 mt-1">
        <div>
          <h1 className="text-xl font-bold font-clash-display text-gray-600">
            Transactions
          </h1>
          <p className="text-gray-500">
            All transactions made through Paytron SDK in your applications
          </p>
        </div>
      </header>

      {/* Currency Tabs */}
      <div className="flex gap-6 px-4 mt-4">
        <button
          className={`flex items-center gap-2 px-5 py-2 rounded-full font-clash-display text-sm font-semibold transition-all ${
            currencyTab === null
              ? "bg-purple-700 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setCurrencyTab(null)}
        >
          All
        </button>
        <button
          className={`flex items-center gap-2 px-5 py-2 rounded-full font-clash-display text-sm font-semibold transition-all ${
            currencyTab === 1
              ? "bg-purple-700 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setCurrencyTab(1)}
        >
          <img src={usdtLogo} alt="USDT" className="w-5 h-5 rounded-full" />
          USDT
        </button>
        <button
          className={`flex items-center gap-2 px-5 py-2 rounded-full font-clash-display text-sm font-semibold transition-all ${
            currencyTab === 2
              ? "bg-purple-700 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setCurrencyTab(2)}
        >
          <img src={usdcLogo} alt="USDC" className="w-5 h-5 rounded-full" />
          USDC
        </button>
      </div>

      <div className="w-full flex flex-col mt-6 px-4 gap-3">
        {filteredPayments.length > 0 ? (
          filteredPayments.map((transaction, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white rounded-xl px-6 py-4 transition"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                  <img
                    src={transaction.token === 1 ? usdtLogo : usdcLogo}
                    alt={transaction.token === 1 ? "USDT" : "USDC"}
                    className="w-7 h-7 rounded-full"
                  />
                </div>
                <div>
                  <h4 className="font-clash-display text-md font-semibold text-gray-600">
                    {(Number(transaction.amount) / 1e6).toLocaleString()}{" "}
                    {transaction.token === 1 ? "USDT" : "USDC"}
                  </h4>
                  <p className="text-xs text-gray-500">{transaction.appName}</p>
                </div>
              </div>
              <div
                className={`font-clash-display py-1 text-xs px-4 rounded-full border bg-purple-600/20 text-purple-600 border-purple-600`}
              >
                User Payment
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-400 font-clash-display text-center py-8">
            No transactions found.
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionsPage;
