import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Card, CardContent } from '@material-ui/core';

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
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true
        },
        enableMouseTracking: false
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
        name: 'Temperature (C)',
        data: weather.map(({ temp }) => temp.day)
      }
    ]
  };

  return (
    <Card sx={{ minHeight: '100%' }}>
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative'
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
