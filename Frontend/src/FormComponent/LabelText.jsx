// import { Box, Typography } from '@mui/material';
// import React from 'react'

// function LabelText(props) {
//   return (
//     <Box sx={{ display: "flex", alignItems: 'center', height:"100%", }}>
//       <Typography variant="body1" align='left' sx={{
//         color: props.color? props.color : '#3b3b3b',
//         // fontFamily: 'Arial sans-serif',
//          fontSize: {
//            xs: '11px',
//            sm: '12px',
//            md: '13px',
//            lg: '14px',
//            xl: '15px',
//         },
//          fontWeight: '600',}}
//          component="div" variantMapping={{ body1: 'div' }}>
//         {props.title}
//       </Typography>
//     </Box>

//   );
// }

// export default LabelText;
import { Box, Typography } from "@mui/material";
import React from "react";

function LabelText(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
      <Typography
        variant="body1"
        align="left"
        sx={{
          color: props.color ? props.color : "#3b3b3b",
          // fontFamily: 'Arial sans-serif',
          fontSize: {
            xs: "11px",
            sm: "12px",
            md: "13px",
            lg: "14px",
            xl: "15px",
          },
          fontWeight: "600",
        }}
        component="div"
        variantMapping={{ body1: "div" }}
      >
        {props.title}{" "}
        {props.required && <span style={{ color: "red" }}>*</span>}
      </Typography>
    </Box>
  );
}

export default LabelText;
