import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { PaymentProvider } from "./context/PaymentContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PaymentProvider
      config={{
        walletAddress: "0xCe2682E44734b96361BD0d7B0DEC01D2AB82adcF",
        chainId: 1,
        theme: {
          primaryColor: "#3B82F6",
        },
      }}
    >
      <App />
    </PaymentProvider>
  </StrictMode>
);
