
import { Helmet } from "react-helmet-async";
import VenueGrid from "../components/sections/VenueGrid";
import venuesHeroImage from "../components/layout/assets/hall1.jpeg";
import "../styles/Venues.css";

export default function Venues() {
  return (
    <>
      <Helmet>
        <title>Venues | Blessings Marquee & Events</title>

        <meta
          name="description"
          content="Explore the elegant venues at Blessings Marquee & Events, including spacious halls, lawns and beautiful settings for weddings, mehndi, nikkah, baraat, walima and special events."
        />

        <meta
          name="keywords"
          content="Blessings Marquee venues, wedding venue, banquet hall, wedding hall, event venue, marquee, wedding lawn, event halls"
        />

        <meta name="robots" content="index, follow" />

        <link
          rel="canonical"
          href="https://blessingsmarqueandevents.com/venues"
        />
      </Helmet>

      <section
        className="events-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(20, 15, 10, 0.55), rgba(20, 15, 10, 0.55)), url(${venuesHeroImage})`,
        }}
      >
        <div className="container events-hero__inner">
          <h1 className="events-hero__title">Venues</h1>

          <span className="events-hero__divider" aria-hidden="true" />

          <p className="events-hero__subtitle">
            Elegant halls, spacious lawns and everything in between — find the
            perfect setting for your day.
          </p>
        </div>
      </section>

      <VenueGrid />
    </>
  );
}

