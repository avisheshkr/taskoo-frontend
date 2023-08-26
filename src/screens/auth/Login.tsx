import { useEffect } from "react";
import {
  Avatar,
  Box,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { LoginOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginField } from "./LoginField";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useLoginMutation } from "../../features/auth/userApiSlice";
import { schema } from "./schema";
import { setCredentials } from "../../features/auth/authSlice";

const loginFields = [
  {
    name: "email",
    label: "Email address",
  },
  {
    name: "password",
    label: "Password",
  },
];

const Login = () => {
  const { userInfo } = useAppSelector((state) => state.auth);
  const [login, { isSuccess, isError, error, isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const defaultValues = {
    email: "",
    password: "",
  };
  const { handleSubmit, reset, control } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const handleLogin = async (data: any) => {
    const res = await login(data).unwrap();
    dispatch(setCredentials({ ...res.data }));
  };

  useEffect(() => {
    if (isError) {
      toast.error((error as any)?.data?.message);
    }

    if (isSuccess) {
      toast.success("Logged in successfully");
      reset(defaultValues);
      navigate("/");
    }
  }, [isError, isSuccess]);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      mt={{ xs: 16, sm: 9 }}
      mb={5}
      alignItems="center"
      gap={3}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={1}
      >
        <Avatar sx={{ bgcolor: "secondary.main" }}>
          <LoginOutlined />
        </Avatar>
        <Typography variant="h5" align="center">
          Sign in
        </Typography>
      </Box>
      <Box
        component="form"
        noValidate
        display="flex"
        flexDirection="column"
        width="100%"
        maxWidth={{ xs: 320, sm: 395 }}
        gap={3}
      >
        {loginFields.map((field, index) => (
          <LoginField
            key={index}
            control={control}
            name={field.name}
            label={field.label}
          />
        ))}

        <Button
          variant="contained"
          color="secondary"
          type="submit"
          onClick={handleSubmit(handleLogin)}
        >
          {isLoading ? (
            <Box display="flex" alignItems="center" gap={2}>
              <CircularProgress color="inherit" size={25} />
              <Typography fontSize="inherit">Logging in...</Typography>
            </Box>
          ) : (
            "Sign in"
          )}
        </Button>
      </Box>
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        maxWidth={{ xs: 320, sm: 395 }}
      >
        <Link to="/forgot-password" style={{ color: "#1976D2" }}>
          <Button sx={{ textTransform: "none", mt: -1 }}>
            Forgot password?
          </Button>
        </Link>
        <Link to="/register" style={{ color: "#1976D2" }}>
          <Button sx={{ textTransform: "none", mt: -1 }}>
            Don't have an account? Sign Up
          </Button>
        </Link>
      </Box>
      <Typography variant="body2" color="text.secondary" mt={5}>
        Copyright <span>&copy;</span>{" "}
        <Link to="/" style={{ color: "#1976D2" }}>
          Avishesh Karki
        </Link>{" "}
        {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

export default Login;
