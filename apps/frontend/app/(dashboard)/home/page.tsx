import React from "react";

const page = () => {
  const transactions = [
    {
      amount: "20.00",
      hash: "0xCe2682E44734b96361BD...",
      type: "User Payment",
      status: "received",
    },
    {
      amount: "50.00",
      hash: "0xFa9923E55834c87251AC...",
      type: "Wallet Withdrawal",
      status: "sent",
    },
    {
      amount: "15.00",
      hash: "0xBb7834F66945d82341EF...",
      type: "User Payment",
      status: "received",
    },
    {
      amount: "100.00",
      hash: "0xAc4512D88967e12389GH...",
      type: "Wallet Withdrawal",
      status: "sent",
    },
    {
      amount: "35.00",
      hash: "0xDe8845K77856f45672JK...",
      type: "User Payment",
      status: "received",
    },
    {
      amount: "75.00",
      hash: "0xMn9956L88967p56783OP...",
      type: "Wallet Withdrawal",
      status: "sent",
    },
  ];
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

        <div className=""></div>
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
              200.00 USDT
            </h1>

            <div>
              <span>ox0000********</span>
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
      <div className="w-full flex flex-col mt-2 gap-6  px-4">
        {transactions.map((transaction, index) => (
          <div key={index} className="flex justify-between items-center">
            <div className="">
              <h4 className="font-clash-display">{transaction.amount} USDT</h4>
              <p className="text-sm text-gray-500">Hash - {transaction.hash}</p>
            </div>

            <div
              className={`font-clash-display py-1 text-xs px-4 ${
                transaction.type === "User Payment"
                  ? "bg-purple-600/20 text-purple-600 border-purple-600"
                  : "bg-red-600/20 text-red-600 border-red-600"
              } rounded-full`}
            >
              <h4>{transaction.type}</h4>
            </div>

            <div
              className={`h-10 w-10 ${
                transaction.type === "User Payment"
                  ? "bg-green-600/10 text-green-600"
                  : "bg-red-600/10 text-red-600"
              } flex items-center justify-center rounded-full`}
            >
              {transaction.type === "User Payment" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.78 5.22a.75.75 0 0 0-1.06 0L6.5 12.44V6.75a.75.75 0 0 0-1.5 0v7.5c0 .414.336.75.75.75h7.5a.75.75 0 0 0 0-1.5H7.56l7.22-7.22a.75.75 0 0 0 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
