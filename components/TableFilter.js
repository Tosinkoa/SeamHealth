const TableFilter = ({ filter, setFilter }) => {
  return (
    <div className="w-full flex">
      <span className="flex my-6 w-3/5 mt-5 mx-auto">
        <p className="bg-indigo-600 p-2 font-semibold rounded">Search</p>
        <input
          value={filter || ""}
          className="border-2 border-gray-400 mx-2 rounded w-2/4"
          onChange={(e) => setFilter(e.target.value)}
        />
      </span>
    </div>
  );
};

export default TableFilter;
