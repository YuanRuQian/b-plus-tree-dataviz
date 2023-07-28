import React from "react";
import Tree from "react-d3-tree";

// TODO: Replace with actual tree data visualization

const bPlusTreeData = {
  name: "Root",
  children: [
    {
      name: "6",
      children: [{ name: "1" }, { name: "4" }, { name: "5" }],
    },
    {
      name: "10",
      children: [{ name: "7" }, { name: "8" }, { name: "9" }],
    },
    {
      name: "14",
      children: [{ name: "11" }, { name: "12" }, { name: "13" }],
    },
    {
      name: "16",
      children: [{ name: "15" }],
    },
  ],
};

const DataVisualization = () => {
  return (
    <div
      id="treeWrapper"
      style={{
        display: "flex",
        justifyContent: "center", // Center horizontally
        alignItems: "center", // Center vertically
        height: "100vh",
        width: "100vw",
      }}
    >
      <Tree
        orientation="vertical"
        translate={{ x: 300, y: 50 }}
        data={bPlusTreeData}
      />
    </div>
  );
};

export default DataVisualization;
