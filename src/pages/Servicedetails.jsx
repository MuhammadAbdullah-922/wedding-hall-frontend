import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../components/layout/PageHeader";
import "../styles/Servicedetails.css";

const TABS = ["Overview", "Gallery", "Reviews"];

// Laravel's `Storage::disk('public')->store(...)` saves relative paths like
// "packages/xxxx.jpg". After `php artisan storage:link`, those are served at
// {APP_URL}/storage/{path}. If your API and frontend run on different ports
// in dev, set VITE_API_BASE_URL in your .env (e.g. https://api.blessingsmarqueandevents.com)
// and it will be prefixed here automatically.
const API_BASE = import.meta.env?.VITE_API_BASE_URL ?? "";

function assetUrl(path) {
  if (!path) return "/images/placeholder.jpeg";
  if (path.startsWith("http")) return path;
  return `${API_BASE}/storage/${path}`;
}

// Package::show() returns { success, data: { ...package fields, venue: {...} } }
function normalizePackage(raw) {
  if (!raw) return null;
  return {
    id: raw.id,
    title: raw.name,
    description: raw.description ?? "",
    price: raw.price,
    duration: raw.duration ?? "—",
    guestLimit: raw.guest_limit,
    features: Array.isArray(raw.features) ? raw.features : [],
    image: assetUrl(raw.image),
    venue: raw.venue
      ? {
          id: raw.venue.id,
          name: raw.venue.name,
          city: raw.venue.city,
          address: raw.venue.address,
          capacity: raw.venue.capacity,
          facilities: Array.isArray(raw.venue.facilities) ? raw.venue.facilities : [],
          coverImage: assetUrl(raw.venue.cover_image),
        }
      : null,
  };
}

export default function ServiceDetails() {
  const { id } = useParams();

  const [service, setService] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [galleryLoaded, setGalleryLoaded] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoaded, setReviewsLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("Overview");

  // GET /api/packages/{id}
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(`${API_BASE}/api/packages/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(res.status === 404 ? "Package not found" : `Request failed: ${res.status}`);
        return res.json();
      })
      .then((body) => {
        if (!cancelled) setService(normalizePackage(body.data));
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  // Gallery lives on the Venue, not the Package: GET /api/venues/{venue_id}
  // returns the venue with its `images` relation loaded.
  useEffect(() => {
    if (activeTab !== "Gallery" || galleryLoaded || !service?.venue?.id) return;

    fetch(`${API_BASE}/api/venues/${service.venue.id}`)
      .then((res) => res.json())
      .then((body) => {
        const images = body.data?.images ?? [];
        setGallery(images.map((img) => ({ id: img.id, url: assetUrl(img.image_path) })));
      })
      .catch(() => setGallery([]))
      .finally(() => setGalleryLoaded(true));
  }, [activeTab, galleryLoaded, service]);

  // Testimonials aren't linked to a specific package in the current schema,
  // so this pulls the general list. If you later add a package_id/venue_id
  // column to testimonials, filter it here.
  useEffect(() => {
    if (activeTab !== "Reviews" || reviewsLoaded) return;

    fetch(`${API_BASE}/api/testimonials`)
      .then((res) => res.json())
      .then((body) => setReviews(body.data?.data ?? body.data ?? []))
      .catch(() => setReviews([]))
      .finally(() => setReviewsLoaded(true));
  }, [activeTab, reviewsLoaded]);

  // SEO: page title + meta description
  useEffect(() => {
    if (!service) return;
    const previousTitle = document.title;
    document.title = `${service.title} | Wedding Hall Packages`;

    let meta = document.querySelector('meta[name="description"]');
    const createdMeta = !meta;
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    const previousContent = meta.getAttribute("content");
    if (service.description) {
      meta.setAttribute("content", service.description.slice(0, 155));
    }

    return () => {
      document.title = previousTitle;
      if (createdMeta) {
        meta.remove();
      } else if (previousContent) {
        meta.setAttribute("content", previousContent);
      }
    };
  }, [service]);

  if (loading) {
    return (
      <>
        <PageHeader title="Package Details" image="/images/placeholder-hero.jpg" />
        <div className="container service-details__status">Loading package...</div>
      </>
    );
  }

  if (error || !service) {
    return (
      <>
        <PageHeader title="Package Details" image="/images/placeholder-hero.jpg" />
        <div className="container service-details__status">
          {error ?? "This package could not be found."}
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Package Details"
        image={service.venue?.coverImage ?? service.image}
        imageAlt={`${service.title} banner`}
      />

      <section className="service-details">
        <div className="container service-details__grid">
          <div className="service-details__main">
            <img
              className="service-details__hero-img"
              src={service.image}
              alt={service.title}
              loading="lazy"
              width="932"
              height="620"
            />

            {service.features.length > 0 && (
              <ul className="service-details__tags">
                {service.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            )}

            {service.venue && (
              <div className="service-details__decorator-row">
                <span>
                  Venue : <strong>{service.venue.name}</strong>
                </span>
                {service.venue.city && (
                  <>
                    <span className="service-details__dot" aria-hidden="true">&bull;</span>
                    <span>{service.venue.city}</span>
                  </>
                )}
              </div>
            )}

            <h1 className="service-details__title">{service.title}</h1>
            {service.description && <p className="service-details__desc">{service.description}</p>}

            <div className="service-details__tabs" role="tablist" aria-label="Package information">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab}
                  className={`service-details__tab ${activeTab === tab ? "is-active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === "Overview" && (
              <div className="service-details__panel">
                <h2>Description</h2>
                <p>{service.description || "No description added yet."}</p>

                {service.features.length > 0 && (
                  <>
                    <h2>What's Included</h2>
                    <ul>
                      {service.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </>
                )}

                {service.venue?.facilities.length > 0 && (
                  <>
                    <h2>Venue Facilities</h2>
                    <ul>
                      {service.venue.facilities.map((facility) => (
                        <li key={facility}>{facility}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )}

            {activeTab === "Gallery" && (
              <div className="service-details__panel service-details__gallery">
                {!galleryLoaded && <p>Loading gallery...</p>}
                {galleryLoaded && gallery.length === 0 && <p>No gallery images yet.</p>}
                {gallery.map((img) => (
                  <img key={img.id} src={img.url} alt={service.venue?.name ?? service.title} loading="lazy" />
                ))}
              </div>
            )}

            {activeTab === "Reviews" && (
              <div className="service-details__panel service-details__reviews">
                {!reviewsLoaded && <p>Loading reviews...</p>}
                {reviewsLoaded && reviews.length === 0 && <p>No reviews yet.</p>}
                {reviews.map((review) => (
                  <article key={review.id} className="service-details__review">
                    <strong>{review.customer_name ?? review.name}</strong>
                    {review.rating && (
                      <span className="service-details__rating">{"★".repeat(Math.round(review.rating))}</span>
                    )}
                    <p>{review.message ?? review.content ?? review.text}</p>
                  </article>
                ))}
              </div>
            )}
          </div>

          <aside className="service-details__sidebar">
            <div className="service-details__price-row">
              <span>Package Price</span>
              <strong>${Number(service.price).toLocaleString()}</strong>
            </div>

            <a href={`/book?package=${service.id}`} className="btn btn-primary service-details__book-btn">
              Book Now
            </a>
            <p className="service-details__guarantee">100% Satisfaction Guaranteed</p>

            <dl className="service-details__meta">
              {service.venue && (
                <div>
                  <dt>Venue</dt>
                  <dd>{service.venue.name}</dd>
                </div>
              )}
              {service.guestLimit ? (
                <div>
                  <dt>Guest Limit</dt>
                  <dd>{service.guestLimit}</dd>
                </div>
              ) : null}
              <div>
                <dt>Duration</dt>
                <dd>{service.duration}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>
    </>
  );
}
