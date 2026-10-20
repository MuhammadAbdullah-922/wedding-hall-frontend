import { useEffect, useState } from "react";
import "../../styles/gallery.css";

const API_BASE = import.meta.env.VITE_API_URL || "https://api.blessingsmarqueandevents.com";
const AREA_PATTERN = ["a", "b", "c", "d"];

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(null); // <-- lightbox state

  useEffect(() => {
    const controller = new AbortController();

    async function fetchGallery() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_BASE}/api/gallery?featured=1&per_page=4`, {
          signal: controller.signal,
        });

        if (!res.ok) throw new Error(`Server error: ${res.status}`);

        const json = await res.json();
        const items = json?.data?.data ?? [];

        const mapped = items.map((item, index) => ({
          id: item.id,
          area: AREA_PATTERN[index % AREA_PATTERN.length],
          alt: item.caption || "Event gallery image",
          src: item.image_path?.startsWith("http")
            ? item.image_path
            : `${API_BASE}/storage/${item.image_path}`,
        }));

        setImages(mapped);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Unable to load the gallery. Please try again.");
          console.error("Gallery fetch error:", err);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchGallery();
    return () => controller.abort();
  }, []);

  // Close lightbox on Escape key
  useEffect(() => {
    if (!activeImage) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setActiveImage(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeImage]);

  return (
    <section id="gallery" className="section gallery">
      <div className="container">
        <div className="section__head">
          <span className="section__eyebrow">Events Gallery</span>
          <h2 className="section__title">Moments We've Helped Create</h2>
        </div>

        {loading && (
          <div className="gallery__status">
            <p>Loading gallery...</p>
          </div>
        )}

        {!loading && error && (
          <div className="gallery__status gallery__status--error">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && images.length === 0 && (
          <div className="gallery__status">
            <p>No images have been added yet.</p>
          </div>
        )}

        {!loading && !error && images.length > 0 && (
          <div className="gallery__grid">
            {images.map((img) => (
              <div
                className={`gallery__item gallery__item--${img.area}`}
                key={img.id}
                onClick={() => setActiveImage(img)}
              >
                <img src={img.src} alt={img.alt} loading="lazy" />
              </div>
            ))}
          </div>
        )}
      </div>

      {activeImage && (
        <div
          className="gallery__lightbox"
          onClick={() => setActiveImage(null)} // click outside image closes it
        >
          <button
            className="gallery__lightbox-close"
            onClick={(e) => {
              e.stopPropagation();
              setActiveImage(null);
            }}
            aria-label="Close"
          >
            &times;
          </button>
          <img
            src={activeImage.src}
            alt={activeImage.alt}
            className="gallery__lightbox-img"
            onClick={(e) => e.stopPropagation()} // image pe click se close na ho
          />
        </div>
      )}
    </section>
  );
}