import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import { LockOpen, Visibility, VisibilityOff } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../features/auth/userApiSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setCredentials } from "../../features/auth/authSlice";

const RegisterField = (props: any) => {
  const { control, name, label } = props;
  const [isVisible, setIsVisible] = useState(false);

  const handleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <>
          {name === "password" || name === "confirmPassword" ? (
            <TextField
              type={!isVisible ? "password" : "text"}
              label={label}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    onClick={handleVisibility}
                    sx={{ cursor: "pointer" }}
                  >
                    {!isVisible ? <Visibility /> : <VisibilityOff />}
                  </InputAdornment>
                ),
              }}
              {...field}
            />
          ) : (
            <TextField label={label} {...field} />
          )}
        </>
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
  { name: "password", label: "Password" },
  { name: "confirmPassword", label: "Confirm Password" },
];

const Register = () => {
  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const { handleSubmit, control } = useForm({
    defaultValues,
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.auth);

  const [register, registerResult] = useRegisterMutation();

  const handleRegister = async (data: any) => {
    const { firstName, lastName, email, password, confirmPassword } = data;
    const trimmedData = {
      name: firstName && lastName ? `${firstName} ${lastName}` : "",
      email,
      password,
    };

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      const res = await register(trimmedData).unwrap();

      dispatch(setCredentials({ ...res.data }));
    }
  };

  useEffect(() => {
    if (registerResult.isError) {
      toast.error((registerResult?.error as any)?.data?.message);
    }
    if (registerResult.isSuccess) {
      toast.success(registerResult?.data?.message);
      navigate("/");
    }
  }, [registerResult]);

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
          <LockOpen />
        </Avatar>
        <Typography variant="h5" align="center">
          Sign Up
        </Typography>
      </Box>
      <Box
        component="form"
        noValidate
        display="flex"
        flexDirection="column"
        width="100%"
        maxWidth={{ xs: 320, sm: 395 }}
        gap={2}
      >
        <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2}>
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

        <Button
          variant="contained"
          color="secondary"
          type="submit"
          onClick={handleSubmit(handleRegister)}
        >
          Sign up
        </Button>
      </Box>
      <Box
        display="flex"
        justifyContent="flex-end"
        width="100%"
        maxWidth={{ xs: 320, sm: 395 }}
      >
        <Link to="/login" style={{ color: "#1976D2" }}>
          <Button sx={{ textTransform: "none", mt: -1 }}>
            Already have an account? Sign in
          </Button>
        </Link>
        {/* <Link variant="body2" href="/login">
          Already have an account? Sign in
        </Link> */}
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

export default Register;
