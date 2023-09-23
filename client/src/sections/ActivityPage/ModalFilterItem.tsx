//** Libs */
import React, { useEffect } from "react";
import ReactDOM from "react-dom";

//** Icons */
import ArgentXPng from "@/assets/png/argent.png";
import BraavosPng from "@/assets/png/braavos.jpg";
import arrowDown from "@/assets/svg/arrowDown.svg";
import { useConnectors } from "@starknet-react/core";
import { VscClose } from "react-icons/vsc";
import { eventFilterType, statusFilterType } from "@/utils/constant";

type ModalFilterItemProps = {
  isShowing: boolean;
  hide: () => void;
  isOpenStatus: boolean;
  setIsOpenEventStatus: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenEvent: boolean;
  setIsOpenEvent: React.Dispatch<React.SetStateAction<boolean>>;
  setStatusFilter: React.Dispatch<React.SetStateAction<number>>;
  statusFilter: number;
  setEventFilter: React.Dispatch<React.SetStateAction<string>>;
  eventFilter: string;
};

const ModalFilterItem: React.FC<ModalFilterItemProps> = ({
  isShowing,
  hide,
  statusFilter,
  setStatusFilter,
  setIsOpenEventStatus,
  isOpenStatus,
  setIsOpenEvent,
  setEventFilter,
  isOpenEvent,
  eventFilter,
}) => {
  const { available, connectors, connect, refresh } = useConnectors();

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
            className="fixed left-[50%] top-[50%] z-50 -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-gray-900 rounded-lg"
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
              <div className="flex w-full justify-between rounded-t-xl px-5 py-6">
                <div className="flex items-center gap-2">
                  <p className=" text-[20px] font-bold">Filter</p>
                </div>
                <button
                  onClick={handleClose}
                  className="grid h-8 w-8 place-items-center rounded-lg bg-gray-700 hover:bg-gray-700"
                >
                  {/* <img src={CloseSVG} alt="arrow" className="h-5" /> */}
                  <VscClose />
                </button>
              </div>

              <div className=" items-center justify-center gap-10 px-5 pb-7 pt-7 ">
                <div className="min-w-[230px] relative">
                  <div className="flex w-full flex-col border-[#24C3BC] border-b-[1px] cursor-pointer">
                    <div
                      onClick={() => {
                        console.log("test");
                        setIsOpenEventStatus((prev) => !prev);
                      }}
                      className={`flex justify-between pb-3 select-none`}
                    >
                      <p>Recently Listed</p>
                      <img
                        className={`transition-all ${
                          isOpenStatus ? " rotate-180" : "rotate-0"
                        }`}
                        src={arrowDown}
                        alt=""
                      />
                    </div>
                    <div
                      className={`flex flex-col w-full left-0 top-[50px] transition-max-h duration-300 ${
                        isOpenStatus
                          ? "max-h-[200px] pb-3"
                          : "max-h-0 overflow-hidden"
                      }`}
                    >
                      {statusFilterType.map((item, index) => (
                        <div
                          key={index}
                          onClick={() => setStatusFilter(item.value)}
                          className="flex justify-between items-center py-3 hover:bg-[#24C3BC] hover:bg-opacity-10 hover:rounded-[10px] cursor-pointer"
                        >
                          <p>{item.label}</p>
                          <div className="w-[20px] h-[20px] border border-[#24C3BC] p-[3px] rounded-full">
                            {statusFilter == item.value && (
                              <div className="w-full h-full bg-[#24C3BC] rounded-full"></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex w-full flex-col pt-3 border-[#24C3BC] border-b-[1px] cursor-pointer">
                    <div
                      onClick={() => setIsOpenEvent((prev) => !prev)}
                      className={`flex justify-between pb-3 select-none`}
                    >
                      <p>Event</p>
                      <img
                        className={`transition-all ${
                          isOpenEvent ? " rotate-180" : "rotate-0"
                        }`}
                        src={arrowDown}
                        alt=""
                      />
                    </div>
                    <div
                      className={`flex flex-col w-full left-0 top-[50px] transition-max-h duration-300 ${
                        isOpenEvent
                          ? "max-h-[300px] pb-3"
                          : "max-h-0 overflow-hidden"
                      }`}
                    >
                      {eventFilterType.map((item, index) => (
                        <div
                          key={index}
                          onClick={() => setEventFilter(item)}
                          className="flex justify-between items-center py-3 hover:bg-[#24C3BC] hover:bg-opacity-10 hover:rounded-[10px] cursor-pointer"
                        >
                          <p>{item}</p>
                          <div className="w-[20px] h-[20px] border border-[#24C3BC] p-[3px] rounded-full">
                            {eventFilter == item && (
                              <div className="w-full h-full bg-[#24C3BC] rounded-full"></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
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

export default ModalFilterItem;
