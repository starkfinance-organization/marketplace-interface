import { useGetCollections } from "@/queries/useGetCollectionsQuey";
import { useState, useEffect } from "react";
import "./NoScrollbar.css";
import { useNavigate } from "react-router";
import { BiChevronRight } from "react-icons/bi";
import CollectionCard from "@/components/CollectionCard/CollectionCard";
import { route } from "@/routes/config";

const PhotoMusic = () => {
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
    <div className="w-full pb-14 overflow-hidden">
      <div className="flex items-center justify-between lg:px-[90px] px-4">
        <p className="font-bold text-2xl text-white uppercase">
          PFPs , Photography, Music
        </p>
        <button
          className="flex items-center"
          onClick={() => navigate("/collection")}
        >
          <p className="text-sm font-medium uppercase">View Category</p>
          <BiChevronRight className="h-8 w-8 text-[16px] text-white" />
        </button>
      </div>
      <div className="flex no-scrollbar whitespace-nowrap overflow-x-auto lg:grid-flow-row lg:grid-rows-1 lg:grid-cols-5 gap-8 py-3 lg:mx-[90px] px-2">
        {collections?.map((item: any) => (
          <div className="flex-1 h-[345px] w-[330px] aspect-square">
            <CollectionCard collection={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoMusic;
