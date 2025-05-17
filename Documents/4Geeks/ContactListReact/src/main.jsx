import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./Routes";


import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppRoutes />
    <ToastContainer position="top-right" autoClose={3000} />
  </React.StrictMode>
);