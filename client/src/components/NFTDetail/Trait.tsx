import React from "react";

const Trait: React.FC<{ traits: any[] }> = ({ traits }) => {
  if (traits == undefined || traits?.length == 0) return <div></div>;
  return (
    <>
      <div className="mt-8 ">
        <p className="text-[32px] font-bold text-[#24C3BC]">Traits</p>
      </div>
      <div className="py-4 grid grid-cols-3 gap-2">
        {traits?.map((trait) => (
          <div className="p-3 bg-[#24C3BC] rounded-xl flex flex-col items-center shadow-container">
            <p className="text-white font-bold ">{trait.trait_type}</p>
            <p className=" text-center text-white font-medium">{trait.value}</p>
          </div>
        ))}
      </div>
    </>
  );
};
export default Trait;
