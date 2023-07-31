import React from "react";

// The usePrevious hook allows you to keep track of the previous value of a variable in a React component.

export default function usePrevious<T>(value: T) {
  const ref = React.useRef<T>();

  React.useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}
