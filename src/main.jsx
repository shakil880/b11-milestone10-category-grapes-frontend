// If you want your React projects to be scalable, 
// it’s a smart move to ditch App.jsx and App.css early. 
// They’re just starter “training wheels” from CRA/Vite templates, not a requirement.
// And do the routing inside a different component - MainLayout.jsx inside the Layouts folder.

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// step 1: import react router/ react-router/dom modules
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

// step 3: import all the components while creating the route
import RootLayout from "./layouts/RootLayout.jsx";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/Login.jsx";


// step 2: create a router object
const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },      
      {
        path: "products",
        Component: Products,
      },
      {
        path: "products/:id",
        Component: ProductDetails,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "login",
        Component: Login,
      },
    ],
  },
]);


// step 4: render the router object using RouterProvider component
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
