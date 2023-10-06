import { useEffect, useState } from "react";
import CollectionCard from "./CollectionCard";
import { useGetCollections } from "@/queries/useGetCollectionsQuey";
import ic_find from "@/assets/svg/ic_find.svg";

const AllTab = () => {
  const [searchCollection, setSearchCollection] = useState("");
  const onChangeInputSearchCollection = (e: any) => {
    setSearchCollection(e.target.value);
  };

  const { data: collectionData } = useGetCollections();
  const [collections, setCollections] = useState<any[]>([]);

  useEffect(() => {
    if (collectionData) {
      let tempArr = collectionData.data.filter((item: any) => {
        const value = item.name.toLowerCase();
        return value.includes(searchCollection.toLowerCase());
      });

      setCollections(tempArr);
    }
  }, [collectionData, searchCollection]);

  return (
    <div className="lg:px-[120px] px-[20px] pt-4 pb-10">
      <div className="flex gap-5 mt-[150px] px-5 py-3 w-full border border-[#24C3BC] bg-[#24C3BC] bg-opacity-10 rounded-[10px]">
        <img src={ic_find} alt="" />
        <input
          className="w-full bg-transparent text-white"
          placeholder="Search by name"
          onChange={onChangeInputSearchCollection}
        />
      </div>
      <div
        className={`h-14 w-fit my-[60px] grid place-items-center transition-all  text-[#00FFFF]`}
      >
        <p className="text-[32px] font-bold ">All Collections</p>
      </div>
      <div className=" grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-5">
        {collections.map((item: any) => (
          <CollectionCard data={item} />
        ))}
      </div>
    </div>
  );
};

export default AllTab;
