import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Main from "./pages/Main";
import NoMatch from "./pages/NoMatch";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Todo from "./pages/Todo";

const Router = () => {
  const router = createBrowserRouter([
    { path: "/", element: <Main /> },
    {
      path: "/signup",
      element: <SignUp />,
    },
    { path: "/signin", element: <SignIn /> },
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
