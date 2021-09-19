import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';
import { Box, Container, Grid } from '@material-ui/core';
import CitySelector from 'src/components/dashboard/CitySelector';
import UseFetch from 'src/hooks/UseFetch';
import { API_KEY, API_URL } from 'src/api/config';
import WeatherList from 'src/components/dashboard/WeatherList';
import WeatherChart from 'src/components/dashboard/WeatherChart';
import RainChart from 'src/components/dashboard/RainChart';
import WindChart from 'src/components/dashboard/WindChart';

const Dashboard = () => {
  const [data, setData] = useState();

  const getCards = () => {
    //if (error) return <h2>Error when fetching: {error}</h2>;
    //if (!data && isLoading) return <h2>LOADING...</h2>;
    if (!data) return null;
    return <WeatherList weather={data.daily} />;
  };

  const getForecastChart = () => {
    //if (error) return <h2>Error when fetching: {error}</h2>;
    //if (!data && isLoading) return <h2>LOADING...</h2>;
    if (!data) return null;
    return <WeatherChart weather={data.daily} />;
  };

  const getRainChart = () => {
    //if (error) return <h2>Error when fetching: {error}</h2>;
    //if (!data && isLoading) return <h2>LOADING...</h2>;
    if (!data) return null;
    return <RainChart weather={data.daily} />;
  };

  const getWindChart = () => {
    //if (error) return <h2>Error when fetching: {error}</h2>;
    //if (!data && isLoading) return <h2>LOADING...</h2>;
    if (!data) return null;
    return <WindChart weather={data.daily} />;
  };

  async function fetchWeatherData(city) {
    const locationResponse = await fetch(
      `${API_URL}/data/2.5/weather?q=${city}&appid=${API_KEY}`
    );
    const location = await locationResponse.json();
    console.log(location);

    const weatherResponse = await fetch(
      `${API_URL}/data/2.5/onecall?lat=${location.coord.lat}&lon=${location.coord.lon}&exclude=current,minutely,hourly,alerts&units=metric&cnt=7&appid=${API_KEY}`
    ).then((response) => response.json());
    //const data = await weatherResponse.json();
    weatherResponse.daily.pop();
    return weatherResponse;
  }

  return (
    <>
      <Helmet>
        <title>Dashboard | Weather App</title>
      </Helmet>

      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 2
        }}
      >
        <Container sx={{ display: 'flex', height: '100%' }} maxWidth={false}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CitySelector
                onSearch={(city) =>
                  fetchWeatherData(city)
                    .then((data) => {
                      setData(data);
                    })
                    .catch((error) => {})
                }
              />
            </Grid>
            <Grid item xs={12}>
              {getCards()}
            </Grid>

            <Grid item xs={6}>
              {getForecastChart()}
            </Grid>
            <Grid item xs={6}>
              {getRainChart()}
            </Grid>
            <Grid item xs={12}>
              {getWindChart()}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
