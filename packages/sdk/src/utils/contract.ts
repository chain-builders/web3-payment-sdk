import usdtabi from "./usdt.json";
import contractAbi from "./abi.json";
import abi from "./abi2.json";

const sdkAbi = contractAbi.abi;

export const CONTRACT_ADDRESS = "0xe693e5567e3FF04a19340F75BbeB4e6BD0ffD833";
export const USDC_CONTRACT_ADDRESS =
  "0x5dEaC602762362FE5f135FA5904351916053cF70";
export const USDT_CONTRACT_ADDRESS =
  "0x323e78f944A9a1FcF3a10efcC5319DBb0bB6e673";

export const wagmiContractConfigUsdt = {
  address: USDT_CONTRACT_ADDRESS,
  abi: usdtabi,
} as const;

export const wagmiContractConfig = {
  address: CONTRACT_ADDRESS,
  abi: abi,
} as const;
