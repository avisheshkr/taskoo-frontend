import { MarkEmailRead } from "@mui/icons-material";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const EmailVerification = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={3}
      mt={{ xs: 25, sm: 20 }}
      mb={5}
    >
      <Avatar sx={{ bgcolor: "secondary.main", height: 50, width: 50 }}>
        <MarkEmailRead fontSize="large" />
      </Avatar>
      <Box>
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={1}>
          Email has been sent!
        </Typography>
        <Typography variant="body1" color="gray" textAlign="center">
          Please check your inbox and click in the received link to reset a
          password.
        </Typography>
        <Typography variant="body2" color="error" textAlign="center">
          Note: The link is valid for only 30 minutes.
        </Typography>
      </Box>
      <Link to="/">
        <Button variant="contained" color="secondary">
          Back to Home
        </Button>
      </Link>
    </Box>
  );
};

export default EmailVerification;
