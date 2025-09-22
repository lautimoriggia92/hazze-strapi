import React from "react";
import "./LabelText.css";

type LabelProps = {
  text: string;
  color?: string; // Color opcional para personalizar el fondo
  fontSize?: string; // Tamaño opcional del texto
};

export const LabelText: React.FC<LabelProps> = ({ text, color, fontSize }) => {
  return (
    <div
      className="label"
      style={{
        backgroundColor: color || "var(--main-foreground)",
        fontSize: fontSize || "1rem", // Tamaño predeterminado si no se pasa fontSize
      }}
    >
      {text}
    </div>
  );
};
