import React, { useState } from "react";
import AppBar from "./AppBar";
import DataVisualization from "./DataVisualization";

const ControlPanel = () => {
  const [insertValue, setInsertValue] = useState<number>();
  const [deleteValue, setDeleteValue] = useState<number>();
  const [findValue, setFindValue] = useState<number>();

  // Handle changes in input fields and convert the input to a number
  const setInsertValueHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = parseInt(event.target.value, 10);
    setInsertValue(newValue);
  };

  const setDeleteValueHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = parseInt(event.target.value, 10);
    setDeleteValue(newValue);
  };

  const setFindValueHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    setFindValue(newValue);
  };

  return (
    <div>
      <AppBar
        insertValue={insertValue}
        deleteValue={deleteValue}
        findValue={findValue}
        setInsertValue={setInsertValueHandler}
        setDeleteValue={setDeleteValueHandler}
        setFindValue={setFindValueHandler}
        handleInsert={() => console.log("Insert")}
        handleDelete={() => console.log("Delete")}
        handleFind={() => console.log("Find")}
        handleClearAll={() => console.log("Clear All")}
      />

      {/* B+ tree visualization here */}
      {/* Add your B+ tree visualization code here */}
      <DataVisualization />
    </div>
  );
};

export default ControlPanel;
