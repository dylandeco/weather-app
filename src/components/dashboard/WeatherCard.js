import { Card, CardContent } from '@material-ui/core';
import countries from 'i18n-iso-countries';

countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

const WeatherCard = ({ dt, temp_min, temp_max, temp, main, icon }) => {
  const date = new Date(dt);
  return (
    <Card sx={{ height: '100%', width: '150px' }}>
      <CardContent>
        {main ? (
          <div class="card-body text-center">
            <img src={`http://openweathermap.org/img/w/${icon}.png`} />

            <p>{temp}&deg; C</p>

            <div>
              <div>
                <p>
                  <strong>{temp_min}&deg; C</strong>
                </p>
                <p>
                  <strong>{temp_max}&deg; C</strong>
                </p>
                <p>{date.toLocaleDateString()}</p>
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

export default WeatherCard;
