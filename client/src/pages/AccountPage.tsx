import Default from "@/assets/png/logo.png";
import Banner from "@/assets/png/bannerProfile.png";
import CollectedTab from "@/sections/AccountPage/CollectedTab";
import ListedTab from "@/sections/AccountPage/ListedTab";
import { getShortAddress } from "@/utils/string";
import { useAccount } from "@starknet-react/core";

import { useState } from "react";
// import OfferMadeTab from "@/sections/AccountPage/OfferMadeTab";
// import OffersReceived from "@/sections/AccountPage/OffersReceivedTab";

const AccountPage = () => {
  const { address } = useAccount();

  const tabs = ["Collected", "Listings"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const handleTab = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="relative min-h-[100vh] px-4 pb-10">
      <img
        src={Banner}
        alt=""
        className="w-full md:block hidden absolute top-[100px] h-[200px]  inset-0 -z-10"
      />

      <div className="md:pt-[220px] pt-32 max-w-website md:px-[60px]">
        <div className="flex md:flex-col md:items-start items-center gap-3 ">
          <img
            src={Default}
            alt=""
            className="md:h-[150px] h-16 aspect-square rounded-[10px] "
          />
          <div className="">
            {/* <p className="text-[#24C3BC] font-bold text-5xl">Creator Name</p> */}
            <div className="flex flex-wrap gap-x-12 mt-2 items-center">
              <p className="text-2xl">{getShortAddress(address || "")}</p>
              {/* <p className="text-2xl font-normal">
                Joined <span className="font-bold">November 2022</span>
              </p> */}
            </div>
          </div>
        </div>

        <div className="mt-16 flex gap-14">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`w-fit mb-[30px] text-gray-500 grid text-2xl place-items-center transition-all ${
                activeTab == tab && "text-white font-bold "
              } `}
              onClick={() => handleTab(tab)}
            >
              <p className="md:text-[20px] text-[14px]">{tab}</p>
            </button>
          ))}
        </div>

        {tabs[0] == activeTab && <CollectedTab />}
        {/* {tabs[1] == activeTab && <OfferMadeTab />}
        {tabs[2] == activeTab && <OffersReceived />} */}
        {tabs[1] == activeTab && <ListedTab />}
      </div>
    </div>
  );
};

export default AccountPage;
