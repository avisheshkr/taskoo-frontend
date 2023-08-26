import { useEffect } from "react";
import { Box, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { useUpdateUserMutation } from "../../../features/auth/userApiSlice";
import Dialogbox from "../../../components/Dialogbox";

const RegisterField = (props: any) => {
  const { control, name, label } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          error={error ? true : false}
          helperText={error?.message}
          fullWidth
          size="small"
          label={label}
          {...field}
        />
      )}
    />
  );
};

const userNames = [
  { name: "firstName", label: "First Name" },
  { name: "lastName", label: "Last Name" },
];

const userDetails = [
  {
    name: "email",
    label: "Email Address",
  },
];

const UserForm = (props: any) => {
  const { open, handleClose, handleSubmit, control, editId } = props;

  const [updateUser, updateUserResult] = useUpdateUserMutation();

  const onSubmit = (data: any) => {
    const submitData = {
      ...data,
      name: `${data.firstName} ${data.lastName}`,
      _id: editId,
    };
    updateUser(submitData);
  };

  useEffect(() => {
    if (updateUserResult.isError) {
      toast.error((updateUserResult?.error as any)?.data?.message);
    }
    if (updateUserResult.isSuccess) {
      toast.success(updateUserResult?.data?.message);
      handleClose();
    }
  }, [updateUserResult]);

  return (
    <Dialogbox
      open={open}
      handleClose={handleClose}
      title="Edit User"
      saveText="Update"
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      cancelText="Cancel"
    >
      <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
        <Box
          component="form"
          noValidate
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <Box display="flex" gap={2}>
            {userNames.map((userName: any, index: any) => (
              <RegisterField
                key={index}
                name={userName.name}
                label={userName.label}
                control={control}
              />
            ))}
          </Box>
          {userDetails.map((user: any, index: any) => (
            <RegisterField
              key={index}
              name={user.name}
              label={user.label}
              control={control}
            />
          ))}
        </Box>
      </Box>
    </Dialogbox>
  );
};

export default UserForm;
