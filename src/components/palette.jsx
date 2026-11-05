import Swatch from "./swatch";

export default function Palette({ colors, selectedColor, onSelect }) {
  return (
    <div className="palette">
      {colors.map((color) => (
        <Swatch
          key={color}
          color={color}
          selectedColor={selectedColor}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

