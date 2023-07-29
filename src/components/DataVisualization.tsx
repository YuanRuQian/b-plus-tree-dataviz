import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { TreeNodeJSON } from "../utils/Node";

type DataVisualizationProps = {
  redBlackTreeData: TreeNodeJSON | null;
};

const DataVisualization = ({ redBlackTreeData }: DataVisualizationProps) => {

  console.log(`redBlackTreeData: ${JSON.stringify(redBlackTreeData)}`)

  const treeContainerRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    
    if (!redBlackTreeData || JSON.stringify(redBlackTreeData) === '{}') {
      // first clear all the elements then return early
      d3.select(treeContainerRef.current).selectAll("*").remove();
      return;
    }

    // Create a tree layout
    const treeLayout = d3.tree<TreeNodeJSON>().size([400, 300]);

    // Create a hierarchy from the data
    const root = d3.hierarchy(redBlackTreeData) as d3.HierarchyNode<TreeNodeJSON>;

    // Compute the layout
    const treeRoot = treeLayout(root);

    // Remove the old tree by cleaning up the SVG container
    d3.select(treeContainerRef.current).selectAll("*").remove();

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
      .attr("r", '1rem') // Set the radius of the circles
      .attr("fill", (d) => d.data.color); // Customize the fill color based on the "color" property

    // Add text labels for nodes
    nodes
      .append("text")
      .style("text-anchor", "middle") // Center the text horizontally
      .attr("fill", "white") // Set the text color to white
      .text((d) => d.data.name)
      .each(function (d) {
        // Get the bounding box of the text element
        const bbox = this.getBBox();
        // Calculate the translation to center the text within the circle
        const xTranslation = -bbox.width / 4;
        const yTranslation = bbox.height / 4; // Adjust the vertical position as needed
        d3.select(this).attr("transform", `translate(${xTranslation}, ${yTranslation})`);
      });

  }, [redBlackTreeData]);

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
