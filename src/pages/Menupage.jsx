
import { Helmet } from "react-helmet-async";
import Menus from "../components/sections/Menus";
import menuHeroImage from "../components/layout/assets/hall2.jpeg";
import "../styles/menupage.css";

export default function MenuPage() {
  return (
    <>
      <Helmet>
        <title>Our Menus | Blessings Marquee & Events</title>

        <meta
          name="description"
          content="Explore the delicious menu options available at Blessings Marquee & Events for weddings, mehndi, nikkah, baraat, walima and special events."
        />

        <meta
          name="keywords"
          content="Blessings Marquee menu, wedding menu, banquet hall menu, wedding food, mehndi menu, walima menu, event catering"
        />

        <meta name="robots" content="index, follow" />

        <link
          rel="canonical"
          href="https://blessingsmarqueandevents.com/menus"
        />
      </Helmet>

      <section
        className="menu-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(20, 15, 10, 0.55), rgba(20, 15, 10, 0.55)), url(${menuHeroImage})`,
        }}
      >
        <div className="container menu-hero__inner">
          <h1 className="menu-hero__title">Our Menus</h1>

          <span className="menu-hero__divider" aria-hidden="true" />

          <p className="menu-hero__subtitle">
            A delightful selection of cuisines crafted to make your moments
            unforgettable.
          </p>
        </div>
      </section>

      <Menus />

      <section className="menu-cta">
        <div className="container menu-cta__inner">
          <div>
            <h2 className="menu-cta__title">
              Plan Your Perfect Event With Us
            </h2>

            <p className="menu-cta__sub">
              Delicious food, exceptional service and unforgettable memories.
            </p>
          </div>

          <div className="menu-cta__actions">
            <a href="/contact" className="btn btn-outline">
              Contact Us
            </a>

            <a href="/book" className="btn btn-primary">
              Book Your Event
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

