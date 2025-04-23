"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Nav = () => {
  const router = useRouter();
  return (
    <nav className="flex items-center justify-between text-white">
      <div className="relative px-4">
        <span className="absolute py-1 px-1 bg-purple-600/20 text-purple-600 rounded text-[10px] rotate-[40deg] -right-3">
          Merchant
        </span>
        <h4 className="text-2xl font-medium font-cera z-10">Paytron</h4>
      </div>

      <ul className="flex items-center gap-4 text-sm ">
        <li>Docs</li>
        <li>Products</li>
        <li>Developers</li>
        <li>Pricing</li>
      </ul>
      <div className="flex gap-4 items-center">
        <button
          onClick={() => router.push("/home")}
          className="text-sm py-2 flex items-center gap-1 px-4 bg-white rounded-md text-black font-clash-display font-medium"
        >
          Payment Dashboard
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-4 font-light"
          >
            <path
              fillRule="evenodd"
              d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Nav;
