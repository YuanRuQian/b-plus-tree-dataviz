import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { TreeNodeJSON } from "../utils/Node";

type DataVisualizationProps = {
  redBlackTreeData: TreeNodeJSON;
};

const DataVisualization = ({ redBlackTreeData }: DataVisualizationProps) => {
  const treeContainerRef = useRef(null);

  useEffect(() => {
    // Create a tree layout
    const treeLayout = d3
      .tree<{ name: string; color: string; children: any[] }>()
      .size([400, 300]);

    // Create a hierarchy from the data
    const root = d3.hierarchy(redBlackTreeData) as d3.HierarchyNode<{
      name: string;
      color: string;
      children: any[];
    }>;

    // Compute the layout
    const treeRoot = treeLayout(root);

    // Create an SVG group to contain the tree
    const svg = d3.select(treeContainerRef.current);
    const treeGroup = svg.append("g").attr("transform", "translate(100, 50)");

    // Add links (edges) between nodes
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const links = treeGroup
      .selectAll<SVGPathElement, d3.HierarchyPointLink<any>>(".link")
      .data(treeRoot.links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr(
        "d",
        d3
          .linkHorizontal<
            d3.HierarchyPointLink<any>,
            d3.HierarchyPointNode<any>
          >()
          .x((d) => d.x!)
          .y((d) => d.y!),
      );

    // Add nodes to the tree
    const nodes = treeGroup
      .selectAll<SVGGElement, d3.HierarchyPointNode<any>>(".node")
      .data(treeRoot.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.x},${d.y})`);

    // Add circles as node elements
    nodes
      .append("circle")
      .attr("r", 10) // Set the radius of the circles
      .attr("fill", (d) => d.data.color); // Customize the fill color based on the "color" property

    // Add text labels for nodes
    nodes
      .append("text")
      .attr("dy", 4)
      .attr("x", (d) => (d.children ? -15 : 15)) // Adjust the label position based on children existence
      .style("text-anchor", (d) => (d.children ? "end" : "start"))
      .text((d) => d.data.name);
  }, []);

  return (
    <div
      id="treeWrapper"
      style={{
        display: "flex",
        justifyContent: "center", // Center horizontally
        alignItems: "center", // Center vertically
        height: "100vh",
        width: "100vw",
      }}
    >
      <svg ref={treeContainerRef} width="600" height="400"></svg>
    </div>
  );
};

export default DataVisualization;
