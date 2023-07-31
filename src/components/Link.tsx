import React from "react";
import { GraphNode } from "./type";
import { HierarchyLink, HierarchyPointLink, linkHorizontal } from "d3";

type Props = {
  link: HierarchyPointLink<GraphNode>;
  isTargetNodeOnFindPath?: boolean;
};

// TODO: Fix the type of linkGenerator
const linkGenerator = linkHorizontal<HierarchyLink<GraphNode>, GraphNode>()
  .x((node) => node.x || 0)
  .y((node) => node.y || 0);

const Link = ({ link, isTargetNodeOnFindPath }: Props) => {
  return (
    <path
      d={linkGenerator(link) || undefined}
      fill="none"
      stroke={`${isTargetNodeOnFindPath ? "red" : "gray"}`}
      strokeWidth={isTargetNodeOnFindPath ? 5 : 2}
    />
  );
};

export default Link;
