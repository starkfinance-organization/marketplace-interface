import { useEffect, useRef, useState } from "react";
import { useGetCollectionNFTs } from "@/queries/useGetCollectionNFTs";

import { useParams } from "react-router-dom";
import NFTTabAll from "@/components/NFT/NFTTabAll";

const AllCollection = () => {
  const { contract_address } = useParams();
  const observerTarget = useRef(null);
  const [allNFT, setAllNFT] = useState<any[]>([]);

  const { data: allNFTs, fetchNextPage } = useGetCollectionNFTs(
    contract_address ?? "",
    30
  );

  useEffect(() => {
    if (allNFTs !== undefined && allNFTs.pages.length > 0) {
      const listData = allNFTs?.pages.flatMap((item) => item?.data);
      setAllNFT(listData);
    }
  }, [allNFTs]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget]);

  return (
    <div className="border-b border-gray-900 flex flex-col h-full">
      <div
        className={`grid md:grid-cols-6 gap-5 p-2 max-h-[80vh] overflow-y-auto grid-cols-2`}
      >
        {allNFT.map((item: any) => (
          <NFTTabAll nftData={item} />
        ))}
        <div className="h-3" ref={observerTarget}></div>
      </div>
    </div>
  );
};

export default AllCollection;
