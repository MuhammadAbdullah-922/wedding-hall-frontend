import { Link } from "react-router-dom";
import heroVenueImg from "../layout/assets/hero-venue.jpeg";
import "../../styles/hero.css";

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <div className="hero__bunting" aria-hidden="true">
            {Array.from({ length: 7 }).map((_, i) => (
              <span key={i} className="hero__flag" />
            ))}
          </div>

          <h1 className="hero__title">
            Celebrate Your <span className="hero__title-accent">Special Moments</span> at
            Blessings
          </h1>

          <p className="hero__text">
           Blessings Marquee & Events is a premier marquee and banquet hall for weddings and special events. From beautiful mehndi and nikkah ceremonies to memorable baraat, walima, and corporate gatherings, we offer an elegant venue, professional event services, and warm hospitality to make every celebration special and unforgettable.

          </p>

          <div className="hero__cta">
            <Link to="/book" className="btn btn-primary">
              Book Now
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <a href="/menus" className="btn btn-outline">
              Explore Services
            </a>
          </div>
        </div>

        <div className="hero__media">
          <div className="hero__media-grid">
            <img
              className="hero__img hero__img--main"
              src={heroVenueImg}
              alt="Decorated banquet hall aisle set up for a wedding event at Blessings"
            />
          </div>
        </div>
      </div>
    </section>
  );
}