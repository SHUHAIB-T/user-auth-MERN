import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Spinner from "../Spinner/Spinner";

export default function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const { email, phone, name } = user;
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setisLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/admin/manageuser/${id}`,
          { withCredentials: true }
        );
        setisLoading(false);
        console.log(response.data);
        delete response.data._id;
        setUser(response.data);
      } catch (error) {
        setisLoading(false);
        toast.error(error.message);
      }
    };
    fetchUser();
  }, [id]);
  const onSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate());
    setIsSubmit(true);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function validate() {
    const { name, email, phone } = user;
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    let errors = {};
    if (!name) errors.name = "name is required";
    if (!email) errors.email = "email is required";
    else if (!email.match(regex)) errors.email = "not a valid email";
    if (!phone) errors.phone = "phone number is required";
    else if (
      phone.length < 10 ||
      phone.length > 10 ||
      isNaN(phone) ||
      phone === "0000000000"
    )
      errors.phone = "not a valid phone number";
    return errors;
  }

  useEffect(() => {
    const submitForm = async () => {
      if (Object.keys(formErrors).length === 0 && isSubmit) {
        setisLoading(true);
        const URL = `http://localhost:5000/api/admin/manageuser/${id}`;
        try {
          let res = await axios.put(URL, user);
          setisLoading(false);
          if (res.data.error) {
            throw Error(res.data.message);
          }
          if (res.data.success) {
            toast(res.data.message);
            const NAV_URL = "/admin/dashboard";
            navigate(NAV_URL);
          } else {
            setFormErrors({ serverError: res.data.message });
          }
        } catch (err) {
          setisLoading(false);
          setFormErrors({ serverError: err.response.data.message });
        }
      }
    };
    submitForm();
  }, [formErrors, user, isSubmit, navigate]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Edit User</h1>
      </section>
      <section className="form">
        {formErrors.serverError && (
          <div className="error-bounday">
            <span className="error-msg">{formErrors.serverError}</span>
          </div>
        )}
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={onChange}
            />
            <span className="error-msg">{formErrors.name}</span>
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <span className="error-msg">{formErrors.email}</span>
          <div className="form-group">
            <input
              type="Number"
              className="form-control"
              id="pohne"
              name="phone"
              value={phone}
              placeholder="Enter your phone number"
              onChange={onChange}
            />
          </div>
          <span className="error-msg">{formErrors.phone}</span>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
