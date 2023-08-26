import { Box, Paper, Typography } from "@mui/material";
import image from "../assets/nodatafound.png";

const NoData = () => {
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
          variant="h5"
          fontWeight="bold"
          textAlign="center"
        >
          NO DATA FOUND!
        </Typography>
        <Typography textAlign="center" fontSize={18}>
          Please add the tasks you need.
        </Typography>
      </Box>
    </Box>
  );
};

export default NoData;
