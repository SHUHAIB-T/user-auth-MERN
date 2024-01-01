import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import "./adminHeader.css";
import { logout } from "../../feautures/Auth/AuthSlice";
import { search } from "../../feautures/Manage/searchSlice";
import { Link } from "react-router-dom";

export default function AdminHeader() {
  const [key, setKey] = useState("");
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className="header">
      <div className="logo">
        <Link to={"/admin/dashboard"}>
          <h1>Admin Panel</h1>
        </Link>
      </div>
      <nav className="navbar">
        <ul>
          <li>
            {user && (
              <div className="searchinput">
                <input
                  type="search"
                  value={key}
                  placeholder="search users"
                  className="search-input"
                  onChange={(e) => setKey(e.target.value)}
                />
                <button onClick={() => dispatch(search(key))} className="btn">
                  Search
                </button>
              </div>
            )}
          </li>
          <li>
            {user && (
              <button className="btn" onClick={() => dispatch(logout())}>
                Logout
              </button>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
