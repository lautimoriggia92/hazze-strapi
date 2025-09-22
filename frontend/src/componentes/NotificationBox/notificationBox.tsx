import { ToastContainer, toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NotificationBox = () => {
  return <ToastContainer />;
};

// Función para mostrar notificaciones
export const showNotification = (
  message: string,
  type: "success" | "error" | "info" | "warning",
  options?: ToastOptions
) => {
  switch (type) {
    case "success":
      toast.success(message, options);
      break;
    case "error":
      toast.error(message, options);
      break;
    case "info":
      toast.info(message, options);
      break;
    case "warning":
      toast.warning(message, options);
      break;
    default:
      toast(message, options);
  }
};

export default NotificationBox;
