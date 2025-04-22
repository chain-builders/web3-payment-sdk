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
    decimals,
  };
};

export const useApproveUsdt = () => {
  const { address } = useAccount();
  const { writeContract, isPending, error, data, isSuccess } =
    useWriteContract();

  const approve = async (amount: bigint) => {
    if (!address) {
      console.error("No address found");
      return;
    }
    console.log('sigh')
    const result = writeContract({
      ...wagmiContractConfigUsdt,
      functionName: "approve",
      args: [CONTRACT_ADDRESS, amount],
    });
    return result;
  };

  return {
    approve,
    isPending,
    error,
    data,
    isSuccess,
  };
};
export const useTransferUsdt = () => {
  const { address } = useAccount();
  const { writeContract, isPending, error, data, isSuccess } =
    useWriteContract();
  const transferFrom = async (amount: bigint) => {
    if (!address) {
      console.error("No address found");
      return;
    }

    const result = writeContract({
      ...wagmiContractConfigUsdt,
      functionName: "transferFrom",
      args: ['0xCe2682E44734b96361BD0d7B0DEC01D2AB82adcF', CONTRACT_ADDRESS, amount],
    });
    return result;
  };

  return {
    transferFrom,
    transferfromPending: isPending,
    transferError: error,
    data,
    transfersuccess: isSuccess,
  };
};
