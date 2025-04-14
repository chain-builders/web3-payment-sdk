import { useAccount, useWriteContract } from "wagmi";
import { USDT_CONTRACT_ADDRESS, wagmiContractConfig } from "../utils/contract";
import { usePayment } from "../context/PaymentContext";

export const usePay = () => {
  const { config } = usePayment();

  const { address } = useAccount();
  const { writeContract, isPending, error, data } = useWriteContract();

  const pay = async (amount: bigint) => {
    console.log(config, amount);
    if (!address) {
      console.error("No address found");
      return;
    }

    const result = writeContract({
      ...wagmiContractConfig,
      functionName: "pay",
      args: [config.walletAddress, 1, amount, false],
    });

    return result;
  };
  return {
    pay,
    isPending,
    error,
    data,
  };
};
