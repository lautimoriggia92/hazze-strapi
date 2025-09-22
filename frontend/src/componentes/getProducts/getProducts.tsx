import React, { useEffect, useState } from "react";
import ProductBox from "../ProductBox/ProductBox";

type ImageFormat = {
  thumbnail?: { url: string };
  medium?: { url: string };
  small?: { url: string };
  large?: { url: string };
};

type Image = {
  url: string;
  formats?: ImageFormat;
};

type Category = {
  id: number;
  categoryName: string;
  position: "top" | "bottom"; // Campo para indicar la posición
};

export type Product = {
  id: number;
  productName: string;
  description: string;
  price: number;
  talle: string[];
  images: Image[];
  documentId: string;
  isFeature?: boolean;
  slug: string; // Añadido slug
  position?: string; // Añadido para filtrar por posición
  category: Category; // Relación con la categoría
};

type GetProductsProps = {
  filter?: (product: Product) => boolean;
  categorySlug?: string; // Prop para filtrar por categoría
  sortByPrice?: "asc" | "desc"; // Prop para ordenar por precio
};

export const GetProducts: React.FC<GetProductsProps> = ({
  filter,
  categorySlug,
  sortByPrice,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/products?populate=*`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();

        console.log("Productos obtenidos del backend:", data.data); // Log para verificar los datos obtenidos
        setProducts(data.data);
      } catch (err) {
        console.error("Error al obtener productos:", err); // Log para errores
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Cargando Productos...</div>;
  if (error)
    return (
      <div>
        Motivo del Error: "{error}", por favor revisa que el servidor esté
        corriendo.
      </div>
    );

  // Aplica el filtro si se proporciona
  let filteredProducts = filter ? products.filter(filter) : products;

  // Filtra por categoría si se proporciona categorySlug
  if (categorySlug) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.slug &&
        product.slug
          .toLowerCase()
          .includes(categorySlug.toLowerCase().slice(0, -1))
    );
    console.log(
      `Productos después de filtrar por categoría (${categorySlug}):`,
      filteredProducts
    ); // Log para verificar el filtrado por categoría
  }

  // Ordena los productos por precio si se proporciona sortByPrice
  if (sortByPrice) {
    filteredProducts = filteredProducts.sort((a, b) => {
      if (sortByPrice === "asc") {
        return a.price - b.price; // Orden
      } else {
        return b.price - a.price; // Orden descendente
      }
    });
  }

  return (
    <div className="products-container">
      {filteredProducts.map((product) => {
        let imageUrl = null;

        if (product.images && product.images.length > 0) {
          const image = product.images[0];

          imageUrl = image.formats?.medium?.url
            ? `${import.meta.env.VITE_BACKEND_URL}${image.formats.medium.url}`
            : `${import.meta.env.VITE_BACKEND_URL}${image.url}`;
        }

        return (
          <ProductBox
            key={product.documentId}
            documentId={product.documentId}
            image={imageUrl}
            hoverImage={
              product.images.length > 1
                ? `${import.meta.env.VITE_BACKEND_URL}${product.images[1].url}`
                : null
            }
            title={product.productName}
            price={`$${product.price}`}
            description={product.description}
            talle={product.talle.join("  ")}
            isFeature={product.isFeature}
          />
        );
      })}
    </div>
  );
};
