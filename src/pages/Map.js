import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';
import { Box, Container, Grid, Paper } from '@material-ui/core';

const Map = () => {
  function FormRow() {
    return (
      //return renders the grid
      <>
        <Grid item xs={4}>
          <Paper>item</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper>item</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper>item</Paper>
        </Grid>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Map | Weather App</title>
      </Helmet>

      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%'
        }}
      >
        <Container sx={{ height: '100%', width: '100%' }}>
          <Grid container direction="column" spacing={1}>
            <Grid container item direction="column" xs={12} spacing={3}>
              <FormRow />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Map;
