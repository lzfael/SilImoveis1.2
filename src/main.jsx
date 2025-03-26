import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ControlLayout } from "./pages/ControlLayout.jsx";
import { PropertyDetails } from "./pages/PropertyDetails.jsx";
import { ContactPage } from "./pages/ContactPage.jsx";
import { LoginPage }from "./pages/LoginPage.jsx";
import { ControlHome } from "./components/ControlHome.jsx";
import { ControlManipulate } from "./components/ControlManipulate.jsx";
import { NotFound } from "./pages/NotFound.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import { App } from "./App.jsx";
import "./index.css";
import { ControlEdit } from "./components/ControlEdit.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/details/:id",
    element: <PropertyDetails />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/control",
    element: <ProtectedRoute> 
                <ControlLayout /> 
              </ProtectedRoute>, 
    children: [
      {
        index: true,
        element: <ControlHome />,
      },
      {
        path: "manipulate", 
        element: <ControlManipulate />,
      },
      {
        path: "/control/edit/:id", // Nova rota para edição
        element: <ControlEdit />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);