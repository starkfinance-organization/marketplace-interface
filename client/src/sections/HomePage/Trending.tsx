import Button from "@/components/Button/Button";
import NFTCard from "@/components/NFTCard/NFTCard";
import TrendingPNG from "@/assets/svg/ic_trending.svg";
import { useNavigate } from "react-router";
import { route } from "@/routes/config";
import { useGetCollections } from "@/queries/useGetCollectionsQuey";
import { useEffect, useState } from "react";

const Trending = () => {
  const { data: collections } = useGetCollections();
  const [collectionShow, setCollectionShow] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (collections) {
      let tempArr = collections.data
        .filter((item: any) => item.volume != null)
        .sort((a: any, b: any) => parseFloat(b.volume) - parseFloat(a.volume))
        .filter((item: any, index: number) => index < 4);

      setCollectionShow(tempArr);
    }
  }, [collections]);

  return (
    <div className="py-[120px] relative lg:px-[120px] px-4">
      {/* <img
        src={BG}
        className="absolute inset-0 h-full w-full -z-10 object-cover"
        alt=""
      /> */}

      <img src={TrendingPNG} alt="" className="mx-auto" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 grid-cols-1 max-w-website justify-between py-[70px] gap-5 px-2 place-items-center">
        {collectionShow?.map((item) => {
          return (
            <div className="md:max-w-[350px] w-full ">
              <NFTCard nftData={item} />
            </div>
          );
        })}
      </div>
      <div
        onClick={() => {
          navigate(route.activity);
        }}
      >
        <Button title="View more" className="grid place-items-center" />
      </div>
    </div>
  );
};

export default Trending;
