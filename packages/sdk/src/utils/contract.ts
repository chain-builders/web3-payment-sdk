import usdtabi from "./usdt.json";
import contractAbi from "./abi.json";

const sdkAbi = contractAbi.abi;

export const CONTRACT_ADDRESS = "0x2CFF6456FAeA575AeFCD15BCc8B0883Bf63e814d";
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
