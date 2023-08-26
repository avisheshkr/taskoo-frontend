import { useEffect } from "react";
import {
  useResetUserPasswordByAdminMutation,
  useUpdateUserMutation,
} from "../../../features/auth/userApiSlice";
import { toast } from "react-toastify";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../../components/StyledTable";
import { Box, Button, IconButton, MenuItem, Select } from "@mui/material";
import moment from "moment";
import { Edit } from "@mui/icons-material";

const DataRow = (props: any) => {
  const { item, userInfo, setOpen, setValue, setEditId } = props;
  const [updateUser, { isSuccess, isError, error }] = useUpdateUserMutation();
  const [
    resetPassword,
    { isSuccess: isResetSuccess, isError: isResetError, error: resetError },
  ] = useResetUserPasswordByAdminMutation();

  const handleRoleChangeAndSubmit = (value: any, data: any) => {
    const submitData = {
      _id: data._id,
      name: data.name,
      email: data.email,
      isAdmin: value === "Admin",
    };
    updateUser(submitData);
  };

  const handleEdit = (data: any) => {
    setOpen(true);
    setEditId(data._id);
    setValue("firstName", data.name.split(" ")[0]);
    setValue("lastName", data.name.split(" ")[1]);
    setValue("email", data.email);
  };

  const handleResetPassword = (email: any) => {
    resetPassword({ email: email });
  };

  useEffect(() => {
    if (isError) {
      toast.error((error as any)?.data?.message || "Error updating the user");
    }
    if (isSuccess) {
      toast.success("User updated successfully");
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (isResetError) {
      toast.error(
        (resetError as any)?.data?.message || "Error updating the user"
      );
    }
    if (isResetSuccess) {
      toast.success("Password reset successfully");
    }
  }, [isResetSuccess, isResetError]);

  return (
    <StyledTableRow>
      <StyledTableCell>
        {moment(item.createdAt).format("YYYY-MM-DD")}
      </StyledTableCell>
      <StyledTableCell align="center">{item.name}</StyledTableCell>
      <StyledTableCell align="center">{item.email}</StyledTableCell>
      <StyledTableCell align="center">
        <Select
          disabled={userInfo._id === item._id}
          sx={{ width: 100 }}
          size="small"
          value={item.isAdmin ? "Admin" : "User"}
          onChange={(e) => handleRoleChangeAndSubmit(e.target.value, item)}
        >
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="User">User</MenuItem>
        </Select>
      </StyledTableCell>
      <StyledTableCell align="right">
        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleResetPassword(item.email)}
            sx={{ fontSize: { xs: 10 } }}
          >
            Reset Password
          </Button>
          <IconButton onClick={() => handleEdit(item)}>
            <Edit color="secondary" />
          </IconButton>
        </Box>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default DataRow;
