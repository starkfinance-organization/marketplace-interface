import { Carousel } from "flowbite-react";

import { TfiMenuAlt } from "react-icons/tfi";
import { useGetCollections } from "@/queries/useGetCollectionsQuey";
import { useState, useEffect } from "react";
import { BiChevronDown, BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useNavigate } from "react-router";
import RowNFT from "./RowNFT";
import RowNFTOffer from "./RowNFTOffer";

const OffersTable = () => {
  const { data: collectionData } = useGetCollections();
  const navigate = useNavigate();
  const [openItems, setOpenItems] = useState(false);
  const handleOnClick = () => {
    setOpenItems((prevState) => !prevState);
  };
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
    <div className="w-full rounded-[6px] py-[24px] bg-[#24C3BC]/10 border border-[#24C3BC]/80">
      <button
        className={` flex w-full px-8  justify-between items-center rounded-md `}
        onClick={handleOnClick}
      >
        <div className="flex items-center gap-5">
          <TfiMenuAlt className="w-[24px] h-[24px]" />
          <p className="font-bold text-[24px]">Offers</p>
        </div>

        <BiChevronDown
          className={`w-[36px] h-[36px] transition-all duration-200 ${
            openItems ? " rotate-180" : " rotate-0;"
          }`}
        />
      </button>
      <div
        className={`transition-all duration-200 ${
          openItems ? "overflow-auto h-fit" : "overflow-hidden h-0"
        }`}
      >
        <div className="flex flex-col flex-1 border-t border-[#24C3BC]/80 ">
          <p className="text-xl text-center py-5">No offers Yet</p>

          <div className="flex-1 w-full">
            <div className="flex-1 relative h-full max-h-[390px] overflow-auto">
              <table className="w-full h-full text-sm text-left  border-gray-500 border-collapse">
                <thead className=" text-xs sticky top-0 bg-[#24C3BC]">
                  <tr>
                    <th
                      scope="col"
                      className="font-bold py-3 text-center text-base min-w-[120px]"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="font-extrabold px-6 py-3 min-w-[100px] text-center text-base"
                    >
                      USD Price
                    </th>
                    <th
                      scope="col"
                      className="font-extrabold min-w-[100px]  text-center text-base"
                    >
                      Quantity
                    </th>

                    <th
                      scope="col"
                      className="font-extrabold text-center text-base min-w-[120px] "
                    >
                      Expiration
                    </th>
                    <th
                      scope="col"
                      className="font-extrabold text-center text-base min-w-[120px] "
                    >
                      From
                    </th>
                    <th
                      scope="col"
                      className="font-extrabold text-center text-base min-w-[200px] "
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {collections?.map((item: any, index: any) => (
                    <RowNFTOffer data={item} index={index} key={index} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffersTable;
