import React from "react";
import { GraphNode } from "./type";
import { HierarchyLink, HierarchyPointLink, linkHorizontal } from "d3";

type Props = {
  link: HierarchyPointLink<GraphNode>;
  selected?: d3.HierarchyPointNode<GraphNode>;
  isTargetNodeOnFindPath?: boolean;
  selectedAncestors?: d3.HierarchyPointNode<GraphNode>[];
};

// TODO: Fix the type of linkGenerator
const linkGenerator = linkHorizontal<HierarchyLink<GraphNode>, GraphNode>()
  .x((node) => node.x || 0)
  .y((node) => node.y || 0);

const Link = ({
  link,
  selected,
  isTargetNodeOnFindPath,
  selectedAncestors,
}: Props) => {
  const shouldHighlight =
    selectedAncestors?.some((v) => v.data.name === link.target.data.name) ||
    isTargetNodeOnFindPath;

  return (
    <path
      d={linkGenerator(link) || undefined}
      fill="none"
      stroke={`${shouldHighlight ? "red" : "gray"}`}
      strokeWidth={shouldHighlight ? 5 : 2}
    />
  );
};

export default Link;
