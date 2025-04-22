import React, { createContext, useState, useContext, ReactNode } from "react";
import { Data, PaymentConfig, PaymentOptions } from "../types";
import { PaymentModal } from "../components/PaymentModal";
import { SuccessModal } from "../components/SuccessModal";
import { AppKitProvider } from "../components/AppKitProvider";

interface PaymentContextType {
  initiatePayment: (options: PaymentOptions) => void;
  config: PaymentConfig;
  data: Data;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

interface PaymentProviderProps {
  children: ReactNode;
  config: PaymentConfig;
  onSuccess?: (transactionId: string) => void;
  onError?: (error: Error) => void;
  onClose?: () => void; // Added onClose prop
}

export const PaymentProvider: React.FC<PaymentProviderProps> = ({
  children,
  config,
  onSuccess = () => {},
  onError = () => {},
  onClose = () => {},
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [paymentOptions, setPaymentOptions] = useState<PaymentOptions | null>(
    null
  );
  const [transactionId, setTransactionId] = useState<string>("");
  const [data, setData] = useState<Data>({
    txId: transactionId,
    amount: paymentOptions?.amount || "",
    currency: paymentOptions?.currency || "",
  });
  

  const initiatePayment = (options: PaymentOptions) => {
    setPaymentOptions(options);
    console.log(paymentOptions)
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    onClose();
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
    onClose();
  };

  const handleSuccess = (txId: string) => {
    setData({
      txId: txId,
      amount: paymentOptions?.amount || "",
      currency: paymentOptions?.currency || "",
    });
    console.log(data, "data");
    setTransactionId(txId);
    setIsModalOpen(false);
    setIsSuccessModalOpen(true);
    if (paymentOptions?.onSuccess) {
      paymentOptions.onSuccess();
    }
    onSuccess(txId);
  };

  const handleError = (error: Error) => {
    onError(error);
    setIsModalOpen(false);
  };

  return (
    <AppKitProvider>
      <PaymentContext.Provider value={{ initiatePayment, config, data }}>
        {children}
        <PaymentModal
          isOpen={isModalOpen}
          onClose={handleClose}
          onSuccess={handleSuccess}
          onError={handleError}
          config={config}
          options={paymentOptions}
        />
        <SuccessModal
          isOpen={isSuccessModalOpen}
          onClose={handleSuccessModalClose}
          transactionId={transactionId}
        />
      </PaymentContext.Provider>
    </AppKitProvider>
  );
};

export const usePayment = (): PaymentContextType => {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error("usePayment must be used within a PaymentProvider");
  }
  return context;
};
