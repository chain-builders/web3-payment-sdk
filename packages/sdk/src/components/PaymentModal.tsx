import React, { useState } from "react";
import type { PaymentConfig, PaymentOptions } from "../types";
import ModalBody from "./ModalBody";
import { motion, AnimatePresence } from "framer-motion";
import Transfer from "./Transfer";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (transactionId: string) => void;
  onError: (error: Error) => void;
  config: PaymentConfig;
  options: PaymentOptions | null;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  // onError,
  config,
  options,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  if (!isOpen || !options) return null;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 font-inter backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: 50, scale: 0.9, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: -50, scale: 0.9, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.4,
            }}
            className="relative p-10"
          >
            <motion.span
              className="absolute left-3 top-10 text-white cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="size-5 font-light"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </motion.span>
            <div className="relative bg-white rounded-2xl overflow-hidden w-[510px] min-h-[450px] max-[500px] mx-4 ">
              <div className="sticky z-20 w-full flex items-center p-6">
                {/* <div className="w-full flex gap-8  justify-center items-center tex-xs text-gray-900 text-sm cursor-pointer">
                  {["from wallet", "wallet transfer", " offramp payment"].map(
                    (item, index) => (
                      <p
                        key={index}
                        className={`" px-2 py-3 flex items-center gap-1 justify-center font-inter font-semibold  ${
                          index === activeTab
                            ? "border-b-2  border-b-[#6750A4] text-[#6750A4]"
                            : "text-gray-500"
                        } "`}
                        onClick={() => handleTabClick(index)}
                      >
                        {item}
                      </p>
                    )
                  )}
                </div> */}
              </div>

              {activeTab === 0 && (
                <ModalBody handleSuccess={onSuccess} options={options} />
              )}
              {activeTab === 1 && <Transfer options={options} />}
            </div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="pt-4 text-sm text-center text-gray-300 flex justify-center items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
              secured by our app
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
