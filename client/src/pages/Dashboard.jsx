import Line from "../components/Line";
import { useEffect, useState } from "react";
import Delivery from "../API/delivery";
import { Container } from "@mui/system";
import MyTable from "../components/MyTable";
import FormFilter from "../components/formFilter";
import { THEAD } from "../constants";
import { useFilterData } from "../hooks/getFilterData";
import { filterFun } from "../utils";
import dayjs from "dayjs";

const Dashboard = () => {
  const [xAxis, SetXaxis] = useState([{ data: [] }]);
  const [series, SetSeries] = useState([{ data: [] }]);
  const [dataDelivery, setDataDelivery] = useState([]);
  const [filterDelivery, setFilterDelivery] = useState({
    date1: null,
    service: "",
    packageName: "",
    status: "",
  });

  useEffect(() => {
    async function fetchData() {
      const response = await Delivery.get_delivery_line();
      let x = [];
      let y = [];
      setDataDelivery(response.data.deliveries_list);
      response.data.line_data.forEach((val) => {
        const dt = dayjs(val["date_only"]);

        x.push(dt);
        y.push(val["count"]);
      });
      SetXaxis([{ data: x }]);
      SetSeries([{ data: y }]);
    }
    fetchData();
    console.log("effect ....");
  }, []);

  const filteredData = useFilterData(dataDelivery, filterDelivery);

  return (
    <div>
      <Container sx={{ mt: 5 }}>
        <Line xAxis={xAxis} series={series} />
        <FormFilter
          dataDelivery={dataDelivery}
          filterDelivery={filterDelivery}
          setFilterDelivery={setFilterDelivery}
        />

        <MyTable
          thead={THEAD}
          dataDelivery={filterFun(filterDelivery, filteredData, dataDelivery)}
        />
      </Container>
    </div>
  );
};

export default Dashboard;
