import axios from "axios";

const API_URL = "http://localhost:5000/api/admin";

const getUsers = async (key) => {
    const response = await axios.get(API_URL + `/manageuser/?search=${key}`, { withCredentials: true });
    return response.data;
}

const deleteUser = async (id) => {
    const response = await axios.delete(API_URL + `/manageuser/${id}`, { withCredentials: true });
    return response.data
}

const ManageServiece = {
    getUsers,
    deleteUser
}

export default ManageServiece;