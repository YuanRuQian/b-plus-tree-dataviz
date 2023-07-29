import React, { useContext, useState } from "react";
import AppBar from "./AppBar";
import DataVisualization from "./DataVisualization";
import { TreeNodeJSON } from "../utils/Node";
import { RedBlackTreeContext } from "../context/RedBlackTreeContext";
import { isNull, isUndefined } from "../utils/utils";

const ControlPanel = () => {
  const context = useContext(RedBlackTreeContext);

  const [insertValue, setInsertValue] = useState<number>();
  const [deleteValue, setDeleteValue] = useState<number>();
  const [findValue, setFindValue] = useState<number>();
  const [redBlackTreeData, setRedBlackTreeData] = useState<TreeNodeJSON>({} as TreeNodeJSON);

  const setInsertValueHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = parseFloat(event.target.value);
    setInsertValue(newValue);
  };

  const setDeleteValueHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = parseFloat(event.target.value);
    setDeleteValue(newValue);
  };

  const setFindValueHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);
    setFindValue(newValue);
  };

  const handleInsert = () => {
    if(!isUndefined(insertValue) && !isNull(context)) {
      context.redBlackTree.insert(insertValue);
      console.log(`Inserted: ${insertValue}`);

      // clear the input field
      setInsertValue(undefined);

      // update the red black tree data source
      setRedBlackTreeData(context.redBlackTree.getInOrderTraversalPath() || {} as TreeNodeJSON);
    }
  }

  const handleDelete = () => {
    if(!isUndefined(deleteValue) && !isNull(context)) {
      context.redBlackTree.delete(deleteValue);
      console.log(`Deleted: ${deleteValue}`);

      // clear the input field
      setDeleteValue(undefined);

      // update the red black tree data source
      setRedBlackTreeData(context.redBlackTree.getInOrderTraversalPath() || {} as TreeNodeJSON);
    }
  }

  const handleFind = () => {
    if(!isUndefined(findValue) && !isNull(context)) {
      const res = context.redBlackTree.find(findValue);
      console.log(res ? `Found: ${findValue}` : `Not found: ${findValue}`);

      // clear the input field
      setFindValue(undefined);
    }
  }

  const handleClearAll = () => {
    if(!isNull(context)) {
      context.redBlackTree.clear();
      console.log("Cleared");

      // update the red black tree data source
      setRedBlackTreeData(context.redBlackTree.getInOrderTraversalPath() || {} as TreeNodeJSON);
    }
  }

  return (
    <div>
      <AppBar
        insertValue={insertValue}
        deleteValue={deleteValue}
        findValue={findValue}
        setInsertValue={setInsertValueHandler}
        setDeleteValue={setDeleteValueHandler}
        setFindValue={setFindValueHandler}
        handleInsert={handleInsert}
        handleDelete={handleDelete}
        handleFind={handleFind}
        handleClearAll={handleClearAll}
      />

      {/* B+ tree visualization here */}
      {/* Add your B+ tree visualization code here */}
      <DataVisualization redBlackTreeData={redBlackTreeData} />
    </div>
  );
};

export default ControlPanel;
