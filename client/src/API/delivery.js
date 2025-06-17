import $api from "./http";

export default class Delivery {
  static async get_delivery_line() {
    const response = await $api.get("/api/deliveries_list/");
    return response;
  }
}
