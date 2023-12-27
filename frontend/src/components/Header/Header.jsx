import { FaSignInAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./header.css";
import { logout } from "../../feautures/Auth/AuthSlice";

function Header() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">User Auth</Link>
      </div>
      <ul>
        <>
          {user ? (
            <>
              <button className="btn" onClick={() => dispatch(logout())}>
                Logout
              </button>
              <li>
                <Link to="/profile">
                  {user?.profile?.filename ? (
                    <img
                      src={`http://localhost:5000/profile/${user.profile.filename}`}
                      className="profile-img"
                    />
                  ) : (
                    <img
                      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                      className="profile-img"
                      alt=""
                    />
                  )}{" "}
                  {user.name}
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">
                  <FaSignInAlt /> Login
                </Link>
              </li>
              <li>
                <Link to="/Register">
                  <FaUser /> Register
                </Link>
              </li>
            </>
          )}
        </>
      </ul>
    </header>
  );
}

export default Header;
