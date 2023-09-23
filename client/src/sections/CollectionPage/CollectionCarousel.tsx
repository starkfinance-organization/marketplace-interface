import { Carousel } from "flowbite-react";

import { BsFillPatchCheckFill } from "react-icons/bs";
import { useGetCollections } from "@/queries/useGetCollectionsQuey";
import { useState, useEffect } from "react";
import { getShortAddress } from "@/utils/string";
import { useNavigate } from "react-router";

const CollectionCarousel = () => {
  const { data: collectionData } = useGetCollections();
  const [activeIndex, setActiveIndex] = useState(0);

  const navigate = useNavigate();

  const [collections, setCollections] = useState<any[]>([]);

  useEffect(() => {
    if (collectionData) {
      let tempArr = collectionData.data.filter(
        (item: any) => item.banner_show == 1
      );
      setCollections(tempArr);
    }
  }, [collectionData]);

  return (
    <div className="h-[400px] relative w-full mb-16 pt-[110px] lg:px-11 md:px-[40px] px-[20px]">
      <Carousel
        slideInterval={5000}
        leftControl={<div />}
        rightControl={<div />}
        indicators={false}
        onSlideChange={(index) => {
          setActiveIndex(index);
        }}
        className="h-[400px]"
      >
        {collections?.map((item) => (
          <div className="flex h-full items-center justify-center cursor-default">
            <img src={item.banner} className="h-full w-full object-cover" />
            <div className="absolute flex flex-col justify-center items-center md:w-full h-full md:px-40 p-12  mb-10">
              <div className="md:w-32 h-32 rounded-[20px] border-white overflow-hidden border-[2px]">
                <img src={item.image} className="h-full w-full object-cover" />
              </div>
              <p className="font-bold text-[32px] mt-[32px]">{item.name}</p>
              <p className="font-bold text-xl">
                By {getShortAddress(item.contract_address)}
              </p>
              {/* <BsFillPatchCheckFill className="w-4 h-4 mx-4" /> */}
              {/* <div className="flex items-center pt-2">
                  <p className="font-medium text-base">{item.number} Items</p>
                </div> */}
            </div>
          </div>
        ))}
      </Carousel>
      <div className="absolute z-30 flex space-x-3 -translate-x-1/2 -bottom-[40px]  left-1/2">
        {collections?.map((_, index: number) => (
          <div
            className={`lg:w-[70px] w-2 h-0 lg:border-[3px] border-[6px]   ${
              index === activeIndex ? "border-[#24C3BC]" : "border-white"
            } lg:rounded-lg rounded-full`}
            aria-current="true"
            aria-label="Slide 1"
            data-carousel-slide-to="0"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default CollectionCarousel;
