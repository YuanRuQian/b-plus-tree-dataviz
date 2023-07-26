import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

// TODO: this is a placeholder for the data visualization component.

type DataItem = {
  label: string;
  value: number;
};

const generateData = (): DataItem[] => {
  // Generate some random data for the pie chart
  const data: DataItem[] = [
    { label: "Category 1", value: Math.random() * 100 },
    { label: "Category 2", value: Math.random() * 100 },
    { label: "Category 3", value: Math.random() * 100 },
    { label: "Category 4", value: Math.random() * 100 },
    { label: "Category 5", value: Math.random() * 100 },
  ];
  return data;
};

const DataVisualization = () => {
  const data = generateData();
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = 500;
    const height = 500;
    const radius = Math.min(width, height) / 2;
    const color = d3
      .scaleOrdinal<string>()
      .domain(data.map((d) => d.label))
      .range(d3.schemeCategory10);

    const pie = d3.pie<DataItem>().value((d) => d.value);

    const arc = d3
      .arc<d3.PieArcDatum<DataItem>>()
      .innerRadius(0)
      .outerRadius(radius);

    const arcs = pie(data);

    svg.attr("width", width).attr("height", height);

    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const arcGroup = g
      .selectAll<SVGGElement, d3.PieArcDatum<DataItem>>(".arc") // Specify the type for the 'd' argument
      .data(arcs)
      .enter()
      .append("g")
      .attr("class", "arc");

    arcGroup
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.label))
      .attr("stroke", "white");

    arcGroup
      .append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("dy", "0.35em")
      .text((d) => d.data.label)
      .style("text-anchor", "middle")
      .style("font-size", "12px");
  }, [data]);

  return (
    <svg
      ref={svgRef}
      style={{
        height: 500,
        width: "100%",
        marginRight: "0px",
        marginLeft: "0px",
      }}
    />
  );
};

export default DataVisualization;
