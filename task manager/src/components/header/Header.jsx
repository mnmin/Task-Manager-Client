import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import { useNavigate, Outlet, Link } from 'react-router-dom';

import { useEffect, useState } from 'react';
import client from '../../utils/client';
import { Alert } from '@mui/material';
import { useLoggedInUser } from '../../context/LoggedInUser';

import './style.css';

const Header = ({ companyName }) => {
  const navigate = useNavigate();
  const [authError, setAuthError] = useState(false);
  const userLoggedIn = useLoggedInUser().user;
  console.log("Header userLoggedIn--------->", userLoggedIn)

  useEffect(() => {
    console.log('CALLED HEADER', userLoggedIn)
    const userId = userLoggedIn.id;
    // console.log("Header useEffect userID--------->", userId)
    if (userId === null) {
      return;
    }
    client
      .get(`/user/${userId}`)
      .then(setAuthError(false))
      .catch(err => {
        console.error(err.response);
        setAuthError(true);

        setTimeout(() => {
          setAuthError(false);
        }, '3000');
      });
    // eslint-disable-next-line
  }, []);

  const handleClick = location => {
    const userId = userLoggedIn.id;
    if (userId === null) {
      return;
    }
    client
      .get(`/user/${userId}`)
      .then(res => {
        navigate(`/${location}`, { state: { user: userLoggedIn } });
      })
      .catch(err => console.error(err));
  };

  const handleLogOut = () => {
    localStorage.setItem(process.env.REACT_APP_USER_TOKEN, '');
    navigate('../', { replace: true });
  };

  return (
    <>
      {authError && <Alert severity="error">This user cannot be found</Alert>}
      <Box className="header-container">
        <Box className="logo-container">
          <Typography fontSize={22}>
            <Link to="/tasks">{companyName}</Link>
          </Typography>
        </Box>

        <Box>
          <Stack spacing={2} direction="row">
            <Button variant="contained" href="/tasks">
              Tasks
            </Button>
            <Button id="user-signout-button" variant="contained" onClick={handleLogOut}>
              Logout
            </Button>
          </Stack>
        </Box>
      </Box>
      <Outlet />
    </>
  );
};

export default Header;
