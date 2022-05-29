import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { Column } from "./Column";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import { useAllUserQuery } from "../store/fetcherApi";
import TableFilter from "./TableFilter";
import { useMemo, useState } from "react";
import axios from "axios";

const Table = ({ allUsers }) => {
  const tableInstance = useTable(
    {
      columns: Column,
      data: allUsers,
    },
    useGlobalFilter,
    useSortBy
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setGlobalFilter } = tableInstance;
  const { globalFilter } = state;

  return (
    <div className="overflow-hidden">
      <TableFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <div className=" w-11/12 object-contain mt-20 mx-auto shadow-md">
        <table className="table table-auto" {...getTableProps()}>
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
                      <td className="  lg:px-6 sm:px-2 py-2 text-left w-1/5 break-all" {...cell.getCellProps()}>
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
