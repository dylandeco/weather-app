import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Card, CardContent } from '@material-ui/core';

const RainChart = ({ weather }) => {
  const options = {
    title: {
      text: '7 Day Rainfall'
    },
    yAxis: [
      {
        // Primary yAxis
        labels: {
          format: '{value}%',
          style: {
            //color: Highcharts.getOptions().colors[1]
          }
        },
        title: {
          text: 'Percent chance of precip ',
          style: {
            //color: Highcharts.getOptions().colors[1]
          }
        }
      },
      {
        // Secondary yAxis
        title: {
          text: 'Rainfall',
          style: {
            //color: Highcharts.getOptions().colors[0]
          }
        },
        labels: {
          format: '{value} mm',
          style: {
            //color: Highcharts.getOptions().colors[0]
          }
        },
        opposite: true
      }
    ],
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
        name: 'Rainfall',
        type: 'column',
        yAxis: 1,
        data: weather.map(({ rain }) => ({
          y: rain
        })),
        tooltip: {
          valueSuffix: ' mm'
        }
      },
      {
        name: 'Percent chance of precip',
        type: 'spline',
        data: weather.map(({ pop }) => ({
          y: pop * 100
        })),
        tooltip: {
          valueSuffix: ' %'
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

export default RainChart;
