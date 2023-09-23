import CollectionCard from "./CollectionCard";
import { useGetCollections } from "@/queries/useGetCollectionsQuey";

const AllTab = () => {
  const { data: collectionData } = useGetCollections();

  return (
    <div className="mt-[40px] grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5">
      {collectionData?.data.map((item: any) => <CollectionCard data={item} />)}
    </div>
  );
};

export default AllTab;
