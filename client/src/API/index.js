import axios from "axios";

export default class AuthService {
  static async login({ username, password }) {
    const response = await axios.post("http://localhost:8000/api/token/", {
      username,
      password,
    });
    return response;
  }
}
