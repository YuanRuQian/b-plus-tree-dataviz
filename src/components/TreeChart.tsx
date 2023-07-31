import React from "react";
import Tree, { CustomNodeElementProps, RawNodeDatum } from "react-d3-tree";
import PureSvgNodeElement from "./PureSVGNode";

type TreeChartProps = {
  redBlackTreeData: RawNodeDatum;
};

const TreeChart = ({ redBlackTreeData }: TreeChartProps) => {
  if (JSON.stringify(redBlackTreeData) === JSON.stringify({})) return <></>;

  const renderCustomNodeElement = ({ nodeDatum }: CustomNodeElementProps) => (
    <PureSvgNodeElement nodeDatum={nodeDatum} orientation="vertical" />
  );

  // TODO: proper transformation of tree data
  return (
    <Tree
      data={redBlackTreeData}
      renderCustomNodeElement={renderCustomNodeElement}
    />
  );
};

export default TreeChart;
