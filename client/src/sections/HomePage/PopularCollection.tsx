import CollectionCard from "@/components/CollectionCard/CollectionCard";
import PopularText from "@/assets/svg/ic_popular.svg";
import Button from "@/components/Button/Button";
import { useGetCollections } from "@/queries/useGetCollectionsQuey";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { route } from "@/routes/config";

const PopularCollection = () => {
  const { data: collections } = useGetCollections();
  const [collectionShow, setCollectionShow] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (collections) {
      let tempArr = collections?.data.filter(
        (item: any) => item.banner_show == 1
      );
      setCollectionShow(tempArr);
    }
  }, [collections]);

  return (
    <div className="pb-32 relative lg:px-[120px] md:px-[60px] px-5">
      {/* <img src={BG} alt="" className="absolute inset-0 h-full w-full -z-10" /> */}
      <img src={PopularText} alt="" className="mx-auto" />
      <div className="grid max-w-website sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 py-[70px] grid-rows-1 grid-cols-1 gap-5 px-2">
        {collectionShow.map((item) => {
          return <CollectionCard collection={item} />;
        })}
      </div>
      <div
        onClick={() => {
          navigate(route.collection);
        }}
      >
        <Button title="View more" className="grid place-items-center" />
      </div>
    </div>
  );
};

export default PopularCollection;
