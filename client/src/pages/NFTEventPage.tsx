import NFTMint from "@/sections/CollectionPage/NFTMint";
import CollectionBackground from "@/assets/png/collection_bg.png";

const NFTEventPage = () => {
  return (
    <div className="relative">
      {/* <img
        src={CollectionBackground}
        alt=""
        className="w-full absolute inset-0 -z-10 h-full"
      /> */}
      <NFTMint />
    </div>
  );
};

export default NFTEventPage;
