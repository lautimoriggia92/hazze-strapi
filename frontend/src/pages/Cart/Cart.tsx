import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import { useCart } from "../../context/CartContext";
import "./Cart.css";

const Cart: React.FC = () => {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate(); // Inicializa navigate

  // Estado para los campos del formulario
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    province: "",
    city: "",
    street: "",
    phone: "",
    document: "",
    email: "",
    postalCode: "",
    details: "",
    paymentMethod: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({}); // Estado para los errores

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Manejar cambios en los inputs
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Validar campos
  const validateFields = () => {
    const newErrors: { [key: string]: string } = {};

    // Validar campos obligatorios
    if (!formData.firstName) newErrors.firstName = "El nombre es obligatorio.";
    if (!formData.lastName) newErrors.lastName = "El apellido es obligatorio.";
    if (!formData.province) newErrors.province = "La provincia es obligatoria.";
    if (!formData.city) newErrors.city = "La localidad es obligatoria.";
    if (!formData.street) newErrors.street = "El domicilio es obligatorio.";
    if (!formData.phone || !/^\d{7,15}$/.test(formData.phone)) {
      newErrors.phone = "Por favor, ingresa un teléfono válido.";
    }
    if (!formData.document || !/^\d{1,8}$/.test(formData.document)) {
      newErrors.document = "Por favor, ingresa un DNI válido.";
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Por favor, ingresa un email válido.";
    }
    if (!formData.postalCode || !/^\d{4,8}$/.test(formData.postalCode)) {
      newErrors.postalCode = "Por favor, ingresa un código postal válido.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
  };

  const handleSubmit = async () => {
    if (validateFields()) {
      const orderData = {
        orderId: Date.now(), // Generar un ID único
        customerName: `${formData.firstName} ${formData.lastName}`,
        customerDocument: formData.document || "No especificado",
        customerPhone: formData.phone || "No especificado",
        email: formData.email || "No especificado",
        address: `${formData.street || "Calle no especificada"}, ${
          formData.city || "Ciudad no especificada"
        }, ${formData.province || "Provincia no especificada"}`,
        postalCode: formData.postalCode || "No especificado",
        details: formData.details || "No especificado",
        paymentMethod: formData.paymentMethod || "No especificado", // Asegúrate de incluir esto
        products: cart.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        totalPrice,
        orderCreatedAt: new Date().toISOString(),
      };

      try {
        // Enviar la orden al backend
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/orders`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: orderData }), // Envolver en "data"
          }
        );

        if (!response.ok) {
          throw new Error("Error al guardar la orden en el servidor.");
        }

        const result = await response.json();
        console.log("Orden guardada exitosamente:", result);

        // Navegar a la página de confirmación con los datos de la orden
        navigate("/completed", { state: { orderData } });
      } catch (error) {
        console.error("Error al guardar la orden:", error);
        alert(
          "Hubo un problema al guardar la orden. Por favor, inténtalo de nuevo."
        );
      }
    }
  };

  return (
    <div className="cart-container">
      <div className="cart-content">
        {/* Columna izquierda: Formulario */}
        <div className="cart-form">
          <h2>Completa tus datos para el envio</h2>
          <hr></hr>
          <form>
            <div className="form-group">
              <input
                type="text"
                id="firstName"
                className="form-control"
                placeholder="Nombre (ej: Jose)"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />

              {errors.firstName && (
                <p className="error-text">{errors.firstName}</p>
              )}
            </div>

            <div className="form-group">
              <input
                type="text"
                id="lastName"
                className="form-control"
                placeholder="Apellido (ej: Perez)"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
              {errors.lastName && (
                <p className="error-text">{errors.lastName}</p>
              )}
            </div>
            <div className="form-group">
              <select
                id="province"
                className="form-control"
                value={formData.province}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecciona tu provincia</option>
                <option value="Buenos Aires">Buenos Aires</option>
                <option value="CABA">Ciudad Autónoma de Buenos Aires</option>
                <option value="Catamarca">Catamarca</option>
                <option value="Chaco">Chaco</option>
                <option value="Chubut">Chubut</option>
                <option value="Córdoba">Córdoba</option>
                <option value="Corrientes">Corrientes</option>
                <option value="Entre Ríos">Entre Ríos</option>
                <option value="Formosa">Formosa</option>
                <option value="Jujuy">Jujuy</option>
                <option value="La Pampa">La Pampa</option>
                <option value="La Rioja">La Rioja</option>
                <option value="Mendoza">Mendoza</option>
                <option value="Misiones">Misiones</option>
                <option value="Neuquén">Neuquén</option>
                <option value="Río Negro">Río Negro</option>
                <option value="Salta">Salta</option>
                <option value="San Juan">San Juan</option>
                <option value="San Luis">San Luis</option>
                <option value="Santa Cruz">Santa Cruz</option>
                <option value="Santa Fe">Santa Fe</option>
                <option value="Santiago del Estero">Santiago del Estero</option>
                <option value="Tierra del Fuego">Tierra del Fuego</option>
                <option value="Tucumán">Tucumán</option>
              </select>
              {errors.province && (
                <p className="error-text">{errors.province}</p>
              )}
            </div>

            <div className="form-group">
              <input
                type="text"
                id="city"
                className="form-control"
                placeholder="Localidad (ej: Rosario)"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
              {errors.city && <p className="error-text">{errors.city}</p>}
            </div>

            <div className="form-group">
              <input
                type="text"
                id="street"
                className="form-control"
                placeholder="Domicilio (ej: Av. Siempre Viva 742)"
                value={formData.street}
                onChange={handleInputChange}
                required
              />
              {errors.street && <p className="error-text">{errors.street}</p>}
            </div>

            <div className="form-group">
              <input
                type="tel"
                id="phone"
                className="form-control"
                placeholder="Teléfono (ej: 1123456789)"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
              {errors.phone && <p className="error-text">{errors.phone}</p>}
            </div>

            <div className="form-group">
              <input
                type="text"
                id="document"
                className="form-control"
                placeholder="Documento (ej: 12345678)"
                value={formData.document}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, ""); // Solo números
                  setFormData({ ...formData, document: value });
                }}
                maxLength={8}
                required
              />
              {errors.document && (
                <p className="error-text">{errors.document}</p>
              )}
            </div>

            <div className="form-group">
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="E-Mail (ej: usuario@gmail.com)"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>

            <div className="form-group">
              <input
                type="text"
                id="postalCode"
                className="form-control"
                placeholder="Código Postal (ej: 2000)"
                value={formData.postalCode}
                onChange={handleInputChange}
                required
              />
              {errors.postalCode && (
                <p className="error-text">{errors.postalCode}</p>
              )}
            </div>

            <div className="form-group">
              <input
                type="text"
                id="details"
                className="form-control"
                placeholder="Detalle de vivienda (ej: Piso 3, Departamento B)"
                value={formData.details}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <select
                id="paymentMethod"
                className="form-control"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecciona el método de pago</option>
                <option value="Transferencia Bancaria">
                  Transferencia Bancaria (Alias/CBU)
                </option>
                <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
                <option value="Tarjeta de Débito">Tarjeta de Débito</option>
              </select>
              {errors.paymentMethod && (
                <p className="error-text">{errors.paymentMethod}</p>
              )}
            </div>
          </form>
        </div>

        {/* Columna derecha: Productos */}
        <div className="cart-summary">
          {cart.length === 0 ? (
            <p className="empty-cart">El carrito está vacío.</p>
          ) : (
            <>
              <div className="cart-items">
                {cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-image"
                    />
                    <div className="cart-item-details">
                      <p>
                        {item.name} ({item.talle}) × {item.quantity}
                      </p>
                      <p>Precio: ${item.price.toLocaleString()}</p>
                    </div>
                    <button
                      className="remove-button"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
              </div>
              <hr />
              <div className="cart-totals">
                <p>Subtotal: ${totalPrice.toLocaleString()}</p>
                <h3>Total: ${totalPrice.toLocaleString()}</h3>
                <button
                  className="btn btn-primary btn-block"
                  onClick={handleSubmit}
                >
                  Finalizar compra
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
