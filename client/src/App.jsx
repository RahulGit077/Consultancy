import SideBar from "./Components/SideBar";
import Router from "./Pages/Router";
import { ModuleProvider } from "./Context/ModuleContext";
import "./App.css";

function App() {
  return (
    <div className="d-flex">
      <div className="sidebar-fixed">
        <SideBar />
      </div>

      <div className="main-content">
        <ModuleProvider>
          <Router />
        </ModuleProvider>
      </div>
    </div>
  );
}

export default App;
