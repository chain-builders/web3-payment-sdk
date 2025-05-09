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
            className="relative w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center"
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
            <h2 className="text-2xl font-bold font-clash-display mb-4 text-gray-800">
              Withdraw Funds
            </h2>
            {children || (
              <div className="text-gray-500 font-clash-display text-center">
                Withdrawal form goes here.
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};