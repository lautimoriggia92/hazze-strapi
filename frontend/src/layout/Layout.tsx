import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../componentes/Navbar/Navbar";
import Advertisement from "../componentes/Advertisement/Advertisement"; // Importa el nuevo componente
import WhatsappIcon from "../componentes/whatsappIcon/whatsappIcon";
import "./Layout.css";

function Layout() {
  const location = useLocation();
  const isProductDetailsPage = location.pathname.includes("/product/");
  return (
    <div className="container">
      <div className="item advertisement">
        <Advertisement /> {/* Usa el nuevo componente aquí */}
      </div>
      <div className="item header">
        <Navbar showLogo={!isProductDetailsPage} />
      </div>
      <div className="item content">
        <Outlet /> {/* Renderiza el contenido de las rutas */}
      </div>
      <WhatsappIcon /> {/* Agrega el ícono flotante aquí */}
      <div className="item footer">
        <footer className="footer">
          <div className="footer-section">
            <h4>ATENCIÓN AL CLIENTE</h4>
            <p>(Cambios - Envíos - Cobros)</p>
            <p>hzhazze@gmail.com</p>
            <p>WhatsApp: 291 527-0553</p>
          </div>
          <div className="footer-center">
            <div className="social-icons">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABbUlEQVR4nO2Wu0rEQBhGT6OCnY2K91oLC7HTB7DwxmKtFlYa9XVcUXvRzltpYal9XPAFvIGbRZd1oxKYhTEkf/5NsrDFfjDNMGdO5pKZgU7aMGOAA9wALlAxxTV1O8BonsJh4ACoA78JxQdOgYms0hXAUwjDpQwspZXumRE0K7VHv5tmpH4Tkg/gK0auHvmIcnqfgU2gz2J7gLuIaR/SiI8U0k9gKoa/jWh/qPllNLu3GOK6gGlgBniIaF83MxkbR7mmaxbTC5QUzLYkvlaK5yxmQclcSuJHZSezFrOuZFxJ7KUQbygZTxJXBHAeXeLWuyxBTxnF3cB3DF+SwKuM4kmBv5DA/YTNcW9KIGhk0aqXNqcjiceBWgs2V01zV5+0QFxEkeDYfM9R/JZ0XNopAD85iIM+lrXSRraEO1kj9k0fqVIAXlOIX4BVMmYQOAaqCnHV3OcDWaXhDwjeUOehR0DwTDozb7T+f0Qn7ZA/M7pkIR8cDCkAAAAASUVORK5CYII="
                  alt="Facebook"
                />
              </a>
              <a
                href="https://www.instagram.com/hazze.hz/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADK0lEQVR4nO2ZO09UQRTHfwUqRB67lksrgrEQBTsfsZOYqHwCQlS+gApS+2iNhFKDX0AxsZLFZ6f2Itio2AoKCBWuOcn/JhMDu3Mfu3NN9p9McrP3nHPn7Jz3QBNN5AK9wAQwDywAG0Alo2WyTGYZGAcO1UOBQeBFhpv2XfPAQBYK7AGmgT8S/AN4AFzQ6ewnO5gsk3kReKhvVfTtKaAlqeAi8FLCfgO3gE4ah07gNrDpnE4hyUlEpvRdphUKR4Ev2ssbYG8c5mkxfgNKhEcJWNae7vsyDcouzZyOkR8cl5lt67kmIpMyn8gb7mhvFqKroteJTo107Ajn5ZNmRkM7vO8CVrTHnmqCJkRk4S8Elp0cYv65E2b0/kY1QWURWSzPqyLDej9XTdCiiNKUB5Z/RoGnwCeVHht6ntU7o9kJQ1LGlDhXw/xN3q5YE1FHAgXagEngp0fpsQrcBFoTfKdDMmyvuyL6UJI4/8Hhfw5cccoYW336bc6he58wT1Vq7TOJIiWZQnTcJz14TjlmnCTpVrJWpM05iVcxayHzk9fifRfTzCpZKzIp+oUkBZ2UiU7GQn8QRYqOY/uY02444wSAYghFRh3HTosof42EUGRWtJdJj6uS9TiEIpFtW4hNiz6fJFcvRdZF2056tEvW+v+uSKdk/fKkb5pWNWe3siMtxkI6+6hPOe2J+ZDht6gkZvSnSY6zTkIshC5RFmNkZRfGs+TT8dVbkVaV4hUVgHGUOQC8zUvR+G8Zv6TaycecPuepjI9Q0r8a8ZcViQ4rz7Trecxx7Ogk6tJYraVodVtViq96trp2dbCvXq3uYgbDh4LC6BP1KetaC/ptJGHvEmv4EHoc5INhn/ZhPPCAzgePtMdreR6Z1oL3yBQnqtglS95wN05XOqBrhU3f8X2DMAhs6Vqh35dpSprb+LKb8Oh25sL34jC2OCZmY/4ThEM/8NVJtLEvRQuOMpu6ZDFnaxS65BNbTruQOP+06M5uW8JWdD9xSQODLNrcCCarT3lixolO2zKnxNfTLo4AzzxKj6xXuV4Bp0d9w5xTfmS1aZP1UaH1OnCwHgo00QTx8Bf0wax6bwlEYQAAAABJRU5ErkJggg=="
                  alt="Instagram"
                />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB9ElEQVR4nO2WS0hVURSGPzV8EpGKQYWDGgkiUk0MLLDHoEEIIVEDBw0aFTSJBAdBISEIESQIDgoNIiKIAkVwkAQNalAE0Qt6UAkVPaCBPTRjwzfYXLj3nus9d5L+cLisf69//evsux8HVrAc0Q0sZnkuFVDnvJrvQGtS0ZUc5gcS6I+a+xvYVUCzrAHeKj4ld9z4E7Auh3Yf8Af4C/SyBOxW/BNoA8qASc1vZtFsAX6Yc5oiMGyRR0AlsAH4Kpf5NmHsnWNXbXTJqAWeW2xArjdaNM1yq20u8DNAFSmgA5gHFoBOueuaTDsTU8ZPgbWkiHMWfuEsNAEf5R77G+JNpIzKaCovyu2PttgcsJ0SoQ345UrfI3dZ44fAKkqIPo3eA/Xu9zdy/aU0LnfVBqNxuS5nIRwa20plXA88i/7bHvkLxk+A6rRNq6K3/ZxxfNZGDQ2maVoGjFn4gwfHhPEtc7Z6KYT9vjMt4zOahHO4XW498EX+iNxZ41eeZkXhkItn3r0b43DU0Ga31H25kWJMd3g7hULHsuRcc/yuq77FA2XRK7JgtEQ30VCOvAZg1rwTcieNZx1PjEbgpeLbQEWe/L3R3d3qm99RfyOpaQ1wT9EDoC6hbjTH59LBfOJyOwzJr/N84mSiLpqlzOcbsLGAWiv4D/AP2vug1CxVbZcAAAAASUVORK5CYII="
                  alt="Twitter"
                />
              </a>
            </div>
            <p className="footer-text">HAZZE.HZ</p>
            <p className="footer-text">
              ©{" "}
              <a
                href="https://www.linkedin.com/in/lautaro-moriggia-120391300/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Lautaro Moriggia
              </a>
            </p>
          </div>
          <div className="footer-section">
            <h4>ESPACIO FÍSICO</h4>
            <p>Alsina 297</p>
            <p>Bahia Blanca, Buenos Aires</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Layout;
