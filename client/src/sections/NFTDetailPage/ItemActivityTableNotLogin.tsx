import { Carousel } from "flowbite-react";

import { BsFillPatchCheckFill } from "react-icons/bs";
import { useGetCollections } from "@/queries/useGetCollectionsQuey";
import { useState, useEffect } from "react";
import { BiChevronDown, BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useNavigate } from "react-router";
import RowNFT from "./RowNFT";
import RowActivity from "./RowActivity";
import TransactionIcon from "@/assets/svg/ic_transaction.svg";

const ItemActivityTableNotLogin = () => {
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
    <div className="w-full rounded-[6px] py-4 bg-[#24C3BC]/10 border border-[#24C3BC]/80">
      <div className="flex items-center gap-5">
        <p className="font-bold text-[24px] lg:ml-[38px] mb-4">Item Activity</p>
      </div>
      <div className="flex-1 w-full">
        <div className="flex-1 relative h-full max-h-[220px] overflow-auto">
          <table className="w-full h-full text-sm text-left  border-gray-500 border-collapse">
            <thead className=" text-xs border-b border-t sticky top-0">
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
                  className="font-extrabold w-fit  text-center text-base"
                >
                  Quantity
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
              {collections?.map((item: any, index: any) => (
                <RowActivity data={item} index={index} key={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ItemActivityTableNotLogin;
