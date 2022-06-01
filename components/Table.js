import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { Column } from "./Column";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import TableFilter from "./TableFilter";
import { useMemo } from "react";

const Table = ({ allUsers, formData }) => {
  const data = useMemo(() => allUsers, []);
  const tableInstance = useTable(
    {
      columns: Column,
      data,
    },
    useGlobalFilter,
    useSortBy
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setGlobalFilter } = tableInstance;
  const { globalFilter } = state;

  return (
    <div className="overflow-hidden border sm:shadow-md md:shadow-lg dark:shadow-gray-600 sm:mx-4 md:mx-10 lg:mx-28 my-6 rounded-lg">
      <div className="px-10">
        <div className="flex justify-between sm:px-7 lg:px-12 mt-6 bg-green-600 shadow-lg text-gray-50 rounded-lg sm:w-full lg:w-2/5 mx-auto mb-5">
          <h1 className="font-bold text-xl m-3 w-full text-center">Doctor List</h1>
        </div>
      </div>
      <TableFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <div className=" w-11/12 object-contain mt-10 mx-auto my-10">
        <table className="table table-auto dark:border" {...getTableProps()}>
          <thead className="table_head ">
            {headerGroups.map((headerGroup) => (
              <tr className="table_row" {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers?.map((column) => (
                  <th scope="col" className="table_head_row " {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span className="inline-flex text-sm ">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <div className="row_head_icon_bg">
                            <AiOutlineArrowDown className=" text-gray-700 " />
                          </div>
                        ) : (
                          <div className="row_head_icon_bg">
                            <AiOutlineArrowUp className=" text-gray-700" />
                          </div>
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows?.map((row, i) => {
              prepareRow(row);
              return (
                <tr className="table_head_row" {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td className="  lg:px-4 sm:px-2 py-2 text-left w-1/5 break-all" {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
