import "./HowToCard.css";

const HowToCard: React.FC<{ item: any }> = ({ item }) => {
  return (
    <div className="relative bg-how-to aspect-square flex flex-1 flex-col gap-5 items-center rounded-lg justify-center border border-[#24C3BC]">
      {item.icon}
      {/* <img
        src={Border}
        alt=""
        className="h-fit w-full absolute inset-0 z-10 rounded-md object-cover  "
      /> */}
      <p className="uppercase font-bold text-[20px] text-center">
        {item.title}
      </p>
      <p className="text-[18px] text-white/70 text-center max-w-[70%]">
        {item.descrition}
      </p>
    </div>
  );
};

export default HowToCard;
