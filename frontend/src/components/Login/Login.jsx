import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../../feautures/Auth/AuthSlice";
import { toast } from "react-toastify";

import Spinner from "../Spinner/Spinner";

export default function Login(props) {
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { role, isLoading, isError, isSuccess, error } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setisSubmit] = useState(false);

  const { email, password } = credentials;

  const onSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate());
    setisSubmit((prev) => !prev);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setcredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validate = () => {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    let errors = {};
    if (!email) errors.email = "Email is required";
    else if (!email.match(regex)) errors.email = "Enter a valid email address";
    if (!password) errors.password = "Pssword is required";
    return errors;
  };

  useEffect(() => {
    const submitForm = async () => {
      if (Object.keys(formErrors).length === 0 && isSubmit === true) {
        dispatch(login({ ...credentials, role: props.role }));
      }
    };
    submitForm();
  }, [isSubmit, dispatch]);

  useEffect(() => {
    if (isError) {
      if (error?.status === 500) {
        toast.error(error?.message);
      } else {
        setFormErrors({ serverError: error?.message });
      }
    }
    if (isSuccess || role === props.role) {
      if (role === "ADMIN") {
        navigate("/admin/dashboard");
      } else if (role === "PUBLIC") {
        navigate("/");
      }
    }
    dispatch(reset());
  }, [isError, isSuccess, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Login</h1>
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
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
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
          </div>

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

Login.propTypes = {
  role: PropTypes.string.isRequired,
};
