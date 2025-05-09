import { useAccount, useWriteContract } from "wagmi";
import { USDT_CONTRACT_ADDRESS, wagmiContractConfig } from "../utils/contract";
import { usePayment } from "../context/PaymentContext";
import { isAddress } from "viem";

export const usePay = () => {
  const { config } = usePayment();

  const { address } = useAccount();
  // data here represents the transaction hash returned from the contract write operation
  const { writeContract, isPending, error, data: txHash, isSuccess } = useWriteContract();

  const pay = async (amount: bigint) => {
    console.log(config, amount);
    if (!address) {
      console.error("No address found");
      return;
    }

    const result = writeContract({
      ...wagmiContractConfig,
      functionName: "transferFrom",
      args: [1, address, amount, config.appName],
    });

    return result;
  };
  return {
    pay,
    isPending,
    error,
    txHash,
    paymentSuccess: isSuccess
  };
};
