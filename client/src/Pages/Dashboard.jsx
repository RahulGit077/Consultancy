import React from "react";
import { useModuleContext } from "../Context/ModuleContext";

const Dashboard = () => {
  const { modules } = useModuleContext();
  return (
    <div className=" d-flex flex-grow-1 flex-column">
      <div className="header ">DashBoard</div>
      <div>
        {modules.length > 0 ? (
          <div className="d-flex flex-wrap">
            {modules.map((module, index) => (
              <div key={index} className="module-card d-flex flex-column m-2">
                <ul>
                  {Object.keys(module).map((key) => (
                    <li key={key}>{`${key}: ${module[key]}`}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div className="d-flex flex-grow-1 justify-content-center align-items-center">
            <h1>No Modules Available</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
