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
    <div className="w-full mb-16 border-[0.5px] border-white rounded-[20px] py-10 md:px-[72px] px-4">
      <div className="lg:flex items-center w-full  ">
        <div className="flex flex-col flex-1 items-center">
          <p className="flex-1 text-3xl text-white font-extrabold uppercase pb-10 text-center">
            Trending
          </p>
          <div className="flex-1 w-full">
            <div className="flex-1 relative  h-full max-h-[350px] overflow-x-auto">
              <table className="w-full h-full text-sm text-left  border-gray-500  border-collapse">
                <thead className="uppercase text-xs border-b  sticky top-0">
                  <tr>
                    <th scope="col" className="font-bold py-3 text-left">
                      Rank
                    </th>
                    <th
                      scope="col"
                      className="font-bold px-6 py-3 min-w-[200px] text-center"
                    >
                      Collection
                    </th>
                    <th
                      scope="col"
                      className="font-bold min-w-[100px] uppercase text-left"
                    >
                      Floor Price
                    </th>
                    <th scope="col" className="font-bold text-right uppercase">
                      Volume
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
            {/* <div className="flex items-center justify-center pt-5">
              <div
                className={`flex items-center justify-center p-1 h-8 w-8 rounded-md place-items-center cursor-pointer hover:border hover:bg`}
              >
                <BiChevronLeft className="h-8 w-8 text-[16px] text-center text-white" />
              </div>
              <div
                className={`flex items-center justify-center p-1 h-8 w-8 rounded-md place-items-center cursor-pointer hover:border hover:bg`}
              >
                <p>1</p>
              </div>
              <div
                className={`flex items-center justify-center p-1 h-8 w-8 rounded-md place-items-center cursor-pointer hover:border hover:bg`}
              >
                <p>2</p>
              </div>
              <div
                className={`flex items-center justify-center p-1 h-8 w-8 rounded-md place-items-center cursor-pointer hover:border hover:bg`}
              >
                <BiChevronRight className=" h-8 w-8 text-[16px] text-white" />
              </div>
            </div> */}
          </div>
        </div>
        <div className="h-[290px] border-[0.5px] lg:block hidden border-[#808080] mx-10 mt-14" />
        <div className="w-full border-[0.5px] lg:hidden block border-[#808080] my-4" />
        <div className="flex flex-col flex-1 items-center">
          <p className="flex-1 text-3xl text-white font-extrabold uppercase pb-10 text-center">
            Top Volume
          </p>
          <div className="flex-1 w-full">
            <div className="flex-1 relative  h-full max-h-[350px] overflow-x-auto">
              <table className="w-full h-full text-sm text-left  border-gray-500   border-collapse">
                <thead className="uppercase text-xs border-b sticky top-0">
                  <tr>
                    <th scope="col" className="font-bold py-3 text-left">
                      Rank
                    </th>
                    <th
                      scope="col"
                      className="font-bold px-6 py-3 min-w-[200px] text-center"
                    >
                      Collection
                    </th>
                    <th
                      scope="col"
                      className="font-bold min-w-[100px] uppercase text-left"
                    >
                      Floor Price
                    </th>
                    <th scope="col" className="font-bold text-right uppercase">
                      Volume
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
            {/* <div className="flex items-center justify-center pt-5">
              <div
                className={`flex items-center justify-center p-1 h-8 w-8 rounded-md place-items-center cursor-pointer hover:border hover:bg`}
              >
                <BiChevronLeft className="h-8 w-8 text-[16px] text-center text-white" />
              </div>
              <div
                className={`flex items-center justify-center p-1 h-8 w-8 rounded-md place-items-center cursor-pointer hover:border hover:bg`}
              >
                <p>1</p>
              </div>
              <div
                className={`flex items-center justify-center p-1 h-8 w-8 rounded-md place-items-center cursor-pointer hover:border hover:bg`}
              >
                <p>2</p>
              </div>
              <div
                className={`flex items-center justify-center p-1 h-8 w-8 rounded-md place-items-center cursor-pointer hover:border hover:bg`}
              >
                <BiChevronRight className="h-8 w-8 text-[16px] text-white" />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingTable;
