"use client";

import React, { useState } from "react";
import { LabelText } from "../LabelText/LabelText";
import "./ProductBox.css";

type ProductBoxProps = {
  documentId: string;
  image?: string | null;
  hoverImage?: string | null; // Nueva prop para la imagen secundaria
  title: string;
  price: string;
  description: string;
  talle: string;
  isFeature?: boolean; // Nueva prop para indicar si es tendencia
};

const ProductBox: React.FC<ProductBoxProps> = ({
  documentId,
  image,
  hoverImage,
  title,
  price,
  talle,
  isFeature,
}) => {
  const [currentImage, setCurrentImage] = useState(image); // Estado para manejar la imagen actual

  const formatPrice = (price: string) => {
    const numericPrice = parseFloat(price.replace(/[^0-9]/g, "")); // Convierte el precio a número
    const formattedNumber = new Intl.NumberFormat("es-AR", {
      minimumFractionDigits: 0,
    }).format(numericPrice);

    return `$${formattedNumber}`; // Concatenamos el símbolo de pesos directamente
  };

  const handleTouch = () => {
    if (hoverImage) {
      setCurrentImage((prevImage) =>
        prevImage === image ? hoverImage : image
      ); // Alterna entre la imagen principal y la secundaria
    }
  };

  return (
    <a
      href={`/product/${documentId}`}
      className="product-box"
      onMouseEnter={() => hoverImage && setCurrentImage(hoverImage)} // Cambia a la imagen secundaria al hacer hover
      onMouseLeave={() => setCurrentImage(image)} // Vuelve a la imagen principal al quitar el hover
      onTouchStart={handleTouch} // Cambia la imagen al tocar en dispositivos móviles
    >
      <div className="image-container">
        {currentImage ? (
          <>
            <img src={currentImage} alt={title} />
            {isFeature && (
              <LabelText text="NEW DROP" color="#8A2BE2" fontSize="0.7rem" />
            )}
          </>
        ) : (
          <div className="placeholder-image">Sin imagen</div>
        )}
      </div>
      <h3>{title}</h3>
      <p className="price">{formatPrice(price)}</p> {/* Formatea el precio */}
      <p className="talle">{talle}</p>
    </a>
  );
};

export default ProductBox;
