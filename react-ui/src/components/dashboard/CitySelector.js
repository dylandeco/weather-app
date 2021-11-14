import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';

const CitySelector = ({ userLocation, onSearch }) => {
  const [city, setCity] = useState(userLocation);

  return (
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
  );
};

export default CitySelector;
