import React, { useState, useEffect } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"; // Importamos los íconos
import "./Carousel.css";
import axios from "axios";

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]); // Estado para las imágenes

  // Función para obtener las imágenes desde Strapi
  const fetchImages = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/flayer-home?populate=*`
      );
      const data = response.data.data;

      // Extraemos las URLs de las imágenes
      const mobileImages = data.flayersCelular.map(
        (item: { url: string }) =>
          `${import.meta.env.VITE_BACKEND_URL}${item.url}`
      );
      const desktopImages = data.flayersEscritorio.map(
        (item: { url: string }) =>
          `${import.meta.env.VITE_BACKEND_URL}${item.url}`
      );

      // Detectamos el tamaño de la pantalla y establecemos las imágenes correspondientes
      setImages(window.innerWidth <= 768 ? mobileImages : desktopImages);
    } catch (error) {
      console.error("Error al obtener las imágenes desde Strapi:", error);
    }
  };

  // Llamamos a la función para obtener las imágenes al cargar el componente
  useEffect(() => {
    fetchImages();

    // Detecta el tamaño de la pantalla y cambia las imágenes al redimensionar
    const updateImages = () => {
      fetchImages();
    };

    window.addEventListener("resize", updateImages); // Escucha cambios en el tamaño de la ventana

    return () => window.removeEventListener("resize", updateImages); // Limpia el evento al desmontar
  }, []);

  // Cambia al siguiente slide automáticamente
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Cambia cada 3 segundos

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, [images]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="carousel">
      <button className="carousel-button prev" onClick={handlePrev}>
        <AiOutlineLeft />
      </button>
      <div
        className="carousel-images"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Carousel Hazze`}
            className={`carousel-image${window.innerWidth > 768 ? ' desktop-image' : ''}`}
          />
        ))}
      </div>
      <button className="carousel-button next" onClick={handleNext}>
        <AiOutlineRight />
      </button>
    </div>
  );
};

export default Carousel;
