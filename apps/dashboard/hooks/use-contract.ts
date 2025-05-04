import { Ipayment } from "@/app/(dashboard)/dashboard/page";
import { wagmiContractConfig } from "@/utils/contract";
import { useAccount, useReadContract } from "wagmi";

export const useGetUsdtBalance = () => {
  const { address } = useAccount();
  const { data, isError, isLoading, refetch } = useReadContract({
    ...wagmiContractConfig,
    functionName: "getBalance",
    args: [address, 1],
    query: {
      enabled: !!address,
    },
  });

  console.log(data, "usdtttt");
  return {
    usdtBalance: data,
    loadingUsdtBalance: isLoading,
  };
};

export const useGetUsdcBalance = () => {
  const { address } = useAccount();
  const { data, isError, isLoading, refetch } = useReadContract({
    ...wagmiContractConfig,
    functionName: "getBalance",
    args: [address, 0],
    query: {
      enabled: !!address,
    },
  });

  return {
    usdtBalance: data,
    loadingUsdtBalance: isLoading,
    refetchUsdt: refetch,
  };
};

export const useGetPayments = () => {
  const { address } = useAccount();
  const { data, isError, isLoading, refetch } = useReadContract({
    ...wagmiContractConfig,
    functionName: "getPayments",
    args: [address],
    query: {
      enabled: !!address,
    },
  });

  return {
    payments: data as Ipayment[],
    loadingpayments: isLoading,
    refetchUsdt: refetch,
  };
};
