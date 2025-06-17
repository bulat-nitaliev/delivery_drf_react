import { useEffect, useState } from "react";
import "./App.css";
import AppRouter from "./components/AppRouter";
import { BrowserRouter } from "react-router";
import { AuthContext } from "./context";
import Navbar from "./components/navbar";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from "@mui/material";



function App() {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("auth")) {
      setIsAuth(true);
    }
  }, []);
  const theme = createTheme({
    palette: {
      mode: 'dark', // переключатель режима (light/dark)
      primary: {
        main: '#1976d2', // основной синий цвет
      },
      secondary: {
        main: '#f50057', // вторичный красный цвет
      },
      background: {
        paper: '#424242', // фон карточек и панелей
        default: '#303030' // общий фон страницы
      },
    },
  });
  return (
    <div className="App">
      <AuthContext.Provider value={{ isAuth, setIsAuth }}>
        <ThemeProvider theme={theme}>
      <CssBaseline /> {/* применение базовых стилей Material UI */}
      <BrowserRouter>
          <Navbar />
          <AppRouter />
        </BrowserRouter>
    </ThemeProvider>
      </AuthContext.Provider>
      
    </div>
  );
}

export default App;
