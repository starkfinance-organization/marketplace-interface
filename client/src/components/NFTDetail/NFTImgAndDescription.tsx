import React from "react";

const NFTImgAndDesctription: React.FC<{ nftData: any }> = ({ nftData }) => {
  return (
    <div>
      <div className="border-[4px] border-[#24C3BC] rounded-md w-fit lg:w-[520px] aspect-square ">
        <img
          src={nftData?.image_url}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="mt-8 px-4">
        <div className="">
          <p className="text-[32px] font-bold text-[#24C3BC]">Description</p>
        </div>
        {/* <div className="flex mt-3 w-max-[300px]"> */}
        <p className="w-full max-w-[500px]">{nftData?.description}</p>
        {/* </div> */}
      </div>
    </div>
  );
};
export default NFTImgAndDesctription;
