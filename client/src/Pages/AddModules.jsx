import React, { useState } from "react";
import { useModuleContext } from "../Context/ModuleContext";
import { useNavigate } from "react-router-dom";

const AddModules = () => {
  const [moduleName, setModuleName] = useState("");
  const [fields, setFields] = useState([{ name: "", value: [] }]);
  const { addModule } = useModuleContext();
  const navigate = useNavigate();

  const handleModuleNameChange = (e) => {
    setModuleName(e.target.value);
  };

  const handleFieldChange = (e, index) => {
    const newFields = [...fields];
    newFields[index].name = e.target.value;
    setFields(newFields);
  };

  const addField = () => {
    setFields([...fields, { name: "", value: [] }]);
  };

  const removeField = (index) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addModule({
      moduleName,
      fields: fields.filter((field) => field.name !== ""),
    });
    navigate("/configuration");
  };

  return (
    <div className="AddModules d-flex flex-column flex-grow-1">
      <div className="header d-flex justify-content-center align-items-center">
        Add Modules
      </div>
      <div className="d-flex flex-column">
        <div className="module-name-container">
          <label htmlFor="module-name">Module Name</label>
          <input
            type="text"
            id="module-name"
            value={moduleName}
            onChange={handleModuleNameChange}
            placeholder="Enter Module Name"
          />
        </div>
        {fields.map((field, index) => (
          <div key={index} className="field-container">
            <label htmlFor={`field-name-${index}`}>
              Field Name {index + 1}
            </label>
            <input
              type="text"
              id={`field-name-${index}`}
              value={field.name}
              onChange={(e) => handleFieldChange(e, index)}
              placeholder="Enter Field Name"
            />
            <button onClick={() => removeField(index)}>Remove</button>
          </div>
        ))}
        <span onClick={addField}>
          <i className="fa fa-plus"></i> Add field
        </span>
        <form onSubmit={handleSubmit}>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddModules;
