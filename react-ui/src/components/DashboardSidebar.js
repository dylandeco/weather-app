import { useState, useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  ListItem,
  Typography,
  ListItemText
} from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CloudIcon from '@material-ui/icons/Cloud';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AuthContext from 'src/store/auth-context';

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onLogoutHandler = () => {
    authCtx.logout();
    navigate('/login', { replace: true });
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        backgroundColor="#0051cc"
        justifyContent="center"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
          height: 64
        }}
      >
        <RouterLink to="/">
          <CloudIcon style={{ color: 'white', fontSize: 40 }} />
        </RouterLink>
        <Typography color="white" variant="h5" p={2}>
          WeatherJS
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 1 }}>
        <List sx={{ py: 1 }}>
          <ListItem
            component={RouterLink}
            to="/app/dashboard"
            button
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem sx={{ py: 1 }} button onClick={onLogoutHandler}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden xsDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default DashboardSidebar;
