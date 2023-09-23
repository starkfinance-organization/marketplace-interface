import Art from "@/sections/TopVolumePage/Art";
import Gaming from "@/sections/TopVolumePage/Gaming";
import PhotoMusic from "@/sections/TopVolumePage/PhotoMusic";
import TopBuysToday from "@/sections/TopVolumePage/TopBuysToday";
import TrendingTable from "@/sections/TopVolumePage/TrendingTable";
import VolumeCarousel from "@/sections/TopVolumePage/VolumeCarousel";

const TopVolumePage = () => {
  return (
    <div className="relative pt-20 lg:px-11 px-4">
      <VolumeCarousel />
      <TrendingTable />
      <TopBuysToday />
      <PhotoMusic />
      <Art />
      <Gaming />
    </div>
  );
};

export default TopVolumePage;
