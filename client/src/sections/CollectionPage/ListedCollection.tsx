import { BsFillGridFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import SearchInput from "@/components/SearchInput/SearchInput";
import StyledSelect from "@/components/Select/Select";
import { statusList } from "@/utils/constant";
import { CiCircleList } from "react-icons/ci";
import NFTList from "../ActivityPage/NFTList";
import CardList from "../ActivityPage/CardList";
import { useGetFilterListingQuery } from "@/queries/activity/useGetFilterListingQuery";
import { useParams } from "react-router-dom";

const ListedCollection = () => {
  const { contract_address } = useParams();
  const [status, setStatus] = useState(1);
  const [tokenID, setTokenID] = useState("");
  const [gridStyle, setGridStyle] = useState(1);
  const [allNFT, setAllNFT] = useState<any[]>([]);

  const {
    data: allNFTs,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useGetFilterListingQuery(30, tokenID, status, contract_address);
  const handleStatusChange = (status: number) => {
    setStatus(status);
  };
  const onChangeInputTokenID = (e: any) => {
    setTokenID(e.target.value);
  };

  useEffect(() => {
    if (allNFTs !== undefined && allNFTs.pages.length > 0) {
      const listData = allNFTs?.pages.flatMap((item) => item?.data);
      setAllNFT(listData);
    }
  }, [allNFTs]);

  useEffect(() => {
    refetch();
  }, [status, tokenID]);
  return allNFT.length === 0 ? (
    <div className="w-full text-center font-medium text-2xl">
      There's no record{" "}
    </div>
  ) : (
    <div className=" border-b border-gray-700 flex flex-col max-w-website h-full">
      <header className="h-14 flex gap-1  items-center w-full py-2 border-b  border-gray-700">
        <div className="flex w-full h-14 gap-2 justify-between ">
          <div className="py-2">
            <SearchInput value={tokenID} onChange={onChangeInputTokenID} />
          </div>
          <div className="flex h-14 gap-2 py-2">
            <StyledSelect
              value={status}
              style={{ width: 200 }}
              onChange={handleStatusChange}
              options={statusList}
            />
            <div className="flex bg-blue-800/50 rounded-md">
              <div
                className={`h-full aspect-square grid rounded-md place-items-center cursor-pointer ${
                  gridStyle == 1 && "bg-[#24C3BC]"
                }`}
                onClick={() => setGridStyle(1)}
              >
                <CiCircleList className="text-[16px] text-white" />
              </div>
              <div
                className={`h-full aspect-square grid rounded-md place-items-center cursor-pointer ${
                  gridStyle == 2 && "bg-[#24C3BC]"
                }`}
                onClick={() => setGridStyle(2)}
              >
                <BsFillGridFill className="text-[16px]" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {gridStyle == 1 && (
        <NFTList
          data={allNFT}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
        />
      )}

      {gridStyle == 2 && (
        <CardList
          gridStyle={gridStyle}
          data={allNFT}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
        />
      )}
    </div>
  );
};

export default ListedCollection;
