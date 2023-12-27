import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPager from "./pages/RegisterPager";
import Header from "./components/Header/Header";
import Auth from "./pages/Auth";
import ProfilePage from "./pages/User/ProfilePage";

export default function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPager />} />
          <Route path="/profile" element={<Auth allowedRole={"PUBLIC"} />}>
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}
