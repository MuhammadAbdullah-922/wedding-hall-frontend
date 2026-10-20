import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/venues.css";

const API_BASE = "https://api.blessingsmarqueandevents.com";

export default function VenueGrid() {
  const [venues, setVenues] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | empty | error

  useEffect(() => {
    fetch(`${API_BASE}/api/venues?status=active&per_page=50`)
      .then((res) => res.json())
      .then((json) => {
        const items = json?.data?.data ?? [];
        setVenues(items);
        setStatus(items.length ? "ready" : "empty");
      })
      .catch(() => setStatus("error"));
  }, []);

  if (status === "loading") {
    return (
      <section className="section venues">
        <div className="container">
          <p className="venues__state">Loading venues…</p>
        </div>
      </section>
    );
  }

  if (status === "error") {
    return (
      <section className="section venues">
        <div className="container">
          <p className="venues__state venues__state--error">
            Couldn't load venues right now. Please refresh or try again shortly.
          </p>
        </div>
      </section>
    );
  }

  if (status === "empty") {
    return (
      <section className="section venues">
        <div className="container">
          <p className="venues__state">No venues are listed yet — check back soon.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section venues">
      <div className="container">
        <div className="section__heading">
          <span className="section__eyebrow">Our Spaces</span>
          <h2 className="section__title">Halls Built for Every Guest List</h2>
        </div>

        <div className="row venues__grid">
          {venues.map((venue) => (
            <div className="col-12 col-sm-6 col-lg-4" key={venue.id}>
              <Link to={`/venues/${venue.id}`} className="venue-card">
                <div className="venue-card__media">
                  {venue.cover_image ? (
                    <img
                      src={`${API_BASE}/storage/${venue.cover_image}`}
                      alt={venue.name}
                      loading="lazy"
                    />
                  ) : (
                    <div className="venue-card__placeholder" aria-hidden="true" />
                  )}
                  {venue.capacity && (
                    <span className="venue-card__capacity">
                      <i className="bi bi-people" aria-hidden="true" /> {venue.capacity} guests
                    </span>
                  )}
                </div>
                <div className="venue-card__body">
                  <h3>{venue.name}</h3>
                  {venue.city && <p className="venue-card__city">{venue.city}</p>}
                  {venue.description && <p>{venue.description}</p>}
                  <span className="venue-card__cta">View Venue →</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
