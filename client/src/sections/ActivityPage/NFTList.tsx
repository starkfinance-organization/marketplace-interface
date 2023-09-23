import { useEffect, useRef } from "react";
import RowNFT from "./RowNFT";

const NFTList: React.FC<{
  data: any;
  fetchNextPage: any;
  hasNextPage?: boolean;
}> = ({ data, fetchNextPage }) => {
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
    <div className="relative overflow-y-auto max-h-[80vh]">
      <table className="w-full h-full text-sm text-left border border-gray-500  border-collapse">
        <thead className="uppercase text-xs bg-blue-900 sticky top-0">
          <tr>
            <th scope="col" className="px-2 py-3 text-center">
              #
            </th>
            <th scope="col" className="px-6 py-3 min-w-[300px]">
              Name
            </th>
            <th scope="col" className="min-w-[200px]">
              <div className="flex items-center uppercase ">Price</div>
            </th>
            <th scope="col">
              <div className="flex items-center uppercase">Owner</div>
            </th>
            <th scope="col" className="min-w-[200px] pr-4">
              <p className="text-end uppercase ">Time </p>
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: any, index: any) => (
            <RowNFT data={item} index={index} key={index} />
          ))}
          <div className="h-7" ref={observerTarget}></div>
        </tbody>
      </table>
    </div>

    // </InfiniteScroll>
  );
};

export default NFTList;
