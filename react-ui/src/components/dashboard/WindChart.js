import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsWindbarb from 'highcharts/modules/windbarb';
import { Box, Card, CardContent, Grid } from '@material-ui/core';

highchartsWindbarb(Highcharts);

const WindChart = ({ weather }) => {
  const options = {
    title: {
      text: '7 Day Wind'
    },
    yAxis: {
      title: {
        text: 'Wind Speed'
      }
    },
    xAxis: {
      offset: 40,
      categories: weather.map(({ dt }) =>
        new Date(dt * 1000).toLocaleDateString()
      )
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
    series: [
      {
        type: 'windbarb',
        data: weather.map(({ wind_speed, wind_deg }) => [wind_speed, wind_deg]),
        name: 'Wind',
        showInLegend: false,
        tooltip: {
          valueSuffix: ' m/s'
        }
      },
      {
        type: 'area',
        keys: ['y', 'rotation'], // rotation is not used here
        data: weather.map(({ wind_speed, wind_deg }) => [wind_speed, wind_deg]),
        color: Highcharts.getOptions().colors[0],
        fillColor: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, Highcharts.getOptions().colors[0]],
            [
              1,
              Highcharts.color(Highcharts.getOptions().colors[0])
                .setOpacity(0.25)
                .get()
            ]
          ]
        },
        name: 'Wind speed',
        tooltip: {
          valueSuffix: ' m/s'
        },
        states: {
          inactive: {
            opacity: 1
          }
        }
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

export default WindChart;
