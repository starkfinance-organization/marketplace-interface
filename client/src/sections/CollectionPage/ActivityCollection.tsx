import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCollectionNFTs } from "@/queries/useGetCollectionNFTs";
import RowNFTTabCollection from "@/components/NFT/RowNFTTabCollection";
import arrowDown from "@/assets/svg/arrowDown.svg";
import ic_filter from "@/assets/svg/ic_filter.svg";
import ic_find from "@/assets/svg/ic_find.svg";
import RowNFTActivity from "@/components/RowNFTMobile/RowNFTActivity";
import ModalFilter from "../ActivityPage/ModalFilter";
import useModalWallet from "@/components/ModalWallet/useModalWallet";
import { statusFilterType } from "@/utils/constant";
import { useGetFilterListingQuery } from "@/queries/activity/useGetFilterListingQuery";

const ActivityCollection = () => {
  // Menu dropdown in left side
  const eventFilterType = ["Listing", "Sale", "Offer"];

  const listedFilterType = [
    "Recently Listed",
    "Price Low To High",
    "Price High To Low",
  ];
  const [isOpenEvent, setIsOpenEvent] = useState(false);
  const [isOpenRecentlyListed, setIsOpenEventRecentlyListed] = useState(false);
  const [eventFilter, setEventFilter] = useState(eventFilterType[0]);
  const [listedFilter, setListedFilter] = useState(statusFilterType[0].value);
  const [visibleFilter, setVisibleFilter] = useState(false);
  const [tokenID, setTokenID] = useState("");

  const { contract_address } = useParams();
  const observerTarget = useRef(null);
  const [allNFT, setAllNFT] = useState<any[]>([]);

  const { data: allNFTs, fetchNextPage } = useGetFilterListingQuery(
    100,
    "",
    listedFilter,
    contract_address,
    tokenID,
    eventFilter
  );

  const { isShowing, toggle } = useModalWallet();

  const width = window.innerWidth;
  useEffect(() => {
    if (allNFTs !== undefined && allNFTs.pages.length > 0) {
      const listData = allNFTs?.pages.flatMap((item) => item?.data);
      setAllNFT(listData);
    }
  }, [allNFTs]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget]);

  const onChangeInputTokenID = (e: any) => {
    setTokenID(e.target.value);
  };

  const filterComp = () => {
    return (
      <div className="min-w-[230px] relative">
        <div
          className={`flex w-full flex-col mt-5 border-[#24C3BC] border-b-[1px] cursor-pointer`}
        >
          <div
            onClick={() => setIsOpenEventRecentlyListed((prev) => !prev)}
            className={`flex justify-between pb-3 select-none `}
          >
            <p>Status</p>
            <img
              className={`transition-all ${
                isOpenRecentlyListed ? " rotate-180" : "rotate-0"
              }`}
              src={arrowDown}
              alt=""
            />
          </div>
          <div
            className={`flex flex-col w-full left-0 top-[50px] transition-max-h duration-300 ${
              isOpenRecentlyListed
                ? "max-h-[200px] pb-3"
                : "max-h-0 overflow-hidden"
            }`}
          >
            {statusFilterType.map((item, index) => (
              <div
                key={index}
                onClick={() => setListedFilter(item.value)}
                className="flex justify-between items-center py-3 hover:bg-[#24C3BC] hover:bg-opacity-10 hover:rounded-[10px] cursor-pointer"
              >
                <p>{item.label}</p>
                <div className="w-[20px] h-[20px] border border-[#24C3BC] p-[3px] rounded-full">
                  {listedFilter == item.value && (
                    <div className="w-full h-full bg-[#24C3BC] rounded-full"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className={`mt-5 flex w-full flex-col border-[#24C3BC] border-b-[1px] cursor-pointer`}
        >
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
              isOpenEvent ? "max-h-[300px] pb-3" : "max-h-0 overflow-hidden"
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
    );
  };

  return (
    <div className="flex flex-col gap-[30px] max-lg:flex-col text-sm md:text-xl">
      <ModalFilter
        isShowing={isShowing}
        hide={toggle}
        isOpenStatus={isOpenRecentlyListed}
        setIsOpenEventStatus={setIsOpenEventRecentlyListed}
        isOpenEvent={isOpenEvent}
        setIsOpenEvent={setIsOpenEvent}
        setStatusFilter={setListedFilter}
        statusFilter={listedFilter}
        setEventFilter={setEventFilter}
        eventFilter={eventFilter}
      />
      <div className="flex min-w-[230px] md:gap-[30px] gap-5">
        <div
          onClick={() =>
            width > 768 ? setVisibleFilter((prev) => !prev) : toggle()
          }
          className={`flex md:max-w-[230px] max-md:w-fit w-full gap-4 px-5 py-3 items-center border border-[#24C3BC] bg-[#24C3BC] rounded-xl cursor-pointer ${
            !visibleFilter && "bg-opacity-10"
          }`}
        >
          <img src={ic_filter} alt="" />
          <p className="font-bold text-xl max-md:hidden">Filter</p>
        </div>

        <div className="flex gap-5 px-5 py-3 w-full border border-[#24C3BC] bg-[#24C3BC] bg-opacity-10 rounded-[10px]">
          <img src={ic_find} alt="" />
          <input
            className="w-full bg-transparent text-white"
            placeholder="Search by name"
            onChange={onChangeInputTokenID}
          />
        </div>
      </div>
      <div className="flex gap-[20px] ">
        {visibleFilter && <div className="max-md:hidden">{filterComp()}</div>}
        {width > 768 ? (
          <div className="border w-full border-[#24C3BC] rounded-[10px]  overflow-x-auto">
            <table className="w-full h-full text-xl max-md:text-sm text-left">
              <thead className="text-xl max-md:text-sm sticky top-0 bg-[#24C3BC]">
                <tr>
                  <th scope="col" className="py-3 min-w-[150px] pl-[30px]">
                    Event
                  </th>
                  <th scope="col" className="py-3 min-w-[200px]">
                    NFT Name
                  </th>
                  <th scope="col" className="py-3 min-w-[150px]">
                    Price
                  </th>
                  <th scope="col" className="py-3 min-w-[150px]">
                    From
                  </th>
                  <th scope="col" className="py-3 min-w-[170px]">
                    To
                  </th>
                  <th scope="col" className="py-3 min-w-[100px]">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {allNFT.map((item: any, index: any) => (
                  <RowNFTTabCollection data={item} index={index} key={index} />
                ))}
                <div className="h-7" ref={observerTarget}></div>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="w-full">
            {allNFT.map((item: any, index: any) => (
              <RowNFTActivity data={item} index={index} key={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityCollection;
