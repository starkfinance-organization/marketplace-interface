import BackgroundBanner from "@/assets/png/banner_home.png";
import useModalWallet from "@/components/ModalWallet/useModalWallet";
import ModalWallet from "@/components/ModalWallet/ModalWallet";
import Button from "@/components/Button/Button";
import { useNavigate } from "react-router-dom";
import { route } from "@/routes/config";
import BannerText from "@/assets/svg/banner_text.svg";

const Banner = () => {
  const { isShowing, toggle } = useModalWallet();
  const navigate = useNavigate();

  return (
    <div className="relative">
      <ModalWallet isShowing={isShowing} hide={toggle} />

      <img
        src={BackgroundBanner}
        alt=""
        className="absolute inset-0 h-full w-full z-1 object-cover"
      />
      <div className="flex text-white flex-col items-center lg:px-[120px] md:px-[60px] px-5 md:h-[100vh] justify-center max-w-website pt-[100px] pb-[100px] relative">
        <p className="uppercase text-[20px] text-center">
          THE LARGEST NFT MARKETPLACE ON STARKNET
        </p>
        {/* <p className="uppercase md:text-[68px] text-[48px] text-center font-paytone">
          discover unique
        </p>
        <p className="uppercase md:text-[68px] text-center text-[48px] font-paytone ">
          starksport NFTs
        </p> */}
        <img src={BannerText} className="mt-4 mb-4" />
        <p className="text-[20px] text-white/70  text-center">
          The best marketplace for Starksport character non-fungible token
          collections
        </p>
        <div onClick={() => navigate(route.nftEvent)}>
          <Button title="Mint NOW" className="grid place-items-center mt-16" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
