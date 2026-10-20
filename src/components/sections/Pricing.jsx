import { useState, useEffect } from "react";
import "../../styles/pricing.css";

export default function Pricing() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.blessingsmarqueandevents.com/api/packages")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load packages");
        return res.json();
      })
      .then((data) => {
        setPackages(data?.data?.data ?? []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <section className="section pricing">
      <div className="container">
        <div className="section__head">
          <span className="section__eyebrow">Our Packages</span>
          <h2 className="section__title">Simple Pricing for Every Celebration</h2>
        </div>

        {loading && <p className="pricing__status">Loading packages...</p>}
        {error && <p className="pricing__status pricing__status--error">{error}</p>}

        {!loading && !error && packages.length === 0 && (
          <p className="pricing__status">No packages available right now.</p>
        )}

        {!loading && !error && packages.length > 0 && (
          <div className="pricing__grid">
            {packages.map((pkg) => (
              <article
                className={`pricing-card ${pkg.is_highlighted ? "pricing-card--highlight" : ""}`}
                key={pkg.id}
              >
                <h3 className="pricing-card__name">{pkg.name}</h3>
                <p className="pricing-card__desc">{pkg.description}</p>
                <p className="pricing-card__price">
                  Rs {pkg.price}
                  <span>/ Event</span>
                </p>
                <a href="#contact" className="btn btn-primary pricing-card__cta">
                  Plan Your Event
                </a>
                <ul className="pricing-card__list">
                  {(pkg.features || []).map((f, i) => (
                    <li key={i}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path
                          d="m20 6-11 11-5-5"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
