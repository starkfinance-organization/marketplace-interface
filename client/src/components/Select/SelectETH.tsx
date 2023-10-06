import { Select, SelectProps } from "antd";
import "./SelectETH.scss";

const StyledSelectETH = (props: SelectProps) => {
  return <Select className="dropdown-wrapper rounded-md " {...props}></Select>;
};
export default StyledSelectETH;
