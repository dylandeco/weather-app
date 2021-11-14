import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import { useContext } from 'react';
import AuthContext from 'src/store/auth-context';

const Login = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  return (
    <>
      <Helmet>
        <title>WeatherJS</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={async (values) => {
              const response = await fetch('/login', {
                method: 'POST',
                body: JSON.stringify({
                  email: values.email,
                  password: values.password
                }),
                headers: {
                  'Content-Type': 'application/json'
                }
              });
              if (response.ok) {
                const data = await response.json();
                const expirationTime = new Date(
                  new Date().getTime() + +data.expiresIn * 1000
                );
                authCtx.login(data.idToken, expirationTime.toISOString());
                navigate('/app/dashboard', { replace: true });
              } else {
                const text = await response.text();
                alert(text);
              }
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 1 }}>
                  <Typography color="textPrimary" variant="h2">
                    Sign in
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
                <Box display="flex" flexGrow="1">
                  <Typography color="textSecondary" variant="body1">
                    Don&apos;t have an account?
                  </Typography>
                  <Link
                    component={RouterLink}
                    to="/register"
                    variant="h6"
                    sx={{ mx: 0.5, mt: 0.2 }}
                  >
                    Sign up
                  </Link>
                  <Typography color="textSecondary" variant="body1">
                    or
                  </Typography>
                  <Link
                    component="button"
                    type="submit"
                    variant="h6"
                    sx={{ cursor: 'pointer', mx: 0.5, mt: 0.2 }}
                    onClick={() => {
                      values.email = 'Guest@Guest.com';
                      values.password = 'TestPassword';
                    }}
                  >
                    Sign in as guest
                  </Link>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Login;
