import CollectionCarousel from "@/sections/CollectionPage/CollectionCarousel";
import { useState } from "react";
import AllTab from "@/sections/CollectionPage/AllTab";
import ic_find from "@/assets/svg/ic_find.svg";

const CollectionPage = () => {
  const tabs = ["ALL"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [tokenID, setTokenID] = useState("");

  const handleTab = (tab: string) => {
    setActiveTab(tab);
  };

  const onChangeInputTokenID = (e: any) => {
    setTokenID(e.target.value);
  };

  return (
    <div className="relative ">
      <CollectionCarousel />

      <div className="lg:px-[120px] px-[20px] pt-4 pb-10">
        <div className="flex gap-5 mt-[150px] px-5 py-3 w-full border border-[#24C3BC] bg-[#24C3BC] bg-opacity-10 rounded-[10px]">
          <img src={ic_find} alt="" />
          <input
            className="w-full bg-transparent text-white"
            placeholder="Search by name"
            onChange={onChangeInputTokenID}
          />
        </div>
        <div className="mt-[60px] flex gap-10">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`h-14 w-fit  grid place-items-center transition-all  text-[#00FFFF]`}
              onClick={() => handleTab(tab)}
            >
              <p className="text-[24px] font-extrabold uppercase">{tab}</p>
            </button>
          ))}
        </div>

        {/* {tabs[0] == activeTab && <TrendingTab />} */}
        {tabs[0] == activeTab && <AllTab />}
      </div>
    </div>
  );
};

export default CollectionPage;
