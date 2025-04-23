import contractAbi from "./abi.json";


export const CONTRACT_ADDRESS = "0xe693e5567e3FF04a19340F75BbeB4e6BD0ffD833";

export const wagmiContractConfig = {
  address: CONTRACT_ADDRESS,
  abi: contractAbi,
} as const;
