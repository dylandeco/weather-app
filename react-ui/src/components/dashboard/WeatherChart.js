import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Card, CardContent, Grid } from '@material-ui/core';

const WeatherChart = ({ weather }) => {
  const options = {
    title: {
      text: '7 Day Forecast'
    },
    yAxis: {
      title: {
        text: 'Temperature (C)'
      }
    },
    tooltip: {
      crosshairs: true,
      shared: true
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true
        },
        enableMouseTracking: true
      }
    },
    credits: {
      enabled: false
    },
    xAxis: {
      title: {
        text: 'Date'
      },
      categories: weather.map(({ dt }) =>
        new Date(dt * 1000).toLocaleDateString()
      )
    },
    series: [
      {
        name: 'High (C)',
        data: weather.map(({ temp, weather }) => ({
          y: temp.max,
          marker: {
            symbol: `url(http://openweathermap.org/img/w/${weather[0].icon}.png)`
          }
        }))
      },
      {
        name: 'Low (C)',
        data: weather.map(({ temp }) => ({
          y: temp.min
        }))
      }
    ]
  };

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative',
            minWidth: '100%'
          }}
        >
          <HighchartsReact
            highcharts={Highcharts}
            constructorType={'chart'}
            options={options}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default WeatherChart;
