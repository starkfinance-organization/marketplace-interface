import Art from "@/sections/TopVolumePage/Art";
import Gaming from "@/sections/TopVolumePage/Gaming";
import Memberships from "@/sections/TopVolumePage/Membership";
import PhotoMusic from "@/sections/TopVolumePage/PhotoMusic";
import TopBuysToday from "@/sections/TopVolumePage/TopBuysToday";
import TrendingTable from "@/sections/TopVolumePage/TrendingTable";
import VolumeCarousel from "@/sections/TopVolumePage/VolumeCarousel";
import ic_find from "@/assets/svg/ic_find.svg";
import { useEffect, useState } from "react";
import { useGetCollections } from "@/queries/useGetCollectionsQuey";

const TopVolumePage = () => {
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

      tempArr = tempArr.filter((item: any, index: number) => index < 5);
      setCollections(tempArr);
    }
  }, [collectionData, searchCollection]);

  return (
    <div className="relative pt-[120px] lg:mx-[120px] md:mx-[60px] mx-4">
      <VolumeCarousel />
      <div className="flex gap-5 mt-[120px] px-5 py-3 w-full border border-[#24C3BC] bg-[#24C3BC] bg-opacity-10 rounded-[10px] mb-[60px]">
        <img src={ic_find} alt="" />
        <input
          className="w-full bg-transparent text-white"
          placeholder="Search NFT Collection Name"
          onChange={onChangeInputSearchCollection}
        />
      </div>
      <TrendingTable />

      <TopBuysToday collections={collections} title="All Collections" />
      <TopBuysToday collections={collections} title="Trending in Arts" />
      <TopBuysToday collections={collections} title="Trending in Gaming" />
      <TopBuysToday collections={collections} title="Trending in Memberships" />
      <TopBuysToday
        collections={collections}
        title="Trending in PFPs, Photography, Music"
      />
      {/* <Art collections={collections} />
      <Gaming collections={collections} />
      <Memberships collections={collections} />
      <PhotoMusic collections={collections} /> */}
    </div>
  );
};

export default TopVolumePage;
