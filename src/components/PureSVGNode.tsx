import React from "react";
import { TreeNodeDatum } from "react-d3-tree";

const textLayout = {
  vertical: {
    title: {
      textAnchor: "start",
      x: 40,
    },
    attributes: {},
    attribute: {
      x: 40,
      dy: "1.2em",
    },
  },
  horizontal: {
    title: {
      textAnchor: "start",
      y: 40,
    },
    attributes: {
      x: 0,
      y: 40,
    },
    attribute: {
      x: 0,
      dy: "1.2em",
    },
  },
};

type PureSvgNodeElementProps = {
  nodeDatum: TreeNodeDatum;
  orientation: keyof typeof textLayout;
};

const PureSvgNodeElement = ({
  nodeDatum,
  orientation,
}: PureSvgNodeElementProps) => {
  return (
    <>
      <circle
        fill={(nodeDatum?.attributes?.color as string) || "transparent"}
        r={20}
      ></circle>
      <g className="rd3t-label">
        <text className="rd3t-label__title" {...textLayout[orientation].title}>
          {nodeDatum.name}
        </text>
      </g>
    </>
  );
};

export default PureSvgNodeElement;
