import { colors } from "./diceColors";

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function makeCircles(data: {
  radius: number;
  numCircles: number;
  containerHeight: number;
  containerWidth: number;
}) {
  const shuffledColors: string[] = shuffleArray(colors);
  const dots = [];
  for (let i = 0; i < data.numCircles; i++) {
    const angle = (Math.PI * 2 * i) / data.numCircles;
    const circleX = data.containerWidth / 2 + data.radius * Math.cos(angle);
    const circleY = data.containerHeight / 2 + data.radius * Math.sin(angle);
    dots.push({
      x: circleX,
      y: circleY,
      radius: 20,
      color: "#fd5400",
      hiddenColor: shuffledColors[i % colors.length],
    });
  }
  return dots;
}
