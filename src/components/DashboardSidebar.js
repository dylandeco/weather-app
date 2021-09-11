import { useEffect, useContext } from 'react';
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
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import { BarChart as BarChartIcon, LogOut as Logout } from 'react-feather';
import CloudIcon from '@material-ui/icons/Cloud';
import AuthContext from 'src/store/auth-context';

const items = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  }
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const onLogoutHandler = () => {
    authCtx.logout();
    navigate('/login', { replace: true });
  };

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Grid
        container
        backgroundColor="#0051cc"
        justifyContent="center"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          height: 64
        }}
      >
        <RouterLink to="/">
          <CloudIcon style={{ color: 'white', fontSize: 40 }} />
        </RouterLink>
      </Grid>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <ListItem button>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
          <ListItem button onClick={onLogoutHandler}>
            <ListItemText primary="logout" />
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
