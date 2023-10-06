//** Libs */
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

//** Icons */
import ArgentXPng from "@/assets/png/argent.png";
import BraavosPng from "@/assets/png/braavos.jpg";
import { useConnectors } from "@starknet-react/core";
import { VscClose } from "react-icons/vsc";
import { CurrencyValues, DurationValues } from "@/utils/constant";
import StyledSelectETH from "@/components/Select/SelectETH";

type ModalMakeOfferProps = {
  isShowing: boolean;
  hide: () => void;
  data: any;
};

const ModalMakeOffer: React.FC<ModalMakeOfferProps> = ({
  isShowing,
  hide,
  data,
}) => {
  const { available, connectors, connect, refresh } = useConnectors();
  const [currency, setCurrency] = useState(CurrencyValues[0].value);
  const [duration, setDuration] = useState(DurationValues[0].value);
  const [amount, setAmount] = useState("");

  const handleStatusChange = (value: string) => {
    setCurrency(value);
  };

  const handleDurationChange = (value: string) => {
    setDuration(value);
  };

  useEffect(() => {
    const interval = setInterval(refresh, 5000);
    return () => clearInterval(interval);
  }, [refresh]);

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
                          src={data.image_url}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-[#24C3BC]">
                          {data.name}
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
                        <p className="text-xl font-bold">Blance</p>
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
                            type="text"
                            className="w-1/2 text-2xl text-left bg-transparent py-3 rounded-xl border-[0px]"
                            placeholder="Amount"
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
                  <div
                    className="cursor-pointer h-fit py-3 px-4 mt-2 shadow-button-wallet bg-[#24C3BC] rounded-md grid place-items-center"
                    onClick={() => {}}
                  >
                    <p className="text-[20px] uppercase font-bold">
                      Make Offer
                    </p>
                  </div>
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
