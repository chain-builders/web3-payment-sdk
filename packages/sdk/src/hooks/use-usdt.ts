import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { CONTRACT_ADDRESS, wagmiContractConfigUsdt } from "../utils/contract";

export const useGetBalance = () => {
  const { address } = useAccount();
  const { data, isError, isLoading, refetch } = useReadContract({
    ...wagmiContractConfigUsdt,
    functionName: "balanceOf",
    args: [address],
    query: {
      enabled: !!address,
    },
  });

  const { data: decimals } = useReadContract({
    ...wagmiContractConfigUsdt,
    functionName: "decimals",
    query: {
      enabled: !!address,
    },
  });

  const formattedBalance =
    data && decimals ? Number(data) / 10 ** Number(decimals) : undefined;

  return {
    balance: data,
    formattedBalance,
    isError,
    isLoading,
    refetch,
  };
};

export const useApproveUsdt = () => {
  const { address } = useAccount();
  const { writeContract, isPending, error, data } = useWriteContract();

  const approve = async (amount: bigint) => {
    if (!address) {
      console.error("No address found");
      return;
    }

    try {
      const result = await writeContract({
        ...wagmiContractConfigUsdt,
        functionName: "approve",
        args: [CONTRACT_ADDRESS, amount],
      });
      return result;
    } catch (err) {
      console.error("Error calling approve:", err);
      throw err;
    }
  };

  return {
    approve,
    isPending,
    error,
    data,
  };
};
