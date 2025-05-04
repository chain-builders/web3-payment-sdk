import contractAbi from "./abi.json";


export const CONTRACT_ADDRESS = "0x741034D98c58D0833f3a72dEbe609fE43D133928";

export const wagmiContractConfig = {
  address: CONTRACT_ADDRESS,
  abi: contractAbi,
} as const;


