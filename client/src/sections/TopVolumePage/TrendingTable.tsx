import { Carousel } from "flowbite-react";

import { BsFillPatchCheckFill } from "react-icons/bs";
import { useGetCollections } from "@/queries/useGetCollectionsQuey";
import { useState, useEffect } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useNavigate } from "react-router";
import RowNFT from "./RowNFT";

const TrendingTable = () => {
  const { data: collectionData } = useGetCollections();
  const navigate = useNavigate();

  const [collections, setCollections] = useState<any[]>([]);
  const [collectionsTrending, setCollectionsTrending] = useState<any[]>([]);

  useEffect(() => {
    if (collectionData) {
      let tempArr = collectionData.data
        .filter((item: any) => item.volume != null)
        .sort((a: any, b: any) => parseFloat(b.volume) - parseFloat(a.volume))
        .filter((item: any, index: number) => index < 5);

      setCollections(tempArr);
    }
  }, [collectionData]);

  useEffect(() => {
    if (collectionData) {
      let tempArr = collectionData.data
        .filter((item: any) => item.listed != null)
        .sort((a: any, b: any) => parseFloat(b.listed) - parseFloat(a.listed))
        .filter((item: any, index: number) => index < 5);

      setCollectionsTrending(tempArr);
    }
  }, [collectionData]);

  return (
    <div className="w-full mb-16 border-[0.5px] border-[#24C3BC] bg-[#24C3BC]/10 rounded-[10px] py-[30px] px-[20px]">
      <div className="lg:flex items-center w-full  ">
        <div className="flex flex-col flex-1 items-center">
          <p className="flex-1 text-[32px] text-[#24C3BC] font-bold mb-[30px] text-center">
            Trending
          </p>
          <div className="flex-1 w-full">
            <div className="flex-1 relative  h-full  overflow-x-auto">
              <table className="w-full h-full text-sm text-left border-[#24C3BC]  border-collapse">
                <thead className="text-xl font-bold border-b border-[#24C3BC] sticky top-0">
                  <tr>
                    <th scope="col" className=" py-3 text-center min-w-[50px] ">
                      Rank
                    </th>
                    <th
                      scope="col"
                      className=" px-6 py-3 min-w-[200px] text-left"
                    >
                      Collection
                    </th>
                    <th scope="col" className=" min-w-[150px] text-left ">
                      Floor Price
                    </th>
                    <th scope="col" className=" text-right min-w-[100px] ">
                      Volume 24h
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {collectionsTrending?.map((item: any, index: any) => (
                    <RowNFT data={item} index={index} key={index} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="h-[312px] border-[0.5px] lg:block hidden border-[#24C3BC] mx-10 mt-[98px]" />
        <div className="w-full border-[0.5px] lg:hidden block border-[#24C3BC] my-4" />
        <div className="flex flex-col flex-1 items-center md:mt-0 mt-10 ">
          <p className="flex-1 text-[32px] text-[#24C3BC] font-bold mb-[30px] text-center">
            Top Volume
          </p>
          <div className="flex-1 w-full">
            <div className="flex-1 relative  h-full  overflow-x-auto">
              <table className="w-full h-full text-sm text-left  border-gray-500   border-collapse">
                <thead className="text-xl font-bold border-b border-[#24C3BC] sticky top-0">
                  <tr>
                    <th scope="col" className=" py-3 text-center min-w-[50px] ">
                      Rank
                    </th>
                    <th
                      scope="col"
                      className=" px-6 py-3 min-w-[200px] text-left"
                    >
                      Collection
                    </th>
                    <th scope="col" className=" min-w-[150px] text-left ">
                      Floor Price
                    </th>
                    <th scope="col" className=" text-right min-w-[100px] ">
                      Volume 24h
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {collections?.map((item: any, index: any) => (
                    <RowNFT data={item} index={index} key={index} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingTable;
