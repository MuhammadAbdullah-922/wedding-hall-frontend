import { useState, useEffect } from "react";
import "../../styles/about.css";
import aboutImage from "../layout/assets/stage5.jpeg";

const API_BASE = "https://api.blessingsmarqueandevents.com";

export default function About() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/stats`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load stats");
        }
        return res.json();
      })
      .then((json) => {
        setStats(json?.data ?? []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Stats loading error:", error);
        setLoading(false);
      });
  }, []);

  return (
    <section id="about" className="section about">
      <div className="container about__inner">

        <div className="about__media">
          <img
            src={aboutImage}
            alt="Banquet hall decorated with floral arches for a wedding"
          />
        </div>

        <div className="about__content">
          <span className="section__eyebrow">About Us</span>

          <h2 className="section__title">
            Where Your Wedding Story Comes to Life
          </h2>

          <p className="about__text">
            At Blessings, we take pride in giving every family a hall that feels
            warm, grand, and entirely their own. From an intimate mehndi to a
            full baraat night, our team handles the details so you can enjoy
            every moment.
          </p>

          <p className="about__text">
            With a dedicated in-house team for décor, catering and coordination,
            we've spent over a decade turning ordinary evenings into
            unforgettable ones.
          </p>

          <div className="about__stats">
            {loading ? (
              <p>Loading...</p>
            ) : (
              stats.map((stat) => (
                <div className="about__stat" key={stat.id}>
                  <span className="about__stat-number">
                    {stat.number}
                  </span>

                  <span className="about__stat-label">
                    {stat.label}
                  </span>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
