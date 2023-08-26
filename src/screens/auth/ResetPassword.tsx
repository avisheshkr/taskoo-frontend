import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  useResetPasswordMutation,
  useVerifyPasswordresetTokenQuery,
} from "../../features/auth/userApiSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { TimerOff } from "@mui/icons-material";

const ResetPassword = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const defaultValues = {
    newPassword: "",
    confirmNewPassword: "",
  };

  const { handleSubmit, control } = useForm({ defaultValues });
  const [resetPassword, { isError, isSuccess, error }] =
    useResetPasswordMutation();

  const {
    data,
    isLoading,
    isError: isTokenError,
    error: tokenError,
  } = useVerifyPasswordresetTokenQuery({
    token,
  });

  const onSubmit = (data: any) => {
    const { newPassword, confirmNewPassword } = data;

    if (newPassword !== confirmNewPassword) {
      toast.error("New Password and Confirm New Password do not match!");
    } else {
      const submitData = {
        token,
        newPassword,
      };
      resetPassword(submitData);
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(
        (error as any)?.data?.message || "Error while resetting password!!!"
      );
    }

    if (isSuccess) {
      toast.success("Password reset successfully");
      navigate("/login");
    }
  }, [isSuccess, isError]);

  return (
    <>
      {data ? (
        <Box
          width="100%"
          maxWidth={340}
          margin="0 auto"
          mt={{ xs: 25, sm: 20 }}
          mb={5}
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={1}
            width="100%"
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              align="center"
              fontSize={{ xs: 24, sm: 30 }}
            >
              Create New Password
            </Typography>
            <Typography variant="body1" color="gray" align="center">
              Your new password must be different from previous used passwords.
            </Typography>
          </Box>
          <Box
            component="form"
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={3}
            width="100%"
            mt={3}
          >
            <Controller
              control={control}
              name="newPassword"
              render={({ field }) => (
                <TextField
                  {...field}
                  size="small"
                  label="New Password"
                  type="password"
                  fullWidth
                />
              )}
            />

            <Controller
              control={control}
              name="confirmNewPassword"
              render={({ field }) => (
                <TextField
                  {...field}
                  size="small"
                  label="Confirm New Password"
                  type="password"
                  fullWidth
                />
              )}
            />
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={handleSubmit(onSubmit)}
            >
              Create New Password
            </Button>
          </Box>
        </Box>
      ) : isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="50vh"
        >
          <CircularProgress color="secondary" />
        </Box>
      ) : isTokenError ? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={3}
          mt={20}
        >
          <Avatar sx={{ bgcolor: "secondary.main", height: 50, width: 50 }}>
            <TimerOff fontSize="large" />
          </Avatar>
          <Box>
            <Typography
              variant="h5"
              fontWeight="bold"
              textAlign="center"
              mb={1}
            >
              Link Expired!
            </Typography>
            <Typography variant="body1" color="gray" textAlign="center">
              {(tokenError as any)?.data?.message}
              {/* The link sent to your email has been expired! Please try again. */}
            </Typography>
          </Box>
          <Link to="/forgot-password">
            <Button variant="contained" color="secondary">
              Try Again
            </Button>
          </Link>
        </Box>
      ) : null}
    </>
  );
};

export default ResetPassword;
