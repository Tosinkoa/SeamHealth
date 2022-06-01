import { FaSearch } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";

const TableFilter = ({ filter, setFilter }) => {
  return (
    <div className="w-full flex">
      <span className="flex sm:w-11/12 lg:w-8/12 mt-5 mx-auto relative">
        <BsSearch className="absolute text-2xl top-2.5 left-5" />
        <input
          value={filter || ""}
          className="border-2 border-gray-400 mx-2 rounded-xl w-full py-2 pl-10"
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search doctors"
        />
      </span>
    </div>
  );
};

export default TableFilter;
