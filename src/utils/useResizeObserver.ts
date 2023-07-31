import React from "react";
import ResizeObserver from "resize-observer-polyfill";

export type Dimension = {
  width: number;
  height: number;
};

const useResizeObserver = (ref: any) => {
  const [dimensions, setDimensions] = React.useState<Dimension | null>(null);

  React.useEffect(() => {
    const observeTarget = ref.current;
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setDimensions(entry.contentRect);
      });
    });

    resizeObserver.observe(observeTarget);

    return () => {
      resizeObserver.unobserve(observeTarget);
    };
  }, [ref]);
  return dimensions;
};

export default useResizeObserver;
