"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface WithdrawModalProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export const WithdrawModal: React.FC<WithdrawModalProps> = ({
  open,
  onClose,
  children,
}) => {
  const [selectedToken, setSelectedToken] = React.useState<string | null>(null);
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
        >
          <motion.div
            className="relative w-full   justify-center h-screen bg-white shadow-2xl p-8 flex flex-col items-center"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={modalVariants}
            transition={{ duration: 0.2 }}
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
              onClick={onClose}
              aria-label="Close"
            >
              <X size={24} />
            </button>

            <div className="w-1/3">
            <h2 className="text-2xl font-bold font-clash-display mb-6 text-gray-800">
                Withdraw Funds
              </h2>

              <form className="w-full flex flex-col items-center gap-6 mt-2">
                <div className="w-full mb-4">
                  <label className="block text-sm font-clash-display font-semibold text-gray-700 mb-2">
                    Select Token
                  </label>
                  <div className="flex gap-4 w-full justify-start">
                    {/* USDT Option */}
                    <button
                      type="button"
                      className={`flex flex-col items-center gap-2 px-6 py-4 rounded-xl border-2 transition-all font-clash-display text-lg font-semibold 
                        ${
                          selectedToken === "USDT"
                            ? "border-purple-700 bg-purple-50 text-purple-700"
                            : "border-gray-200 bg-white text-gray-700 hover:border-purple-400"
                        }
                      `}
                      onClick={() => setSelectedToken("USDT")}
                    >
                      <img
                        src="https://cdn.vectorstock.com/i/1000v/63/71/tether-symbol-icon-usdt-logo-crypto-vector-41056371.jpg"
                        alt="USDT"
                        className="w-8 h-8 rounded-full"
                      />
                      USDT
                    </button>
                    {/* USDC Option */}
                    <button
                      type="button"
                      className={`flex flex-col items-center gap-2 px-6 py-4 rounded-xl border-2 transition-all font-clash-display text-lg font-semibold
                        ${
                          selectedToken === "USDC"
                            ? "border-purple-700 bg-purple-50 text-purple-700"
                            : "border-gray-200 bg-white text-gray-700 hover:border-purple-400"
                        }
                      `}
                      onClick={() => setSelectedToken("USDC")}
                    >
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ43MuDqq54iD1ZCRL_uthAPkfwSSL-J5qI_Q&s"
                        alt="USDC"
                        className="w-8 h-8 rounded-full"
                      />
                      USDC
                    </button>
                  </div>
                </div>
                {/* Withdrawal Amount Input */}
                <div className="w-full">
                  <label
                    htmlFor="withdraw-amount"
                    className="block text-sm font-clash-display font-semibold text-gray-700 mb-2"
                  >
                    Amount to Withdraw
                  </label>
                  <div className="relative">
                    <input
                      id="withdraw-amount"
                      type="number"
                      min="0"
                      step="any"
                      placeholder="Enter amount"
                      className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none font-clash-display text-lg text-gray-800 transition"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-clash-display text-base pointer-events-none">
                      {selectedToken || "Token"}
                    </span>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-purple-700 text-white font-clash-display font-semibold text-lg hover:bg-purple-800 transition"
                  disabled={!selectedToken}
                >
                  Withdraw
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
