import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SideBar from "./Components/SideBar";
import Router from "./Pages/Router";
import { ModuleProvider } from "./Context/ModuleContext";

function App() {
  return (
    <div className="d-flex">
      <SideBar />
      <ModuleProvider>
        <Router />
      </ModuleProvider>
    </div>
  );
}

export default App;
