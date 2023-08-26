import { Box, Paper, Typography } from "@mui/material";
import image from "../assets/nodatafound.png";

const Error = (props: any) => {
  const { error } = props;

  return (
    <Box
      component={Paper}
      flex={1}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      py={5}
    >
      <img src={image} alt="No Data" width="250" height="auto" />
      <Box>
        <Typography
          color="error.main"
          variant="h4"
          fontWeight="bold"
          textAlign="center"
        >
          {error.status}
        </Typography>
        <Typography textAlign="center" fontSize={18}>
          Something went wrong! Try again later!
        </Typography>
      </Box>
    </Box>
  );
};

export default Error;
