import { useState, useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Grid,
  Divider,
  Drawer,
  Hidden,
  List,
  ListItem,
  Typography,
  ListItemText
} from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { BarChart as BarChartIcon, LogOut as Logout } from 'react-feather';
import CloudIcon from '@material-ui/icons/Cloud';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AuthContext from 'src/store/auth-context';
import RoomIcon from '@material-ui/icons/Room';

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
        borderBottom={4}
        sx={{
          borderBottomColor: 'black',
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
            button
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem
            sx={{ py: 1 }}
            button
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
          >
            <ListItemIcon>
              <RoomIcon />
            </ListItemIcon>
            <ListItemText primary="Map" />
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
      <Hidden xlDown>
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
