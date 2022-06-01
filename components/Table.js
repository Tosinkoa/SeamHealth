import CardTitle from "./CardTitle";
import { Column, secondTableColumn } from "./Column";
import TableFilter from "./TableFilter";
import { useTable, useSortBy, useGlobalFilter } from "react-table";

const Table = ({ allUsers, secondTableBodyData }) => {
  //First data fetched on the server
  const firstTableInstance = useTable({ columns: Column, data: allUsers }, useGlobalFilter, useSortBy);

  const {
    getTableProps: firstGetTableProps,
    getTableBodyProps: firstTableBodyProps,
    headerGroups: firstHeaderGroups,
    rows: firstRows,
    prepareRow: firstPrepareRow,
    state,
    setGlobalFilter,
  } = firstTableInstance;

  //Data that can't be store on the server cause JSON placeholder don't store the data
  const secondTableInstance = useTable(
    { columns: secondTableColumn, data: secondTableBodyData },
    useGlobalFilter,
    useSortBy
  );

  const {
    getTableBodyProps: secondGetTableBodyProps,
    rows: secondRows,
    prepareRow: secondPrepareRow,
  } = secondTableInstance;

  const { globalFilter } = state;

  return (
    <div className="table_main_background">
      <CardTitle title="Doctor List" />
      <TableFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <div className=" sec_table_main_background">
        <table className="table table-auto dark:border" {...firstGetTableProps()}>
          <thead className="table_head ">
            {firstHeaderGroups.map((headerGroup) => (
              <tr className="table_row" {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers?.map((column) => (
                  <th scope="col" className="table_head_row ">
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {/* ---------------Data that can't be store on the server------------- */}
          <tbody {...secondGetTableBodyProps()}>
            {secondRows?.map((row, i) => {
              secondPrepareRow(row);
              return (
                <tr className="table_head_row" {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td className="main_table_data" {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
          {/* ---------------Data that belongs to the server------------- */}
          <tbody {...firstTableBodyProps()}>
            {firstRows?.map((row, i) => {
              firstPrepareRow(row);
              return (
                <tr className="table_head_row" {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td className="main_table_data" {...cell.getCellProps()}>
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
