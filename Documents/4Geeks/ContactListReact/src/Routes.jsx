import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import AddContact from "./pages/AddContact.jsx";
import { StoreProvider } from "./store.jsx";

function AppRoutes() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddContact />} />
        </Routes>
      </StoreProvider>
    </BrowserRouter>
  );
}

export default AppRoutes;

