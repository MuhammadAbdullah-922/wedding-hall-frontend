
import { Helmet } from "react-helmet-async";
import EventTypesGrid from "../components/sections/Eventgrid";
import eventsHeroImage from "../components/layout/assets/stage3.jpeg";
import "../styles/eventTypes.css";

export default function Events() {
  return (
    <>
      <Helmet>
        <title>Events | Blessings Marquee & Events</title>

        <meta
          name="description"
          content="Explore the events hosted at Blessings Marquee & Events, from intimate mehndi and nikkah celebrations to grand baraat, walima and wedding events."
        />

        <meta
          name="keywords"
          content="Blessings Marquee events, wedding events, mehndi, nikkah, baraat, walima, wedding venue, banquet hall events"
        />

        <meta name="robots" content="index, follow" />

        <link
          rel="canonical"
          href="https://blessingsmarqueandevents.com/events"
        />
      </Helmet>

      <section
        className="events-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(20, 15, 10, 0.55), rgba(20, 15, 10, 0.55)), url(${eventsHeroImage})`,
        }}
      >
        <div className="container events-hero__inner">
          <h1 className="events-hero__title">Events</h1>

          <span className="events-hero__divider" aria-hidden="true" />

          <p className="events-hero__subtitle">
            From intimate mehndis to grand baraat nights — explore every
            occasion we host.
          </p>
        </div>
      </section>

      <EventTypesGrid />
    </>
  );
}

