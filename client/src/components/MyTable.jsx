import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const MyTable = ({ thead, dataDelivery }) => {
  return (
    <TableContainer component={Paper} sx={{ mt: 5 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {thead.map((val) => (
              <TableCell>{val}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataDelivery?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>Доставка {item.id}</TableCell>
              <TableCell>
                {new Date(item.created_at).toLocaleDateString("ru-RU")}
              </TableCell>
              <TableCell>{item.number_model__name}</TableCell>
              <TableCell>{item.services}</TableCell>
              <TableCell>{item.distance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyTable;
