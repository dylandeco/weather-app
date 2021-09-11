import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';
import { Box, Container, Grid } from '@material-ui/core';

const Map = () => {
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
        <p>Test</p>
      </Box>
    </>
  );
};

export default Map;
