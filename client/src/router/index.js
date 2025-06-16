import Dashboard from "../pages/Dashboard";
import FormLogin from "../pages/formLogin";

export const privateRouter = [
  { path: "/dashboard", element: <Dashboard /> },
  { path: "*", element: <Dashboard /> },
];

export const publicRouter = [
  { path: "/login", element: <FormLogin /> },
  { path: "*", element: <FormLogin /> },
];
