import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useAppDispatch } from "../app/hooks";
import { removeCredentials } from "../features/auth/authSlice";

const NotAuthorized = (props: any) => {
  const { error, open, setOpen } = props;
  const dispatch = useAppDispatch();

  const handleClose = () => {
    setOpen(false);
    dispatch(removeCredentials());
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" align="center" color="error">
        Session Expired!!!
      </DialogTitle>
      <DialogContent sx={{ py: 0, px: 10 }}>
        <Box>
          <Typography
            color="error.main"
            variant="h2"
            fontWeight="bold"
            textAlign="center"
          >
            {error.status}
          </Typography>
          <Typography textAlign="center" fontSize={18}>
            {error.data.message}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ margin: "0 auto", pb: 3 }}>
        <Button onClick={handleClose} variant="contained" color="secondary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NotAuthorized;
