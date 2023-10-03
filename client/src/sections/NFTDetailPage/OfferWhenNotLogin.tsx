import { getShortAddress } from "@/utils/string";
import { useState } from "react";
import OffersTableNotLogin from "./OffersTableNotLogin";
import ItemActivityTableNotLogin from "./ItemActivityTableNotLogin";
import useModalWallet from "@/components/ModalWallet/useModalWallet";
import ModalMakeOffer from "./ModalMakeOffer";
import PriceHistoryTable from "./PriceHistoryTable";
import ListingTable from "./ListingTable";
import OffersTable from "./OffersTable";
import ItemActivityTable from "./ItemActivityTable";
import NFTCurrentPrice from "@/components/NFTDetail/NFTCurrentPrice";
import BtnBuyNow from "@/components/NFTDetail/BtnBuyNow";
import BtnMakeOffer from "@/components/NFTDetail/BtnMakeOffer";
import Buy from "./Buy";

const OfferWhenNotLogin = ({
  data,
  isListing,
}: {
  data: any;
  isListing: boolean;
}) => {
  const { isShowing, toggle } = useModalWallet();
  console.log(data);
  return (
    <div>
      <ModalMakeOffer isShowing={isShowing} hide={toggle} nftData={data} />

      {isListing && (
        <div>
          <NFTCurrentPrice nftData={data?.data[0]} />

          <div className="flex items-center justify-between gap-5 mt-[30px]">
            <Buy nftData={data.data[0]} />
            <BtnMakeOffer toggle={toggle} />
          </div>
        </div>
      )}

      <div className={`${isListing && "mt-[60px]"} `}>
        <PriceHistoryTable />
      </div>
      <div className="my-6">
        {/* <ListingTable /> */}
        <OffersTable nftData={data} />
      </div>

      <div className="my-6">
        <ItemActivityTable />
      </div>
    </div>
  );
};
export default OfferWhenNotLogin;
