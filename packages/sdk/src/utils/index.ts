import { Currency } from "../types";

export const sampleCurrencies: Currency[] = [
  {
    id: "usdt",
    name: "USDT",
    symbol: "USDT",
    icon: "/usdt-logo.svg",
    contractAddress: "0x323e78f944A9a1FcF3a10efcC5319DBb0bB6e673",
    network: {
      name: "Base",
      icon: "/baselogo.svg",
    },
  },
  {
    id: "usdc",
    name: "USDC",
    symbol: "USDC",
    icon: "/usdc-logo.svg",
    contractAddress: "0x5dEaC602762362FE5f135FA5904351916053cF70",
    network: {
      name: "Base",
      icon: "/baselogo.svg",
    },
  },
];
