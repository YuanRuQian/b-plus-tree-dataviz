import React from "react";
import Tree, {
  CustomNodeElementProps,
  RawNodeDatum,
  TreeLinkDatum,
} from "react-d3-tree";
import PureSvgNodeElement from "./PureSVGNode";

type TreeChartProps = {
  redBlackTreeData: RawNodeDatum;
};

const TreeChart = ({ redBlackTreeData }: TreeChartProps) => {
  if (JSON.stringify(redBlackTreeData) === JSON.stringify({})) return <></>;

  const renderCustomNodeElement = ({ nodeDatum }: CustomNodeElementProps) => (
    <PureSvgNodeElement nodeDatum={nodeDatum} orientation="vertical" />
  );

  const getDynamicPathClass = (link: TreeLinkDatum): string => {
    const { target } = link;

    if (target.data.attributes?.isOnFindPath) {
      return "link__highlighted";
    }

    return "link__default";
  };

  // TODO: proper transformation of tree data
  return (
    <Tree
      orientation="vertical"
      data={redBlackTreeData}
      renderCustomNodeElement={renderCustomNodeElement}
      pathClassFunc={getDynamicPathClass}
    />
  );
};

export default TreeChart;
