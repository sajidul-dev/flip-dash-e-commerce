import React from "react";

interface StarProps {
  filled: boolean;
  onClick: () => void;
  clickable: boolean;
}

const Star: React.FC<StarProps> = ({ filled, onClick, clickable }) => (
  <span
    onClick={onClick}
    style={{
      cursor: clickable ? "pointer" : "default",
      color: filled ? "#FFD700" : "#ccc",
    }}
    className="text-2xl "
  >
    ★
  </span>
);

export default Star;
