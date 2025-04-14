import React, { createContext, useState, useContext, ReactNode } from 'react';
import { PaymentConfig, PaymentOptions } from '../types';
import { PaymentModal } from '../components/PaymentModal';
import { AppKitProvider } from '../components/AppKitProvider';

interface PaymentContextType {
  initiatePayment: (options: PaymentOptions) => void;
  config: PaymentConfig;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

interface PaymentProviderProps {
  children: ReactNode;
  config: PaymentConfig;
  onSuccess?: (transactionId: string) => void;
  onError?: (error: Error) => void;
}

export const PaymentProvider: React.FC<PaymentProviderProps> = ({
  children,
  config,
  onSuccess = () => {},
  onError = () => {},
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentOptions, setPaymentOptions] = useState<PaymentOptions | null>(null);

  const initiatePayment = (options: PaymentOptions) => {
    setPaymentOptions(options);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleSuccess = (transactionId: string) => {
    onSuccess(transactionId);
    setIsModalOpen(false);
  };

  const handleError = (error: Error) => {
    onError(error);
    setIsModalOpen(false);
  };

  return (
    <AppKitProvider>
    <PaymentContext.Provider value={{ initiatePayment, config }}>
      {children}
      <PaymentModal
        isOpen={isModalOpen}
        onClose={handleClose}
        onSuccess={handleSuccess}
        onError={handleError}
        config={config}
        options={paymentOptions}
      />
    </PaymentContext.Provider>
    </AppKitProvider>
  );
};

export const usePayment = (): PaymentContextType => {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};