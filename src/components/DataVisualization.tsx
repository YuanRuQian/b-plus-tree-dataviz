import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { TreeNodeJSON } from "../utils/RedBlackTreeNode";

type DataVisualizationProps = {
  redBlackTreeData: TreeNodeJSON | null;
};

const DataVisualization = ({ redBlackTreeData }: DataVisualizationProps) => {
  const treeContainerRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    console.log(`redBlackTreeData: ${JSON.stringify(redBlackTreeData)}`);

    if (!redBlackTreeData || JSON.stringify(redBlackTreeData) === "{}") {
      // If the data is null or empty, clear all the elements then return early
      d3.select(treeContainerRef.current).selectAll("*").remove();
      return;
    }

    // Create a tree layout
    const treeLayout = d3.tree<TreeNodeJSON>().size([400, 300]);

    // Create a hierarchy from the data
    const root = d3.hierarchy(
      redBlackTreeData,
    ) as d3.HierarchyNode<TreeNodeJSON>;

    // Compute the layout
    const treeRoot = treeLayout(root);

    // Select the SVG element
    const svg = d3.select(treeContainerRef.current);

    // Add links (edges) between nodes
    const links = svg
      .selectAll<SVGPathElement, d3.HierarchyPointLink<any>>(".link")
      .data(treeRoot.links());

    // Enter new links with smooth transitions
    links
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("fill", "none") // Set fill to none for the path elements
      .attr("stroke", "gray") // Set stroke color for the path elements
      .attr("strokeWidth", "5px")
      .attr(
        "d",
        d3
          .linkHorizontal<
            d3.HierarchyPointLink<any>,
            d3.HierarchyPointNode<any>
          >()
          .x((d) => d.x!)
          .y((d) => d.y!),
      )
      .merge(links) // Merge existing and new links
      .transition() // Apply a smooth transition
      .duration(1000) // Transition duration in milliseconds
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

    // Remove any links that are no longer in the data
    links.exit().remove();

    // Add nodes to the tree
    const nodes = svg
      .selectAll<SVGGElement, d3.HierarchyPointNode<any>>(".node")
      .data(treeRoot.descendants());

    // Enter new nodes with smooth transitions
    const enteredNodes = nodes
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.x},${d.y})`);

    // Append circles to the entered nodes and set their fill color based on the node data
    enteredNodes
      .append("circle")
      .attr("r", "1rem")
      .attr("fill", (d) => d.data.color); // Corrected color assignment

    // Append text labels to the entered nodes
    enteredNodes
      .append("text")
      .style("text-anchor", "start") // Set the text-anchor to "start" to align the text to the left
      .attr("fill", "black")
      .text((d) => d.data.name)
      .each(function (d) {
        const xTranslation = 30; // Change this value to adjust the horizontal position
        const yTranslation = 10;
        d3.select(this).attr(
          "transform",
          `translate(${xTranslation}, ${yTranslation})`,
        );
      });

    // Merge existing and new nodes, then apply a smooth transition
    const mergedNodes = enteredNodes.merge(nodes);

    // Update the fill color of existing nodes based on the node data
    mergedNodes
      .select("circle")
      .transition()
      .duration(1000)
      .attr("fill", (d) => d.data.color);

    // Update the text content of existing nodes based on the node data
    mergedNodes
      .select("text")
      .transition()
      .duration(1000)
      .text((d) => d.data.name)
      .each(function (d) {
        const xTranslation = 30; // Change this value to adjust the horizontal position
        const yTranslation = 10;
        d3.select(this).attr(
          "transform",
          `translate(${xTranslation}, ${yTranslation})`,
        );
      });

    mergedNodes
      .transition()
      .duration(1000)
      .attr("transform", (d) => `translate(${d.x},${d.y})`);

    // Remove any nodes that are no longer in the data
    nodes.exit().remove();
  }, [redBlackTreeData]);

  return (
    <div
      id="treeWrapper"
      style={{
        display: "flex",
        flexDirection: "column", // Align elements vertically
        justifyContent: "center", // Center horizontally
        alignItems: "center", // Center vertically
        height: "100vh",
        width: "100vw",
      }}
    >
      <svg ref={treeContainerRef} width="100%" height="100%"></svg>
    </div>
  );
};

export default DataVisualization;
