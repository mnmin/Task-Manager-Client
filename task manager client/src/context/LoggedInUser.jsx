import jwtDecode from 'jwt-decode';
import { createContext, useContext, useEffect, useState } from 'react';
import client from '../utils/client.js';

export const LoggedInUser = createContext();

export const useLoggedInUser = () => useContext(LoggedInUser);

const userInit = {
  email: '',
  firstName: '',
  lastName: '',
  id: ''
};

const LoggedInUserProvider = ({ children }) => {
  const [user, setUser] = useState(userInit);
  const [token, setToken] = useState(
    localStorage.getItem(process.env.REACT_APP_USER_TOKEN) || ''
  );

  useEffect(() => {
    console.log("CALLED LOGGEDINUSER", token)
    if (token) {
      const { userId } = jwtDecode(token);
      //console.log("token", token)

      client
        .get(`/user/${userId}`)
        .then(res => setUser(res.data.user))
        .catch(err => console.error('[User Error]', err.response));
    }
  }, [token]);

  return (
    <LoggedInUser.Provider value={{ user, setToken }}>
      {children}
    </LoggedInUser.Provider>
  );
};

export default LoggedInUserProvider;