import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";

const customLabelStyle = {
  fontSize: "12px",
  // color:'red',
};

function CustomTextArea(props) {
  const {
    disabled,
    required,
    errorMessage,
    defaultValue,
    helperText,
    placeholder,
    name,
    type,
    pattern,
    label,
    onchange,
    transformInput,
    color,
    multiline, // Add the multiline prop
    minRows, // Add the minRows prop
    maxLength,
  } = props;

  const [error, setError] = useState(false);

  const maxLengthValue = maxLength ? maxLength : 1000;

  const handleChange = (event) => {
    const { value } = event.target;
    setError(false);
    if (required && !value) {
      setError(true);
    } else if (pattern && !new RegExp(pattern).test(value)) {
      setError(true);
    }
    onchange(event);
  };

  const handleBlur = (event) => {
    // applying transformation to input
    const transformedValue = transformInput
      ? transformInput(event.target.value)
      : event.target.value;
    const transformedEvent = {
      ...event,
      target: {
        name: event.target.name,
        value: transformedValue,
      },
    };
    onchange(transformedEvent);
  };

  return (
    <Box textAlign={"center"} sx={{ background: "#fff" }}>
      <TextField
        sx={{
          "& .MuiFormHelperText-root": {
            marginLeft: 0,
            // fix based on your screen
            fontSize: {
              xs: "9px",
              sm: "9px,",
              md: "9px",
              lg: "12px",
              xl: "14px",
            },
            fontWeight: "400",
            color: error ? (color ? color : "red") : color ? color : "black",
          },
          "& .MuiInputBase-input": {
            color: "black",

            background: "white",
            // fix based on your screen
            fontSize: {
              xs: 12,
              sm: 12,
              md: 13,
              lg: 14,
              xl: 16,
            },
          },
          "& .MuiOutlinedInput-root": {
            borderRadius: "0px",
            "& fieldset": {
              borderColor: "#474E68",
            },
            "&:hover fieldset": {
              borderColor: "#6B728E",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#0F3460",
              borderWidth: "0.5px",
            },
          },
        }}
        // size='small'
        autoComplete="off"
        variant="outlined"
        fullWidth
        multiline={multiline}
        minRows={minRows}
        maxRows={5}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        error={error}
        label={label}
        helperText={error ? errorMessage : helperText}
        value={defaultValue}
        onChange={handleChange}
        onBlur={handleBlur}
        name={name}
        type={type}
        InputLabelProps={{
          style: customLabelStyle,
        }}
        inputProps={{
          maxLength: maxLengthValue, // Set the maxLength property
          //maxLength: 10, // Set the maxLength property
        }} // Don't pass pattern for date field
        // FormHelperTextProps={{
        //     sx: {
        //         marginLeft: 0,
        //         // fix based on your screen
        //         fontSize: {
        //             xs: '9px',
        //             sm: '9px,',
        //             md: '9px',
        //             lg: '12px',
        //             xl: '14px',
        //         },
        //         fontWeight: '400',
        //         color: color ? color : 'black',
        //         // textTransform: 'capitalize',
        //     },
        // }}
      />
    </Box>
  );
}

export default CustomTextArea;
