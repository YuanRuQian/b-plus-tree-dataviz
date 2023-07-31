import React, { useRef } from "react";
import useResizeObserver from "../utils/useResizeObserver";
import { hierarchy, tree as Tree, zoom, select } from "d3";
import { Graph, GraphNode, Layout } from "./type";
import Node from "./Node";
import Link from "./Link";

type Props = {
  data: Graph;
};

export default function FatTree({ data }: Props) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const dimension = useResizeObserver(wrapperRef);

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

  // if only has one node ( NIL node ), it's an empty tree
  if (!data || JSON.stringify(data) === "{}") {
    return <div className="height-width-full-parent" ref={wrapperRef}></div>;
  }

  // TODO: fix width & height resize, make svg full screen
  return (
    <div className="height-width-full-parent" ref={wrapperRef}>
      <svg
        ref={svgRef}
        width={800} // Set the width to 100% of the parent container
        height={800} // Set the height to 100% of the parent container
      >
        <g className="content-wrapper">
          {delta?.tree
            ?.links()
            .map((link) => (
              <Link
                key={`${link.source.data.name}-${link.target.data.name}-link`}
                link={link}
                isTargetNodeOnFindPath={link.target.data.isOnFindPath}
              />
            ))}
          {delta?.tree
            ?.descendants()
            .map((node) => <Node key={`${node.data.name}-node`} node={node} />)}
        </g>
      </svg>
    </div>
  );
}
