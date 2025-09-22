import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import "./Navbar.css";

type Category = {
  id: number;
  categoryName: string;
  slug: string;
  position: "top" | "bottom";
};

type NavbarProps = {
  showLogo?: boolean; // Prop para controlar si se muestra el logo
};

export const Navbar: React.FC<NavbarProps> = ({ showLogo = true }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false);
  const [isParteArribaOpen, setIsParteArribaOpen] = useState(false);
  const [isParteAbajoOpen, setIsParteAbajoOpen] = useState(false);
  const [categoriesTop, setCategoriesTop] = useState<Category[]>([]);
  const [categoriesBottom, setCategoriesBottom] = useState<Category[]>([]);
  const { cart } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProductsMenu = () => {
    setIsProductsMenuOpen(!isProductsMenuOpen);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/categories`
        );
        if (!response.ok) {
          throw new Error("Error al obtener las categorías");
        }
        const data = await response.json();

        const topCategories = data.data.filter(
          (category: Category) => category.position === "top"
        );
        const bottomCategories = data.data.filter(
          (category: Category) => category.position === "bottom"
        );

        setCategoriesTop(topCategories);
        setCategoriesBottom(bottomCategories);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsNavbarVisible(false);
      } else {
        setIsNavbarVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div
      className={`navbar-container ${isNavbarVisible ? "visible" : "hidden"}`}
    >
      <nav className="navbar">
        <button className="hamburger-menu" onClick={toggleMenu}>
          <div className={`bar ${isMenuOpen ? "open" : ""}`}></div>
          <div className={`bar ${isMenuOpen ? "open" : ""}`}></div>
          <div className={`bar ${isMenuOpen ? "open" : ""}`}></div>
        </button>
        <div className="navbar-header">
          {showLogo && ( // Condicional para mostrar el logo
            <a href="/">
              <img
                src="/images/logo-black.png"
                alt="Logo Hazze"
                className="navbar-title"
              />
            </a>
          )}
        </div>
        <div className="navbar-cart">
          <Link to="/cart" className="cart-link">
            <FaShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="cart-count">{cart.length}</span>
            )}
          </Link>
        </div>
      </nav>
      <div className={`modal ${isMenuOpen ? "modal-show" : ""}`}>
        <div className="modal-content">
          <div className="modal-logo">
            <a href="/">
              <img src="/images/modal-logo.png" alt="Logo Hazze" />
            </a>
          </div>
          <div className="modal-divider"></div>
          <button className="modal-close" onClick={toggleMenu}>
            &times;
          </button>
          <ul className="modal-menu">
            {/* Botón de Inicio */}
<li>
  <a href="/" onClick={toggleMenu}>
    Inicio
  </a>
</li>

            {/* Submenú de Productos */}
            <li>
              <a
                href="#"
                className="expandable-menu"
                onClick={(e) => {
                  e.preventDefault();
                  toggleProductsMenu();
                }}
              >
                Productos
                <span
                  className={`expand-icon ${isProductsMenuOpen ? "open" : ""}`}
                >
                  &#8250;
                </span>
              </a>
              {isProductsMenuOpen && (
                <ul className="sub-menu">
                  {/* Parte de Arriba */}
                  <li>
                    <a
                      href="#"
                      className="expandable-menu"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsParteArribaOpen(!isParteArribaOpen);
                      }}
                    >
                      Parte de Arriba
                      <span
                        className={`expand-icon ${
                          isParteArribaOpen ? "open" : ""
                        }`}
                      >
                        &#8250;
                      </span>
                    </a>
                    {isParteArribaOpen && (
                      <ul className="sub-menu">
                        {/* Enlace para ver todo de ARRIBA */}
                        <li>
                          <Link to="/products/arriba" onClick={toggleMenu}>
                            Ver todo de ARRIBA
                          </Link>
                        </li>
                        {categoriesTop.map((category) => (
                          <li key={category.id}>
                            <Link
                              to={`/products/${category.slug}`}
                              onClick={toggleMenu}
                            >
                              {category.categoryName}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                  {/* Parte de Abajo */}
                  <li>
                    <a
                      href="#"
                      className="expandable-menu"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsParteAbajoOpen(!isParteAbajoOpen);
                      }}
                    >
                      Parte de Abajo
                      <span
                        className={`expand-icon ${
                          isParteAbajoOpen ? "open" : ""
                        }`}
                      >
                        &#8250;
                      </span>
                    </a>
                    {isParteAbajoOpen && (
                      <ul className="sub-menu">
                        {/* Enlace para ver todo de ABAJO */}
                        <li>
                          <Link to="/products/abajo" onClick={toggleMenu}>
                            Ver todo de ABAJO
                          </Link>
                        </li>
                        {categoriesBottom.map((category) => (
                          <li key={category.id}>
                            <Link
                              to={`/products/${category.slug}`}
                              onClick={toggleMenu}
                            >
                              {category.categoryName}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                </ul>
              )}
            </li>

            {/* Botón de Contacto */}
            <li>
              <a href="mailto:hzhazze@gmail.com" onClick={toggleMenu}>
                Contacto
              </a>
            </li>
            {/* Botón de Espacio Físico */}
            <li>
              <Link to="/espacio-fisico" onClick={toggleMenu}>
                Espacio Físico
              </Link>
            </li>
          </ul>
          <hr></hr>
          <div className="modal-socials">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/images/media-icons/facebook.png"
                alt="Facebook"
                className="social-icon"
              />
            </a>
            <a
              href="https://www.instagram.com/hazze.hz/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/images/media-icons/instagram.png"
                alt="Instagram"
                className="social-icon"
              />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/images/media-icons/twitter.png"
                alt="Twitter"
                className="social-icon"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
