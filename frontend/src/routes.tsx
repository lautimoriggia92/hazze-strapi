import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home/Home";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart"; // Importa el componente del carrito
import NotFound from "./pages/NotFound/NotFound";
import Completed from "./pages/Completed/Completed";
import ProductPages from "./pages/Products/Products"; // Importa el componente de páginas de productos
import { EspacioFisico } from "./pages/EspacioFisico/EspacioFisico";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="espacio-fisico" element={<EspacioFisico />} />
        <Route path="products/:category" element={<ProductPages />} />
        <Route path="product/:documentId" element={<ProductDetails />} />
        <Route path="cart" element={<Cart />} />{" "}
        <Route path="completed" element={<Completed />} />{" "}
        {/* Nueva ruta para el carrito */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
