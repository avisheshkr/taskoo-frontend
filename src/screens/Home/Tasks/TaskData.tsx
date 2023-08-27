import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import NoData from "../../../components/NoData";
import NotAuthorized from "../../../components/NotAuthorized";
import { Delete, Edit } from "@mui/icons-material";
import { useDeleteTaskMutation } from "../../../features/tasks/tasksApiSlice";
import { toast } from "react-toastify";
import moment from "moment";
import Error from "../../../components/Error";
import Pagination from "../../../components/Pagination";

const TaskData = (props: any) => {
  const {
    data,
    isLoading,
    error,
    setParams,
    setValue,
    setEditId,
    scrollToRef,
    createTaskRef,
  } = props;
  const [open, setOpen] = useState(false);

  const [deleteTask, { isSuccess, isError }] = useDeleteTaskMutation();

  const handleDelete = (id: any) => {
    deleteTask(id);
  };

  const handleEdit = (value: any) => {
    setEditId(value._id);
    setValue("title", value.title);
    setValue("description", value.description);
    scrollToRef(createTaskRef);
  };

  useEffect(() => {
    if (isError) {
      toast.error("Error deleting task!!!");
    }

    if (isSuccess) {
      toast.success("Task deleted successfully!!!");
    }
  }, [isError, isSuccess]);

  useEffect(() => {
    setOpen(true);
  }, [error]);

  return (
    <Box flex={1}>
      <Typography variant="h4" fontSize={{ xs: 25, sm: 35 }} mb={1}>
        All Tasks
      </Typography>
      {data ? (
        <>
          {data?.data?.length > 0 ? (
            <Box display="flex" flexDirection="column">
              <Box
                display="flex"
                flexDirection="column"
                gap={3}
                height={data?.data?.length <= 5 ? "auto" : 562}
                p={{ xs: 0.2, sm: 1 }}
                sx={{
                  overflowY: data?.data?.length <= 5 ? "hidden" : "scroll",
                }}
              >
                {data?.data?.map((task: any) => (
                  <Box
                    key={task._id}
                    component={Paper}
                    width="100%"
                    // height={90}
                  >
                    <Box
                      display={{ xs: "block", sm: "flex" }}
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box pb={1}>
                        <Typography
                          sx={{
                            borderTopLeftRadius: 5,
                            borderTopRightRadius: 5,
                          }}
                          p={0.5}
                          px={2}
                          variant="h5"
                          fontWeight="bold"
                          color="white"
                          fontSize={18}
                          bgcolor="warning.main"
                          display={{ xs: "flex", sm: "inline-block" }}
                        >
                          {task.title}
                        </Typography>
                        <Box>
                          <Typography
                            mt={1}
                            px={2}
                            variant="body2"
                            maxWidth={{ xs: 400, sm: 500 }}
                            fontSize={14}
                          >
                            {task.description}
                          </Typography>
                          <Typography
                            px={2}
                            variant="body2"
                            fontSize={12}
                            color="gray"
                          >
                            {moment(task.createdAt).fromNow()}
                          </Typography>
                        </Box>
                      </Box>
                      <Box display="flex" justifyContent={{ xs: "flex-end" }}>
                        <IconButton
                          color="secondary"
                          onClick={() => handleEdit(task)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(task._id)}
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
              <Pagination data={data} setParams={setParams} />
            </Box>
          ) : (
            <NoData />
          )}
        </>
      ) : isLoading ? (
        <Box
          flex={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt={10}
        >
          <CircularProgress color="secondary" />
        </Box>
      ) : error.status === 401 ? (
        <NotAuthorized error={error} open={open} setOpen={setOpen} />
      ) : (
        <Error error={error} />
      )}
    </Box>
  );
};

export default TaskData;
