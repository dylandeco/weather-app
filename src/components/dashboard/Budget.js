import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { useState, useEffect } from 'react';
import countries from 'i18n-iso-countries';

countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

const Budget = (props) => {
  // State
  const [apiData, setApiData] = useState({});
  const [getState, setGetState] = useState('edmonton');
  const [state, setState] = useState('edmonton');

  // API KEY AND URL
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`;

  // Side effect
  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setApiData(data));
  }, [apiUrl]);

  const inputHandler = (event) => {
    setGetState(event.target.value);
  };

  const submitHandler = () => {
    setState(getState);
  };

  const kelvinToFarenheit = (k) => {
    return (k - 273.15).toFixed(2);
  };

  return (
    <Card sx={{ height: '100%' }} {...props}>
      <CardContent>
        {apiData.main ? (
          <div class="card-body text-center">
            <img
              src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}
              alt="weather status icon"
              className="weather-icon"
            />

            <p>{kelvinToFarenheit(apiData.main.temp)}&deg; C</p>

            <p>
              <i></i> <strong>{apiData.name}</strong>
            </p>

            <div>
              <div>
                <p>
                  <i></i>{' '}
                  <strong>
                    {kelvinToFarenheit(apiData.main.temp_min)}&deg; C
                  </strong>
                </p>
                <p>
                  <i></i>{' '}
                  <strong>
                    {kelvinToFarenheit(apiData.main.temp_max)}&deg; C
                  </strong>
                </p>
              </div>
              <div>
                <p>
                  {' '}
                  <strong>{apiData.weather[0].main}</strong>
                </p>
                <p>
                  <strong>
                    {' '}
                    {countries.getName(apiData.sys.country, 'en', {
                      select: 'official'
                    })}
                  </strong>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <h1>Loading</h1>
        )}
      </CardContent>
    </Card>
  );
};

export default Budget;
