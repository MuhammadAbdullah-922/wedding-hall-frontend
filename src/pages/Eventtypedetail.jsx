
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import EventsList from "../components/sections/Eventslist";
import eventDetailHeroImage from "../components/layout/assets/stage6.jpeg";
import "../styles/eventTypeDetail.css";

export default function EventTypeDetail() {
  const { id } = useParams();

  const eventId = id || "";

  return (
    <>
      <Helmet>
        <title>Event Details | Blessings Marquee & Events</title>

        <meta
          name="description"
          content="Explore event details at Blessings Marquee & Events, including wedding celebrations, mehndi, nikkah, baraat, walima and other special occasions."
        />

        <meta
          name="keywords"
          content="Blessings Marquee events, wedding event details, mehndi, nikkah, baraat, walima, wedding venue, event celebration"
        />

        <meta name="robots" content="index, follow" />

        <link
          rel="canonical"
          href={`https://blessingsmarqueandevents.com/events/${eventId}`}
        />
      </Helmet>

      <section
        className="events-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(20, 15, 10, 0.55), rgba(20, 15, 10, 0.55)), url(${eventDetailHeroImage})`,
        }}
      >
        <div className="container events-hero__inner">
          <h1 className="events-hero__title">Event Details</h1>

          <span className="events-hero__divider" aria-hidden="true" />

          <p className="events-hero__subtitle">
            Everything you need to know about this celebration.
          </p>
        </div>
      </section>

      <EventsList />
    </>
  );
}

