// import MyButton from "./UI/button/MyButton";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { AuthContext } from "../context";
import { useContext } from "react";

const Navbar = () => {
  const { setIsAuth } = useContext(AuthContext);
  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem("auth");
    localStorage.removeItem("access_token");
  };
  return (
    <AppBar position="static">
      <Toolbar sx={{ flex: 1, justifyContent: "space-between" }}>
        <Typography variant="h6" component="div">
          Deliveries
        </Typography>
        <Button color="inherit" onClick={logout}>
          Logaut
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
