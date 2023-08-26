import { useEffect, useRef } from "react";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { Controller } from "react-hook-form";
import {
  usePostTaskMutation,
  useUpdateTaskMutation,
} from "../../../features/tasks/tasksApiSlice";

const TaskField = (props: any) => {
  const { control, name, label } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          {...field}
          size="small"
          label={label}
          multiline={name === "description"}
          variant="filled"
          // variant={name === "description" ? "filled" : "outlined"}
          rows={3}
        />
      )}
    />
  );
};

const inputs = [
  { name: "title", label: "Title" },
  { name: "description", label: "Description" },
];

const TaskForm = (props: any) => {
  const { handleSubmit, control, handleCancel, editId, createTaskRef } = props;
  const [postTask, { isError, isSuccess, isLoading, error }] =
    usePostTaskMutation();
  const [
    updateTask,
    {
      isError: isUpdateError,
      isSuccess: isUpdateSuccess,
      isLoading: isUpdateLoading,
      error: updateError,
    },
  ] = useUpdateTaskMutation();

  const handleTaskSubmit = (data: any) => {
    if (!editId) {
      postTask(data);
    } else {
      updateTask({ ...data, id: editId });
    }
  };

  useEffect(() => {
    if (isUpdateError) {
      toast.error(
        (updateError as any)?.data?.message || "Error editing task!!!"
      );
    }

    if (isUpdateSuccess) {
      toast.success("Task updated successfully!!!");
      handleCancel();
    }
  }, [isUpdateError, isUpdateSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error((error as any)?.data?.message || "Error creating task!!!");
    }

    if (isSuccess) {
      toast.success("Task created successfully!!!");
      handleCancel();
    }
  }, [isError, isSuccess]);

  return (
    <Box flex={0.5} ref={createTaskRef}>
      <Typography variant="h4" fontSize={{ xs: 25, sm: 35 }}>
        {editId ? "Edit" : "Create"} Task
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        gap={3}
        mt={2}
        component="form"
        onSubmit={handleSubmit(handleTaskSubmit)}
      >
        {inputs.map((input: any, index: any) => (
          <TaskField
            key={index}
            name={input.name}
            label={input.label}
            control={control}
          />
        ))}
        <Box>
          <Button
            variant="contained"
            type="submit"
            color="secondary"
            sx={{ mr: 2 }}
          >
            {isLoading || isUpdateLoading ? (
              <>
                <CircularProgress size={24} color="inherit" />
                <Typography fontSize="inherit" ml={1}>
                  {editId ? "Updating..." : "Creating..."}
                </Typography>
              </>
            ) : (
              <>{editId ? "Update" : "Create"}</>
            )}
          </Button>
          <Button variant="contained" color="error" onClick={handleCancel}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default TaskForm;
