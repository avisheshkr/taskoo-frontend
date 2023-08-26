import { Box, Button, Paper, Typography } from "@mui/material";
import image from "../assets/nodatafound.png";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      //   component={Paper}
      flex={1}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      py={5}
      position="relative"
    >
      <Typography
        variant="h1"
        sx={{ color: "#ffeaea" }}
        fontSize={230}
        position="absolute"
        zIndex={-1}
      >
        404
      </Typography>
      <img src={image} alt="No Data" width="250" height="auto" />
      <Box>
        <Typography
          color="error.main"
          variant="h5"
          fontWeight="bold"
          textAlign="center"
        >
          PAGE NOT FOUND!
        </Typography>
        <Typography textAlign="center" fontSize={18} mb={2}>
          The page you are trying to visit does not exist.
        </Typography>
      </Box>
      <Button
        onClick={() => navigate(-1)}
        variant="contained"
        color="secondary"
      >
        Go Back
      </Button>
    </Box>
  );
};

export default NotFoundPage;
