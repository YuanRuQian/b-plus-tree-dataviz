import React, { useEffect, useRef, useState } from "react";
import Tree, {
  CustomNodeElementProps,
  RawNodeDatum,
  TreeLinkDatum,
} from "react-d3-tree";
import PureSvgNodeElement from "./PureSVGNode";
import { Typography } from "@mui/material";

type TreeChartProps = {
  redBlackTreeData: RawNodeDatum;
  transitionDuration: number;
};

const TreeChart = ({
  redBlackTreeData,
  transitionDuration,
}: TreeChartProps) => {
  const treeContainerRef = useRef<HTMLDivElement>(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setSize({ width: window.innerWidth, height: window.innerHeight });
    setTranslate({ x: window.innerWidth / 2, y: window.innerHeight / 4 });
  }, []);

  if (JSON.stringify(redBlackTreeData) === JSON.stringify({})) {
    return (
      <div
        style={{
          height: size.height * 0.8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" component="h6">
          🌲 An empty tree... Please insert some nodes! 🌲
        </Typography>
      </div>
    );
  }

  const renderCustomNodeElement = ({ nodeDatum }: CustomNodeElementProps) => (
    <PureSvgNodeElement nodeDatum={nodeDatum} orientation="vertical" />
  );

  const getDynamicPathClass = (link: TreeLinkDatum): string => {
    const { target } = link;

    if (target.data.attributes?.isDummyNode) {
      return "link__dummy";
    }

    if (target.data.attributes?.isOnFindPath) {
      return "link__highlighted";
    }

    return "link__default";
  };

  // TODO: proper transformation of tree data
  return (
    <div
      ref={treeContainerRef}
      style={{ width: size.width, height: size.height }}
    >
      <Tree
        orientation="vertical"
        enableLegacyTransitions
        transitionDuration={transitionDuration}
        translate={translate}
        data={redBlackTreeData}
        renderCustomNodeElement={renderCustomNodeElement}
        pathClassFunc={getDynamicPathClass}
      />
    </div>
  );
};

export default TreeChart;
