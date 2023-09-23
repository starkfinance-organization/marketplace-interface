import { Select, SelectProps } from "antd";
import "./Select.scss";

const StyledSelect = (props: SelectProps) => {
  return <Select className="dropdown-wrapper rounded-md" {...props}></Select>;
};
export default StyledSelect;
