import CollectionCarousel from "@/sections/CollectionPage/CollectionCarousel";
import { useState } from "react";
import AllTab from "@/sections/CollectionPage/AllTab";
import ic_find from "@/assets/svg/ic_find.svg";

const CollectionPage = () => {
  return (
    <div className="relative ">
      <CollectionCarousel />
      {/* {tabs[0] == activeTab && <TrendingTab />} */}
      <AllTab />
    </div>
  );
};

export default CollectionPage;
