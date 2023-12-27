import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Spinner/Spinner";
import {
  getUsers,
  reset,
  deleteUser,
} from "../../feautures/Manage/ManageSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./listuser.css";

export default function ListUsers() {
  const dispatch = useDispatch();
  const { userList, isLoading, error, isDelete } = useSelector(
    (state) => state.manage
  );
  const { key } = useSelector((state) => state.search);
  useEffect(() => {
    dispatch(getUsers(key));
  }, [dispatch, key]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (isDelete) {
      toast.success("User deleted successfully");
    }
    dispatch(reset());
  }, [error, isDelete, dispatch]);
  const users = userList.map((user) => (
    <tr key={user._id}>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
      <td className="btn-container">
        <Link to={`/admin/edit-user/${user._id}`}>
          <button className="edit-button">Edit</button>
        </Link>
        <button
          className="delete-button"
          onClick={() => dispatch(deleteUser(user._id))}
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <div className="new-user">
        <Link to="/admin/new-user">
          <button className="btn">New User</button>
        </Link>
      </div>
      <table className="user-list-table">
        <thead>
          <tr>
            <th>User Name</th>
            <th>User Email</th>
            <th>User Mobile</th>
            <th>Edit/Delete</th>
          </tr>
        </thead>
        <tbody>{users}</tbody>
      </table>
    </div>
  );
}
