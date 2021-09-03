import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';
import { Box, Container, Grid } from '@material-ui/core';
import Budget from 'src/components/dashboard//Budget';
import Sales from 'src/components/dashboard//Sales';

const Dashboard = () => {
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
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <Budget />
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
