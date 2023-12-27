import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Navigate, useLocation, Outlet } from "react-router-dom";

function Auth({ allowedRole }) {
  const { role } = useSelector((state) => state.auth);
  const isUser = role === allowedRole;
  const location = useLocation();
  const URL = allowedRole === "ADMIN" ? "/admin/login" : "/login";
  return (
    <>
      {isUser ? (
        <Outlet />
      ) : (
        <Navigate to={URL} state={{ from: location }} replace />
      )}
    </>
  );
}

export default Auth;

Auth.propTypes = {
  allowedRole: PropTypes.string.isRequired,
};
