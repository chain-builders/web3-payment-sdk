import React, { useEffect, useState } from "react";
import { Currency, PaymentOptions } from "../types";
import ConnectButton from "./ConnectButton";
import { sampleCurrencies } from "../utils";
import CurrencyDropdown from "./CurrencyDropdown";
import { useAccount } from "wagmi";
import {
  useApproveUsdt,
  useGetBalance,
  useTransferUsdt,
} from "../hooks/use-usdt";
import { usePay } from "../hooks/use-payments";
import SkeletonLoader1 from "./SkeletonLoader1";

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

  const { transferFrom, transferfromPending, transferError, transfersuccess } =
    useTransferUsdt();

  const { pay, isPending, error } = usePay();

  useEffect(() => {
    if (transfersuccess) {
      const amount =
        BigInt(options?.amount || 0) * BigInt(10 ** (decimals as number));
      pay(amount);
    }
    console.log("isSuccess", transfersuccess);
  }, [transfersuccess]);

  const handlePay = async () => {
    console.log("hiyaa", decimals);
    try {
      const amount =
        BigInt(options?.amount || 0) * BigInt(10 ** (decimals as number));
      approve(amount);
      transferFrom(amount);
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  return (
    <>
      {isLoading ? (
        <SkeletonLoader1 />
      ) : (
        <>
          <div className="relative pt-10">
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
                disabled={isPending || approveingErc20 || transferfromPending}
              >
                {isPending || approveingErc20 || transferfromPending
                  ? "Processing..."
                  : "Proceed to pay"}
              </button>
            </div>
          </div>
          {!address ? (
            <div className="absolute w-full h-full bg-black/20 flex items-center justify-center backdrop-blur-md top-0 left-0">
              <ConnectButton />
            </div>
          ) : (
            <div className="w-full absolute bottom-6 flex justify-center">
              <ConnectButton />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ModalBody;
