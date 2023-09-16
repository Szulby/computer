import { useEffect, useRef } from "react";
export default function screen(props) {
  const canvasRef = useRef();
  useEffect(() => {
    const canvas = canvasRef.current;

    const context = canvas.getContext("2d");
    context.fillStyle = "#000000";
    props.screen
      .flatMap((el) => el)
      .forEach((pixel, key) => {
        context.fillRect(key % 256, Math.floor(key / 256), 1, 1);
      });
  }, [props.screen]);
  return (
    <>
      <canvas
        width="256"
        height="512"
        ref={canvasRef}
        style={{ border: "1px solid red" }}
      />
    </>
  );
}
