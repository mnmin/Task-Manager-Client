import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import UserForm from "./UserForm";
import userBlankData from "../utils/userHelpers";
import client from "../../../utils/client";
import "./style.css";
import { Alert } from "@mui/material";

const RegistrationPage = () => {
  const location = useLocation();

  const [user, setUser] = useState(userBlankData());
  const [successRegisterUser, setSuccessRegisterUser] = useState("");
  const [errorMissingEmail, setErrorMissingEmail] = useState(test());

  let navigate = useNavigate();

  function test() {
    let existingEmail = location.state;

    if (existingEmail) {
      window.history.replaceState(null, "");

      return true;
    } else {
      return false;
    }
  }

  const login = () => {
    navigate("../tasks", { replace: true });
  };

  const registerUser = (event) => {
    event.preventDefault();
    client
      .post("/user", user, false)
      .then((res) => {
        setSuccessRegisterUser(res.data);
        localStorage.setItem(
          process.env.REACT_APP_USER_TOKEN,
          res.data.data.token
        );
      })
      .then(() => login())

      .catch((err) => {
        console.error(err.response);
        setErrorMissingEmail(true);
        setTimeout(() => {
          setErrorMissingEmail(false);
        }, "3000");

        if (err.response.data.data.email === "Email already in use") {
          navigate("/signup", { state: { emailError: true } });
        }
      });
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { value, name } = event.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <div className="auth-page-container">
      <div className="registration-page">
        <Link id="user-registration-link" to="/signup">
          sign up
        </Link>{" "}
        <Link id="user-login-link" to="/">
          login
        </Link>
        <h1>Sign up</h1>
        {errorMissingEmail && (
          <Alert severity="error">
            An account has already been registered with this email
          </Alert>
        )}
        <p>{successRegisterUser.status}</p>
        <UserForm handleChange={handleChange} handleSubmit={registerUser} />
      </div>
    </div>
  );
};

export default RegistrationPage;
