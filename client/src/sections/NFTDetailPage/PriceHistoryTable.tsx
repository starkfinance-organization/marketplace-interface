import IncreaseIcon from "@/assets/svg/ic_increase.svg";
import { useGetCollections } from "@/queries/useGetCollectionsQuey";
import { useState, useEffect } from "react";
import { BiChevronDown, BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useNavigate } from "react-router";
import RowNFT from "./RowNFT";

const PriceHistoryTable = () => {
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
    <div className="w-full rounded-[6px] bg-[#24C3BC]/10 border border-[#24C3BC]/80">
      <button
        className={` flex w-full px-8 justify-between items-center rounded-md my-[24px]`}
        onClick={handleOnClick}
      >
        <div className="flex items-center gap-5">
          <img src={IncreaseIcon} alt="" className="w-[24px] h-[24px]" />
          <p className="font-bold text-[20px]">Price History</p>
        </div>

        <BiChevronDown
          className={`w-[36px] h-[36px] transition-all duration-200 ${
            openItems ? " rotate-180" : " rotate-0;"
          }`}
        />
      </button>
      <div
        className={`transition-all duration-200  ${
          openItems ? "overflow-auto h-fit" : "overflow-hidden h-0"
        }`}
      >
        <div className="flex flex-col flex-1 border-t border-[#24C3BC]/80 ">
          <div className="py-5">
            <p className="text-xl font-bold text-center ">
              No events have occurred yet
            </p>
            <p className="text-xl  text-center ">Check back later</p>
          </div>
          {/* <div className="flex-1 relative h-full mb-[24px] max-h-[390px] overflow-auto">
            <table className="w-full h-full text-sm text-left ">
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
                    className="font-extrabold text-center text-base min-w-[100px] "
                  ></th>
                </tr>
              </thead>
              <tbody>
                {collections?.map((item: any, index: any) => (
                  <RowNFT data={item} index={index} key={index} />
                ))}
              </tbody>
            </table>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default PriceHistoryTable;
