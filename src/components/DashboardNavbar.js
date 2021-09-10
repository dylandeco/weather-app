import { useState, useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar
} from '@material-ui/core';
import InputIcon from '@material-ui/icons/Input';
import CloudIcon from '@material-ui/icons/Cloud';
import AuthContext from 'src/store/auth-context';
import CitySelector from 'src/components/dashboard/CitySelector';

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  const [notifications] = useState([]);
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const onLogoutHandler = () => {
    authCtx.logout();
    navigate('/login', { replace: true });
  };

  return (
    <AppBar elevation={0} {...rest}>
      <Toolbar>
        <RouterLink to="/">
          <CloudIcon style={{ color: 'white', fontSize: 40 }} />
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton onClick={onLogoutHandler} color="inherit">
          <InputIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;
