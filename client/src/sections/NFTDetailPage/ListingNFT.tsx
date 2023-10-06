import BtnCompleteListing from "@/components/NFTDetail/BtnCompleteListing";
import StyledSelect from "@/components/Select/Select";
import StyledSelectETH from "@/components/Select/SelectETH";
import { useGetCollectionsDetail } from "@/queries/useGetCollectionsDetailQuery";
import { CurrencyValues, DurationValues } from "@/utils/constant";
import { calculateTimeDifference, getShortPrice } from "@/utils/string";
import { DatePicker } from "antd";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // import plugin
dayjs.extend(utc); // use plugin
import moment from "moment";

import { Label, Radio } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListingForm from "./ListingForm";
import { useAccount } from "@starknet-react/core";
import { useInforListingContext } from "./context";
import useIsMobile from "@/hook/useIsMobile";
import ListingFormWhite from "./ListingFormWhite";

const RadioButtonValue = {
  fixedPrice: "fixedPrice",
  timedAuction: "timedAuction",
};

const DurationValue = {
  choose: "choose",
  infinity: "infinity",
};

const ListingNFT: React.FC<{ nftData: any }> = ({ nftData }) => {
  const { contract_address } = useParams();
  const [choice, setChoice] = useState(RadioButtonValue.fixedPrice);
  const [durationChoice, setdurationChoice] = useState(DurationValue.choose);
  const [currency, setCurrency] = useState(CurrencyValues[0].value);
  const [duration, setDuration] = useState(DurationValues[0].value);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [priceListing, setPriceListing] = useState(0.01);
  const [timeEndList, setTimeEndList] = useState(() => {
    const currentDate = moment(); // Lấy ngày hiện tại
    return currentDate.add(1, "years").format("YYYY-MM-DD HH:mm:ss");
  });
  const { data: collection } = useGetCollectionsDetail(contract_address ?? "");

  const { address, status, account } = useAccount();
  const { refetchListingData, listingData } = useInforListingContext();
  const [isListing, setIsListing] = useState<boolean>(false);
  useEffect(() => {
    if (listingData && listingData?.data[0]?.status == "LISTING") {
      setIsListing(true);
    } else {
      setIsListing(false);
    }
  }, [nftData, status, address, account]);

  const handleStatusChange = (value: string) => {
    setCurrency(value);
  };

  const handleDurationChange = (value: string) => {
    setDuration(value);
  };

  const handleDateChange = (date: any) => {
    if (date) {
      setDuration(date);
      setTimeEndList(calculateFutureDate(date));
    }
  };

  const calculateFutureDate = (selectedValue: any) => {
    const currentDate = moment(); // Lấy ngày hiện tại

    if (selectedValue === "-1") {
      return currentDate.add(1, "years").format("YYYY-MM-DD HH:mm:ss");
    } else {
      // Xử lý giá trị '1d', '1m' và các giá trị khác
      const unit = selectedValue.charAt(selectedValue.length - 1);
      const amount = parseInt(selectedValue);

      if (unit === "d") {
        return currentDate.add(amount, "days").format("YYYY-MM-DD HH:mm:ss");
      } else if (unit === "h") {
        return currentDate.add(amount, "hours").format("YYYY-MM-DD HH:mm:ss");
      } else if (unit === "m") {
        return currentDate.add(amount, "months").format("YYYY-MM-DD HH:mm:ss");
      } else {
        return currentDate.add(1, "years").format("YYYY-MM-DD HH:mm:ss");
      }
    }
  };

  const { isMobile } = useIsMobile();

  return (
    <div>
      {!isListing && (
        <>
          <p className="mb-[30px] text-xl font-bold">Choose a type of sale</p>
          <div className="w-full flex justify-between items-center rounded-[10px] py-4 bg-[#24C3BC]/10 border border-[#24C3BC]/80 px-10">
            <div>
              <p className="text-xl font-bold">Fixed Price</p>
              <p className=" font-light mt-2">
                The item is listed at the price you set
              </p>
            </div>
            <Radio
              className="bg-[#4C4D4F] checked:bg-[#2B9AA9] border-[2px] border-[#363636] h-[30px] w-[30px]"
              checked={choice === RadioButtonValue.fixedPrice}
              value={RadioButtonValue.fixedPrice}
              onClick={() => setChoice(RadioButtonValue.fixedPrice)}
            />
          </div>
          <div className="w-full  my-4 flex justify-between items-center rounded-[10px] py-4 bg-[#24C3BC]/10 border border-[#24C3BC]/80 px-10">
            <div>
              <p className="text-xl font-bold">Timed auction</p>
              <p className="font-light mt-2">The item is listed for auction</p>
            </div>
            <Radio
              className="bg-[#4C4D4F] checked:bg-[#2B9AA9] border-[2px] border-[#363636] h-[30px] w-[30px]"
              checked={choice === RadioButtonValue.timedAuction}
              value={RadioButtonValue.timedAuction}
              // onClick={() => setChoice(RadioButtonValue.timedAuction)}
            />
          </div>
          <p className="mt-[60px] mb-[18px] text-xl font-bold">Set a price</p>
          <div className="flex gap-5">
            <div className="w-full text-center rounded-[10px] my-3 py-3 bg-[#24C3BC]/10 border border-[#24C3BC]/80 px-10">
              <p className="text-xl font-bold">Floor</p>
              <p className="font-light ">
                {getShortPrice(collection?.data[0]?.floor_price) || "-"} ETH{" "}
              </p>
            </div>
            <div className="w-full text-center rounded-[10px] my-3 py-3 bg-[#24C3BC]/10 border border-[#24C3BC]/80 px-10">
              <p className="text-xl font-bold">Top trait</p>
              <p className=" font-light ">- ETH </p>
            </div>
          </div>
          <div className="w-full md:py-0 py-2 flex md:flex-row flex-col items-center my-3 text-center bg-[#24C3BC]/10 border border-[#24C3BC]/80 rounded-xl ">
            <p className=" font-bold md:pl-[30px]">Amount</p>
            <div className="flex flex-1">
              <input
                value={priceListing}
                onChange={(e: any) => setPriceListing(e.target.value)}
                type="text"
                className="w-full font-bold text-left text-xl bg-transparent px-10 py-3 rounded-xl border-[0px] text-[#24C3BC]"
                placeholder="Input your amount"
              />
              {/* <StyledSelectETH
            value={currency}
            popupClassName={"text-white"}
            dropdownStyle={{
              backgroundColor: "rgba(36, 195, 188)",
              color: "white",
              lineHeight: "20px",
            }}
            style={{
              width: 250,
              height: 60,
              textAlign: "left",
              backgroundColor: "transparent",
              borderRadius: "0px",
              borderLeft: "1px solid rgba(36, 195, 188)",
            }}
            onChange={handleStatusChange}
            options={CurrencyValues}
            bordered={true}
          /> */}
              <div className="grid place-items-center px-5 border-l border-[#24C3BC]">
                <p className="font-bold text-[#24C3BC] text-center">ETH</p>
              </div>
            </div>
          </div>
          <p className="mt-[60px] mb-[30px] text-xl font-bold">Duration</p>
          <StyledSelectETH
            value={duration}
            popupClassName={"text-white"}
            dropdownStyle={{
              backgroundColor: "rgba(36, 195, 188)",
              color: "white",
              lineHeight: "20px",
            }}
            style={{
              height: 60,
              width: "100%",
              backgroundColor: "rgba(36, 195, 188,0.1)",
              textAlign: "left",
              borderRadius: "10px",
              border: "1px solid rgba(36, 195, 188)",
            }}
            onChange={handleDateChange}
            options={DurationValues}
            bordered={true}
          />
        </>
      )}

      {/* <div
        // onClick={() => }
        className="w-full flex justify-between items-center my-3 text-center bg-[#24C3BC]/10 border border-[#24C3BC]/80 px-10 py-5 rounded-xl "
      >
        <div>
          <div className="overflow-hidden max-w-0 max-h-0">
            <DatePicker
              className={`invisible `}
              value={dayjs(timeEndList).local()} // Convert the state value to Day.js object before passing it to DatePicker
              format="YYYY-MM-DD HH:mm:ss"
              showTime
              open={openDatePicker}
              onOpenChange={(open) => {
                !open && setOpenDatePicker(open);
              }}
              onChange={handleDateChange}
            />
          </div>

          <p className=" text-2xl font-bold">
            {calculateTimeDifference(timeEndList)}
          </p>
        </div>
        <Radio
          className="bg-[#4C4D4F] checked:bg-[#2B9AA9] border-[2px] border-[#363636] h-[30px] w-[30px]"
          checked={durationChoice === DurationValue.choose}
          value={DurationValue.choose}
          onClick={() => {
            setdurationChoice(DurationValue.choose);
            setOpenDatePicker(!openDatePicker);
          }}
        />
      </div>
      <div
        onClick={() => setdurationChoice(DurationValue.infinity)}
        className="w-full flex justify-between items-center my-3 text-center bg-[#24C3BC]/10 border border-[#24C3BC]/80 px-10 py-5 rounded-xl "
      >
        <p className="text-2xl font-bold">Infinity</p>
        <Radio
          className="bg-[#4C4D4F] checked:bg-[#2B9AA9] border-[2px] border-[#363636] h-[30px] w-[30px]"
          checked={durationChoice === DurationValue.infinity}
          value={DurationValue.infinity}
        />
      </div> */}
      {/* <p className="mt-[60px] mb-[30px] text-2xl font-bold">Summary</p> */}
      {/* <div className="flex justify-between items-center">
        <p className=" text-xl font-light">Listing Price</p>
        <p className=" text-xl font-light">-- ETH</p>
      </div>
      <div className="flex justify-between items-center">
        <p className=" text-xl font-light">Creator earning</p>
        <p className=" text-xl font-light">0%</p>
      </div>
      <div className="border border-white my-8" />
      <div className="flex justify-between items-center">
        <p className=" text-xl font-light">Starksport fee</p>
        <p className=" text-xl font-light">1.5%</p>
      </div> */}
      {/* <div className="flex justify-between items-center">
        <p className=" text-2xl font-bold">Total potential earnings</p>
        <p className=" text-xl font-light">-- ETH</p>
      </div> */}

      {isMobile ? (
        <div className="bg-[#24C3BC] fixed bottom-0 left-0 right-0 grid place-items-center py-5">
          <ListingFormWhite
            nftData={nftData}
            priceInEther={priceListing}
            timeEndList={timeEndList}
          />
        </div>
      ) : (
        <ListingForm
          nftData={nftData}
          priceInEther={priceListing}
          timeEndList={timeEndList}
        />
      )}
    </div>
  );
};
export default ListingNFT;
