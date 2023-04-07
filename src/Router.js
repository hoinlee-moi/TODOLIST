import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Main from "./pages/Main";
import NoMatch from "./pages/NoMatch";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Todo from "./pages/Todo";

const Router = () => {
  const router = createBrowserRouter([
    { path: "/", element: <Main /> },
    {
      path: "/signup",
      element: <Signup />,
    },
    { path: "/signin", element: <Signin /> },
    {
      path: "/todo",
      element: <Todo />,
    },{
        path: "*",
        element: <NoMatch />
    }
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
