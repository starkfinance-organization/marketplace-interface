import { useGetCollections } from "@/queries/useGetCollectionsQuey";
import { useState, useEffect } from "react";
import "./NoScrollbar.css";
import { useNavigate } from "react-router";
import { BiChevronRight } from "react-icons/bi";
import CollectionCard from "@/components/CollectionCard/CollectionCard";
import { route } from "@/routes/config";

const Art = () => {
  const { data: collectionData } = useGetCollections();
  const navigate = useNavigate();
  const [collections, setCollections] = useState<any[]>([]);
  const handleClick = () => {
    navigate(route.collection);
  };
  useEffect(() => {
    if (collectionData) {
      let tempArr = collectionData.data.filter(
        (item: any, index: number) => index < 5
      );
      setCollections(tempArr);
    }
  }, [collectionData]);

  return (
    <div className="w-full pb-[60px] overflow-hidden">
      <div className="flex items-center justify-between pb-[50px]">
        <p className="font-bold text-[32px] text-[#24C3BC]">Trending in Arts</p>
        <button
          className="flex items-center"
          onClick={() => navigate("/collection")}
        >
          <p className="text-base font-normal">View Category</p>
          <BiChevronRight className="h-8 w-8 text-[16px] text-white" />
        </button>
      </div>
      <div className="flex lg:grid no-scrollbar whitespace-nowrap overflow-x-auto lg:grid-flow-row lg:grid-rows-1 lg:grid-cols-5 gap-[30px]  ">
        {collections?.map((item: any) => (
          <div className="flex-1 h-[300px] w-[300px] aspect-square">
            <CollectionCard collection={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Art;
