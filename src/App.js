import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import { useContext } from 'react';
import AuthContext from './store/auth-context';
import AuthRoutes from './AuthRoutes';

const App = () => {
  const authCtx = useContext(AuthContext);

  const routing = useRoutes(routes);
  const routingAuth = useRoutes(AuthRoutes);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {authCtx.isLoggedIn ? routing : routingAuth}
    </ThemeProvider>
  );
};

export default App;
