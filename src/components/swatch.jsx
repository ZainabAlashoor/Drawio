export default function Swatch({ color, selectedColor, onSelect }) {
  const isSelected = color === selectedColor;
  return (
    <div
      onClick={() => onSelect(color)}
      style={{
        width: 50,
        height: 50,
        backgroundColor: color,
        cursor: "pointer",
        border: isSelected ? "3px solid white" : "3px solid transparent",
        outline: isSelected ? "2px solid black" : "none",
      }}
    />
  );
}

