import AvataCollection from "@/assets/png/avata_collection.png";

import { getShortAddress, getShortPrice3 } from "@/utils/string";
import { useState } from "react";
import AllCollection from "./AllCollection";
import ListedCollection from "./ListedCollection";
import CollectedTab from "./CollectedTab";
import ActivityCollection from "./ActivityCollection";

const ProfileCollection = ({ data }: { data?: any }) => {
  const tabs = ["Items", "Activity"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const handleTab = (tab: string) => {
    setActiveTab(tab);
  };
  
  return (
    <div className="pt-20 relative pb-20">
      <img
        src={data?.banner || AvataCollection}
        alt=""
        className="h-[400px] w-full absolute inset-0 top-24 -z-10"
      />
      <div className="max-w-website md:px-[60px] px-[20px] lg:px-[120px] pt-80 ">
        <img
          src={data?.image || AvataCollection}
          className="w-40 h-40 rounded-lg"
          alt=""
        />

        <p className="font-bold text-[32px] text-[#24C3BC] mt-4">
          {data?.name}
        </p>

        <div className="flex flex-wrap gap-7 mt-4">
          <p className="max-md:text-sm">
            {getShortAddress(data?.contract_address)}
          </p>
          <p className=" max-md:text-sm font-normal">
            Created <span className="font-bold">-</span>
          </p>
          <p className=" max-md:text-sm font-normal">Creator Earnings -</p>
          <p className="max-md:text-sm font-normal">
            Category <span className="font-bold">-</span>
          </p>
        </div>

        <div className=" pb-10">
          <div className="my-4  flex gap-10">
            {tabs.map((tab, index) => (
              <button
                key={index}
                className={`h-14 w-fit text-white font-extrabold grid place-items-center transition-all ${
                  activeTab !== tab && "text-white/70  "
                } `}
                onClick={() => handleTab(tab)}
              >
                <p className="text-[20px] max-md:text-sm">{tab}</p>
              </button>
            ))}
          </div>

          {tabs[0] == activeTab && <CollectedTab />}
          {tabs[1] == activeTab && <ActivityCollection />}
        </div>
      </div>
    </div>
  );
};

export default ProfileCollection;
