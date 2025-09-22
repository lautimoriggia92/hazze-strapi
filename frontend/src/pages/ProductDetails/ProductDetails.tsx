import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaCreditCard, FaStore } from "react-icons/fa"; // Importa los íconos
import { useCart } from "../../context/CartContext"; // Asegúrate de que la ruta sea correcta
import "./ProductDetails.css";
import { showNotification } from "../../componentes/NotificationBox/notificationBox";
import { LabelText } from "../../componentes/LabelText/LabelText";
import { Helmet } from "react-helmet-async";

type Product = {
  documentId: string;
  productName: string;
  description: string;
  price: number;
  isFeature?: boolean;
  talle: string[];
  images: {
    url: string;
    formats?: {
      large?: { url: string };
    };
  }[];
};

const capitalizeTitle = (title: string) => {
  return title
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const ProductDetails: React.FC = () => {
  const { documentId } = useParams<{ documentId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [selectedTalle, setSelectedTalle] = useState<string | null>(null); // Estado para el talle seleccionado
  const [quantity, setQuantity] = useState<number>(1); // Estado para la cantidad
  const isFeature = product?.isFeature; // Verifica si el producto es destacado
  const { addToCart } = useCart();
  const [touchStartX, setTouchStartX] = useState<number | null>(null); // Estado para el inicio del toque
  const [touchEndX, setTouchEndX] = useState<number | null>(null); // Estado para el final del toque

  useEffect(() => {
    if (!documentId) return;

    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/products?populate=*`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();

        const foundProduct = data.data.find(
          (product: Product) => product.documentId === documentId
        );

        if (!foundProduct) {
          throw new Error("Producto no encontrado");
        }

        setProduct(foundProduct);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [documentId]);

  const handleNextImage = () => {
    if (product) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % product.images.length
      );
    }
  };

  const handlePrevImage = () => {
    if (product) {
      setCurrentImageIndex(
        (prevIndex) =>
          (prevIndex - 1 + product.images.length) % product.images.length
      );
    }
  };

  const toggleAccordion = (section: string) => {
    setOpenAccordion((prev) => (prev === section ? null : section));
  };

  const handleTalleClick = (talle: string) => {
    setSelectedTalle(talle); // Actualiza el talle seleccionado
    console.log(`Talle seleccionado: ${talle}`);
  };

  const handleAddToCart = () => {
    if (!product) {
      return;
    }

    if (!selectedTalle) {
      showNotification(
        "Por favor, selecciona un talle antes de agregar al carrito.",
        "error"
      );
      return;
    }

    const productToAdd = {
      id: `${product.documentId}-${selectedTalle}`, // Combina el ID del producto con el talle
      name: product.productName,
      price: product.price,
      quantity: quantity, // Incluye la cantidad seleccionada
      image: `${import.meta.env.VITE_BACKEND_URL}${product.images[0]?.url}`,
      talle: selectedTalle,
    };

    addToCart(productToAdd);
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  // Maneja el inicio del toque
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  // Maneja el movimiento del toque
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.touches[0].clientX);
  };

  // Maneja el final del toque
  const handleTouchEnd = () => {
    if (touchStartX !== null && touchEndX !== null) {
      const touchDifference = touchStartX - touchEndX;

      // Si el usuario desliza hacia la izquierda (siguiente imagen)
      if (touchDifference > 50) {
        handleNextImage();
      }

      // Si el usuario desliza hacia la derecha (imagen anterior)
      if (touchDifference < -50) {
        handlePrevImage();
      }
    }

    // Restablece los valores de toque
    setTouchStartX(null);
    setTouchEndX(null);
  };

  if (loading) return <div>Loading product details...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="product-details">
      <Helmet>
        <title>
          {product
            ? `HAZZE │ ${capitalizeTitle(product.productName)}`
            : "HAZZE"}
        </title>
        <link rel="icon" type="image/svg+xml" href="/logo.jpg" />
        <meta
          name="description"
          content={product?.description || "Hazze - Tienda de ropa"}
        />
        <meta property="og:title" content={product?.productName || "Hazze"} />
        <meta
          property="og:description"
          content={product?.description || "Hazze - Tienda de ropa"}
        />
        <meta
          property="og:image"
          content={`${import.meta.env.VITE_BACKEND_URL}${
            product?.images[0]?.url
          }`}
        />
        <meta
          property="og:url"
          content={`https://www.hazze.com/product/${documentId}`}
        />
        <meta property="og:type" content="product" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={product?.productName || "Hazze"} />
        <meta
          name="twitter:description"
          content={product?.description || "Hazze - Tienda de ropa"}
        />
        <meta
          name="twitter:image"
          content={`${import.meta.env.VITE_BACKEND_URL}${
            product?.images[0]?.url
          }`}
        />
      </Helmet>
      {product ? (
        <>
          {/* Slider de imágenes con navegación táctil */}
          <div
            className="image-slider"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {product.images.map((image, index) => {
              // Usa la URL del formato "large" si está disponible, de lo contrario usa la URL principal
              const imageUrl = image.formats?.large?.url || image.url;
              return (
                <img
                  key={index}
                  src={`${import.meta.env.VITE_BACKEND_URL}${imageUrl}`}
                  alt={`${product.productName} ${index + 1}`}
                  className={`slider-image ${
                    index === currentImageIndex ? "active" : ""
                  }`}
                />
              );
            })}
            <button className="slider-button prev" onClick={handlePrevImage}>
              &#8249;
            </button>
            <button className="slider-button next" onClick={handleNextImage}>
              &#8250;
            </button>
          </div>

          {/* Indicadores de puntos */}
          <div className="slider-indicators">
            {product.images.map((_, index) => (
              <span
                key={index}
                className={`indicator ${
                  index === currentImageIndex ? "active" : ""
                }`}
                onClick={() => setCurrentImageIndex(index)} // Permite cambiar de imagen al hacer clic en un punto
              ></span>
            ))}
          </div>

          {/* Información del producto */}
          <div className="product-info">
            <h1 className="product-title">
              {product.productName ? capitalizeTitle(product.productName) : ""}{" "}
              {isFeature && <LabelText text="NEW DROP" color="#8A2BE2" />}
            </h1>
            <p className="product-price">${product.price} (Transf/Efectivo)</p>
            <div className="product-talles">
              <h4>Talle:</h4>
              <div className="talle-options">
                {product.talle.map((talle) => (
                  <div
                    key={talle}
                    className={`talle-option ${
                      selectedTalle === talle ? "selected" : ""
                    }`}
                    onClick={() => handleTalleClick(talle)}
                  >
                    {talle}
                  </div>
                ))}
              </div>
            </div>
            <div className="quantity-selector">
              <h4>Cantidad:</h4>
              <div className="quantity-controls">
                <button onClick={handleDecreaseQuantity}>-</button>
                <span>{quantity}</span>
                <button onClick={handleIncreaseQuantity}>+</button>
              </div>
            </div>
            {/* Línea divisoria */}
            <div className="divider"></div>
            <button
              className="btn btn-primary btn-block"
              onClick={handleAddToCart}
            >
              Agregar al carrito
            </button>
            <p className="product-description">{product.description}</p>
            {/* Acordeón */}
            <div className="accordion">
              <div className="accordion-item">
                <div
                  className="accordion-header"
                  onClick={() => toggleAccordion("mediosDePago")}
                >
                  <FaCreditCard className="accordion-icon" />
                  Medios de Pago
                  <span>{openAccordion === "mediosDePago" ? "-" : "+"}</span>
                </div>
                <div
                  className={`accordion-content ${
                    openAccordion === "mediosDePago" ? "open" : ""
                  }`}
                >
                  <p>
                    Aceptamos efectivo, tarjetas de crédito, débito y
                    transferencias bancarias.
                  </p>
                </div>
              </div>
              <div className="accordion-item">
                <div
                  className="accordion-header"
                  onClick={() => toggleAccordion("nuestroLocal")}
                >
                  <FaStore className="accordion-icon" />
                  Nuestro Local
                  <span>{openAccordion === "nuestroLocal" ? "-" : "+"}</span>
                </div>
                <div
                  className={`accordion-content ${
                    openAccordion === "nuestroLocal" ? "open" : ""
                  }`}
                >
                  <p>
                    Nos encontramos en Darregueira 517, Bahía Blanca, Buenos
                    Aires.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Producto no encontrado.</p>
      )}
    </div>
  );
};

export default ProductDetails;
