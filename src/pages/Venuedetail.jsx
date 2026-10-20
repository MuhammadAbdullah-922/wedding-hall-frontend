import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/Venuedetail.css";

const API_BASE = "https://api.blessingsmarqueandevents.com";

const AMENITIES = [
  { key: "has_ac", label: "Air Conditioned", icon: "bi-snow" },
  { key: "has_outdoor_area", label: "Outdoor Area", icon: "bi-tree" },
  { key: "has_bridal_room", label: "Bridal Room", icon: "bi-gem" },
  { key: "has_stage", label: "Stage", icon: "bi-easel" },
  { key: "has_sound_system", label: "Sound System", icon: "bi-speaker" },
  { key: "has_backup_power", label: "Backup Power", icon: "bi-lightning-charge" },
];

export default function VenueDetail() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | empty | error

  useEffect(() => {
    setStatus("loading");

    fetch(`${API_BASE}/api/venues/${id}`)
      .then((res) => res.json())
      .then((json) => {
        const data = json?.data ?? null;
        setVenue(data);
        setStatus(data ? "ready" : "empty");
      })
      .catch(() => setStatus("error"));
  }, [id]);

  if (status === "loading") {
    return (
      <section className="section venue-detail">
        <div className="container">
          <p className="venue-detail__state">Loading…</p>
        </div>
      </section>
    );
  }

  if (status === "error" || status === "empty") {
    return (
      <section className="section venue-detail">
        <div className="container">
          <p className="venue-detail__state venue-detail__state--error">
            We couldn't find that venue.{" "}
            <Link to="/venues">Back to all venues</Link>
          </p>
        </div>
      </section>
    );
  }

  const images = venue.images ?? [];
  const activeAmenities = AMENITIES.filter((a) => venue[a.key]);
  const facilities = Array.isArray(venue.facilities) ? venue.facilities : [];

  return (
    <>
      <section
        className="venue-hero"
        style={{
          backgroundImage: venue.cover_image
            ? `linear-gradient(rgba(20, 15, 10, 0.55), rgba(20, 15, 10, 0.55)), url(${API_BASE}/storage/${venue.cover_image})`
            : "linear-gradient(rgba(20, 15, 10, 0.7), rgba(20, 15, 10, 0.7))",
        }}
      >
        <div className="container venue-hero__inner">
          <h1 className="venue-hero__title">{venue.name}</h1>
          <span className="venue-hero__divider" aria-hidden="true" />
          {venue.city && <p className="venue-hero__subtitle">{venue.city}</p>}
        </div>
      </section>

      <section className="section venue-detail">
        <div className="container">
          <div className="row venue-detail__layout">
            <div className="col-12 col-lg-7">
              {venue.description && (
                <p className="venue-detail__desc">{venue.description}</p>
              )}

              {venue.hall_details && (
                <>
                  <h3 className="venue-detail__subhead">Hall Details</h3>
                  <p className="venue-detail__desc">{venue.hall_details}</p>
                </>
              )}

              {activeAmenities.length > 0 && (
                <>
                  <h3 className="venue-detail__subhead">Amenities</h3>
                  <ul className="venue-detail__amenities">
                    {activeAmenities.map((a) => (
                      <li key={a.key}>
                        <i className={`bi ${a.icon}`} aria-hidden="true" />
                        {a.label}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {facilities.length > 0 && (
                <>
                  <h3 className="venue-detail__subhead">Facilities</h3>
                  <ul className="venue-detail__facilities">
                    {facilities.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <div className="col-12 col-lg-5">
              <div className="venue-detail__facts">
                {venue.capacity && (
                  <div className="venue-detail__fact">
                    <i className="bi bi-people" aria-hidden="true" />
                    <div>
                      <strong>{venue.capacity}</strong>
                      <span>Guests</span>
                    </div>
                  </div>
                )}
                {venue.parking_capacity != null && (
                  <div className="venue-detail__fact">
                    <i className="bi bi-p-square" aria-hidden="true" />
                    <div>
                      <strong>{venue.parking_capacity}</strong>
                      <span>Parking Spots</span>
                    </div>
                  </div>
                )}
                {venue.address && (
                  <div className="venue-detail__fact venue-detail__fact--wide">
                    <i className="bi bi-geo-alt" aria-hidden="true" />
                    <div>
                      <span>{venue.address}</span>
                    </div>
                  </div>
                )}
              </div>

              <Link to="/book" className="btn btn-primary venue-detail__book">
                Book This Venue
              </Link>
            </div>
          </div>

          {images.length > 0 && (
            <div className="venue-detail__gallery">
              <h3 className="venue-detail__subhead">Gallery</h3>
              <div className="venue-detail__gallery-grid">
                {images.map((img) => (
                  <div className="venue-detail__gallery-item" key={img.id}>
                    <img
                      src={`${API_BASE}/storage/${img.image_path}`}
                      alt={venue.name}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="venue-detail__back">
            <Link to="/venues" className="btn btn-outline">
              ← All Venues
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
