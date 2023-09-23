import { useGetCollectionsDetail } from "@/queries/useGetCollectionsDetailQuery";

import ProfileCollection from "@/sections/CollectionPage/ProfileCollection";
import { useParams } from "react-router-dom";

const CollectionDetail = () => {
  const { contract_address } = useParams();

  const { data } = useGetCollectionsDetail(contract_address ?? "");

  return (
    <div className="relative min-h-[100vh]">
      <ProfileCollection data={data?.data[0]} />
    </div>
  );
};

export default CollectionDetail;
