import { Helmet } from "react-helmet-async";
import "./EspacioFisico.css"; // Asegúrate de tener este archivo CSS para estilos

export const EspacioFisico = () => {
  return (
    <div className="espacio-fisico-page">
      {/* Open Graph y Meta Tags */}
      <Helmet>
        <title>HAZZE │ Nuestro Espacio Físico</title>
        <meta
          name="description"
          content="Descubre nuestro espacio físico en Hazze, un lugar diseñado para la innovación, creatividad y colaboración. Vení a visitarnos en Bahía Blanca."
        />
        <link rel="icon" type="image/svg+xml" href="/logo.jpg" />
        <meta property="og:title" content="HAZZE │ Nuestro Espacio Físico" />
        <meta
          property="og:description"
          content="Descubre nuestro espacio físico en Hazze, un lugar diseñado para la innovación, creatividad y colaboración. Vení a visitarnos en Bahía Blanca."
        />
        <meta
          property="og:image"
          content="https://www.hazze.com/espacio-fisico-banner.jpg"
        />
        <meta
          property="og:url"
          content="https://www.hazze.com/espacio-fisico"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="HAZZE │ Nuestro Espacio Físico" />
        <meta
          name="twitter:description"
          content="Descubre nuestro espacio físico en Hazze, un lugar diseñado para la innovación, creatividad y colaboración. Vení a visitarnos en Bahía Blanca."
        />
        <meta
          name="twitter:image"
          content="https://www.hazze.com/espacio-fisico-banner.jpg"
        />
      </Helmet>

      <div className="espacio-fisico-container">
        {/* Línea divisoria */}
        <hr />
        <h1 className="h1-title">¡No dudes en visitarnos!</h1>
        <div className="espacio-fisico-images">
          <img
            src="/images/espacio-fisico/2.jpg"
            alt="Espacio Físico"
            className="espacio-fisico-image"
          />
          <img
            src="/images/espacio-fisico/1.jpg"
            alt="Espacio Físico 2"
            className="espacio-fisico-image"
          />
          <img
            src="/images/espacio-fisico/2.jpg"
            alt="Espacio Físico 3"
            className="espacio-fisico-image"
          />

          <img
            src="/images/espacio-fisico/1.jpg"
            alt="Espacio Físico 4"
            className="espacio-fisico-image"
          />

          <img
            src="/images/espacio-fisico/2.jpg"
            alt="Espacio Físico 5"
            className="espacio-fisico-image"
          />

          <img
            src="/images/espacio-fisico/1.jpg"
            alt="Espacio Físico 6"
            className="espacio-fisico-image"
          />

          <img
            src="/images/espacio-fisico/2.jpg"
            alt="Espacio Físico 7"
            className="espacio-fisico-image"
          />

          <img
            src="/images/espacio-fisico/1.jpg"
            alt="Espacio Físico 8"
            className="espacio-fisico-image"
          />

          <img
            src="/images/espacio-fisico/2.jpg"
            alt="Espacio Físico 9"
            className="espacio-fisico-image"
          />
        </div>

        <div className="espacio-fisico-description">
          <p className="espacio-fisico-description-text" style={{ fontWeight: "bold", fontSize: "20px" }}>
           ¡BIENVENIDOS A HAZZE!
          </p>
          <p className="espacio-fisico-description-text">
            Te invitamos a visitarnos y ser parte de nuestra comunidad.
            Disfrutá el espacio, probá lo que quieras y encontrá tu próxima prenda favorita.
            </p>

          <hr></hr>
          <div className="map-container">
            <iframe
              title="Ubicación Hazze"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3112.5949408366196!2d-62.26868862465651!3d-38.72710778678675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95edbd0026232211%3A0xf24ba1321cbc9c1e!2sHazze!5e0!3m2!1ses!2sar!4v1743841901568!5m2!1ses!2sar%22"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <p className="map-description">
              <h1
                className="h1-title"
                style={{ fontWeight: "bold", fontSize: "25px" }}
              >
                Bahía Blanca
              </h1>
              Estamos ubicados en Alsina 297, Bahia Blanca, Buenos Aires.
              Vení a visitarnos y descubre todo lo que tenemos para vos!
              <p>09:00 a 13:30 - 16:00 a 20:30</p>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
