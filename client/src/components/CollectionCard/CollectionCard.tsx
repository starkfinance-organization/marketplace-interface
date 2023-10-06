import ETHCircle from "@/assets/svg/ic_eth.svg";
import "./CollectionCard.css";
import { useNavigate } from "react-router-dom";
import { useGetCollectionNFTs } from "@/queries/useGetCollectionNFTs";
import { getShortPrice, getShortPrice3 } from "@/utils/string";

const CollectionCard: React.FC<{ collection: any }> = ({ collection }) => {
  const navigation = useNavigate();

  const { data: collectionNFTs } = useGetCollectionNFTs(
    collection.contract_address || "",
    6
  );

  return (
    <div
      className="aspect-square relative w-full overflow-hidden flex flex-col justify-between border-[2px] border-[#24C3BC] rounded-md transition collection-bg-card h-full  hover:cursor-pointer"
      onClick={() => {
        navigation(`/collection/${collection.contract_address}`);
      }}
    >
      <div className="w-full grid grid-cols-3 p-4 grid-rows-2 gap-1 h-[70%]">
        <div className="col-span-3">
          <img
            src={collection.banner}
            alt=""
            className="object-cover w-full h-full rounded-md"
          />
        </div>
        <div>
          <img
            src={collectionNFTs?.pages[0].data[1].image_url}
            alt=""
            className="object-cover w-full h-full rounded-md"
          />
        </div>
        <div>
          <img
            src={collectionNFTs?.pages[0].data[2].image_url}
            alt=""
            className="object-cover w-full h-full rounded-md"
          />
        </div>
        <div>
          <img
            src={collectionNFTs?.pages[0].data[3].image_url}
            alt=""
            className="object-cover w-full h-full rounded-md"
          />
        </div>
      </div>

      <div className="flex w-full lg:py-5 py-2 px-4 bg-info h-[30%]">
        <div className="flex items-center gap-[10px] w-full">
          <div className="h-[52px] w-[52px] aspect-square">
            <img
              src={collection.image}
              alt=""
              className="h-full  aspect-square rounded-md"
            />
          </div>

          <div className="w-full overflow-hidden">
            <div className="overflow-hidden w-[80%]">
              <p className="font-bold text-[#24C3BC] uppercase text-ellipsis overflow-hidden w-full truncate">
                {collection.name}
              </p>
            </div>

            <div className="w-full">
              <div className="flex justify-between">
                <p className="text-white text-xs">Floor Price: </p>
                <div className="flex">
                  <p className="text-white text-sm">
                    {" "}
                    {getShortPrice(collection.floor_price)}
                  </p>
                  <img src={ETHCircle} alt="" className="ml-2" />
                </div>
              </div>
              <div className="flex justify-between">
                <p className="text-white text-xs">Total Volume</p>
                <div className="flex">
                  <p className="text-white text-xs">
                    {getShortPrice3(collection.volume)}
                  </p>
                  <img src={ETHCircle} alt="" className="ml-2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
