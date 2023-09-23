import CollectionBannerPNG from "@/assets/png/collection_banner.png";
import AvataCollection from "@/assets/png/avata_collection.png";

import NFTDetail from "./NFTDetail";

const Profile = () => {
  return (
    <div className="pt-20 relative">
      <img
        src={CollectionBannerPNG}
        alt=""
        className="h-[200px] w-full absolute inset-0 top-20 -z-10"
      />
      <div className="max-w-website pt-24">
        <img src={AvataCollection} alt="" />

        <p className="font-bold text-[24px] mt-4">STARK SPORT</p>

        <div className="flex gap-7 mt-4">
          <p className="font-bold text-[20px]">0x912db....9999</p>
          <p className="text-[20px]">Joined November 2022</p>
        </div>

        <div className="flex mt-7 gap-10">
          <p className="font-bold text-[20px]">Collected</p>
          <p className="font-bold text-[20px]">Offers made</p>
          <p className="font-bold text-[20px]">Favorite</p>
        </div>

        {/* <div className="flex mt-4">
          <div className="flex gap-2 items-center py-2 px-4 bg-black rounded-md justify-center">
            <BsFilter />
            <p className="font-bold text-[15px]">Filter</p>
          </div>

          <div></div>
        </div>

        <div className="mt-4 grid grid-cols-6 gap-5">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
            <NFT />
          ))}
        </div> */}

        <NFTDetail />
      </div>
    </div>
  );
};

export default Profile;
