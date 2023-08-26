import { useEffect } from "react";
import { ArrowBack, Key } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSendEmailForPasswordresetMutation } from "../../features/auth/userApiSlice";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const [sendEmail, { isError, isSuccess, isLoading, error }] =
    useSendEmailForPasswordresetMutation();

  const handleSubmit = () => {
    sendEmail({ email });
  };

  useEffect(() => {
    if (isError) {
      toast.error((error as any)?.data?.message);
    }

    if (isSuccess) {
      navigate("/email");
    }
  }, [isSuccess, isError]);

  return (
    <Box
      width="100%"
      maxWidth={{ xs: 320, sm: 340 }}
      margin="0 auto"
      mt={{ xs: 16, sm: 9 }}
      mb={5}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={1}
        width="100%"
      >
        <Avatar sx={{ bgcolor: "secondary.main", mb: 2 }}>
          <Key />
        </Avatar>
        <Typography variant="h5" fontWeight="bold" textAlign="center">
          Forgot Password?
        </Typography>
        <Typography variant="body1" color="gray" textAlign="center">
          No worries, we'll send you reset instructions.
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={3}
        width="100%"
        mt={3}
      >
        <TextField
          size="small"
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          color="secondary"
          onClick={handleSubmit}
        >
          {isLoading ? (
            <>
              <CircularProgress size={25} sx={{ color: "#fff", mr: 2 }} />
              Sending...
            </>
          ) : (
            "Send Email"
          )}
        </Button>
        <Link to="/">
          <Button startIcon={<ArrowBack />} sx={{ textTransform: "none" }}>
            Back to Login
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
