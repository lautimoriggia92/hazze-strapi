import React, { useEffect, useState } from "react";
import "./bannerImage.css";
import axios from "axios";

type MainImage = {
  url: string;
};

type Category = {
  id: number;
  mainImage: MainImage | null;
};

type BannerImageProps = {
  text: string;
  link: string;
  categoryId: number; // ID de la categoría para buscar la imagen
};

const BannerImage: React.FC<BannerImageProps> = ({
  text,
  link,
  categoryId,
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Función para obtener las categorías desde la API
  const fetchImage = React.useCallback(async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/categories?populate=*`
      );
      const categories: Category[] = response.data.data;

      // Depuración: Mostrar todas las categorías obtenidas
      console.log("Categorías obtenidas:", categories);

      // Filtramos la categoría por ID
      const category = categories.find((cat) => cat.id === categoryId);

      // Depuración: Mostrar la categoría encontrada
      console.log("Categoría encontrada:", category);

      // Verificamos si la categoría tiene una imagen válida
      if (category?.mainImage?.url) {
        setImageUrl(
          `${import.meta.env.VITE_BACKEND_URL}${category.mainImage.url}`
        );
      } else {
        console.warn(
          `No se encontró una imagen válida para la categoría con ID ${categoryId}`
        );
        setImageUrl(null); // Aseguramos que no quede un estado incorrecto
      }
    } catch (error) {
      console.error("Error al obtener las categorías desde la API:", error);
      setImageUrl(null); // Aseguramos que no quede un estado incorrecto
    }
  }, [categoryId]);

  useEffect(() => {
    fetchImage();
  }, [fetchImage]);

  return (
    <div className="banner-image">
      {imageUrl ? (
        <img src={imageUrl} alt={text} className="banner-background" />
      ) : (
        <div className="placeholder">Cargando imagen...</div>
      )}
      <a href={link} className="banner-text">
        {text}
      </a>
    </div>
  );
};

export default BannerImage;
