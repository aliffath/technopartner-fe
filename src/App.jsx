import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./login";
import Home from "./home";
import Menu from "./menu";
import QrCode from "./qr-code";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/menu",
    element: <Menu />,
  },
  {
    path: "/qr-code",
    element: <QrCode />,
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
