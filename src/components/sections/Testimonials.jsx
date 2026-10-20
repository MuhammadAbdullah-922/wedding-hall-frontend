import { useState, useEffect } from "react";
import "../../styles/testimonials.css";

export default function Testimonials() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch("https://api.blessingsmarqueandevents.com/api/testimonials?status=approved&per_page=20")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load testimonials");
        return res.json();
      })
      .then((json) => {
        // Laravel paginate() wraps actual array in data.data
        setReviews(json?.data?.data ?? []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const prev = () =>
    setIndex((i) => (i === 0 ? reviews.length - 1 : i - 1));
  const next = () =>
    setIndex((i) => (i === reviews.length - 1 ? 0 : i + 1));

  const visible = reviews.length
    ? [reviews[index], reviews[(index + 1) % reviews.length]].filter(
        (r, i, arr) => arr.findIndex((x) => x.id === r.id) === i
      )
    : [];

  return (
    <section className="section--soft testimonials">
      <div className="container testimonials__inner">
        <div className="testimonials__intro">
          <span className="section__eyebrow">Client Testimonials</span>
          <h2 className="section__title">What Families Say About Us</h2>
          <p className="section__sub">
            Real words from the families and hosts who celebrated with Blessings.
          </p>

          {reviews.length > 1 && (
            <div className="testimonials__nav">
              <button type="button" aria-label="Previous testimonial" onClick={prev}>
                ‹
              </button>
              <button type="button" aria-label="Next testimonial" onClick={next}>
                ›
              </button>
            </div>
          )}
        </div>

        {loading && <p className="pricing__status">Loading reviews...</p>}
        {error && <p className="pricing__status pricing__status--error">{error}</p>}
        {!loading && !error && reviews.length === 0 && (
          <p className="pricing__status">No reviews yet. Be the first to share yours!</p>
        )}

        {!loading && !error && reviews.length > 0 && (
          <div className="testimonials__cards">
            {visible.map((review) => (
              <article className="testimonial-card" key={review.id}>
                <div className="testimonial-card__head">
                  <img
                    src={
                      review.image
                        ? `https://api.blessingsmarqueandevents.com/storage/${review.image}`
                        : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            review.customer_name
                          )}&background=2f4a3c&color=fff`
                    }
                    alt={review.customer_name}
                  />
                  <div>
                    <strong>{review.customer_name}</strong>
                    <span>{review.event_type || "Guest"}</span>
                  </div>
                </div>
                <p className="testimonial-card__quote">{review.review}</p>
                <div className="testimonial-card__stars" aria-hidden="true">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
