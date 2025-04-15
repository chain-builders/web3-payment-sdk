import usdtabi from "./usdt.json";
import contractAbi from "./abi.json";

const sdkAbi = contractAbi.abi;

export const CONTRACT_ADDRESS = "0x05388a2f2a0B6a1ea94681154C9e8734322ED77D";
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
  abi: sdkAbi,
} as const;
