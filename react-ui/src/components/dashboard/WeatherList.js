import { Container, Grid } from '@material-ui/core';
import React from 'react';

import WeatherCard from './WeatherCard';

const WeatherList = ({ weather }) => {
  return (
    <Grid
      container
      flexWrap="nowrap"
      overflow="auto"
      spacing={2}
      direction="row"
      justifyContent="center"
    >
      {weather.map(({ dt, temp, weather }) => (
        <Grid item minWidth="200px" marginBottom={2}>
          <WeatherCard
            temp_max={temp.max}
            temp_min={temp.min}
            temp={temp.day}
            dt={dt * 1000}
            main={weather[0].main}
            icon={weather[0].icon}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default WeatherList;
