"use client";
import React from "react";

const DashboardNav = () => {
  const [activePage, setActivePage] = React.useState("Dashboard");

  const navItems = ["Dashboard", "Transactions", "Payouts", "Apps"];

  return (
    <div className="bg-black py-4 text-white px-6 shadow rounded-full flex items-center justify-between">
      <h1 className="text-lg font-clash-display font-bold">Paytron</h1>

      <div className="flex font-clash-display text-sm gap-6">
        {navItems.map((item) => (
          <div
            key={item}
            onClick={() => setActivePage(item)}
            className={`flex px-4 py-2 cursor-pointer transition-all duration-300 ease-linear ${
              activePage === item
                ? "bg-gray-100 rounded-full text-black"
                : "text-white"
            }`}
          >
            {item}
          </div>
        ))}
      </div>
      <button className="text-sm py-2 flex items-center gap-1 px-8 bg-white rounded-4xl text-black font-clash-display font-medium">
        Signout
      </button>
    </div>
  );
};

export default DashboardNav;
