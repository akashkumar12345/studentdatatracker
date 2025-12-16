import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Dropdown({
  label = '',
  value = '',
  onChange,
  options = [],
  getOptionLabel = (opt) => opt.label || opt.name || opt, // flexibility for diff. data shape
  getOptionValue = (opt) => opt.value || opt.id || opt,
  placeholder = 'Select',
  ...props
}) {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="dropdown-label">{label}</InputLabel>
      <Select
        labelId="dropdown-label"
        value={value}
        label={label}
        onChange={onChange}
        {...props}
      >
        <MenuItem value="">
          <em>{placeholder}</em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={getOptionValue(option)} value={getOptionValue(option)}>
            {getOptionLabel(option)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
