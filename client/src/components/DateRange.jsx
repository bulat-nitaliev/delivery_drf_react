import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/de";

export default function FirstComponent() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
      <DatePicker />
    </LocalizationProvider>
  );
}
