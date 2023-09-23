import CollectionCard from "./CollectionCard";
import { useGetCollections } from "@/queries/useGetCollectionsQuey";

const TrendingTab = () => {
  const { data: collectionData } = useGetCollections();

  return (
    <div className="mt-4 grid md:grid-cols-5 grid-cols-2 gap-5">
      {collectionData?.data.map((item: any) => <CollectionCard data={item} />)}
    </div>
  );
};

export default TrendingTab;
