import React from "react";
import "./whatsappIcon.css";

const WhatsappIcon: React.FC = () => {
  const whatsappNumber = "5492915279810"; // Reemplaza con tu número de WhatsApp
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-icon"
    >
      <img
        src="/images/whatsapp.png" // Ruta de tu ícono de WhatsApp
        alt="WhatsApp"
      />
    </a>
  );
};

export default WhatsappIcon;
