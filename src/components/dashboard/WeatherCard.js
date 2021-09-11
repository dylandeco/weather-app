import { Grid, Paper, Typography } from '@material-ui/core';
import countries from 'i18n-iso-countries';
import { makeStyles } from '@material-ui/core/styles';

countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

const WeatherCard = ({ dt, temp_min, temp_max, temp, main, icon }) => {
  const date = new Date(dt);

  return (
    <Paper elevation={3}>
      {main ? (
        <Grid
          container
          flexDirection="column"
          justifyContent="center"
          spacing={0}
          px={2}
          xs={{ width: '150px', borderRadius: 10 }}
        >
          <Grid item>
            <img src={`http://openweathermap.org/img/w/${icon}.png`} />
          </Grid>
          <Grid item>
            <Typography color="textPrimary" variant="h5">
              {`High ${temp_max}`}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="textPrimary" variant="h5">
              {`Low ${temp_min}`}
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <h1>Loading</h1>
      )}
    </Paper>
  );
};

export default WeatherCard;
