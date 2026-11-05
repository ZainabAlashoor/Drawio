import "./App.css";
import { useState, useRef } from "react";
import Palette from "./components/palette";
import Canvas from "./components/canvas";
import clickSoundFile from "./assets/sounds/click.mp3";

function playClick() {
  const sound = new Audio(clickSoundFile);
  sound.play();
}

const COLORS = ["#FFF0CA", "#F6CBD5", "#C4DCFF", "#EBCEFF", "#D4E9D8", "#FFDFBD", "#C6CFE0","#B29079","#702670","#E2CDD9", "#FFFFFF", "#000000"];

export default function App() {
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const canvasRef = useRef(null);   
  
  function handleClear() {     
    playClick();    
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function handleSelect(color) {
  playClick();
  setSelectedColor(color);
}

function handleSave() {
   playClick();
  const canvas = canvasRef.current;

  const temp = document.createElement("canvas");
  temp.width = canvas.width;
  temp.height = canvas.height;
  const tempCtx = temp.getContext("2d");
  tempCtx.fillStyle = "white";
  tempCtx.fillRect(0, 0, temp.width, temp.height);
  tempCtx.drawImage(canvas, 0, 0);

  const link = document.createElement("a");
  link.download = "my ART.png";
  link.href = temp.toDataURL("image/png");
  link.click();
}


  return (
    <div className="app">
      <aside className="sidebar">
        <h1>Select a color from the palette below:</h1>
        <Palette
          colors={COLORS}
          selectedColor={selectedColor}
          onSelect={handleSelect}
        />
        <div className="buttons">
          <button onClick={handleClear}>Clear</button>
          <button onClick={handleSave}>Save</button>
        </div>

      </aside>

      <main className="canvas-area">
        <Canvas color={selectedColor} canvasRef={canvasRef} />
      </main>
    </div>
  );
}