import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';
import { Box, Container, Grid } from '@material-ui/core';
import CitySelector from 'src/components/dashboard/CitySelector';
import Sales from 'src/components/dashboard//Sales';
import UseFetch from 'src/hooks/UseFetch';
import { API_KEY, API_URL } from 'src/api/config';
import WeatherList from 'src/components/dashboard/WeatherList';

const Dashboard = () => {
  const [data, setData] = useState();

  const getContent = () => {
    //if (error) return <h2>Error when fetching: {error}</h2>;
    //if (!data && isLoading) return <h2>LOADING...</h2>;
    if (!data) return null;
    return <WeatherList weather={data.daily} />;
  };

  async function fetchWeatherData(city) {
    const locationResponse = await fetch(
      `${API_URL}/data/2.5/weather?q=${city}&appid=${API_KEY}`
    );
    const location = await locationResponse.json();
    console.log(location);

    const weatherResponse = await fetch(
      `${API_URL}/data/2.5/onecall?lat=${location.coord.lat}&lon=${location.coord.lon}&exclude=current,minutely,hourly,alerts&units=metric&cnt=7&appid=${API_KEY}`
    );
    const data = await weatherResponse.json();
    return data;
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
          py: 3
        }}
      >
        <CitySelector
          onSearch={(city) =>
            fetchWeatherData(city)
              .then((data) => {
                setData(data);
              })
              .catch((error) => {
                // /movies or /categories request failed
              })
          }
        />
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={12} sm={12} xl={12} xs={12}>
              {getContent()}
            </Grid>
            <Grid item lg={12} md={12} xl={12} xs={12}>
              <Sales />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
