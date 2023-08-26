import { Box, useMediaQuery, useTheme } from "@mui/material";
import TaskData from "./Tasks/TaskData";
import { useGetTasksQuery } from "../../features/tasks/tasksApiSlice";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useAppSelector } from "../../app/hooks";
import UsersTable from "./Users/UsersTable";
import { useGetUsersQuery } from "../../features/auth/userApiSlice";
import TaskForm from "./Tasks/TaskForm";

const HomeScreen = () => {
  const createTaskRef = useRef();
  const theme = useTheme();
  const isSmallerThanMd = useMediaQuery(theme.breakpoints.down("md"));
  const { userInfo } = useAppSelector((state) => state.auth);
  const [params, setParams] = useState({
    pageNumber: 1,
    pageSize: 10,
    hasPagination: true,
    userId: userInfo._id,
  });
  const [editId, setEditId] = useState(null);
  const [userParams, setUserParams] = useState({
    pageNumber: 1,
    pageSize: 10,
    hasPagination: true,
  });

  const defaultValues = {
    title: "",
    description: "",
  };

  const { handleSubmit, reset, control, setValue } = useForm({
    defaultValues,
  });

  const { data: tasksData, isLoading, error } = useGetTasksQuery(params);

  const {
    data: usersData,
    isLoading: isUsersLoading,
    error: usersError,
  } = useGetUsersQuery(userParams);

  const handleCancel = () => {
    reset(defaultValues);
    setEditId(null);
  };

  const scrollToRef = (ref: any) => {
    if (isSmallerThanMd && ref && ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        top: ref.current.offsetTop,
      });
    }
    console.log({ ref: ref.current });
  };

  return (
    <>
      {userInfo.isAdmin ? (
        <UsersTable
          data={usersData}
          isLoading={isUsersLoading}
          error={usersError}
          params={userParams}
          setParams={setUserParams}
        />
      ) : (
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          mt={{ xs: 16, sm: 0 }}
          mb={5}
          gap={5}
        >
          <TaskForm
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
            control={control}
            editId={editId}
            createTaskRef={createTaskRef}
          />
          <TaskData
            data={tasksData}
            isLoading={isLoading}
            error={error}
            setParams={setParams}
            setValue={setValue}
            setEditId={setEditId}
            scrollToRef={scrollToRef}
            createTaskRef={createTaskRef}
          />
        </Box>
      )}
    </>
  );
};

export default HomeScreen;
