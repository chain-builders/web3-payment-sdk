import { usePayment } from "../context/PaymentContext";

const PaytronButton = () => {
  const { initiatePayment } = usePayment();

  const handleCheckout = () => {
    initiatePayment({
      amount: "0.05",
      currency: "ETH",
      // Optional parameters
      tokenAddress: "0x...",
      metadata: {
        productId: "12345",
        orderId: "order_789",
      },
    });
  };

  return (
    <button
      className="py-3 px-8 bg-purple-800 rounded-md text-white cursor-pointer"
      onClick={handleCheckout}
    >
      Pay with Crypto
    </button>
  );
};

export default PaytronButton;
