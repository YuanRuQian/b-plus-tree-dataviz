import React, { useRef, useState } from "react";
import useResizeObserver from "../utils/useResizeObserver";
import { hierarchy, tree as Tree, zoom, select, HierarchyPointNode } from "d3";
import { Graph, GraphNode, Layout } from "./type";
import Node from "./Node";
import Connector from "./Link";

type Props = {
  data: Graph;
};

export default function FatTree({ data }: Props) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const dimension = useResizeObserver(wrapperRef);
  const [selectedNode, setSelectedNode] =
    useState<HierarchyPointNode<GraphNode>>();
  const [selectedAncestors, setSelectedAncestors] =
    useState<HierarchyPointNode<GraphNode>[]>();

  const delta = React.useMemo(() => {
    if (dimension && data) {
      const _node = hierarchy(data);
      const margin = { top: 25, right: 150, bottom: 25, left: 150 };
      const innerWidth = dimension.width - margin.right - margin.left;
      const innerHeight = dimension.height - margin.top - margin.bottom;

      const treeLayout = Tree<GraphNode>().nodeSize([
        Layout.LENGTH_BETWEEN_CHILDREN,
        Layout.LENGTH_BETWEEN_PARENT_CHILD,
      ]);
      const tree = treeLayout(_node);

      const svg = select(svgRef.current);
      const content = svg
        .select(".content-wrapper")
        .attr(
          "transform",
          `translate(${margin.left}, ${dimension.height / 2})`,
        );

      // Specify the correct type for the zoom behavior
      const zoomBehavior = zoom().on("zoom", (e: any) => {
        content.attr("transform", e.transform);
      });

      // TODO: fix the type
      svg.call(zoomBehavior as any);

      return {
        tree,
        dimension,
        margin,
        innerHeight,
        innerWidth,
      };
    }
  }, [dimension, data]);

  const handleSelectedNode = (node: HierarchyPointNode<GraphNode>) => {
    setSelectedAncestors(node.ancestors());
    setSelectedNode(node);
  };

  const style = {
    width: "100%",
    height: "100%",
    overflow: "hidden",
  };

  // if only has one node ( NIL node ), it's an empty tree
  if (!data || JSON.stringify(data) === "{}") {
    return <div className="h-full" style={style} ref={wrapperRef}></div>;
  }

  // TODO: fix width & height resize
  return (
    <div className="h-full" style={style} ref={wrapperRef}>
      <svg ref={svgRef} width={1000} height={800}>
        <g className="content-wrapper">
          {delta?.tree
            ?.links()
            .map((link) => (
              <Connector
                key={`${link.source.data.name}-${link.target.data.name}-link`}
                link={link}
                selected={selectedNode}
                selectedAncestors={selectedAncestors}
              />
            ))}
          {delta?.tree
            ?.descendants()
            .map((node) => (
              <Node
                key={`${node.data.name}-node`}
                node={node}
                selected={selectedNode}
                onSelected={handleSelectedNode}
              />
            ))}
        </g>
      </svg>
    </div>
  );
}
