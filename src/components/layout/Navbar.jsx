import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../../styles/navbar.css";

// Static navigation links
const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Services", dropdown: true },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact" },
];

// Services dropdown items
const SERVICES_LINKS = [
  { to: "/venues", label: "Our Venues", icon: "🏛️" },
  { to: "/events", label: "Events", icon: "🎉" },
  { to: "/menus", label: "Menus", icon: "🍽️" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const closeTimer = useRef(null);

  // =========================
  // NAVBAR SCROLL EFFECT
  // =========================
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // =========================
  // LOCK BODY SCROLL
  // =========================
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // =========================
  // CLOSE MOBILE MENU
  // =========================
  const closeMenu = () => {
    setMenuOpen(false);
    setServicesOpen(false);
  };

  // =========================
  // SERVICES DESKTOP HOVER
  // =========================
  const openServicesHover = () => {
    if (window.innerWidth <= 900) return;

    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
    }

    setServicesOpen(true);
  };

  const closeServicesHover = () => {
    if (window.innerWidth <= 900) return;

    closeTimer.current = setTimeout(() => {
      setServicesOpen(false);
    }, 150);
  };

  // =========================
  // SERVICES MOBILE TOGGLE
  // =========================
  const toggleServices = () => {
    setServicesOpen((open) => !open);
  };

  return (
    <header
      className={`navbar ${
        scrolled ? "navbar--scrolled" : ""
      }`}
    >
      <div className="container navbar__inner">

        {/* =========================
            LOGO
        ========================== */}
        <Link
          to="/"
          className="navbar__logo"
          onClick={closeMenu}
        >
          <span className="navbar__logo-text">
            Blessings Marquee &amp; Events
          </span>
        </Link>

        {/* =========================
            MAIN NAVIGATION
        ========================== */}
        <nav
          className={`navbar__links ${
            menuOpen ? "navbar__links--open" : ""
          }`}
          aria-label="Primary"
        >
          <ul>

            {NAV_LINKS.map((link) => {

              {/* =========================
                  SERVICES DROPDOWN
              ========================== */}
              if (link.dropdown) {
                return (
                  <li
                    key="services"
                    className={`navbar__dropdown ${
                      servicesOpen
                        ? "navbar__dropdown--open"
                        : ""
                    }`}
                    onMouseEnter={openServicesHover}
                    onMouseLeave={closeServicesHover}
                  >

                    <button
                      type="button"
                      className="navbar__dropdown-toggle"
                      aria-haspopup="true"
                      aria-expanded={servicesOpen}
                      onClick={toggleServices}
                    >
                      <span>Services</span>

                      <svg
                        className="navbar__caret"
                        viewBox="0 0 12 8"
                        width="10"
                        height="7"
                        aria-hidden="true"
                      >
                        <path
                          d="M1 1.5L6 6.5L11 1.5"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    {/* =========================
                        SERVICES DROPDOWN
                    ========================== */}
                    <div
                      className={`navbar__dropdown-panel ${
                        servicesOpen
                          ? "navbar__dropdown-panel--open"
                          : ""
                      }`}
                    >
                      {SERVICES_LINKS.map((item) => (
                        <NavLink
                          key={item.to}
                          to={item.to}
                          className={({ isActive }) =>
                            `navbar__dropdown-item ${
                              isActive
                                ? "is-active"
                                : ""
                            }`
                          }
                          onClick={closeMenu}
                        >
                          <span
                            className="navbar__dropdown-icon"
                            aria-hidden="true"
                          >
                            {item.icon}
                          </span>

                          <span className="navbar__dropdown-label">
                            {item.label}
                          </span>
                        </NavLink>
                      ))}
                    </div>
                  </li>
                );
              }

              {/* =========================
                  NORMAL ROUTER LINK
              ========================== */}
              if (link.to) {
                return (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      end={link.to === "/"}
                      className={({ isActive }) =>
                        isActive ? "is-active" : ""
                      }
                      onClick={closeMenu}
                    >
                      {link.label}
                    </NavLink>
                  </li>
                );
              }

              {/* =========================
                  NORMAL ANCHOR LINK
              ========================== */}
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}

          </ul>

          {/* =========================
              MOBILE ACTION BUTTONS
          ========================== */}
          <div className="navbar__actions navbar__actions--mobile">

            <Link
              to="/book"
              className="btn btn-primary"
              onClick={closeMenu}
            >
              Book Now
            </Link>

          </div>
        </nav>

        {/* =========================
            DESKTOP ACTION BUTTONS
        ========================== */}
        <div className="navbar__actions navbar__actions--desktop">

          <a
            href="/contact"
            className="btn btn-outline"
          >
            Contact Us
          </a>

          <Link
            to="/book"
            className="btn btn-primary"
          >
            Book Now
          </Link>

        </div>

        {/* =========================
            MOBILE MENU BUTTON
        ========================== */}
        <button
          type="button"
          className={`navbar__toggle ${
            menuOpen
              ? "navbar__toggle--open"
              : ""
          }`}
          aria-label={
            menuOpen
              ? "Close menu"
              : "Open menu"
          }
          aria-expanded={menuOpen}
          onClick={() =>
            setMenuOpen((open) => !open)
          }
        >
          <span />
          <span />
          <span />
        </button>

      </div>

      {/* =========================
          MOBILE BACKDROP
      ========================== */}
      {menuOpen && (
        <div
          className="navbar__scrim"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </header>
  );
}