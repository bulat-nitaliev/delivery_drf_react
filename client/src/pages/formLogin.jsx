import {
  TextField,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import AuthService from "../API";
import { useContext, useState } from "react";
import { AuthContext } from "../context";

const FormLogin = () => {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const { setIsAuth } = useContext(AuthContext);
  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await AuthService.login(loginData);
      localStorage.setItem("token", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      localStorage.setItem("auth", "true");
      setIsAuth(true);

      setLoginData({ username: "", password: "" });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <Box sx={{ maxWidth: "50%", mx: "auto", mt: 10 }}>
        <Card variant="outlined">
          <CardContent sx={{ width: "70%", mx: "auto" }}>
            <Typography variant="h5">войти на сайт</Typography>
            <TextField
              type="text"
              placeholder="username"
              value={loginData.username}
              fullWidth
              variant="outlined"
              margin="dense"
              onChange={(e) =>
                setLoginData({ ...loginData, username: e.target.value })
              }
            />
            <TextField
              type="password"
              placeholder="password"
              variant="outlined"
              fullWidth
              margin="dense"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
            <CardActions>
              <Button onClick={login} variant="outlined">
                Войти
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default FormLogin;
