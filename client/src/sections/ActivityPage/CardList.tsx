import { useEffect, useRef } from "react";
import NFT from "@/components/NFT/NFT";

const CardList: React.FC<{
  data: any;
  fetchNextPage: any;
  hasNextPage?: boolean;
  gridStyle: number;
}> = ({ data, fetchNextPage, gridStyle }) => {
  const observerTarget = useRef(null);

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
    <div
      className={`grid ${gridStyle == 2 && "md:grid-cols-4 lg:grid-cols-6"} ${
        gridStyle == 3 && "md:grid-cols-10"
      }  gap-5 p-2 max-h-[80vh] overflow-y-auto grid-cols-2`}
    >
      {data.map((item: any) => (
        <NFT nftData={item} />
      ))}
      <div className="h-3" ref={observerTarget}></div>
    </div>
  );
};

export default CardList;
