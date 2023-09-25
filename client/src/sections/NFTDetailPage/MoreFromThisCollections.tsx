import "./Scrollbar.css";
import { useGetCollections } from "@/queries/useGetCollectionsQuey";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import BlankImage from "@/assets/png/default.jpg";
import BtnMoreCollections from "@/components/NFTDetail/BtnMoreCollections";
import { useGetCollectionNFTs } from "@/queries/useGetCollectionNFTs";
import { useParams } from "react-router-dom";

const MoreFromThisCollections = () => {
  const { contract_address } = useParams();
  const { data: collectionData } = useGetCollectionNFTs(
    contract_address || "",
    30
  );
  const navigate = useNavigate();

  const [collections, setCollections] = useState<any[]>([]);

  useEffect(() => {
    if (collectionData) {
      let tempArr = collectionData.pages.flatMap((page) => page.data);
      setCollections(tempArr);
    }
  }, [collectionData]);

  return (
    <div className="w-full 2xl:px-[10vw] lg:px-20 px-5 pb-14 overflow-hidden ">
      <div className="flex items-center justify-center lg:px-[90px] px-4">
        <p className=" text-xl text-white ">More from this collection</p>
      </div>
      <div className="flex scrollbar-styled whitespace-nowrap overflow-x-auto lg:grid-flow-row lg:grid-rows-1 lg:grid-cols-5 gap-8 pt-5 pb-10  ">
        {collections?.map((item: any) => (
          <div className=" rounded-md p-1 bg-gradient-to-br from-white/80  via-white/20 to-white">
            <div
              className="w-full h-full  bg-[#151125] rounded cursor-pointer"
              onClick={() => {
                navigate(`/assets/${item?.contract_address}/${item?.token_id}`);
              }}
            >
              <div className="w-[175px] h-[175px] rounded-md ">
                <img
                  src={item?.image_url || BlankImage}
                  alt=""
                  className="rounded-md w-full h-full aspect-square"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        className="flex justify-center"
        onClick={() => {
          navigate(`/collection/${collections[0]?.contract_address}`);
        }}
      >
        <BtnMoreCollections />
      </div>
    </div>
  );
};

export default MoreFromThisCollections;
