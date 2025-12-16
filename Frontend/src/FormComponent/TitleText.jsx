import { Typography } from "@mui/material";
import React from 'react';

function TitleText(props) {
  return (
    <Typography variant="h5" align="left" sx={{
      color: props.color ? props.color : '#2C394B',
      // fontFamily: 'Arial sans-serif',
       fontSize: {
        xs: '14px',
        sm: '15px',
        md: '16px',
        lg: '18px',
        xl: '19px',
      },
       fontWeight: '600', }}
        gutterBottom >
          {props.title}
      </Typography>
  );
}

export default TitleText;
