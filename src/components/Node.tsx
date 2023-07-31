import React from "react";
import { GraphNode, Layout } from "./type";

type Props = {
  node: d3.HierarchyPointNode<GraphNode>;
};

const Node = ({ node }: Props) => {
  return (
    <foreignObject
      key={`${node.data.name}-foreign-object`}
      width={Layout.NODE_WIDTH}
      height={Layout.NODE_HEIGHT}
      x={node.x - Layout.NODE_WIDTH / 2}
      y={node.y - Layout.NODE_HEIGHT / 2}
    >
      <div
        className={`fizz-node-${node.data.color} fizz-node
        } `}
      >
        {node.data.name}
      </div>
    </foreignObject>
  );
};

export default Node;
