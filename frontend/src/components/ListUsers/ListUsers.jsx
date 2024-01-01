import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Spinner/Spinner";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  getUsers,
  reset,
  deleteUser,
} from "../../feautures/Manage/ManageSlice";
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

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser(id));
      }
    });
  };

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
          onClick={() => handleDelete(user._id)}
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
    <div className="table-wrapper">
      <div className="new-user">
        <Link to="/admin/new-user">
          <button className="btn">New User</button>
        </Link>
      </div>
      <div className="tabletietlewrapper">
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
    </div>
  );
}
