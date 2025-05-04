"use client";
// import { useDisconnect } from "@reown/appkit/react";
import { useDisconnect } from 'wagmi'
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const DashboardNav = () => {
  const pathName = usePathname();
  const router = useRouter();
  const { disconnect } = useDisconnect();

  const handleSignout = async () => {
    disconnect();
    router.push("/");
  };
  const [activePage, setActivePage] = React.useState("Dashboard");

  const navItems = [
    { label: "Dashboard", link: "/dashboard" },
    { label: "Transactions", link: "/transactions" },
    { label: "Payouts", link: "/payouts" },
    { label: "Apps", link: "/apps" },
  ];

  return (
    <div className="bg-black py-4 text-white px-6 shadow rounded-full flex items-center justify-between">
      <h1 className="text-lg font-clash-display font-bold">Paytron</h1>

      <div className="flex font-clash-display text-sm gap-6">
        {navItems.map((item) => (
          <div
            key={item.link}
            onClick={() => router.push(item.link)}
            className={`flex px-4 py-2 cursor-pointer transition-all duration-300 ease-linear ${
              pathName === item.link
                ? "bg-gray-100 rounded-full text-black"
                : "text-white"
            }`}
          >
            {item.label}
          </div>
        ))}
      </div>
      <button
        onClick={handleSignout}
        className="text-sm cursor-pointer py-2 flex items-center gap-1 px-8 bg-white rounded-4xl text-black font-clash-display font-medium"
      >
        Signout
      </button>
    </div>
  );
};

export default DashboardNav;
