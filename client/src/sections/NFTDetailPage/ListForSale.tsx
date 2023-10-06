import AnimatedSection from "@/components/AnimatedSection/AnimatedSection";
import OffersTable from "./OffersTable";
import ItemActivityTable from "./ItemActivityTable";
import PriceHistoryTable from "./PriceHistoryTable";
import ListingTable from "./ListingTable";
import React from "react";
import useIsMobile from "@/hook/useIsMobile";

const ListForSale = ({
  setIsListForSale,
}: {
  setIsListForSale: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { isMobile } = useIsMobile();

  return (
    <div>
      {isMobile ? (
        <div className="bg-[#24C3BC] fixed bottom-0 left-0 right-0 grid place-items-center py-5">
          <div
            className="w-fit cursor-pointer h-fit py-3 shadow-button-wallet bg-white rounded-md grid place-items-center"
            onClick={() => {
              setIsListForSale(true);
            }}
          >
            <p className="text-[20px] text-[#24C3BC] px-20 uppercase font-bold">
              List for sale
            </p>
          </div>
        </div>
      ) : (
        <div
          className="cursor-pointer h-fit py-3 mb-[60px] px-4 shadow-button-wallet bg-[#24C3BC] rounded-md grid place-items-center"
          onClick={() => {
            setIsListForSale(true);
          }}
        >
          <p className="text-[20px] uppercase font-bold">List for sale</p>
        </div>
      )}

      <PriceHistoryTable />
      <div className="my-6">
        {/* <ListingTable /> */}
        <OffersTable />
      </div>
      <div className="my-6">
        <ItemActivityTable />
      </div>
    </div>
  );
};
export default ListForSale;
