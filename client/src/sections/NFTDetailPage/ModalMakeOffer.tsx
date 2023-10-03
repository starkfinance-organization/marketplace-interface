//** Libs */
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

//** Icons */
import ArgentXPng from "@/assets/png/argent.png";
import BraavosPng from "@/assets/png/braavos.jpg";
import { useAccount, useConnectors, useStarknetExecute } from "@starknet-react/core";
import { VscClose } from "react-icons/vsc";
import { CurrencyValues, DurationValues } from "@/utils/constant";
import StyledSelectETH from "@/components/Select/SelectETH";
import { useParams } from "react-router-dom";
import { Contract, InvokeTransactionReceiptResponse, Provider, number, uint256 } from "starknet";
import { erc20Abi } from "@/constants/erc20";
import { addresses } from "@/blockchain/address";
import { convertEtherToWei, convertWeiToEther } from "@/utils/string";
import { useInforListingContext } from "./context";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // import plugin
import { typedDataValidate } from "@/blockchain/type";
// import { useGetRecordOfOwnerAsync } from "@/queries/useGetRecordOfOwnerAsync";
import { usePostOfferRecord } from "@/queries/usePostOfferRecord";
import { useGetSellListing } from "@/queries/useGetSellListing";
import { useGetSellListingMutation } from "@/queries/useGetSellListingAsync";
import usePutSellListing from "@/queries/usePutSellListing";
dayjs.extend(utc); // use plugin

const provider = new Provider({ sequencer: { network: "mainnet-alpha" } });

type ModalMakeOfferProps = {
  isShowing: boolean;
  hide: () => void;
  nftData: any;
};

const ModalMakeOffer: React.FC<ModalMakeOfferProps> = ({
  isShowing,
  hide,
  nftData,
}) => {
  const { address, status, account } = useAccount();
  const { contract_address, token_id } = useParams();
  const { available, connectors, connect, refresh } = useConnectors();
  const [currency, setCurrency] = useState(CurrencyValues[0].value);
  const [duration, setDuration] = useState(DurationValues[0]);
  const [amount, setAmount] = useState("");
  const [isApproved, setIsApproved] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [isEnoughETH, setIsEnoughETH] = useState(true);
  const [hasFetchedBalance, setHasFetchedBalance] = useState(false);
  const [priceInEther, setPriceInEther] = useState("0");
  const [balance, setBalance] = useState("");
  //** Handle time offer end */
  const [timeEndList, setTimeEndList] = useState(() => {
    const oneDay = dayjs().add(1, "day").format("YYYY-MM-DD HH:mm:ss");
    return oneDay;
  });
  // useEffect(() => {
  //   console.log(duration);
  //   const oneDay = dayjs().add(duration.value, "day").format("YYYY-MM-DD HH:mm:ss");
  // }, [duration]);

  const handleStatusChange = (value: string) => {
    setCurrency(value);
  };

  const handleDurationChange = (newDuration: any) => {
    setDuration(newDuration);
    const oneDay = dayjs().add(newDuration, "day");
    setTimeEndList(oneDay.format("YYYY-MM-DD HH:mm:ss"));
  };

  useEffect(() => {
    const interval = setInterval(refresh, 5000);
    return () => clearInterval(interval);
  }, [refresh]);
  useEffect(() => {
    const func = async () => {
      const addrETH =
        "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7";
      const erc20 = new Contract(erc20Abi, addrETH, provider);
      if (account) {
        erc20.connect(account);
        const balanceInitial = await erc20.balanceOf(account.address);
        const balanceWallet = uint256
          .uint256ToBN(balanceInitial.balance)
          .toString();
        setBalance(balanceWallet);
      }
    };
    func();
  }, [account]);
  const handleDateChange = (date: any) => {
    if (date) {
      setTimeEndList(date.format("YYYY-MM-DD HH:mm:ss"));
    }
  };
  const approveCall = useStarknetExecute({
    calls: [
      {
        contractAddress: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
        entrypoint: "increaseAllowance",
        calldata: [
          addresses.marketplace.address,
          convertEtherToWei(priceInEther).toString(),
          0,
        ],
      },
    ],
  });
  const { refetchListingData } = useInforListingContext();
  // Get latest nonce of owner
  const { mutateAsync } = useGetSellListingMutation();
  const findHighestNonce = (ownerListings: any) => {
    if (ownerListings?.length) {
      const maxNonceObj = ownerListings.reduce((prev: any, current: any) => {
        return prev.nonce > current.nonce ? prev : current;
      });
      return maxNonceObj.nonce;
    }
    return 30;
  };
  const handleGetLatestNonce = async () => {
    const owner_address = address?.toString() || "";
    if (owner_address && owner_address != "") {
      const params = {
        signer: address!.toString(),
      };
      const res = await mutateAsync(params);
      if (res?.data.length == 0) {
        return 20;
      } else {
        return findHighestNonce(res.data) + 1;
      }
    }
  };
  const handleModifyTypedDataMessage = async () => {
    // Convert timeEndList to UTC date
    const utcDate = new Date(timeEndList);
    const utcDateString = utcDate.toISOString(); // This will be in format like "2023-07-25T12:00:00.000Z"
    // console.log(utcDateString);
    // console.log(Date.parse(utcDateString) / 1000);
    typedDataValidate.message.endTime = Date.parse(utcDateString) / 1000;
    typedDataValidate.message.isOrderAsk = "0";
    typedDataValidate.message.nonce = await handleGetLatestNonce();
    typedDataValidate.message.collection = contract_address;
    typedDataValidate.message.price = convertEtherToWei(priceInEther).toString(); // Convert Ether to Wei
    typedDataValidate.message.signer = address;
    typedDataValidate.message["tokenId.high"] = number.hexToDecimalString(
      uint256.bnToUint256(token_id).high
    );
    typedDataValidate.message["tokenId.low"] = number.hexToDecimalString(
      uint256.bnToUint256(token_id).low
    );
  };
  const postRecord = usePutSellListing();
  useEffect(() => {
    if (balance && hasFetchedBalance) {
      console.log("useEffect", balance);
      setHasFetchedBalance(false); // Reset for future uses
    }
  }, [balance, hasFetchedBalance]);
  const handleOfferSignature = async () => {
    await handleModifyTypedDataMessage();
    try {
      // Trigger balance fetch manually
      // const { data: fetchedBalance } = await refetchBalance();
      // console.log("fetchedBalance", fetchedBalance);
      const signature4 = await account?.signMessage(typedDataValidate);
      if (address && signature4) {
        setIsApproved(false);
        setIsApproving(false)
        const localDate = new Date(timeEndList);
        console.log("localDate", localDate);
        const utcDateObj = dayjs(localDate).utc();
        // BUG
        // console.log("utcDateObj", utcDateObj);
        // console.log(nftData);
        const data = {
          collection_address: contract_address,
          token_id: token_id,
          signer: address,
          price: priceInEther,
          signature4: JSON.stringify(signature4),
          nonce: await handleGetLatestNonce(),
          image_url: nftData.image_url,
          name: nftData.name,
          time_end: utcDateObj.utc().format("YYYY-MM-DD HH:mm:ss"),
        };
        // console.log("Pushed data", data);
        await postRecord
          .mutateAsync(data)
          .then(() => {
            setPriceInEther("0");
            hide();
            refetchListingData();
          })
          .catch((err: any) => {
            console.log("err", err);
            refetchListingData();
          });
      }
    } catch (err) {
      console.log(err);
    }
  };
  // Approve ETH
  const handleApproveAndMakeOffer = async () => {
    if (!isApproved) {
      if (status == "connected") {
        const result = await approveCall.execute();
        setIsApproving(true);
        if (result.transaction_hash) {
          const txReceiptDeployTest: InvokeTransactionReceiptResponse =
            await provider.waitForTransaction(result.transaction_hash);
          if (txReceiptDeployTest.events) {
            // if done, pop up success
            setIsApproving(false);
            setIsApproved(true);
          }
        }
      } else {
        alert("Please connect wallet");
      }
    } else {
      // Sign make offer
      handleOfferSignature();
    }
  };

  const handleClose = () => {
    hide();
  };

  return isShowing
    ? ReactDOM.createPortal(
      <React.Fragment>
        <div
          className="fixed left-0 right-0 top-0 z-50 h-screen w-screen bg-black/70 backdrop-blur-lg"
          onClick={handleClose}
        />
        <div
          className="fixed left-[50%] top-[50%] z-50 -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-[#24C3BC]/10 border border-[#24C3BC] rounded-lg"
          aria-modal
          aria-hidden
          tabIndex={-1}
          role="dialog"
        >
          <div
            className="relative z-50 mx-auto w-fit md:min-w-[400px] min-w-[300px] overflow-hidden rounded-xl "
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <div className="rounded-t-xl p-[30px]">
              <div className="flex flex-1 items-start justify-between gap-2">
                <p className=" text-[48px] font-bold">Make an offer</p>
                <button
                  onClick={handleClose}
                  className="grid h-[20px] w-[20px] place-items-center"
                >
                  {/* <img src={CloseSVG} alt="arrow" className="h-5" /> */}
                  <VscClose className="w-full h-full" />
                </button>
              </div>
              <div className="w-full">
                <div className=" flex w-full justify-between items-center">
                  <div className="flex gap-5 items-center">
                    <div className="h-[100px] w-[100px] rounded-md aspect-square border border-[#24C3BC]">
                      <img
                        src={nftData.image_url}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#24C3BC]">
                        {nftData.name}
                      </p>
                      <p className="text-xl ">Starksport </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">10 ETH</p>
                    <p className="text-xl text-white/50">$123123 </p>
                  </div>
                </div>
                <div className="flex md:flex-row flex-col my-[30px] md:gap-[30px]">
                  <div className="flex min-w-[200px] w-1/2 flex-col justify-between flex-1 rounded-md border p-[20px] border-[#24C3BC] bg-[#24C3BC]/10">
                    <div className="flex justify-between items-center">
                      <p className="text-xl font-bold">Balance</p>
                      <p className="text-xl ">500 ETH</p>
                    </div>

                    <div className="flex lg:gap-[100px] justify-between items-end">
                      <p className="text-xl font-bold">Floor price</p>
                      <p className="text-xl ">500 ETH</p>
                    </div>
                    <div className="flex justify-between items-end">
                      <p className="text-xl font-bold">Best offer</p>
                      <p className="text-xl ">500 ETH</p>
                    </div>
                  </div>
                  <div className="flex-1 md:mt-0 mt-[30px] ">
                    <div className="w-full mb-[30px] h-[60px] flex md:flex-row flex-col items-center  text-center bg-[#24C3BC]/10 border border-[#24C3BC]/80 rounded-xl ">
                      <div className="flex flex-1">
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          className="w-1/2 text-2xl text-left bg-transparent py-3 rounded-xl border-[0px]"
                          placeholder="Amount"
                          // value={priceInEther}
                          onChange={(e) => {
                            if (e.target.value === "") {
                              setPriceInEther("0");
                            } else {
                              setPriceInEther(e.target.value)
                              const balanceInEther = convertWeiToEther(balance || "");
                              if (balanceInEther < Number(e.target.value) || Number(e.target.value) <= 0) {
                                setIsEnoughETH(false);
                              } else {
                                setIsEnoughETH(true);
                              }
                            }
                          }}
                        />
                        <StyledSelectETH
                          value={currency}
                          popupClassName={"text-white"}
                          dropdownStyle={{
                            backgroundColor: "rgba(36, 195, 188)",
                            color: "white",
                            lineHeight: "20px",
                          }}
                          style={{
                            width: "50%",
                            height: 60,
                            textAlign: "left",
                            backgroundColor: "transparent",
                            borderRadius: "0px",
                            borderLeft: "1px solid rgba(36, 195, 188)",
                          }}
                          onChange={handleStatusChange}
                          options={CurrencyValues}
                          bordered={true}
                        />
                      </div>
                    </div>
                    <div className="w-full h-[60px] flex md:flex-row flex-col items-center  text-center bg-[#24C3BC]/10 border border-[#24C3BC]/80 rounded-xl ">
                      <div className="flex flex-1 w-full">
                        <p className="w-1/2 text-2xl text-left md:p-[14px] p-3">
                          Duration
                        </p>
                        <StyledSelectETH
                          value={duration}
                          popupClassName={"text-white"}
                          dropdownStyle={{
                            backgroundColor: "rgba(36, 195, 188)",
                            color: "white",
                            lineHeight: "20px",
                          }}
                          style={{
                            width: "50%",
                            height: 60,
                            textAlign: "left",
                            backgroundColor: "transparent",
                            borderRadius: "0px",
                            borderLeft: "1px solid rgba(36, 195, 188)",
                          }}
                          onChange={handleDurationChange}
                          options={DurationValues}
                          bordered={true}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {isEnoughETH ? (
                  <div
                    className="cursor-pointer h-fit py-3 px-4 mt-2 shadow-button-wallet bg-[#24C3BC] rounded-md grid place-items-center"
                    onClick={() => { handleApproveAndMakeOffer() }}
                  >
                    <p className="text-[20px] uppercase font-bold">
                      {isApproving
                        ? "Approving ETH - Please Wait!"
                        : isApproved
                          ? "Make Offer"
                          : "Approve ETH"}
                    </p>
                  </div>
                ) : (
                  <div
                    className="cursor-pointer h-fit py-3 px-4 mt-2 shadow-button-wallet bg-[#24C3BC] rounded-md grid place-items-center disabled"
                  >
                    <p className="text-[20px] uppercase font-bold">
                      {"Not Enough ETH"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>,
      document.body
    )
    : null;
};

export default ModalMakeOffer;
