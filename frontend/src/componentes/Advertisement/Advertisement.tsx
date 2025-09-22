import React, { useEffect, useState } from "react";
import "./Advertisement.css";

const Advertisement: React.FC = () => {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/advertisement` // Usar la variable de entorno
        );
        if (!response.ok) {
          throw new Error("Error al obtener el mensaje de Strapi");
        }
        const data = await response.json();
        setMessage(data.data.message); // Establece el mensaje obtenido
      } catch (error) {
        console.error("Error al obtener el mensaje:", error);
      }
    };

    fetchMessage();
  }, []);

  return (
    <div className="adbar-container">
      <div className="adbar-text">
        {[...Array(15)].map((_, index) => (
          <span key={index} className="adbar-message">
            {message || "Cargando mensaje..."}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Advertisement;
