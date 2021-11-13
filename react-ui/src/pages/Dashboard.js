import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';
import { Box, Container, Grid } from '@material-ui/core';
import CitySelector from 'src/components/dashboard/CitySelector';
import { API_URL } from 'src/api/config';
import WeatherList from 'src/components/dashboard/WeatherList';
import WeatherChart from 'src/components/dashboard/WeatherChart';
import RainChart from 'src/components/dashboard/RainChart';
import WindChart from 'src/components/dashboard/WindChart';
import Geocode from 'react-geocode';

const Dashboard = () => {
  const [data, setData] = useState();
  const [userLocation, setUserLocation] = useState();
  const [isLoading, setIsLoading] = useState(true);

  Geocode.setApiKey(process.env.REACT_APP_MAPS_KEY);

  const getCards = () => {
    if (!data) return null;
    return <WeatherList weather={data.daily} />;
  };

  const getForecastChart = () => {
    if (!data) return null;
    return <WeatherChart weather={data.daily} />;
  };

  const getRainChart = () => {
    if (!data) return null;
    return <RainChart weather={data.daily} />;
  };

  const getWindChart = () => {
    if (!data) return null;
    return <WindChart weather={data.daily} />;
  };

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  // When the dashboard is first loaded, get the GeoLocation of the user
  useEffect(() => {
    const success = async ({ coords }) => {
      const weatherResponse = await fetch(
        `${API_URL}/data/2.5/onecall?lat=${coords.latitude}&lon=${coords.longitude}&exclude=current,minutely,hourly,alerts&units=metric&cnt=7&appid=${process.env.REACT_APP_API_KEY}`
      ).then((response) => response.json());
      weatherResponse.daily.pop();
      setData(weatherResponse);

      // Get address from latitude & longitude.
      Geocode.fromLatLng(coords.latitude, coords.longitude).then(
        (response) => {
          let city;
          for (
            let i = 0;
            i < response.results[0].address_components.length;
            i++
          ) {
            for (
              let j = 0;
              j < response.results[0].address_components[i].types.length;
              j++
            ) {
              switch (response.results[0].address_components[i].types[j]) {
                case 'locality':
                  city = response.results[0].address_components[i].long_name;
                  break;
              }
            }
          }
          setUserLocation(city);
          setIsLoading(false);
          console.log(city);
        },
        (error) => {
          console.error(error);
        }
      );
    };
    // Get the current location of the user and display when they first login
    navigator.geolocation.getCurrentPosition(success, console.warn, options);
  }, []);

  async function fetchWeatherData(city) {
    const locationResponse = await fetch(
      `${API_URL}/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`
    );
    const location = await locationResponse.json();
    console.log(location);

    const weatherResponse = await fetch(
      `${API_URL}/data/2.5/onecall?lat=${location.coord.lat}&lon=${location.coord.lon}&exclude=current,minutely,hourly,alerts&units=metric&cnt=7&appid=${process.env.REACT_APP_API_KEY}`
    ).then((response) => response.json());
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
        {!isLoading && (
          <Container display={'flex'} maxWidth={true}>
            <Box width="100%" marginBottom={2}>
              <CitySelector
                userLocation={userLocation}
                onSearch={(city) =>
                  fetchWeatherData(city)
                    .then((data) => {
                      setData(data);
                    })
                    .catch((error) => {})
                }
              />
            </Box>
            <Box>{getCards()}</Box>
            <Grid container spacing={2} xs={12}>
              <Grid item xs={12} md={12} lg={6}>
                {getForecastChart()}
              </Grid>
              <Grid item xs={12} md={12} lg={6}>
                {getRainChart()}
              </Grid>
              <Grid item xs={12} lg={12}>
                {getWindChart()}
              </Grid>
            </Grid>
          </Container>
        )}
      </Box>
    </>
  );
};

export default Dashboard;
