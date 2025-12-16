import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";

const customLabelStyle = {
  fontSize: "12px",
  fontWeight: 500,
  color: "#333333",
  transition: "color 0.3s",
};


function CustomTextField(props) {
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
    maxLength,
    onBlur,
  } = props;

  const [error, setError] = useState(false);
  // const currentDate = new Date().toISOString().split("T")[0];

  const handleChange = (event) => {
    const { name } = event.target;
    let value = event.target.value;

    if (name === "panNo") {
      value = value.toUpperCase();
      event.target.value = value;
      //console.log("panNo :: ", value);
    }
    if (name === "memberName") {
      value = value.replace(/[^a-zA-Z ]/g, "");
      event.target.value = value;
    }
    setError(false);
    if (required && !value) {
      setError(true);
    } else if (pattern && !new RegExp(pattern).test(value)) {
      setError(true);
    }
    onchange({
      target: {
        name,
        value,
      },
    });
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
    const onBlurEvent = {
      target: {
        name: event.target.name,
        value: event.target.value,
      },
    };
    onBlur ? onBlur(onBlurEvent) : onchange(transformedEvent);
  };

  return (
<Box textAlign={"center"} sx={{ mb: 2 }}>
  <TextField
    sx={{
      "& .MuiFormHelperText-root": {
        marginLeft: 0,
        fontSize: {
          xs: "9px",
          sm: "9px",
          md: "9px",
          lg: "12px",
          xl: "14px",
        },
        fontWeight: "400",
        color: error ? (color ? color : "red") : color ? color : "black",
        animation: error
          ? "pulse 1.5s infinite"
          : "none",
      },
      "& .MuiInputBase-input": {
        minWidth: "80px",
        borderRadius: "8px",
        color: "black",
        background: "#ffffff",
        fontSize: {
          xs: 12,
          sm: 12,
          md: 13,
          lg: 14,
          xl: 16,
        },
        padding: "12px 14px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.03)",
        },
      },
      "& .MuiOutlinedInput-root": {
        borderRadius: "8px",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
        "& fieldset": {
          borderColor: "#474E68",
          transition: "border-color 0.3s ease",
        },
        "&:hover fieldset": {
          borderColor: "#6B728E",
          boxShadow: "0 0 5px rgba(107, 114, 142, 0.3)",
          transform: "scale(1.02)",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#0F3460",
          borderWidth: "1px",
          boxShadow: "0 0 10px rgba(15, 52, 96, 0.7)",
          transform: "scale(1.05)",
        },
      },
      "& label.Mui-focused": {
        color: "#0F3460",
        fontWeight: 600,
        transition: "color 0.3s ease",
      },
      "& label": {
        color: "#666666",
        transition: "color 0.3s ease",
      },
      "@keyframes pulse": {
        "0%": { opacity: 1 },
        "50%": { opacity: 0.5 },
        "100%": { opacity: 1 },
      },
    }}
    autoComplete="off"
    variant="outlined"
    fullWidth
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
      maxLength: maxLength ?? 64,
    }}
  />
</Box>

  );
}

export default CustomTextField;
