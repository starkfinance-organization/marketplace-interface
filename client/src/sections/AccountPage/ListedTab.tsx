import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import RowNFTTabAll from "@/components/NFT/NFTTabAll";
import { useGetCollectionNFTs } from "@/queries/useGetCollectionNFTs";
import RowFNTTabOfferMode from "@/components/NFT/NFTTabProfile";
import RowNFTProfile from "@/components/RowNFTMobile/RowNFTProfile";
import { useAccount } from "@starknet-react/core";
import { useGetFilterListingOwner } from "@/queries/useGetFilterListingOwner";

const ListedTab = () => {
  const { account_address } = useParams();
  const observerTarget = useRef(null);

  const [NFTs, setNFTs] = useState<any[]>([]);
  const {
    data: accountNFTs,
    fetchNextPage,
    refetch,
  } = useGetFilterListingOwner(30, account_address || "");

  useEffect(() => {
    if (accountNFTs) {
      let teampArr: any = accountNFTs.pages.flatMap((page) => page.data);
      teampArr = teampArr.filter((item: any) => item.status == "LISTING");
      setNFTs(teampArr);
      console.log(teampArr);
    }
  }, [accountNFTs]);

  var width = window.innerWidth;

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

  return width > 768 ? (
    <div className="border mt-[30px] border-[#24C3BC] rounded-[10px] overflow-x-auto">
      <table className="w-full h-full text-center text-xl font-bold">
        <thead className="text-xl max-md:text-sm sticky top-0 bg-[#24C3BC]">
          <tr>
            <th scope="col" className="py-3 min-w-[200px] text-start pl-[30px]">
              NFT Name
            </th>
            <th scope="col" className="px-2 py-3 min-w-[150px]">
              Unit Price
            </th>
            <th scope="col" className="px-2 py-3 min-w-[150px]">
              Floor Price
            </th>
            <th scope="col" className="px-2 py-3 min-w-[170px]">
              Expiration Date
            </th>
            <th scope="col" className="px-auto">
              <div className="flex justify-center w-full h-fit"></div>
            </th>
          </tr>
        </thead>
        <tbody>
          {NFTs.map((item: any, index: any) => (
            <RowFNTTabOfferMode
              data={item}
              index={index}
              key={index}
              tabName="Listing"
              refetch={refetch}
            />
          ))}
          <div className="h-7" ref={observerTarget}></div>
        </tbody>
      </table>
    </div>
  ) : (
    <div>
      {NFTs.map((item: any, index: any) => (
        <RowNFTProfile
          data={item}
          index={index}
          key={index}
          tabName="Listing"
        />
      ))}
      <div className="h-7" ref={observerTarget}></div>
    </div>
  );
};

export default ListedTab;
