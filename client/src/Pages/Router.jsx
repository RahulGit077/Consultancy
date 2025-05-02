import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // no BrowserRouter here!

import Dashboard from "./Dashboard";
import Configuration from "./Configuration";
import AddModules from "./AddModules";
import EditModules from "./EditModules";
import Billing from "./Billing";
import BillingHistory from "./BillingHistory";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/history" element={<BillingHistory />} />
      <Route path="/configuration" element={<Configuration />} />
      <Route path="/add-module" element={<AddModules />} />
      <Route path="/edit-module" element={<EditModules />} />
      <Route path="/billing" element={<Billing />} />

      {/* Catch-all: if no route matched, go to dashboard */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default Router;
