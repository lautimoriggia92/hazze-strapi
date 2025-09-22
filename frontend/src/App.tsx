import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "./routes";
import { CartProvider } from "./context/CartContext"; // Importa el CartProvider
import NotificationBox from "./componentes/NotificationBox/notificationBox";
import { HelmetProvider } from "react-helmet-async";

const App: React.FC = () => {
  return (
    <CartProvider>
      <HelmetProvider>
        <Router>
          <NotificationBox />
          <AppRoutes />
        </Router>
      </HelmetProvider>
    </CartProvider>
  );
};

export default App;
