import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";

type AnimatedSectionProps = {
  className?: string;
  title: string;
  children?: any; // use React.ReactNode to type check child elements
};

const AnimatedSection: React.FC<AnimatedSectionProps> = (props) => {
  const { className = "", title, children } = props;
  const [openItems, setOpenItems] = useState(false);
  const handleOnClick = () => {
    setOpenItems((prevState) => !prevState);
  };
  return (
    <div>
      <button
        className={`${className} flex w-full justify-between items-center rounded-md py-4`}
        onClick={handleOnClick}
      >
        <p className="font-semibold text-[20px]">{title}</p>
        {children !== undefined && (
          <BiChevronDown
            className={`w-6 h-6 transition-all duration-200 ${
              openItems ? " rotate-180" : " rotate-0;"
            }`}
          />
        )}
      </button>
      <div
        className={`transition-all duration-200 ${
          openItems ? "overflow-auto h-fit" : "overflow-hidden h-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default AnimatedSection;
