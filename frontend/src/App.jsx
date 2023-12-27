import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPager from "./pages/RegisterPager";
import Auth from "./pages/Auth";
import ProfilePage from "./pages/User/ProfilePage";
import AdminLogin from "./pages/Admin/AdminLogin";
import DashBoard from "./pages/Admin/DashBoard";
import NewUserPage from "./pages/Admin/NewUserPage";
import EditUserPage from "./pages/Admin/EditUserPage";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPager />} />
          <Route path="/admin/login" element={<AdminLogin />}></Route>
          <Route path="/profile" element={<Auth allowedRole={"PUBLIC"} />}>
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          <Route
            path="/admin"
            element={<Auth allowedRole={"ADMIN"} />}
          >
            <Route path="/admin/dashboard" element={<DashBoard />} />
            <Route path="/admin/new-user" element={<NewUserPage />} />
            <Route path="/admin/edit-user/:id" element={<EditUserPage />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}
