import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar } from '@material-ui/core';
import CloudIcon from '@material-ui/icons/Cloud';

const MainNavbar = (props) => (
  <AppBar elevation={0} {...props}>
    <Toolbar sx={{ height: 64 }}>
      <RouterLink to="/">
        <CloudIcon style={{ color: 'white', fontSize: 40 }} />
      </RouterLink>
    </Toolbar>
  </AppBar>
);

export default MainNavbar;
