import { Typography } from "@mui/joy";
import React, { useEffect, useRef, useState } from "react";

const Text = () => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(null);
  const [containerHeight, setContainerHeight] = useState(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        setContainerWidth(width);
        setContainerHeight(height);
      }

      //
    };

    // Initial update
    updateDimensions();

    // Attach event listener to window resize event
    window.addEventListener("resize", updateDimensions);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);
  return (
    <div ref={containerRef} style={{ height: "80vh" }}>
      {/* Your container content goes here */}
      <Typography>Container width: {containerWidth}px</Typography>
      <Typography>Container height: {containerHeight}px</Typography>
    </div>
  );
};

export default Text;
