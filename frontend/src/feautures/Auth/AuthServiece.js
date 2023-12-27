import axios from "axios";
const API_URL = 'http://localhost:5000/api';

const login = async (credentials) => {
    const role = credentials.role
    const path = role === "ADMIN" ? '/admin/login' : '/users/auth';
    delete credentials.role
    const response = await axios.post(API_URL + path, credentials, credentials);
    if (response.data) {
        localStorage.setItem('userInfo', JSON.stringify(response.data.user));
        localStorage.setItem('role', JSON.stringify(role));
    }
    response.data.role = role;
    return response.data;
}

const updateProfile = async (form) => {
    const formData = new FormData();
    formData.append('profile', form.file);
    const url = `${API_URL}/users/update-profile/${form.id}`;
    console.log(url)
    const res = await axios.post(url, formData, { withCredentials: true }, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },

    });
    console.log(res.data);
    return res.data;
}

const authService = {
    login, updateProfile
}
export default authService;