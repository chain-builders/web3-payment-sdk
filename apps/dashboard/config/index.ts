import { cookieStorage, createStorage, http } from "@wagmi/core";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { baseSepolia, base } from "@reown/appkit/networks";

// Get projectId from https://cloud.reown.com
export const projectId = "930ba0b4da0c10721e7b3d84fcf1d881";

if (!projectId) {
  throw new Error("Project ID is not defined");
}

export const networks = [baseSepolia, base];

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
});

export const config = wagmiAdapter.wagmiConfig;
