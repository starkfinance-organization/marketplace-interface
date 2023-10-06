import { useGetCollections } from "@/queries/useGetCollectionsQuey";
import { useState, useEffect } from "react";
import "./NoScrollbar.css";
import { useNavigate } from "react-router";
import { BiChevronRight } from "react-icons/bi";
import CollectionCard from "@/components/CollectionCard/CollectionCard";
import { route } from "@/routes/config";

const Art: React.FC<{ collections: any }> = ({ collections }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full pb-[60px] overflow-hidden">
      <div className="flex items-center justify-between pb-[50px]">
        <p className="font-bold md:text-[32px] text-[24px] text-[#24C3BC]">
          Trending in Arts
        </p>
        <button
          className="flex items-center"
          onClick={() => navigate("/collection")}
        >
          <p className="text-xs md:test-base font-normal">View Category</p>
          <BiChevronRight className="h-8 w-8 text-[16px] text-white" />
        </button>
      </div>
      <div className="flex no-scrollbar overflow-x-auto md:grid-cols-4 lg:grid-cols-5 gap-[20px]  ">
        {collections?.map((item: any) => (
          <div className="max-w-[300px] flex-shrink-0 aspect-square">
            <CollectionCard collection={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Art;
