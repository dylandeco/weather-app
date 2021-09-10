import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import UseFetch from 'src/hooks/UseFetch';
import { API_KEY, API_URL } from 'src/api/config';
import { Grid, Input } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  }
}));

const CitySelector = ({ onSearch }) => {
  const classes = useStyles();

  const [city, setCity] = useState('');

  return (
    <Grid container justifyContent="center">
      <Grid item xs={0}>
        <Input
          id="filled-full-width"
          label="City"
          style={{
            margin: 8,
            color: 'black',
            backgroundColor: 'white',
            borderRadius: 10
          }}
          placeholder="Enter city"
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          variant="filled"
          onChange={(event) => setCity(event.target.value)}
          value={city}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              onSearch(city);
            }
          }}
        />
      </Grid>
    </Grid>
  );
};

export default CitySelector;
