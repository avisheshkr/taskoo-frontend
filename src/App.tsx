import { Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/Home/HomeScreen";
import Register from "./screens/auth/Register";
import RequireAuth from "./components/RequireAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import Header from "./components/Header";
import { Container, CssBaseline } from "@mui/material";
import Login from "./screens/auth/Login";
import ForgotPassword from "./screens/auth/ForgotPassword";
import ResetPassword from "./screens/auth/ResetPassword";
import EmailVerification from "./screens/auth/EmailVerification";
import NotFoundPage from "./components/NotFoundPage";

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl">
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/email" element={<EmailVerification />} />
          <Route path="*" element={<NotFoundPage />} />

          {/* Protected Routes */}
          <Route element={<RequireAuth />}>
            <Route path="/" element={<HomeScreen />} />
          </Route>
        </Routes>
      </Container>
    </>
  );
}

export default App;
