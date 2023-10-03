import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import RowNFTTabAll from "@/components/NFT/NFTTabAll";
import { useGetCollectionNFTs } from "@/queries/useGetCollectionNFTs";
import RowNFTTabProfile from "@/components/NFT/NFTTabProfile";
import RowNFTProfile from "@/components/RowNFTMobile/RowNFTProfile";
import { useAccount } from "@starknet-react/core";
import { useGetAllOffersBySigner } from "@/queries/useGetAllOffersBySigner";

const OfferMadeTab = () => {
    const { address, status, account } = useAccount();
    const { contract_address } = useParams();
    const observerTarget = useRef(null);
    const [allOffers, setAllOffers] = useState<any[]>([]);
    const {
        data, error, isLoading
    } = useGetAllOffersBySigner(address);

    useEffect(() => {
        if (isLoading) {
            console.log('Loading...');
        } else if (error) {
            console.log('Error:', error);
        } else if (data && data.data) {
            setAllOffers(data.data)
        } else {
            console.log('Data is not yet available.');
        }
    }, [data]);

    const width = window.innerWidth;
    // useEffect(() => {
    //   if (allNFTs !== undefined && allNFTs.pages.length > 0) {
    //     const listData = allNFTs?.pages.flatMap((item) => item?.data);
    //     setAllNFT(listData);
    //   }
    // }, [allNFTs]);

    // useEffect(() => {
    //   const observer = new IntersectionObserver(
    //     (entries) => {
    //       if (entries[0].isIntersecting) {
    //         fetchNextPage();
    //       }
    //     },
    //     { threshold: 1 }
    //   );

    //   if (observerTarget.current) {
    //     observer.observe(observerTarget.current);
    //   }

    //   return () => {
    //     if (observerTarget.current) {
    //       observer.unobserve(observerTarget.current);
    //     }
    //   };
    // }, [observerTarget]);

    return width > 768 ? (
        <div className="border mt-[30px] border-[#24C3BC] rounded-[10px] overflow-x-auto">
            <table className="w-full h-full text-xl max-md:text-sm text-left">
                <thead className="text-xl max-md:text-sm sticky top-0 bg-[#24C3BC] ">
                    <tr>
                        <th
                            scope="col"
                            className="py-3 min-w-[200px] text-left text-xl font-bold pl-[30px]"
                        >
                            NFT Name
                        </th>
                        <th
                            scope="col"
                            className="px-2 py-3 min-w-[150px] text-center text-xl font-bold"
                        >
                            Unit Price
                        </th>
                        <th
                            scope="col"
                            className="px-2 py-3 min-w-[150px] text-center text-xl font-bold"
                        >
                            Floor Price
                        </th>
                        <th
                            scope="col"
                            className="px-2 py-3 min-w-[170px] text-center text-xl font-bold"
                        >
                            Expiration Date
                        </th>
                        <th
                            scope="col"
                            className="px-2 py-3 min-w-[150px] text-center text-xl font-bold"
                        >
                            Created
                        </th>

                        <th scope="col" className="px-auto">
                            <div className="flex justify-center w-full h-fit">
                                <button className="text-center text-xl font-bold min-w-[200px]  text-[#24C3BC] ">
                                    Cancel All Offers
                                </button>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {allOffers.map((item: any, index: any) => (
                        <RowNFTTabProfile
                            data={item}
                            index={index}
                            key={index}
                            tabName="OfferMade"
                        />
                    ))}
                    <div className="h-7" ref={observerTarget}></div>
                </tbody>
            </table>
        </div>
    ) : (
        <div>
            {allOffers.map((item: any, index: any) => (
                <RowNFTProfile
                    data={item}
                    index={index}
                    key={index}
                    tabName="OfferMade"
                />
            ))}
        </div>
    );
};

export default OfferMadeTab;
