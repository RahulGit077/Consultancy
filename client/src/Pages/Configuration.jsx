import React from "react";
import { useModuleContext } from "../Context/ModuleContext";
import { useNavigate } from "react-router-dom";

const Configuration = () => {
  const { modules, removeModule } = useModuleContext();
  const navigate = useNavigate();
  return (
    <div className=" d-flex flex-grow-1 flex-column">
      <div className="header ">Configuration</div>
      <div className="d-flex flex-grow-1 flex-column">
        <div
          className="add-new"
          onClick={() => {
            navigate("/add-module");
          }}
        >
          <span>
            <i className="fa fa-plus"></i> Add New
          </span>
        </div>
        <div className="d-flex flex-wrap ">
          {modules.map((module, index) => (
            <div key={index} className="module-card d-flex flex-column m-2">
              <div>
                <h5>{module.moduleName}</h5>
                <p>Total Fields : {module.fields ? module.fields.length : 0}</p>
              </div>
              <div className="d-flex justify-content-around">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    navigate(`/edit-module?name=${module.moduleName}`);
                  }}
                >
                  <i className="fa fa-pencil" aria-hidden="true"></i>
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    removeModule(module);
                    console.log("delete module", module);
                  }}
                >
                  <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Configuration;
