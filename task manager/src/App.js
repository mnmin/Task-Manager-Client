import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import "./App.css";

import LoginPage from "./components/users/login/LoginPage.js";
import RegistrationPage from "./components/users/registration/RegistrationPage.js";
import Header from "./components/header/Header";
import client from "./utils/client";

import TaskPage from "./components/tasks/TaskPage";
function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = getLoggedInUserId();
    if (userId === null) {
      return;
    }
    client.get(`/user/${userId}`).catch((err) => {
      const authMessage = err.response?.data?.data?.authentication;
      if (authMessage === "Token has expired") {
        navigate("/", { state: { token: "expired" } });
      } else {
        console.error(err);
      }
    });
    // eslint-disable-next-line
  }, []);

  const getLoggedInUserId = () => {
    const loadedToken = localStorage.getItem("token");
    if (loadedToken === null || loadedToken === "") {
      return null;
    }
    const decoded = jwt_decode(loadedToken);
    return decoded.userId;
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<RegistrationPage />} />
        <Route element={<AuthenticateUser />}>
          <Route path="/tasks" element={<TaskPage />} />
        </Route>
      </Routes>
    </div>
  );
}

function isLoggedIn() {
  const loadedToken = localStorage.getItem("token");
  return loadedToken?.length > 1;
}

const AuthenticateUser = ({ children, redirectPath = "/" }) => {
  if (!isLoggedIn()) {
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <>
      <Header companyName={`Task Io`} />
    </>
  );
};

export default App;
