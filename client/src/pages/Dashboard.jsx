import Line from "../components/Line";
import { useEffect, useState } from "react";
import Delivery from "../API/delivery";

import { Container } from "@mui/system";
import MyTable from "../components/MyTable";
import FirstComponent from "../components/DateRange";

const Dashboard = () => {
  const [xAxis, SetXaxis] = useState([{ data: [] }]);
  const [series, SetSeries] = useState([{ data: [] }]);
  const [dataDelivery, setDataDelivery] = useState(null);
  const [filterDelivery, setFilterDelivery] = useState({
    date1: null,
    date2: null,
  });
  // const [date1, setDate1] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await Delivery.get_delivery_line();
      let x = [];
      let y = [];
      setDataDelivery(response.data.deliveries_list);
      response.data.line_data.forEach((val) => {
        const dt = new Date(val["date_only"]);

        x.push(dt);
        y.push(val["count"]);
      });
      SetXaxis([{ data: x }]);
      SetSeries([{ data: y }]);
    }
    fetchData();
    console.log("effect ....");
  }, []);

  const thead = ["Итого", "Дата доставки", "Модель ТС", "Услуга", "Дистанция"];

  useEffect(() => {
    const readDate = () => {
      console.log(filterDelivery);
    };
    readDate();
  }, [filterDelivery]);

  return (
    <div>
      <Container sx={{ mt: 5 }}>
        <div>
          <FirstComponent
            value={filterDelivery.date1}
            onChange={(e) => setFilterDelivery({ ...filterDelivery, date1: e })}
          />
          <FirstComponent />
        </div>

        <Line xAxis={xAxis} series={series} />
        <MyTable thead={thead} dataDelivery={dataDelivery} />
      </Container>
    </div>
  );
};

export default Dashboard;
