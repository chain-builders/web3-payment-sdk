"use client";
import { AppSelect } from "@/components/dashboard/AppSelect";
import {
  useGetPayments,
  useGetUsdcBalance,
  useGetUsdtBalance,
} from "@/hooks/use-contract";
import { maskWalletAddress } from "@/utils/maskAddress";
import { Loader2 } from "lucide-react";
import React from "react";
import { useAccount } from "wagmi";

export interface Ipayment {
  amount: any;
  token: number;
  appName: string;
}

const Dashboard = () => {
  enum TOKENS {
    usdt = "USDT",
    usdc = "USDT",
  }

  const { usdtBalance, loadingUsdtBalance } = useGetUsdtBalance();

  const { payments, loadingpayments } = useGetPayments();

  const { address } = useAccount();

  const readableBalance = usdtBalance
    ? (Number(usdtBalance) / 1e6).toLocaleString()
    : "0.00";

  const usdtLogo =
    "https://cdn.vectorstock.com/i/1000v/63/71/tether-symbol-icon-usdt-logo-crypto-vector-41056371.jpg";
  const usdcLogo =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ43MuDqq54iD1ZCRL_uthAPkfwSSL-J5qI_Q&s";

  const [currencyTab, setCurrencyTab] = React.useState<1 | 2>(1);


  

  const uniqueAppNames = Array.from(
    new Set(payments?.map((item) => item.appName))
  );
  const [selectedApp, setSelectedApp] = React.useState<string | null>(
    uniqueAppNames[0] || null
  );
  const filteredPayments = selectedApp
    ? payments?.filter((item) => item.appName === selectedApp)
    : payments;


  const totalRaw = filteredPayments?.reduce((acc, item) => acc + item.amount, 0n) ?? 0n;
  const totalUsd = Number(totalRaw) / 1e6;

  const formattedUsd = totalUsd.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });
  const filteredByCurrency = filteredPayments?.filter(
    (item) => item.token === currencyTab
  );

  const firstFiveTrx = filteredByCurrency?.slice(0, 5).map((item) => ({
    appName: item.appName,
    amount: item.amount,
    currency: item.token,
    type: "User Payment",
  }));

  if (loadingpayments) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader2 size="20" color="purple" className="animate-spin" />
      </div>
    );
  }

  console.log(uniqueAppNames);

  console.log(`Total Balance: $${totalUsd.toFixed(2)}`);

  return (
    <div className="w-full flex flex-col gap-4 mt-8 px-10">
      <header className="flex justify-between items-center px-4 mb-3 mt-1">
        <div>
          <h1 className="text-xl font-bold font-clash-display  text-gray-600">
            Dashboard
          </h1>

          <p className="text-gray-500">
            Accruements of payments made through paytrons sdk in your
            application
          </p>
        </div>

        <div>
          <AppSelect
            apps={uniqueAppNames}
            selected={selectedApp}
            onSelect={setSelectedApp}
          />
        </div>
      </header>
      <div
        className="  bg-purple-800 rounded-2xl py-6 px-8 text-white"
        style={{
          backgroundImage: "url(/headercurvebg.webp)",
        }}
      >
        <div className="flex justify-between items-center">
          <div className="">
            <p className="">Total Balance</p>
            <h1 className="text-3xl font-bold font-clash-display my-1.5">
              {loadingUsdtBalance ? (
                <Loader2 size="20" color="purple" className="animate-spin" />
              ) : (
                formattedUsd
              )}
            </h1>

            <div>
              <span>{maskWalletAddress(address as string)} </span>
            </div>
          </div>
          <div className="">
            <button className="py-2 px-4 rounded-full bg-white text-black text-sm font-clash-display">
              Withdraw funds
            </button>
          </div>
        </div>
      </div>

      <h1 className="text-lg mt-6 font-bold font-clash-display px-4 text-gray-600">
        Activity overview
      </h1>
      <hr className="border border-gray-300" />

      {/* Currency Tabs */}
      <div className="flex gap-6 px-4 mt-2">
        <button
          className={`flex items-center gap-2 px-5 py-2 rounded-full font-clash-display text-sm font-semibold transition-all ${
            currencyTab === 1
              ? "bg-purple-700 text-white "
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
              ? "bg-purple-700 text-white shadow-lg"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setCurrencyTab(2)}
        >
          <img src={usdcLogo} alt="USDC" className="w-5 h-5 rounded-full" />
          USDC
        </button>
      </div>

      <div className="w-full flex flex-col mt-3 px-4">
        {firstFiveTrx && firstFiveTrx.length > 0 ? (
          firstFiveTrx.map((transaction, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white rounded-xl px-6 py-4 transition"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                  <img
                    src={transaction.currency === 1 ? usdtLogo : usdcLogo}
                    alt={transaction.currency === 1 ? "USDT" : "USDC"}
                    className="w-7 h-7 rounded-full"
                  />
                </div>
                <div>
                  <h4 className="font-clash-display text-md font-semibold text-gray-600">
                    {(Number(transaction.amount) / 1e6).toLocaleString()}{" "}
                    {transaction.currency === 1 ? "USDT" : "USDC"}
                  </h4>
                  <p className="text-xs text-gray-500">{transaction.appName}</p>
                </div>
              </div>
              <div
                className={`font-clash-display py-1 text-xs px-4 rounded-full border ${
                  transaction.type === "User Payment"
                    ? "bg-purple-600/20 text-purple-600 border-purple-600"
                    : "bg-green-600/20 text-green-600 border-green-600"
                }`}
              >
                <h4>{transaction.type}</h4>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-400 font-clash-display text-center py-8">
            No transactions for this currency yet.
          </div>
        )}

        <div className="font-clash-display text-purple-800 mt-4 cursor-pointer hover:underline text-center">
          View all transactions
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
