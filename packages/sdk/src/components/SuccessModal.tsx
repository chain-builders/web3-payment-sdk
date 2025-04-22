import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactionId: string;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  transactionId,
}) => {
  if (!isOpen) return null;

  const formatTransactionId = (id: string) => {
    if (!id) return '';
    return id.length > 16 
      ? `${id.substring(0, 8)}...${id.substring(id.length - 8)}`
      : id;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 font-inter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="relative bg-white rounded-2xl overflow-hidden w-[400px] max-w-[90vw] p-6"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
              duration: 0.3,
            }}
          >
            <div className="flex flex-col items-center">
              {/* Success Icon */}
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Payment Successful!
              </h2>
              
              <p className="text-gray-600 text-center mb-4">
                Your transaction has been processed successfully.
              </p>

              {transactionId && (
                <div className="bg-gray-100 p-3 rounded-lg w-full mb-4">
                  <p className="text-xs text-gray-500 mb-1">Transaction ID:</p>
                  <p className="text-sm font-mono break-all">
                    {formatTransactionId(transactionId)}
                  </p>
                </div>
              )}

              <button
                onClick={onClose}
                className="w-full py-3 bg-[#6750A4] hover:bg-[#5b4693] rounded-lg font-medium text-white transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};