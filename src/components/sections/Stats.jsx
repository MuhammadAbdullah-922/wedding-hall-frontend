import { useEffect, useState } from "react";
import "../../styles/stats.css";

const API_BASE = import.meta.env.VITE_API_URL || "https://api.blessingsmarqueandevents.com";

export default function Stats() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchStats() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_BASE}/api/stats`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }

        const json = await res.json();
        const list = json?.data ?? [];

        setStats(list);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Unable to load stats.");
          console.error("Stats fetch error:", err);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
    return () => controller.abort();
  }, []);

  // Don't render the section at all if there's nothing to show —
  // avoids an empty/broken-looking band on the page.
  if (!loading && (error || stats.length === 0)) {
    return null;
  }

  return (
    <section className="section--soft stats">
      <div className="container stats__grid">
        {loading
          ? // Simple skeleton placeholders while loading
            Array.from({ length: 4 }).map((_, i) => (
              <div className="stats__item stats__item--skeleton" key={i}>
                <span className="stats__number stats__skeleton-bar" />
                <span className="stats__label stats__skeleton-bar stats__skeleton-bar--sm" />
              </div>
            ))
          : stats.map((stat) => (
              <div className="stats__item" key={stat.id}>
                <span className="stats__number">{stat.number}</span>
                <span className="stats__label">{stat.label}</span>
              </div>
            ))}
      </div>
    </section>
  );
}
