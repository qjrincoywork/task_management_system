import {Navigate, createBrowserRouter} from "react-router-dom";
import Login from "./views/login.jsx";
import Register from "./views/Register.jsx";
import Tasks from "./views/Tasks.jsx";
import NotFound from "./views/NotFound.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout/>,
    children: [
      {
        path: '/',
        element: <Navigate to="/tasks"/>
      },
      {
        path: '/tasks',
        element: <Tasks/>
      },
    ]
  },
  {
    path: '/',
    element: <GuestLayout/>,
    children: [
      {
        path: '/',
        element: <Navigate to="/login"/>
      },
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/register',
        element: <Register/>
      },
    ]
  },
  {
    path: '*',
    element: <NotFound/>
  },
])

export default router;
