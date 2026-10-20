import { useCallback, useEffect, useRef, useState } from "react";
import "../../styles/Menu.css";

// Laravel backend base URL — set via .env (VITE_API_URL)
const API_BASE = import.meta.env.VITE_API_URL || "https://api.blessingsmarqueandevents.com";

export default function Menus() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  const triggerRef = useRef(null);
  const closeButtonRef = useRef(null);
  const isOpen = activeIndex !== null;

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMenuItems() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${API_BASE}/api/menu-items?status=active&per_page=100`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }

        const json = await res.json();

        // Laravel paginate() response -> actual array lives in data.data
        const list = json?.data?.data ?? [];

        const mapped = list.map((item) => ({
          id: item.id,
          image: item.image
            ? item.image.startsWith("http")
              ? item.image
              : `${API_BASE}/storage/${item.image}`
            : null,
        }));

        setItems(mapped);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Unable to load the menu. Please try again.");
          console.error("Menu items fetch error:", err);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchMenuItems();

    return () => controller.abort();
  }, []);

  // Only images that actually loaded can be opened/navigated in the lightbox.
  const viewableItems = items.filter((item) => item.image);

  const openAt = (index) => (event) => {
    triggerRef.current = event.currentTarget;
    setActiveIndex(index);
  };

  const close = useCallback(() => {
    setActiveIndex(null);
    if (triggerRef.current) triggerRef.current.focus();
  }, []);

  const showPrev = useCallback(() => {
    setActiveIndex((i) =>
      i === null ? i : (i - 1 + viewableItems.length) % viewableItems.length
    );
  }, [viewableItems.length]);

  const showNext = useCallback(() => {
    setActiveIndex((i) => (i === null ? i : (i + 1) % viewableItems.length));
  }, [viewableItems.length]);

  // Keyboard controls while the lightbox is open.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close, showPrev, showNext]);

  // Lock page scroll and move focus into the dialog while it's open.
  useEffect(() => {
    if (!isOpen) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = overflow;
    };
  }, [isOpen]);

  return (
    <section id="menus" className="section menu">
      <div className="container">
        <div className="section__head">
          <span className="section__eyebrow">Our Menus</span>
          <h2 className="section__title">A Selection Crafted For Every Occasion</h2>
        </div>

        {loading && (
          <div className="menu__status">
            <p>Loading menu...</p>
          </div>
        )}

        {!loading && error && (
          <div className="menu__status menu__status--error">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <div className="menu__status">
            <p>No menu images found.</p>
          </div>
        )}

        {!loading && !error && items.length > 0 && (
          <div className="menu__grid">
            {items.map((item) => {
              const viewableIndex = viewableItems.findIndex((v) => v.id === item.id);

              return (
                <div className="menu-card" key={item.id}>
                  {item.image ? (
                    <button
                      type="button"
                      className="menu-card__image menu-card__image--clickable"
                      onClick={openAt(viewableIndex)}
                      aria-haspopup="dialog"
                      aria-label={`Open menu photo ${viewableIndex + 1} of ${viewableItems.length}`}
                    >
                      <img src={item.image} alt="Menu" loading="lazy" />
                    </button>
                  ) : (
                    <div className="menu-card__image">
                      <div className="menu-card__image-placeholder" aria-hidden="true" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {isOpen && (
        <MenuLightbox
          item={viewableItems[activeIndex]}
          index={activeIndex}
          total={viewableItems.length}
          onClose={close}
          onPrev={showPrev}
          onNext={showNext}
          closeButtonRef={closeButtonRef}
        />
      )}
    </section>
  );
}

function MenuLightbox({ item, index, total, onClose, onPrev, onNext, closeButtonRef }) {
  return (
    <div
      className="menu-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`Menu photo ${index + 1} of ${total}`}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <button
        type="button"
        className="menu-lightbox__close"
        onClick={onClose}
        ref={closeButtonRef}
        aria-label="Close photo"
      >
        <CloseIcon />
      </button>

      {total > 1 && (
        <button
          type="button"
          className="menu-lightbox__nav menu-lightbox__nav--prev"
          onClick={onPrev}
          aria-label="Previous photo"
        >
          <ChevronIcon direction="left" />
        </button>
      )}

      <figure className="menu-lightbox__figure">
        <img key={item.image} src={item.image} alt="Menu" className="menu-lightbox__image" />
      </figure>

      {total > 1 && (
        <button
          type="button"
          className="menu-lightbox__nav menu-lightbox__nav--next"
          onClick={onNext}
          aria-label="Next photo"
        >
          <ChevronIcon direction="right" />
        </button>
      )}

      {total > 1 && (
        <p className="menu-lightbox__counter">
          {index + 1} / {total}
        </p>
      )}
    </div>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M4 4L18 18M18 4L4 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ChevronIcon({ direction }) {
  const d = direction === "left" ? "M14 4L6 12L14 20" : "M8 4L16 12L8 20";
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={d} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}