import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  }
}));

const CitySelector = ({ userLocation, onSearch }) => {
  const [city, setCity] = useState(userLocation);

  return (
    <Grid container>
      <Grid item xs={12}>
        <TextField
          id="filled-full-width"
          label="City"
          style={{
            margin: 1,
            color: 'black',
            backgroundColor: 'white'
          }}
          fullWidth
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
