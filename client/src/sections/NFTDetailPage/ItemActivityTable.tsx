import { Carousel } from "flowbite-react";

import { BsFillPatchCheckFill } from "react-icons/bs";
import { useGetCollections } from "@/queries/useGetCollectionsQuey";
import { useState, useEffect } from "react";
import { BiChevronDown, BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useNavigate } from "react-router";
import RowNFT from "./RowNFT";
import RowActivity from "./RowActivity";
import TransactionIcon from "@/assets/svg/ic_transaction.svg";
import { useGetActionNFT } from "@/queries/useGetActionNFT";
import { useParams } from "react-router-dom";

const ItemActivityTable = () => {
  const { contract_address, token_id } = useParams();
  const { data: collectionData } = useGetCollections();
  const navigate = useNavigate();
  const [openItems, setOpenItems] = useState(false);
  const handleOnClick = () => {
    setOpenItems((prevState) => !prevState);
  };
  const [collections, setCollections] = useState<any[]>([]);
  const { data: actions } = useGetActionNFT(
    contract_address || "",
    token_id || ""
  );

  useEffect(() => {
    if (collectionData) {
      let tempArr = collectionData.data.filter(
        (item: any) => item.banner_show == 1
      );
      setCollections(tempArr);
    }
  }, [collectionData]);

  return (
    <div className="w-full rounded-[6px]  bg-[#24C3BC]/10 border border-[#24C3BC]/80">
      <button
        className={` flex w-full px-8 py-[24px] justify-between items-center rounded-t-md `}
        onClick={handleOnClick}
      >
        <div className="flex items-center gap-5 text-white">
          <img
            src={TransactionIcon}
            alt=""
            className="w-[24px] h-full text-white "
          />
          <p className="font-bold text-[20px]">Item Activity</p>
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
        <div className="flex-1 w-full pb-[24px]">
          <div className="flex-1 relative h-full max-h-[220px] overflow-auto">
            <table className="w-full h-full text-sm text-left  border-gray-500 border-collapse">
              <thead className=" text-xs border-b border-t sticky top-0 bg-[#24C3BC]">
                <tr>
                  <th
                    scope="col"
                    className="font-bold py-3 text-center text-base"
                  >
                    Event
                  </th>
                  <th
                    scope="col"
                    className="font-extrabold px-6 py-3 min-w-[100px] w-fit text-center text-base"
                  >
                    Unit Price
                  </th>

                  <th
                    scope="col"
                    className="font-extrabold text-center text-base"
                  >
                    From
                  </th>
                  <th
                    scope="col"
                    className="font-extrabold text-center text-base"
                  >
                    To
                  </th>
                  <th
                    scope="col"
                    className="font-extrabold text-center text-base"
                  >
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {actions?.data?.map((item: any, index: any) => (
                  <RowActivity data={item} index={index} key={index} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemActivityTable;
