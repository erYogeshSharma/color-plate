//ts-ignore
export function createImageURL(
  width: number,
  height: number,
  circleColor: string
): string {
  // Create a canvas element
  const canvas: HTMLCanvasElement = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

  // Draw a rectangle
  ctx.fillStyle = "lightblue";
  ctx.fillRect(0, 0, width, height);

  // Draw a circle
  const circleRadius: number = Math.min(width - 50, height - 50) / 2;
  const circleX: number = width / 2;
  const circleY: number = height / 2;
  ctx.fillStyle = circleColor;
  ctx.beginPath();
  ctx.arc(circleX, circleY, circleRadius, 0, Math.PI * 2);
  ctx.fill();

  // Convert canvas content to data URL
  const dataURL: string = canvas.toDataURL();
  return dataURL;
}
