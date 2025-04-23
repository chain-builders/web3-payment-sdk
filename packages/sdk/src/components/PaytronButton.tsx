import { usePayment } from "../context/PaymentContext";

interface PaymentMetadata {
  [key: string]: string;
}

interface PaytronButtonProps {
  amount: string;
  currency?: "USDT" | "USDC";
  metadata?: PaymentMetadata;
  onSuccess?: () => void;
}

const PaytronButton = ({
  amount,
  currency = "USDT",
  metadata,
  onSuccess,
}: PaytronButtonProps) => {
  const { initiatePayment } = usePayment();

  const handleCheckout = () => {
    initiatePayment({
      amount,
      currency,
      metadata,
      onSuccess,
    });
  };

  return (
    <button
      className="py-2.5 px-8 text-sm bg-purple-800 rounded-md text-white cursor-pointer"
      onClick={handleCheckout}
    >
      Pay with paytron
    </button>
  );
};

export default PaytronButton;
