import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../features/auth/userApiSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { removeCredentials } from "../features/auth/authSlice";

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userInfo }: any = useAppSelector((state) => state.auth);

  const [logout, logoutResult] = useLogoutMutation();

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    if (logoutResult.isError) {
      toast.error((logoutResult?.error as any)?.data?.message);
    }

    if (logoutResult.isSuccess) {
      toast.success("Logged out successfully");
      dispatch(removeCredentials());
      navigate("/login");
    }
  }, [logoutResult, dispatch]);

  return (
    <Box sx={{ flexGrow: 1, mb: 12 }}>
      <AppBar>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: "#fff",
          }}
        >
          <Link to="/">
            <Typography
              variant="h6"
              sx={{
                color: "#000",
                fontWeight: "900",
                fontSize: { xs: 15, sm: 20 },
              }}
            >
              <Typography
                component="span"
                fontSize={40}
                fontWeight="bold"
                color="secondary"
              >
                T
              </Typography>
              as
              <Typography
                component="span"
                fontSize={30}
                fontWeight="bold"
                color="warning.main"
              >
                K
              </Typography>
              oo
            </Typography>
          </Link>
          <Box>
            {userInfo ? (
              <Box
                display="flex"
                flexDirection={{ xs: "column", sm: "row" }}
                alignItems={{ xs: "flex-end", sm: "center" }}
                gap={{ xs: 1, sm: 2 }}
                py={{ xs: 2, sm: 0 }}
              >
                <Typography color="#000">{userInfo?.name}</Typography>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Box>
            ) : (
              <Box
                display="flex"
                flexDirection={{ xs: "column", sm: "row" }}
                alignItems={{ xs: "flex-end", sm: "space-between" }}
                // gap={{ xs: 1, sm: 2 }}
                py={{ xs: 2, sm: 0 }}
              >
                <Link to="/login">
                  <Button
                    sx={{
                      mr: { xs: 0, sm: 2 },
                      color: "secondary.main",
                      fontSize: { xs: 12, sm: 14 },
                    }}
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    sx={{
                      color: "secondary.main",
                      fontSize: { xs: 12, sm: 14 },
                    }}
                  >
                    Register
                  </Button>
                </Link>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
