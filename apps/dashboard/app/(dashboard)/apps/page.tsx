"use client";
import React from "react";
import { useGetPayments } from "@/hooks/use-contract";
import { Loader2 } from "lucide-react";

const AppsPage = () => {
  const { payments, loadingpayments } = useGetPayments();

  // Extract unique app names
  const uniqueAppNames = React.useMemo(() => {
    if (!payments) return [];
    return Array.from(new Set(payments.map((item) => item.appName)));
  }, [payments]);

  if (loadingpayments) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader2 size="20" color="purple" className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4 mt-8 px-10">
      <header className="px-4 mb-6 mt-1">
        <h1 className="text-xl font-bold font-clash-display text-gray-600">
          Connected Apps
        </h1>
        <p className="text-gray-500">
          All applications connected to your Paytron account
        </p>
      </header>
      <div className="w-full flex flex-col gap-4 px-4">
        {uniqueAppNames.length > 0 ? (
          uniqueAppNames.map((appName, idx) => (
            <div
              key={appName}
              className="flex items-center justify-between bg-white rounded-xl px-6 py-4 shadow-sm"
            >
              <span className="font-clash-display text-lg text-gray-700">{appName}</span>
              <button
                className="py-2 px-5 rounded-full bg-red-200 text-red-400 font-clash-display text-sm font-semibold cursor-not-allowed"
                disabled
              >
                Disable
              </button>
            </div>
          ))
        ) : (
          <div className="text-gray-400 font-clash-display text-center py-8">
            No connected apps found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AppsPage;