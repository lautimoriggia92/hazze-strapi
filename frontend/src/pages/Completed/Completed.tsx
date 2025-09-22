import React, { useEffect } from "react"; // Asegúrate de importar useEffect
import { useLocation, useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Completed.css";
import { useCart } from "../../context/CartContext"; // Importa el hook del contexto del carrito
import { showNotification } from "../../componentes/NotificationBox/notificationBox"; // Importa la función de notificaciones

const Completed: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart(); // Obtén la función clearCart del contexto

  // Desplazar la página hacia arriba al cargar
  useEffect(() => {
    window.scrollTo(0, 0); // Desplaza la página al inicio
  }, []);

  // Datos del pedido enviados desde Cart
  const orderData = location.state?.orderData;

  if (!orderData) {
    // Si no hay datos del pedido, redirige al carrito
    navigate("/cart");
    return null;
  }

  const handleConfirmOrder = () => {
    if (!orderData) {
      showNotification("No se encontraron datos del pedido.", "error");
      return;
    }

    // Crear el mensaje con el formato deseado
    const whatsappMessage = `
Hola! Acabo de realizar mi pedido a través de la web, aquí están los detalles de mi orden:

*Detalles del pedido:*
- Número de pedido: ${orderData.orderId}
- Fecha: ${new Date(orderData.orderCreatedAt).toLocaleDateString()}
- Correo electrónico: ${orderData.email}
- Total de la Orden: $${orderData.totalPrice.toLocaleString()}
- Método de Pago: ${orderData.paymentMethod}

*Detalles de Facturación:*
- Nombre: ${orderData.customerName}
- Documento: ${orderData.customerDocument}
- Dirección: ${orderData.address}, ${orderData.city}
- Teléfono: ${orderData.customerPhone}
- Correo: ${orderData.email}

*Productos:*
${orderData.products
  .map(
    (product: { name: string; quantity: number; price: number }) =>
      `- ${product.name} × ${
        product.quantity
      } - $${product.price.toLocaleString()}`
  )
  .join("\n")}

*Total de la orden:* $${orderData.totalPrice.toLocaleString()}
`;

    // Crear el enlace de WhatsApp
    const whatsappNumber = "5492915279810"; // Reemplaza con el número del dueño o bot de WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    // Redirigir al cliente a WhatsApp
    window.open(whatsappUrl, "_blank");

    // Limpiar el carrito
    clearCart();

    // Mostrar notificación de éxito
    showNotification("El carrito ha sido vaciado.", "success");
  };

  return (
    <div className="completed-container">
      {/* Encabezado con detalles del pedido */}
      <div className="order-summary">
        <div className="order-details">
          <div className="order-detail">
            <p>
              <strong>Número de Pedido:</strong>
            </p>
            <p>{orderData.orderId}</p>
          </div>
          <div className="order-detail">
            <p>
              <strong>Fecha:</strong>
            </p>
            <p>{new Date(orderData.orderCreatedAt).toLocaleDateString()}</p>
          </div>
          <div className="order-detail">
            <p>
              <strong>Correo Electrónico:</strong>
            </p>
            <p>{orderData.email}</p>
          </div>
          <div className="order-detail">
            <p>
              <strong>Total de la orden:</strong>
            </p>
            <p>${orderData.totalPrice.toLocaleString()}</p>
          </div>
          <div className="order-detail">
            <p>
              <strong>Método de Pago:</strong>
            </p>
            <p>{orderData.paymentMethod}</p>
          </div>
        </div>
      </div>

      {/* Confirmación del pedido */}
      <div className="confirmation-box">
        <link rel="icon" type="image/svg+xml" href="/logo.jpg" />
        <h1 style={{ fontFamily: '"League Spartan", sans-serif' }}>
          ¡Perfecto {orderData.customerName.split(" ")[0]}! Ya tenemos todos los
          detalles de tu orden.
        </h1>
        <p>
          Finaliza la compra por whatsapp haciendo click en el botón de abajo.
        </p>
        <button className="btn btn-whatsapp" onClick={handleConfirmOrder}>
          <i className="fab fa-whatsapp"></i> Confirmar tu Orden
        </button>
      </div>

      {/* Lista de productos y dirección de facturación */}
      <div className="order-details-container">
        {/* Detalles de los productos */}
        <div className="product-details12">
          <h2>Productos</h2>
          <ul className="product-list">
            {orderData.products.map(
              (
                product: {
                  name: string;
                  quantity: number;
                  price: number;
                  id: number;
                },
                index: number
              ) => (
                <li key={index} className="product-item">
                  <a
                    href={`/product/${product.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {product.name}
                  </a>{" "}
                  × {product.quantity} - ${product.price.toLocaleString()}
                </li>
              )
            )}
          </ul>
          <div className="product-total">
            <strong>Total </strong>
            <span>${orderData.totalPrice.toLocaleString()}</span>
          </div>
        </div>

        {/* Dirección de facturación */}
        <div className="billing-address">
          <h2>Dirección de Facturación</h2>
          <p>{orderData.customerName}</p>
          <p>{orderData.customerDocument || "No especificado"}</p>
          <p>{orderData.address}</p>
          <p>{orderData.city}</p>
          <p>{orderData.customerPhone}</p>
          <p>{orderData.email}</p>

        </div>
      </div>
    </div>
  );
};

export default Completed;
