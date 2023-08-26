import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import NotAuthorized from "../../../components/NotAuthorized";
import Error from "../../../components/Error";
import { useState, useEffect } from "react";
import { useAppSelector } from "../../../app/hooks";
import { StyledTableCell } from "../../../components/StyledTable";
import Pagination from "../../../components/Pagination";
import DataRow from "./DataRow";
import UserForm from "./UserForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "../../auth/schema";

const UsersTable = (props: any) => {
  const { userInfo }: any = useAppSelector((state) => state.auth);
  const { data, isLoading, error, setParams } = props;
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [editId, setEditId] = useState(null);

  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
  };
  const { handleSubmit, control, reset, setValue } = useForm({
    defaultValues,
    resolver: yupResolver(userSchema),
  });

  const handleClose = () => {
    setOpenDialog(false);
    reset(defaultValues);
  };

  useEffect(() => {
    setOpen(true);
  }, [error]);

  return (
    <Box mt={{ xs: 16, sm: 0 }} mb={5}>
      {data ? (
        <Box>
          <Typography variant="h4" fontWeight="bold" mb={2}>
            All Users
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Created Date</StyledTableCell>
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell align="center">Email</StyledTableCell>
                  <StyledTableCell align="center">Role</StyledTableCell>
                  <StyledTableCell align="right"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.data?.map((item: any) => (
                  <DataRow
                    key={item._id}
                    item={item}
                    userInfo={userInfo}
                    setOpen={setOpenDialog}
                    setValue={setValue}
                    setEditId={setEditId}
                  />
                ))}
              </TableBody>
              <TableFooter>
                <TableRow sx={{ borderTop: "1px solid #ddd" }}>
                  <Pagination data={data} colSpan={5} setParams={setParams} />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
          <UserForm
            open={openDialog}
            control={control}
            handleClose={handleClose}
            handleSubmit={handleSubmit}
            editId={editId}
          />
        </Box>
      ) : isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="60vh"
        >
          <CircularProgress color="success" />
        </Box>
      ) : error.status === 401 ? (
        <NotAuthorized error={error} open={open} setOpen={setOpen} />
      ) : (
        <Error error={error} />
      )}
    </Box>
  );
};

export default UsersTable;
