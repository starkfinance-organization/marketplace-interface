import NFTCard from "@/components/NFTCard/NFTCard";
import { useGetAccountNFTs } from "@/queries/useGetAccountNFTs";
import { useAccount } from "@starknet-react/core";
import { SetStateAction, useEffect, useState } from "react";
import { useGetCollections } from "@/queries/useGetCollectionsQuey";

import ic_filter from "@/assets/svg/ic_filter.svg";
import ic_find from "@/assets/svg/ic_find.svg";
import arrowDown from "@/assets/svg/arrowDown.svg";
import NFTCardWithoutPrice from "@/components/NFTCard/NFTCardWithoutPrice";
// import ModalFilter from "./ModalFilter";
import useModalWallet from "@/components/ModalWallet/useModalWallet";
import { statusFilterType } from "@/utils/constant";

const CollectedTab = () => {
  // menu dropdown in left side

  const [statusFilter, setStatusFilter] = useState(statusFilterType[0].value);
  const [isOpenEvent, setIsOpenEvent] = useState(false);
  const [isOpenRecentlyListed, setIsOpenEventRecentlyListed] = useState(false);
  const [typeMoney, setTypeMoney] = useState("ETH");
  const [visibleFilter, setVisibleFilter] = useState(false);
  const { address } = useAccount();
  const { data: collections } = useGetCollections();
  const [NFTs, setNFTs] = useState<any[]>([]);
  const [collectionShow, setCollectionShow] = useState<any[]>([]);
  const { data: accountNFTs } = useGetAccountNFTs(address || "", 30);
  const [tokenID, setTokenID] = useState("");
  const { isShowing, toggle } = useModalWallet();
  const width = window.innerWidth;
  const onChangeInputTokenID = (e: any) => {
    setTokenID(e.target.value);
  };

  useEffect(() => {
    if (collections) {
      let tempArr = collections?.data.filter(
        (item: any) => item.banner_show == 1
      );
      tempArr = tempArr.slice(0, 4);
      setCollectionShow(tempArr);
    }
  }, [collections]);

  useEffect(() => {
    if (accountNFTs) {
      let teampArr = accountNFTs.pages.flatMap((page) => page.data);
      setNFTs(teampArr);
    }
  }, [accountNFTs]);

  const handleUSD = () => {
    setTypeMoney("USD");
  };

  const handleETH = () => {
    setTypeMoney("ETH");
  };

  const filterComp = () => {
    return (
      <div className="min-w-[230px]">
        <div className="min-w-[200px] relative">
          <div className="flex w-full flex-col border-[#24C3BC] border-b-[1px] cursor-pointer">
            <div
              onClick={() => setIsOpenEvent((prev) => !prev)}
              className={`flex justify-between pb-3 select-none font-bold text-xl max-md:text-sm`}
            >
              <p>Status</p>
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
                isOpenEvent ? "max-h-[200px] pb-3" : "max-h-0 overflow-hidden"
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
        </div>
        <div className="min-w-[200px] relative">
          <div className="flex w-full flex-col mt-3 border-[#24C3BC] border-b-[1px]">
            <div
              onClick={() => setIsOpenEventRecentlyListed((prev) => !prev)}
              className={`flex justify-between pb-3 cursor-pointer select-none font-bold text-xl max-md:text-sm`}
            >
              <p>Price</p>
              <img
                className={`transition-all ${
                  isOpenRecentlyListed ? " rotate-180" : "rotate-0"
                }`}
                src={arrowDown}
                alt=""
              />
            </div>
            <div
              className={`flex flex-col gap-[15px]  w-full left-0 top-[50px] transition-max-h duration-300 ${
                isOpenRecentlyListed
                  ? "max-h-[200px] py-3"
                  : "max-h-0 overflow-hidden"
              }`}
            >
              <div className="flex md:justify-between justify-around">
                <div
                  onClick={handleETH}
                  className={`px-[32px] py-2 border rounded-[10px] border-[#24C3BC] cursor-pointer ${
                    typeMoney == "ETH"
                      ? "bg-[#24C3BC]"
                      : "bg-[#24C3BC] bg-opacity-10"
                  }`}
                >
                  ETH
                </div>
                <div
                  onClick={handleUSD}
                  className={`px-[32px] py-2 border rounded-[10px] border-[#24C3BC] cursor-pointer  ${
                    typeMoney == "USD"
                      ? "bg-[#24C3BC]"
                      : "bg-[#24C3BC] bg-opacity-10"
                  }`}
                >
                  USD
                </div>
              </div>
              <div className="flex md:justify-between justify-around items-center">
                <div
                  className={`px-[25px] py-2 border rounded-[10px] border-[#24C3BC] bg-[#24C3BC] bg-opacity-10 cursor-pointer`}
                >
                  Min
                </div>
                <div>
                  <p>TO</p>
                </div>
                <div
                  className={`px-[25px] py-2 border rounded-[10px] border-[#24C3BC] bg-[#24C3BC] bg-opacity-10 cursor-pointer`}
                >
                  MAX
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    // <div className="grid md:grid-cols-6 grid-cols-2 gap-4 mt-[30px]">
    //   {NFTs.map((item) => {
    //     return <NFTV2 nftData={item} />;
    //   })}
    // </div>

    <div className="flex flex-col gap-[30px] max-lg:flex-col text-sm md:text-xl">
      {/* <ModalFilter
        isShowing={isShowing}
        hide={toggle}
        isOpenEvent={isOpenEvent}
        setIsOpenEvent={setIsOpenEvent}
        setStatusFilter={setStatusFilter}
        statusFilter={statusFilter}
        handleUSD={handleUSD}
        handleETH={handleETH}
        isOpenRecentlyListed={isOpenRecentlyListed}
        setIsOpenEventRecentlyListed={setIsOpenEventRecentlyListed}
        typeMoney={typeMoney}
      /> */}
      {/* <div className="flex min-w-[230px] md:gap-[30px] gap-5">
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
      </div> */}
      <div className="flex gap-[30px]">
        {visibleFilter && <div className="max-md:hidden">{filterComp()}</div>}
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 grid-cols-2 md:gap-[30px] gap-4">
          {NFTs?.map((item) => {
            return (
              <div className="md:max-w-[350px] max-h-[340px] w-full ">
                <NFTCardWithoutPrice nftData={item} />
              </div>
            );
          })}
          {/* <div className="flex items-center justify-center mt-[70px]">
            <div
              className="cursor-pointer w-[245px] h-fit py-3 px-4  shadow-button-wallet bg-[#24C3BC] rounded-md grid place-items-center"
              onClick={() => {}}
            >
              <p className="text-[20px] uppercase font-bold">View More</p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CollectedTab;
