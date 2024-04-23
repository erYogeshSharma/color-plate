import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Circle } from "react-konva";
import { makeCircles } from "../utils/shuffleColors";
import { Grid } from "@mui/material";

const dots = [
  [200, 22],
  [150, 18],
  [100, 12],
  [50, 6],
  [0, 1],
];
const Game = () => {
  const containerRef = useRef(null);
  const [containerDimensions, setContainerDimensions] = useState({
    height: 0,
    width: 0,
  });

  const [circles, setCircles] = useState<
    {
      x: number;
      y: number;
      color: string;
      hiddenColor: string;
      radius: number;
    }[]
  >([]);
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setContainerDimensions((_) => ({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        }));
      }
      setCircles([]);

      dots.forEach((path) => {
        console.log("ipdea");
        setCircles((cs) => [
          ...cs,
          ...makeCircles({
            radius: path[0],
            numCircles: path[1],
            containerHeight: containerRef.current.clientHeight,
            containerWidth: containerRef.current.clientWidth,
          }),
        ]);
      });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleCircleClick(index: number) {
    setCircles((c) =>
      c.map((c, i) => (i === index ? { ...c, color: c.hiddenColor } : c))
    );
  }

  function handleMouseEnter(index: number) {
    setCircles((c) =>
      c.map((c, i) => (i === index ? { ...c, radius: 24 } : c))
    );
  }

  function handleMouseLeave(index: number) {
    setCircles((c) =>
      c.map((c, i) => (i === index ? { ...c, radius: 20 } : c))
    );
  }

  return (
    <Grid ref={containerRef} style={{ height: "80vh" }}>
      <Stage
        width={containerDimensions.width}
        height={containerDimensions.height}
      >
        <Layer>
          <Circle
            x={containerDimensions.width / 2}
            y={containerDimensions.height / 2}
            radius={240}
            fill="#ffdab9"
          />
          {circles.map((circle, index) => (
            <Circle
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              key={index}
              x={circle.x}
              y={circle.y}
              radius={circle.radius}
              fill={circle.color}
              onClick={() => handleCircleClick(index)}
            />
          ))}
        </Layer>
      </Stage>
    </Grid>
  );
};

export default Game;
