import CollectionBackground from "@/assets/png/collection_bg.png";
import NFTDetailBuyer from "@/sections/NFTDetailPage/NFTDetailBuyer";

const NFTDetailPage = () => {
  return (
    <div className="relative">
      <img
        src={CollectionBackground}
        alt=""
        className="w-full absolute inset-0 -z-10 h-full"
      />
      {/* <ProfileCollection /> */}
      <div className="max-w-website pt-[180px]">
        <NFTDetailBuyer />
      </div>
    </div>
  );
};

export default NFTDetailPage;
