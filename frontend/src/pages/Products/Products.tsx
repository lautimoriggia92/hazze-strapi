import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  GetProducts,
  Product, // Importar el tipo Product
} from "../../componentes/getProducts/getProducts";
import { Helmet } from "react-helmet";
import "./Products.css";

const Products: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [sortByPrice, setSortByPrice] = useState<"asc" | "desc" | undefined>(
    undefined
  );
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false); // Estado para controlar el modal
  // Agrega un nuevo estado para manejar la animación de cierre
  const [isClosing, setIsClosing] = useState(false);

  // Función para cerrar el modal con animación
  const handleCloseModal = () => {
    setIsClosing(true); // Activa la animación de salida
    setTimeout(() => {
      setIsFilterModalOpen(false); // Cierra el modal después de la animación
      setIsClosing(false); // Resetea el estado de cierre
    }, 500); // Duración de la animación (coincide con el CSS)
  };

  // Determinar el filtro según la categoría
  const filterByPosition = (product: Product) => {
    if (category === "arriba") {
      return product.category?.position === "top"; // Filtrar productos de la parte de arriba
    }
    if (category === "abajo") {
      return product.category?.position === "bottom"; // Filtrar productos de la parte de abajo
    }
    if (category) {
      return (
        product.category?.categoryName.toLowerCase() === category.toLowerCase()
      ); // Filtrar por categoría específica
    }
    return true; // Mostrar todos los productos si no hay filtro
  };

  const categoryName =
    category === "arriba"
      ? "Parte de Arriba"
      : category === "abajo"
      ? "Parte de Abajo"
      : (category || "desconocida").charAt(0).toUpperCase() +
        (category || "desconocida").slice(1);

  return (
    <div className="products-page">
      {/* Open Graph y Meta Tags */}
      <Helmet>
        <title>{`HAZZE │ Productos de la categoría: ${categoryName} - Hazze`}</title>
        <link rel="icon" type="image/svg+xml" href="/logo.jpg" />
        <meta
          name="description"
          content={`Explora los mejores productos de la categoría ${categoryName} en Hazze.`}
        />
        <meta
          property="og:title"
          content={`Productos de la categoría: ${categoryName}`}
        />
        <meta
          property="og:description"
          content={`Explora los mejores productos de la categoría ${categoryName} en Hazze.`}
        />
        <meta
          property="og:image"
          content="https://www.hazze.com/default-category-image.jpg"
        />
        <meta
          property="og:url"
          content={`https://www.hazze.com/products/${category}`}
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`Productos de la categoría: ${categoryName}`}
        />
        <meta
          name="twitter:description"
          content={`Explora los mejores productos de la categoría ${categoryName} en Hazze.`}
        />
        <meta
          name="twitter:image"
          content="https://www.hazze.com/default-category-image.jpg"
        />
      </Helmet>

      {/* Encabezado con el nombre de la categoría */}
      <div className="category-header">
        <hr />
        {/* Botón para abrir el modal */}
        <button
          className="open-filter-button"
          onClick={() => setIsFilterModalOpen(true)}
        >
          FILTROS
          <img src="/images/filter.png" alt="Filtrar" className="filter-icon" />
        </button>
      </div>

      {/* Modal de filtros con animación y "navbar" falso */}
      {isFilterModalOpen && (
        <div className={`filter-modal ${isClosing ? "closing" : ""}`}>
          <div className="filter-modal-content">
            {/* Navbar falso */}
            <div className="filter-modal-header">
              <h2>FILTROS</h2>
              <hr />
            </div>

            {/* Botón de cerrar */}
            <button className="close-filter-button" onClick={handleCloseModal}>
              &times;
            </button>

            {/* Contenido del modal */}
            <div className="filter-buttons">
              <div className="filter-button-container">
                <span className="filter-button-subtitle">ORDEN DE PRECIOS</span>
                <div className="filter-button-group">
                  <button
                    className={sortByPrice === "asc" ? "selected" : ""}
                    onClick={() => setSortByPrice("asc")}
                  >
                    Más barato
                  </button>
                  <button
                    className={sortByPrice === "desc" ? "selected" : ""}
                    onClick={() => setSortByPrice("desc")}
                  >
                    Más caro
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mostrar los productos filtrados */}
      <GetProducts filter={filterByPosition} sortByPrice={sortByPrice} />
    </div>
  );
};

export default Products;
