// If you want your React projects to be scalable, 
// it’s a smart move to ditch App.jsx and App.css early. 
// They’re just starter “training wheels” from CRA/Vite templates, not a requirement.
// And do the routing inside a different component - MainLayout.jsx inside the Layouts folder.

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

//These are the modern method of importing routing components
//in Data Modeern React Router v7.9.3. So, do not change.
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import { Toaster } from "react-hot-toast";

import RootLayout from "./layouts/RootLayout.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AddTask from "./pages/AddTask.jsx";
import BrowseTasks from "./pages/BrowseTasks.jsx";
import TaskDetails from "./pages/TaskDetails.jsx";
import MyPostedTasks from "./pages/MyPostedTasks.jsx";
import UpdateTask from "./pages/UpdateTask.jsx";
import NotFound from "./pages/NotFound.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "add-task",
        element: <PrivateRoute><AddTask /></PrivateRoute>,
      },
      {
        path: "browse-tasks",
        element: <BrowseTasks />,
      },
      {
        path: "task/:id",
        element: <PrivateRoute><TaskDetails /></PrivateRoute>,
      },
      {
        path: "my-posted-tasks",
        element: <PrivateRoute><MyPostedTasks /></PrivateRoute>,
      },
      {
        path: "update-task/:id",
        element: <PrivateRoute><UpdateTask /></PrivateRoute>,
      },
    ],
  },
]);


// step 4: render the router object using RouterProvider component
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster position="bottom-right" />
    </AuthProvider>
  </StrictMode>
);
