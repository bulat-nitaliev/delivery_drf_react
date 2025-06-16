import axios from "axios";

export default class Delivery {
  static async get_delivery_line() {
    const response = await axios.get("http://localhost:8000/api/deliveries_list/");
    return response;
  }
}
