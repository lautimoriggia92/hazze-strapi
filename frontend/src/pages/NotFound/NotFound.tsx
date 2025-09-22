
import "./NotFound.css"; // Asegúrate de tener un archivo CSS para estilos

export const NotFound = () => {
  return (
    <div className="not-found-page">
      <h1>404 - Página no encontrada o inexistente</h1>
      <p>
        Lo sentimos, la página que estás buscando no existe. Porfavor, verifica
        la URL o vuelve a la pagina de Inicio.
      </p>
      <a href="/">Volver a la página de inicio</a>
    </div>
  );
};

export default NotFound;
