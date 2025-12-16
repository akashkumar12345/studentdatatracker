import * as React from 'react';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function Date() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
       <DatePicker
  defaultValue={dayjs('2022-04-17')}
  size="small"
  slotProps={{
    textField: {
      sx: {
        width: 170, // width
        '& .MuiInputBase-input': {
          fontSize: '12px',
          padding: '4px 8px',  // smaller vertical padding to reduce height
          lineHeight: '18px',   // control height more precisely
        },
        '& .MuiInputBase-root': {
          minHeight: '30px',    // minimal height for the overall input
        },
      },
    },
  }}
/>


      </Box>
    </LocalizationProvider>
  );
}
