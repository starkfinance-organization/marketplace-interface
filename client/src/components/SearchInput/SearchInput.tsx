import SearchSVG from "@/assets/svg/ic_search.svg";

const SearchInput: React.FC<{ value: any; onChange: any }> = ({
  value,
  onChange,
}) => {
  return (
    <div className="search-wrapper flex h-full w-[300px] items-center rounded-md bg-blue-800/50  px-4 text-white">
      <img src={SearchSVG} alt="ic_search" className="h-5" />
      <input
        value={value}
        onChange={onChange}
        className="ml-3 h-full w-full flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
        placeholder="Token ID"
      />
    </div>
  );
};

export default SearchInput;
