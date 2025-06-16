import { useEffect, useState } from "react";
import "./App.css";
import AppRouter from "./components/AppRouter";
import { BrowserRouter } from "react-router";
import { AuthContext } from "./context";
import Navbar from "./components/navbar";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("auth")) {
      setIsAuth(true);
    }
  }, []);
  return (
    <div className="App">
      <AuthContext.Provider value={{ isAuth, setIsAuth }}>
        <BrowserRouter>
          <Navbar />
          <AppRouter />
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
