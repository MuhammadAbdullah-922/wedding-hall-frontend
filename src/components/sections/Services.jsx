import { useState, useEffect, useRef } from "react";
import "../../styles/services.css";

// pehle 4 services ki images (purani wali)
import weddingImg from "../layout/assets/front2.jpeg";
import cateringImg from "../layout/assets/stage6.jpeg";
import decorImg from "../layout/assets/stage3.jpeg";
import soundImg from "../layout/assets/stage5.jpeg";

// agli 4 services ki nayi images
import img5 from "../layout/assets/mehndi.jpeg";
import img6 from "../layout/assets/hall45.jpeg";
import img7 from "../layout/assets/flowers.jpeg";
import img8 from "../layout/assets/light2.jpeg";

const SERVICES = [
  {
    title: "Wedding Planning",
    text: "End-to-end coordination for your big day, perfectly planned.",
    img: weddingImg,
  },
  {
    title: "Catering & Menu",
    text: "Signature dishes and live counters, tailored to your taste.",
    img: cateringImg,
  },
  {
    title: "Hall Decor",
    text: "Floral arches, lighting and stage design, done with elegance.",
    img: decorImg,
  },
  {
    title: "Sound & Lighting",
    text: "Full stage sound and ambient lighting for every event.",
    img: soundImg,
  },
  {
    title: "Mehndi & Nikkah",
    text: "Vibrant setups for mehndi and traditional nikkah ceremonies.",
    img: img5,
  },
  {
    title: "Walima Setup",
    text: "Elegant walima arrangements tailored to your family's taste.",
    img: img6,
  },
  {
    title: "Corporate Events",
    text: "Professional venue and services for meetings and gatherings.",
    img: img7,
  },
  {
    title: "Lights Setup",
    text: "Beautifully designed stage backdrops for every occasion.",
    img: img8,
  },
];

function getVisibleCount() {
  if (typeof window === "undefined") return 4;
  const w = window.innerWidth;
  if (w <= 575) return 1;
  if (w <= 991) return 2;
  return 4;
}

// services ko groups (pages) mein todne wala helper
function chunkServices(list, size) {
  const groups = [];
  for (let i = 0; i < list.length; i += size) {
    groups.push(list.slice(i, i + size));
  }
  return groups;
}

export default function Services() {
  const [visible, setVisible] = useState(getVisibleCount());
  const [page, setPage] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const groups = chunkServices(SERVICES, visible);
  const totalPages = groups.length;

  useEffect(() => {
    const handleResize = () => {
      setVisible(getVisibleCount());
      setPage(0);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (totalPages <= 1) return;
    const timer = setInterval(() => {
      setPage((prev) => (prev + 1) % totalPages);
    }, 3000);
    return () => clearInterval(timer);
  }, [totalPages]);

  const goTo = (i) => setPage(i);
  const nextPage = () => setPage((prev) => (prev + 1) % totalPages);
  const prevPage = () =>
    setPage((prev) => (prev - 1 + totalPages) % totalPages);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 40;
    if (diff > threshold) nextPage();
    else if (diff < -threshold) prevPage();
  };

  return (
    <section id="services" className="section services">
      <div className="container">
        <div className="section__head">
          <span className="section__eyebrow">Our Services</span>
          <h2 className="section__title">Everything Your Big Day Needs</h2>
        </div>

        <div
          className="services__slider"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="services__track"
            style={{
              transform: `translateX(-${page * 100}%)`,
            }}
          >
            {groups.map((group, gIndex) => (
              <div
                className="services__page"
                key={gIndex}
                style={{
                  gridTemplateColumns: `repeat(${visible}, 1fr)`,
                }}
              >
                {group.map((service) => (
                  <article className="service-card" key={service.title}>
                    <div className="service-card__media">
                      <img src={service.img} alt={service.title} />
                    </div>
                    <h3 className="service-card__title">{service.title}</h3>
                    <p className="service-card__text">{service.text}</p>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>

        {totalPages > 1 && (
          <div className="services__dots">
            {groups.map((_, i) => (
              <button
                key={i}
                className={`dot ${i === page ? "dot--active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Page ${i + 1}`}
              />
            ))}
          </div>
        )}

        <div className="section__foot">
          <a href="/events" className="btn btn-outline">
            All Services
          </a>
        </div>
      </div>
    </section>
  );
}