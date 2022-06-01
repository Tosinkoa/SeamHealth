import { BsSearch } from "react-icons/bs";

const TableFilter = ({ filter, setFilter }) => {
  return (
    <div className="table_filter_bg">
      <BsSearch className="search_icon" />
      <input
        value={filter || ""}
        className="input_filter"
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search doctors"
      />
    </div>
  );
};

export default TableFilter;
