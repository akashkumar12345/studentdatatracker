import React from "react";
import { Typography } from "@mui/material";

function ValueText(props) {
  return (
    <Typography
      variant="caption"
      align="left"
      sx={{
        color: props.color ? props.color : "#424141",
        // fontFamily: 'Arial sans-serif'
        whiteSpace: "pre-line", // This preserves \n line breaks,
        fontSize: {
          xs: "11px",
          sm: "12px",
          md: "13px",
          lg: "15px",
          xl: "16px",
        },
        fontWeight: "400",
      }}
      component="div"
      variantMapping={{ caption: "div" }}
    >
      {props.title}
    </Typography>
  );
}

export default ValueText;