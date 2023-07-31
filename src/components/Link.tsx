import React from "react";
import { GraphNode } from "./type";
import { HierarchyLink, HierarchyPointLink, linkHorizontal } from "d3";

type Props = {
  link: HierarchyPointLink<GraphNode>;
  selected?: d3.HierarchyPointNode<GraphNode>;
  selectedAncestors?: d3.HierarchyPointNode<GraphNode>[];
};

// TODO: Fix the type of linkGenerator
const linkGenerator = linkHorizontal<HierarchyLink<GraphNode>, GraphNode>()
  .x((node) => node.x || 0)
  .y((node) => node.y || 0);

const Link = ({ link, selected, selectedAncestors }: Props) => {
  const isHot = selectedAncestors?.some(
    (v) => v.data.name === link.target.data.name,
  );
  return (
    <path
      d={linkGenerator(link) || undefined}
      fill="none"
      stroke={`${isHot ? "red" : "gray"}`}
      strokeWidth={isHot ? 2 : 1}
    />
  );
};

export default Link;
