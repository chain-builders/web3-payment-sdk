import usdtabi from "./usdt.json";
import contractAbi from "./abi.json";
import abi from "./abi2.json";

export const CONTRACT_ADDRESS = "0xe693e5567e3FF04a19340F75BbeB4e6BD0ffD833";
export const USDC_CONTRACT_ADDRESS =
  "0x5dEaC602762362FE5f135FA5904351916053cF70";
export const USDT_CONTRACT_ADDRESS =
  "0x741034D98c58D0833f3a72dEbe609fE43D133928";

export const wagmiContractConfigUsdt = {
  address: USDT_CONTRACT_ADDRESS,
  abi: usdtabi,
} as const;

export const wagmiContractConfig = {
  address: CONTRACT_ADDRESS,
  abi: abi,
} as const;
