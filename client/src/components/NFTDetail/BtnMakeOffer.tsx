import React from "react";

const BtnMakeOffer: React.FC<{ toggle: any }> = ({ toggle }) => {
  return (
    <button
      disabled={true}
      className="flex-1 cursor-pointer h-fit py-3 px-4  bg-gray-400/50 rounded-md grid place-items-center"
      onClick={toggle}
    >
      <p className="text-[20px] uppercase font-bold">make offer</p>
    </button>
  );
};
export default BtnMakeOffer;
