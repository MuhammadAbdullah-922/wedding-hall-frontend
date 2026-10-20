import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/Eventtypes.css";

const API_BASE = "https://api.blessingsmarqueandevents.com";

export default function EventTypesGrid() {
  const [eventTypes, setEventTypes] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | empty | error

  useEffect(() => {
    fetch(`${API_BASE}/api/event-types?status=active&per_page=50`)
      .then((res) => res.json())
      .then((json) => {
        const items = json?.data?.data ?? [];
        setEventTypes(items);
        setStatus(items.length ? "ready" : "empty");
      })
      .catch(() => setStatus("error"));
  }, []);

  if (status === "loading") {
    return (
      <section className="section event-types">
        <div className="container">
          <p className="event-types__state">Loading event types…</p>
        </div>
      </section>
    );
  }

  if (status === "error") {
    return (
      <section className="section event-types">
        <div className="container">
          <p className="event-types__state event-types__state--error">
            Couldn't load events right now. Please refresh or try again shortly.
          </p>
        </div>
      </section>
    );
  }

  if (status === "empty") {
    return (
      <section className="section event-types">
        <div className="container">
          <p className="event-types__state">
            No event types are listed yet — check back soon.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="section event-types">
      <div className="container">
        <div className="section__heading">
          <span className="section__eyebrow">What We Host</span>
          <h2 className="section__title">Every Occasion, One Address</h2>
        </div>

        <div className="row event-types__grid">
          {eventTypes.map((eventType) => (
            <div className="col-12 col-sm-6 col-lg-4" key={eventType.id}>
              <Link to={`/events/${eventType.id}`} className="event-type-card">
                <div className="event-type-card__media">
                  {eventType.image ? (
                    <img
                      src={`${API_BASE}/storage/${eventType.image}`}
                      alt={eventType.name}
                      loading="lazy"
                    />
                  ) : (
                    <div className="event-type-card__placeholder" aria-hidden="true" />
                  )}
                </div>
                <div className="event-type-card__body">
                  <h3>{eventType.name}</h3>
                  {eventType.description && <p>{eventType.description}</p>}
                  <span className="event-type-card__cta">View Events →</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
