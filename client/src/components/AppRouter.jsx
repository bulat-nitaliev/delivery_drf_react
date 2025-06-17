import { useContext } from "react";
import { publicRouter, privateRouter } from "../router";
import { Route, Routes } from "react-router";
import { AuthContext } from "../context";

const AppRouter = () => {
  const { isAuth } = useContext(AuthContext);
  console.log(isAuth);
  
  return isAuth ? (
    <Routes>
      {privateRouter.map((r) => (
        <Route path={r.path} element={r.element} key={r.path} />
      ))}
    </Routes>
  ) : (
    <Routes>
      {publicRouter.map((r) => (
        <Route path={r.path} element={r.element} key={r.path} />
      ))}
    </Routes>
  );
};

export default AppRouter;
