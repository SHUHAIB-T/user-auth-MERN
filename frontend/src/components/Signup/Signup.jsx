import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Spinner from "../Spinner/Spinner";

export default function Signup({ role }) {
  const navigate = useNavigate();
  const initialstate = { name: "", email: "", phone: "", password: "" };
  const [formState, setFormState] = useState(initialstate);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const { email, password, phone, name } = formState;
  const onSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate());
    setIsSubmit(true);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function validate() {
    const { name, email, phone, password } = formState;
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
    if (!password) errors.password = "password is required";
    else if (password.length < 4)
      errors.password = " too short (minimum 4 characters)";
    else if (password.length > 10)
      errors.password = " too long (maximum 10 characters)";
    return errors;
  }

  useEffect(() => {
    const submitForm = async () => {
      if (Object.keys(formErrors).length === 0 && isSubmit) {
        setisLoading(true);
        const URL =
          role === "ADMIN"
            ? "http://localhost:5000/api/admin/manageuser"
            : "http://localhost:5000/api/users";
        try {
          let res = await axios.post(URL, formState);
          setisLoading(false);
          if (res.data.error) {
            throw Error(res.data.message);
          }
          console.log(res.data);
          if (res.data.success) {
            toast(res.data.message);
            const NAV_URL = role === "ADMIN" ? "/admin" : "/login";
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
  }, [formErrors, formState, isSubmit, navigate, role]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="wrapp">
        <div className="wrapper">
          <section className="heading">
            <h1>Register</h1>
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
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                  placeholder="Enter password"
                  onChange={onChange}
                />
                <span className="error-msg">{formErrors.password}</span>
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-block">
                  Submit
                </button>
              </div>
            </form>
          </section>
        </div>
        <img
          src="https://drive.google.com/uc?id=1wIQVMl8c5noHYUJtsFr9VbZvf6OwtNAm"
          alt=""
        />
      </div>
    </>
  );
}

Signup.propTypes = {
  role: PropTypes.string.isRequired,
};
