import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Configuration from "./Configuration";
import AddModules from "./AddModules";
import EditModules from "./EditModules";
import Billing from "./Billing";
import BillingHistory from "./BillingHistory";


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<BillingHistory />} />
        <Route path="/configuration" element={<Configuration />} />
        <Route path="/add-module" element={<AddModules />} />
        <Route path="/edit-module" element={<EditModules />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
        <Route path="/billing" element={<Billing />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
