import React, { useEffect, useState } from "react";
import { Currency, PaymentOptions } from "../types";
import ConnectButton from "./ConnectButton";
import { sampleCurrencies } from "../utils";
import CurrencyDropdown from "./CurrencyDropdown";
import { useAccount } from "wagmi";
import { useApproveUsdt, useGetBalance } from "../hooks/use-usdt";
import { usePay } from "../hooks/use-payments";

const ModalBody = ({ options }: { options: PaymentOptions }) => {
  const { address } = useAccount();
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(
    sampleCurrencies[0]
  );

  const { formattedBalance, isLoading, decimals } = useGetBalance();
  const {
    approve,
    isPending: approveingErc20,

    isSuccess,
  } = useApproveUsdt();
  const { pay, isPending, error } = usePay();

  useEffect(() => {
    if (isSuccess) {
      const amount =
        BigInt(options?.amount || 0) * BigInt(10 ** (decimals as number));
      pay(amount);
    }
    console.log("isSuccess", isSuccess);
  }, [isSuccess]);
  useEffect(() => {
    if (error) {
      console.log("error", error);
    }
  }, [error]);

  const handlePay = async () => {
    console.log("hiyaa", decimals);
    try {
      const amount =
        BigInt(options?.amount || 0) * BigInt(10 ** (decimals as number));
      approve(amount);
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  return (
    <div className="relative bg-white rounded-2xl overflow-hidden w-[500px] min-h-[450px] max-[500px] mx-4 ">
      <div className="sticky z-20 w-full flex items-center p-6">
        <div className="w-full flex gap-8  justify-center items-center tex-xs text-gray-900 text-sm cursor-pointer">
          <p className="py-2 px-4 flex items-center gap-1 justify-center font-inter font-semibold border-b border-b-[#6750A4] text-[#6750A4]">
            from wallet
          </p>

          <p className="text-gray-500 py-1 rounded-full flex items-center gap-1 justify-center whitespace-nowrap">
            wallet transfer
          </p>

          <p className="text-gray-500 py-1 rounded-full flex items-center gap-1 justify-center whitespace-nowrap">
            offramp payment
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="">Loading..</div>
      ) : (
        <>
          <div className="relative  pt-10">
            <div className="h-full">
              <CurrencyDropdown
                currencies={sampleCurrencies}
                selectedCurrency={selectedCurrency}
                onSelect={setSelectedCurrency}
                amount={options.amount || "14.00"}
                balance={formattedBalance || 0}
              />
            </div>

            {/* <div className=" py-4 text-sm text-center flex justify-center text-gray-500">
        <p className="w-[55%]">{options?.metadata?.description}</p>
      </div> */}

            <div className="w-full mt-6 flex justify-center px-10">
              <button
                className="py-3 w-full bg-[#6750A4] text-white rounded-lg text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handlePay}
                disabled={isPending || approveingErc20}
              >
                {isPending || approveingErc20
                  ? "Processing..."
                  : "Proceed to pay"}
              </button>
            </div>
          </div>
          {!address ? (
            <div className="absolute w-full h-full bg-black/20 flex items-center justify-center  backdrop-blur-md top-0 left-0 ">
              <ConnectButton />
            </div>
          ) : (
            <div className="w-full absolute bottom-6 flex justify-center">
              <ConnectButton />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ModalBody;
