import React from "react";
import { GraphNode, Layout } from "./type";

type Props = {
  node: d3.HierarchyPointNode<GraphNode>;
  selected?: d3.HierarchyPointNode<GraphNode>;
  onSelected(node: d3.HierarchyPointNode<GraphNode>): void;
};

const Node = ({ node, selected, onSelected }: Props) => {
  const handleClick = () => onSelected(node);

  const isSelected = selected?.data.name === node.data.name;

  return (
    <foreignObject
      onClick={handleClick}
      key={`${node.data.name}-foreign-object`}
      width={Layout.NODE_WIDTH}
      height={Layout.NODE_HEIGHT}
      x={node.x - Layout.NODE_WIDTH}
      y={node.y - Layout.NODE_HEIGHT / 2}
    >
      <div
        className={`fizz-node-${node.data.color} fizz-node ${
          isSelected ? "border-2 border-red-500 border-dashed" : ""
        } `}
      >
        {node.data.name}
      </div>
    </foreignObject>
  );
};

export default Node;
