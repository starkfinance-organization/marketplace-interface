import HowToCard from "@/components/HowToCard/HowToCard";
import BG from "@/assets/png/howto.png";
import { IoWalletOutline } from "react-icons/io5";
import IconHowTo2 from "@/assets/svg/ic_howto2.svg";
import IconHowto3 from "@/assets/svg/ic_howto3.svg";

const mockData = [
  {
    icon: <IoWalletOutline className="text-[60px]" />,
    title: "Connect your Wallet",
    descrition:
      "Connect your wallet and make sure you have enough ETH on it for gas fee",
  },
  {
    icon: <img src={IconHowTo2} alt="" />,
    title: "CREATE ARTWORK",
    descrition: "Create your new collection and enter its detail information",
  },
  {
    icon: <img src={IconHowto3} alt="" />,
    title: "UPLOAD YOUR NFTS",
    descrition:
      "Upload NFTs in your collection and their properties on Starksport Marketplace",
  },
];

const HowTo = () => {
  return (
    <div className="py-32 relative">
      <img src={BG} alt="" className="absolute inset-0 h-full w-full -z-10" />

      <p className="text-center text-[48px] font-bold">
        HOW TO BECOME <br className="lg:hidden" /> A STARKSPORT NFT CREATOR
      </p>

      <div className=" flex lg:flex-nowrap flex-wrap justify-center lg:px-[120px] md:px-[60px] px-5 gap-10 mt-20">
        {mockData.map((item, index) => {
          if (index != 1)
            return (
              <div className="lg:mt-32 w-[320px] lg:w-full" key={index}>
                <HowToCard item={item} />
              </div>
            );
          return (
            <div key={index} className="w-[320px] lg:w-full">
              <HowToCard item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HowTo;
