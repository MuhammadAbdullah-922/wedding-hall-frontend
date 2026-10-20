import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../../styles/Eventtypedetail.css";

const API_BASE = "https://api.blessingsmarqueandevents.com";

export default function EventsList() {
  const { id } = useParams();
  const [eventType, setEventType] = useState(null);
  const [filter, setFilter] = useState("upcoming"); // upcoming | past
  const [status, setStatus] = useState("loading"); // loading | ready | empty | error

  useEffect(() => {
    setStatus("loading");

    fetch(`${API_BASE}/api/event-types/${id}`)
      .then((res) => res.json())
      .then((json) => {
        const data = json?.data ?? null;
        setEventType(data);
        setStatus(data ? "ready" : "empty");
      })
      .catch(() => setStatus("error"));
  }, [id]);

  if (status === "loading") {
    return (
      <section className="section event-type-detail">
        <div className="container">
          <p className="event-type-detail__state">Loading…</p>
        </div>
      </section>
    );
  }

  if (status === "error" || status === "empty") {
    return (
      <section className="section event-type-detail">
        <div className="container">
          <p className="event-type-detail__state event-type-detail__state--error">
            We couldn't find that event type.{" "}
            <Link to="/events">Back to all events</Link>
          </p>
        </div>
      </section>
    );
  }

  const events = eventType.events ?? [];
  const filtered = events.filter((e) => e.status === filter);

  return (
    <section className="section event-type-detail">
      <div className="container">
        <div className="section__heading">
          <span className="section__eyebrow">{eventType.name}</span>
          <h2 className="section__title">
            {filter === "upcoming" ? "Upcoming" : "Past"} {eventType.name} Events
          </h2>
          {eventType.description && (
            <p className="event-type-detail__intro">{eventType.description}</p>
          )}
        </div>

        <div className="event-type-detail__tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={filter === "upcoming"}
            className={`event-type-detail__tab ${filter === "upcoming" ? "is-active" : ""}`}
            onClick={() => setFilter("upcoming")}
          >
            Upcoming
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={filter === "past"}
            className={`event-type-detail__tab ${filter === "past" ? "is-active" : ""}`}
            onClick={() => setFilter("past")}
          >
            Past
          </button>
        </div>

        {filtered.length === 0 ? (
          <p className="event-type-detail__state">
            No {filter} events under {eventType.name} right now.
          </p>
        ) : (
          <div className="row event-type-detail__grid">
            {filtered.map((event) => (
              <div className="col-12 col-sm-6 col-lg-4" key={event.id}>
                <article className="event-card">
                  <div className="event-card__media">
                    {event.image ? (
                      <img
                        src={`${API_BASE}/storage/${event.image}`}
                        alt={event.event_name}
                        loading="lazy"
                      />
                    ) : (
                      <div className="event-card__placeholder" aria-hidden="true" />
                    )}
                  </div>
                  <div className="event-card__body">
                    <time className="event-card__date">
                      {new Date(event.event_date).toLocaleDateString(undefined, {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                    <h3>{event.event_name}</h3>
                    {event.description && <p>{event.description}</p>}
                  </div>
                </article>
              </div>
            ))}
          </div>
        )}

        <div className="event-type-detail__back">
          <Link to="/events" className="btn btn-outline">
            ← All Event Types
          </Link>
        </div>
      </div>
    </section>
  );
}
