import React from "react";
import Carousel from "../../componentes/Carousel/Carousel";
import { GetProducts } from "../../componentes/getProducts/getProducts";
import { Helmet } from "react-helmet"; // Importar Helmet
import "./Home.css";
import BannerImage from "../../componentes/bannerImage/bannerImage";

const Home: React.FC = () => {
  return (
    <div>
      {/* Open Graph y Meta Tags */}
      <Helmet>
        <title>HAZZE │ Streetwear Revolution</title>
        <meta
          name="description"
          content="Descubre las últimas tendencias en ropa con Hazze. Encuentra productos destacados y nuestras colecciones más recientes."
        />
        <meta property="og:title" content="Hazze - Tienda de Ropa" />
        <meta
          property="og:description"
          content="Descubre las últimas tendencias en ropa con Hazze. Encuentra productos destacados y nuestras colecciones más recientes."
        />
        <meta
          property="og:image"
          content="https://www.hazze.com/home-banner.jpg"
        />
        <meta property="og:url" content="https://www.hazze.com/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hazze - Tienda de Ropa" />
        <meta
          name="twitter:description"
          content="Descubre las últimas tendencias en ropa con Hazze. Encuentra productos destacados y nuestras colecciones más recientes."
        />
        <meta
          name="twitter:image"
          content="https://www.hazze.com/home-banner.jpg"
        />
      </Helmet>

      <div>
        <Carousel />
        <div className="featured-section">
          <div className="separator-line"></div>
          {/* Reemplaza los encabezados con una imagen */}
          <h1 className="newdrop-text">New Drop</h1>
        </div>
        <GetProducts filter={(product) => product.isFeature === true} />
      </div>
      <div>
        <div className="separator-line"></div>
        <div className="banner-container">
          <BannerImage
            text="HODDIES"
            link="/products/hoddies"
            categoryId={68} // ID de la categoría "Hoddies"
          />
          <BannerImage
            text="PANTALONES"
            link="/products/jeans"
            categoryId={69} // ID de la categoría "Jeans"
          />
          <BannerImage
            text="REMERAS"
            link="/products/remeras"
            categoryId={67} // ID de la categoría "Remeras"
          />
          <BannerImage
            text="ACCESORIOS"
            link="/products/accesorios"
            categoryId={66} // ID de la categoría "Accessorios"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
