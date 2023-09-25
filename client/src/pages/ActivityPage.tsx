import arrowDown from "@/assets/svg/arrowDown.svg";
import ic_filter from "@/assets/svg/ic_filter.svg";
import ic_find from "@/assets/svg/ic_find.svg";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { useGetFilterListingQuery } from "@/queries/activity/useGetFilterListingQuery";
import CollectionBannerPNG from "@/assets/png/collection_banner.png";
import {
  STATUS_VALUE,
  eventFilterType,
  statusFilterType,
} from "@/utils/constant";
import RowNFTActivity from "@/components/RowNFTMobile/RowNFTActivity";
import useModalWallet from "@/components/ModalWallet/useModalWallet";
import ModalFilter from "@/sections/ActivityPage/ModalFilter";
import RowNFTTabCollection from "@/components/NFT/RowNFTTabCollection";

const ActivityPage = () => {
  // menu dropdown in left side
  const [statusFilter, setStatusFilter] = useState(statusFilterType[0].value);
  const [isOpenEvent, setIsOpenEvent] = useState(true);
  const [isOpenStatus, setIsOpenEventStatus] = useState(true);
  const [eventFilter, setEventFilter] = useState(eventFilterType[0]);
  const [visibleFilter, setVisibleFilter] = useState(false);
  const observerTarget = useRef(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [tokenID, setTokenID] = useState("");
  const [listNFT, setListNFT] = useState<any[]>([]);
  const {
    data: collectionNFTs,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useGetFilterListingQuery(20, "", statusFilter, "", tokenID, eventFilter);

  var width = window.innerWidth;

  const { isShowing, toggle } = useModalWallet();

  const onChangeInputTokenID = (e: any) => {
    setTokenID(e.target.value);
  };

  const handlePaginationClick = () => {
    fetchNextPage();
    setPage((prevState) => prevState + 1);
  };

  useEffect(() => {
    if (collectionNFTs !== undefined && collectionNFTs.pages.length > 0) {
      const listData = collectionNFTs?.pages.flatMap((item) => item?.data);
      setListNFT(listData);
      // if (collectionNFTs?.pages[0].totalPages !== totalPages)
      //   setTotalPages(collectionNFTs?.pages[0].totalPages);
    }
  }, [collectionNFTs]);

  useEffect(() => {
    refetch();
  }, [statusFilter, tokenID, eventFilter]);

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

  const filterComp = () => {
    return (
      <div className="min-w-[230px] relative">
        <div className="flex w-full flex-col border-[#24C3BC] border-b-[1px] cursor-pointer">
          <div
            onClick={() => setIsOpenEventStatus((prev) => !prev)}
            className={`flex justify-between pb-3 select-none`}
          >
            <p>Status</p>
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
              isOpenStatus ? "max-h-[200px] pb-3" : "max-h-0 overflow-hidden"
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
    <div className="pt-[110px] overflow-auto pb-11 min-h-[100vh]">
      <div className="md:hidden block">
        <ModalFilter
          isShowing={isShowing}
          hide={toggle}
          isOpenStatus={isOpenStatus}
          setIsOpenEventStatus={setIsOpenEventStatus}
          isOpenEvent={isOpenEvent}
          setIsOpenEvent={setIsOpenEvent}
          setStatusFilter={setStatusFilter}
          statusFilter={statusFilter}
          setEventFilter={setEventFilter}
          eventFilter={eventFilter}
        />
      </div>

      <img
        src={CollectionBannerPNG}
        alt=""
        className="h-[200px] w-full -z-10"
      />
      <div className="flex flex-col 2xl:px-20 px-6  mt-[30px] gap-[30px] max-lg:flex-col text-sm md:text-xl max-w-website">
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
          {/* <div className="md:hidden w-full">{filterComp()}</div> */}

          <div className="flex gap-5 px-5 py-3 w-full border border-[#24C3BC] bg-[#24C3BC] bg-opacity-10 rounded-[10px]">
            <img src={ic_find} alt="" />
            <input
              className="w-full bg-transparent text-white"
              placeholder="Search by name"
              onChange={onChangeInputTokenID}
            />
          </div>
        </div>
        <div className="flex gap-[30px]">
          {visibleFilter && <div className="max-md:hidden">{filterComp()}</div>}
          {width > 768 ? (
            <div className="border border-[#24C3BC] bg-[#24C3BC]/10 rounded-[10px]  max-h-[100vh] w-full overflow-y-auto">
              <table className="w-full h-full text-xl max-md:text-sm text-left">
                <thead className="text-xl max-md:text-sm  sticky top-0 bg-[#24C3BC]">
                  <tr>
                    <th scope="col" className="py-3 min-w-[120px] pl-[20px]">
                      Event
                    </th>
                    <th scope="col" className="py-3 min-w-[200px]">
                      NFT Name
                    </th>
                    <th scope="col" className="py-3 min-w-[120px]">
                      Price
                    </th>
                    <th scope="col" className="py-3 min-w-[150px]">
                      From
                    </th>
                    <th scope="col" className="py-3 min-w-[150px]">
                      To
                    </th>
                    <th scope="col" className="py-3 min-w-[150px]">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody className="mt-[20px] text-base">
                  {listNFT.map((item: any, index: any) => (
                    <RowNFTTabCollection
                      data={item}
                      index={index}
                      key={index}
                    />
                  ))}
                  <div className="h-7" ref={observerTarget}></div>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex-1">
              {listNFT.map((item: any, index: any) => (
                <RowNFTActivity data={item} index={index} key={index} />
              ))}
              <div className="h-7" ref={observerTarget}></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityPage;
