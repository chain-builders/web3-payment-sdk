"use client";
import Loader from "@/components/dashboard/Loader";
import React, { useEffect, useState } from "react";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

const Auth = () => {
  const router = useRouter();
  const { open } = useAppKit();
  const { status } = useAppKitAccount();

  const { isConnected, isConnecting } = useAccount();

  const [isLoading, setIsLoading] = useState(true);

  console.log(status, isConnected);

  useEffect(() => {
    if (isConnected) {
      router.push("/dashboard");
    } else {
      setIsLoading(false);
    }
  }, [isConnected, router, status]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="h-[90vh] flex flex-col items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1}
        stroke="currentColor"
        className="size-24 text-gray-300"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
        />
      </svg>
      <div className="mt-6 text-center">
        <h1 className="text-xl font-clash-display font-semibold text-black">
          Paytron Dashboard
        </h1>
        <h3 className="my-3 text-gray-600 font-clash-display">
          To continue, connect your wallet.
        </h3>
        <button
          onClick={() => open({ view: "Connect" })}
          className="bg-purple-800 mt-4 py-2.5 px-12 rounded-xl cursor-pointer text-white font-clash-display text-sm"
        >
          Connect your wallet
        </button>
      </div>
    </div>
  );
};

export default Auth;
