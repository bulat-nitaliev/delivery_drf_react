import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Select, MenuItem, InputLabel, Button } from "@mui/material";

import { getFilterValue } from "../utils";

const FormFilter = ({ dataDelivery, filterDelivery, setFilterDelivery }) => {
  
  const [uniqueServices, uniquePackages, uniqueStatuses] =
    getFilterValue(dataDelivery);

  const handleResetClick = () => {
    setFilterDelivery({
    date1: null,
    service: "",
    packageName: "",
    status: "",
  }); 
  };
  return (
    <div>
      <h2>Фильтры:</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          justifyItems: "end",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
          <DatePicker
            label="Выберите дату"
            value={filterDelivery.date1}
            onChange={(e) => setFilterDelivery({ ...filterDelivery, date1: e })}
          />{
            filterDelivery.date1?
            <Button size="small"  onClick={handleResetClick}>Сбросить дату</Button>
            :<div></div>
          }
        
        </LocalizationProvider>
        <div>
          <InputLabel id="service-select-label">Услуга</InputLabel>
          <Select
            labelId="service-select-label"
            id="service-select"
            value={filterDelivery.service || ""}
            onChange={(e) =>
              setFilterDelivery({
                ...filterDelivery,
                service: e.target.value,
              })
            }
          >
            <MenuItem value="">Все</MenuItem>
            {uniqueServices.map((srv) => (
              <MenuItem key={srv} value={srv}>
                {srv}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div>
          <InputLabel id="package-select-label">Тип пакета</InputLabel>
          <Select
            labelId="package-select-label"
            id="package-select"
            value={filterDelivery.packageName || ""}
            onChange={(e) =>
              setFilterDelivery({
                ...filterDelivery,
                packageName: e.target.value,
              })
            }
          >
            <MenuItem value="">Все</MenuItem>
            {uniquePackages.map((pkg) => (
              <MenuItem key={pkg} value={pkg}>
                {pkg}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div>
          <InputLabel id="status-select-label">Статус доставки</InputLabel>
          <Select
            labelId="status-select-label"
            id="status-select"
            value={filterDelivery.status || ""}
            onChange={(e) =>
              setFilterDelivery({ ...filterDelivery, status: e.target.value })
            }
          >
            <MenuItem value="">Все</MenuItem>
            {uniqueStatuses.map((stat) => (
              <MenuItem key={stat} value={stat}>
                {stat}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
};

export default FormFilter;
