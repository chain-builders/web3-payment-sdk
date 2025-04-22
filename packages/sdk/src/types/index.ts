export interface PaymentConfig {
  walletAddress: string;
  chainId?: number;
  apiKey?: string;
  theme?: {
    primaryColor?: string;
    secondaryColor?: string;
    fontFamily?: string;
  };
}

export interface PaymentOptions {
  amount: string;
  currency: string;
  tokenAddress?: string;
  metadata?: Record<string, any>;
  recipient?: string;
  transactionHash?: string;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export interface PaymentResult {
  transactionId: string;
  status: "success" | "failed" | "pending";
  timestamp: number;
}

export interface Currency {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  contractAddress: string;
  network?: {
    name: string;
    icon?: string;
  };
}

export interface Data {
  txId: string;
  amount: string;
  currency: string;
}
