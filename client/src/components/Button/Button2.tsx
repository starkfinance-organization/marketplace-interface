const Button2: React.FC<{ title: string; className?: string }> = ({
  title,
  className,
}) => {
  return (
    <div className={className}>
      <div className="cursor-pointer h-full py-2 px-4 border shadow-button-wallet bg-[#24C3BC] rounded-md grid place-items-center">
        <p className="text-[20px] uppercase font-bold">{title}</p>
      </div>
    </div>
  );
};

export default Button2;
