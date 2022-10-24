import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Alert } from "@mui/material";

import userBlankData from "../utils/userHelpers";
import UserForm from "./UserForm";
import client from "../../../utils/client";
import { useLoggedInUser } from "../../../context/LoggedInUser";
import { WindowSharp } from "@mui/icons-material";

const LoginPage = () => {
  const { setToken } = useLoggedInUser();
  const location = useLocation();
  const [user, setUser] = useState(userBlankData());
  const [successLogin, setSuccessLogin] = useState({
    data: { token: "", user: {} },
  });
  let navigate = useNavigate();
  const [errorLogin, setErrorLogin] = useState(false);
  const [firstPageLoad, setFirstPageLoad] = useState(true);
  if(localStorage.getItem(process.env.USER_LOGGEDIN) === 'true') {
    console.log("LOGINPAGE ----->", localStorage.getItem(process.env.USER_LOGGEDIN))
    localStorage.setItem(process.env.USER_LOGGEDIN, '');
    window.location.reload(false);
  }

  useEffect(() => {
    const loadedToken =
      localStorage.getItem(process.env.REACT_APP_USER_TOKEN) || "";
    setSuccessLogin({ data: { token: loadedToken } });
  }, []);

  const loginUser = (event) => {
    event.preventDefault();
    console.log("LOGINPAGE USER ---------------------->", user);
    client
      .post("/login", user) //, false)
      .then((res) => {
        console.log("Returned login values ----->", res.data, res.data.data.token)
        localStorage.setItem(
          process.env.REACT_APP_USER_TOKEN,
          res.data.data.token
        );
        localStorage.setItem(process.env.USER_LOGGEDIN, 'true');

        setToken(res.data.data.token);
        setSuccessLogin(res.data);

        navigate("../tasks", {
          replace: true,
        });
      })
      .catch((err) => {
        console.error(err.response);
        setErrorLogin(true);
        setTimeout(() => {
          setErrorLogin(false);
        }, "2000");
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
      <div className="login-page">
        <div>
        <Link id="user-registration-link" to="/signup">
          Sign up
        </Link>
          <h1>Task Io</h1>
        </div>
        {/* <Link id="user-login-link" to="/">
          login
        </Link> */}
        <h1>Login</h1>
        {/* <p>Status: {successLogin.status}</p> */}
        <UserForm handleChange={handleChange} handleSubmit={loginUser} />
        {location.state !== null && location.state.token === "expired" && (
          <Alert severity="error">
            Your session has expired. Please login again.
          </Alert>
        )}
        {errorLogin && (
          <Alert severity="error">Email or Password is incorrect</Alert>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
