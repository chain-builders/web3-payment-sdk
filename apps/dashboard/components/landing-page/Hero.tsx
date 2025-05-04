"use client";
import React from "react";
import Nav from "@/components/landing-page/Nav";
import UsdtIcon from "@/components/UsdtIcon";
import { motion, AnimatePresence } from "framer-motion";

const stablecoins = ["Stablecoin", "USDT", "USDC"];

const Hero = () => {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % stablecoins.length);
    }, 2000); // Change every 2 seconds
    return () => clearInterval(interval);
  }, []);
  return (
    <div
      className="h-[95vh] w-[full] bg-black rounded-2xl px-12 py-6 relative overflow-hidden"
      style={{
        backgroundImage: "url(/heroImg2.svg)",
      }}
    >
      <Nav />

      <div className="w-full mt-16 flex items-center justify-center ">
        <UsdtIcon />
        <div className="flex flex-col items-center text-center space-y-6">
          <h1 className="text-6xl font-clash-display font-bold text-white max-w-4xl leading-tight tracking-wide">
            Seamless{" "}
            <span
              style={{
                display: "inline-block",
                minWidth: 220,
                position: "relative",
                height: "1.5em",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={stablecoins[index]}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    position: "absolute",
                    left: 4,
                    right: 4,
                    top: "14%",
                    transform: "translateY(-50%)",
                  }}
                >
                  {stablecoins[index]}
                </motion.span>
              </AnimatePresence>
            </span>{" "}
            Acceptance for Your Apps
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl font-clash-display">
            Empowering merchants and developers with seamless blockchain payment
            solutions. Build, integrate, and scale your Web3 payment systems
            with our comprehensive SDK.
          </p>

          <div className="mt-2 text-gray-400 h-10  px-3 text-sm w-1/3 bg-gray-800 rounded-xl flex items-center gap-2">
            <span className="text-green-600">$</span>

            <p>npm install @paytron/react</p>

            <span className="ml-auto cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-3"
              >
                <path
                  fillRule="evenodd"
                  d="M15.988 3.012A2.25 2.25 0 0 1 18 5.25v6.5A2.25 2.25 0 0 1 15.75 14H13.5v-3.379a3 3 0 0 0-.879-2.121l-3.12-3.121a3 3 0 0 0-1.402-.791 2.252 2.252 0 0 1 1.913-1.576A2.25 2.25 0 0 1 12.25 1h1.5a2.25 2.25 0 0 1 2.238 2.012ZM11.5 3.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v.25h-3v-.25Z"
                  clipRule="evenodd"
                />
                <path d="M3.5 6A1.5 1.5 0 0 0 2 7.5v9A1.5 1.5 0 0 0 3.5 18h7a1.5 1.5 0 0 0 1.5-1.5v-5.879a1.5 1.5 0 0 0-.44-1.06L8.44 6.439A1.5 1.5 0 0 0 7.378 6H3.5Z" />
              </svg>
            </span>
          </div>

          <div className="flex gap-4 mt-6 cursor-pointer">
            <button className="px-16 py-3 text-black bg-white  rounded-3xl transition font-clash-display">
              Get Started
            </button>
            <button className="px-16 py-3 font-clash-display bg-purple-600/35 text-purple-400 rounded-3xl hover:bg-white hover:text-black transition">
              View Docs
            </button>
          </div>
        </div>

        <img
          src="/heroimg.png"
          alt=""
          className="objec-cover h-[200px] absolute -bottom-14 left-0"
        />
      </div>
    </div>
  );
};

export default Hero;
