import Art from "@/sections/TopVolumePage/Art";
import Gaming from "@/sections/TopVolumePage/Gaming";
import Memberships from "@/sections/TopVolumePage/Membership";
import PhotoMusic from "@/sections/TopVolumePage/PhotoMusic";
import TopBuysToday from "@/sections/TopVolumePage/TopBuysToday";
import TrendingTable from "@/sections/TopVolumePage/TrendingTable";
import VolumeCarousel from "@/sections/TopVolumePage/VolumeCarousel";
import ic_find from "@/assets/svg/ic_find.svg";
import { useState } from "react";

const TopVolumePage = () => {
  const [searchCollection, setSearchCollection] = useState("");
  const onChangeInputSearchCollection = (e: any) => {
    setSearchCollection(e.target.value);
  };
  return (
    <div className="relative pt-[120px] lg:mx-[120px] md:mx-[60px]">
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
      <TopBuysToday />
      <Art />
      <Gaming />
      <Memberships />
      <PhotoMusic />
    </div>
  );
};

export default TopVolumePage;
