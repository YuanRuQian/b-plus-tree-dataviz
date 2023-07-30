import React, { useContext, useState } from "react";
import AppBar from "./AppBar";
import DataVisualization from "./DataVisualization";
import { TreeNodeJSON } from "../utils/Node";
import { RedBlackTreeContext } from "../context/RedBlackTreeContext";
import { isNull } from "../utils/utils";

const ControlPanel = () => {
  const context = useContext(RedBlackTreeContext);

  const [redBlackTreeData, setRedBlackTreeData] = useState<TreeNodeJSON>({} as TreeNodeJSON);

  const handleInsert = (value: number) => {
    if (!isNull(context)) {
      context.redBlackTree.insert(value);
      setRedBlackTreeData(context.redBlackTree.getInOrderTraversalPath() || {} as TreeNodeJSON);
    }
  };

  const handleDelete = (value: number) => {
    if (!isNull(context)) {
      context.redBlackTree.delete(value);
      setRedBlackTreeData(context.redBlackTree.getInOrderTraversalPath() || {} as TreeNodeJSON);
    }
  }

  const handleFind = (value: number) => {
    if (!isNull(context)) {
      context.redBlackTree.find(value);

      // TODO: do something with the result of find
    }
  }

  const handleClearAll = () => {
    if (!isNull(context)) {
      context.redBlackTree.clear();
      setRedBlackTreeData(context.redBlackTree.getInOrderTraversalPath() || {} as TreeNodeJSON);
    }
  }


  return (
    <div>
      <AppBar
        handleInsert={handleInsert}
        handleDelete={handleDelete}
        handleFind={handleFind}
        handleClearAll={handleClearAll}
      />
      <DataVisualization redBlackTreeData={redBlackTreeData} />
    </div>
  );
};

export default ControlPanel;
