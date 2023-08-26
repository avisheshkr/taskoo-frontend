import { TablePagination } from "@mui/material";
import { useEffect, useState } from "react";

const Pagination = (props: any) => {
  const { data, setParams, colSpan } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    setParams((prev: any) => ({
      ...prev,
      pageNumber: page + 1,
      pageSize: rowsPerPage,
    }));
  }, [page, rowsPerPage]);

  return (
    <>
      {colSpan ? (
        <TablePagination
          colSpan={colSpan}
          count={data?.totalRecords}
          rowsPerPageOptions={[5, 25, 100]}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      ) : (
        <TablePagination
          component="div"
          count={data?.totalRecords}
          rowsPerPageOptions={[5, 25, 100]}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </>
  );
};

export default Pagination;
