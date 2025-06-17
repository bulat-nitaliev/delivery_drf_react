
import $api from "./http";

export default class AuthService {
  static async login({ username, password }) {
    const response = await $api.post("/api/token/", {
      username,
      password,
    });
    return response;
  }
}
