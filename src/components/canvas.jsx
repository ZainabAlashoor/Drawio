import { useRef } from "react";
import drawSoundFile from "../assets/sounds/draw.mp3";

export default function Canvas({ color, canvasRef }) {
   const isDrawing = useRef(false);
  const lastPos = useRef(null);
  const drawSound = useRef(new Audio(drawSoundFile));


  function getPos(e) {
    const rect = canvasRef.current.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function handleMouseDown(e) {
    isDrawing.current = true;
    lastPos.current = getPos(e);

    drawSound.current.loop = true;
    drawSound.current.volume = 0.4;
    drawSound.current.play();
  }

  function stopDrawing() {
    isDrawing.current = false;
    lastPos.current = null;

    drawSound.current.pause();
    drawSound.current.currentTime = 0;
  }

  function handleMouseMove(e) {
    if (!isDrawing.current) return;

    const ctx = canvasRef.current.getContext("2d");
    const pos = getPos(e);

    ctx.strokeStyle = color;
    ctx.lineWidth = 10;
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();

    lastPos.current = pos;
  }

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={500}
        height={400}
        style={{ border: "1px solid black", cursor: "crosshair", background: "white" }}
        onMouseDown={handleMouseDown}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onMouseMove={handleMouseMove}
      />
    </div>
  );
}