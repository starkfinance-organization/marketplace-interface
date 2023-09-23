const Button: React.FC<{ title: string; className?: string }> = ({
  title,
  className,
}) => {
  return (
    <div className={className}>
      <div className="cursor-pointer py-2 px-8 shadow-button-wallet bg-[#24C3BC] rounded-md gird place-items-center w-fit">
        <p className="text-[20px] uppercase font-bold">{title}</p>
      </div>
    </div>
  );
};

export default Button;
