import GalleryFull from "../components/sections/Gallery";
import galleryHeroImage from "../components/layout/assets/lights.jpeg";
import "../styles/gallerypage.css";
import { Helmet } from "react-helmet-async";

export default function GalleryPage() {
  return (
    
    <>
    <Helmet>
  <title>Gallery | Blessings Marquee & Events</title>

  <meta
    name="description"
    content="Explore the gallery of Blessings Marquee & Events, featuring weddings, mehndi, nikkah, baraat, walima and special events."
  />

  <link
    rel="canonical"
    href="https://blessingsmarqueandevents.com/gallery"
  />
</Helmet>
      <section
        className="gallery-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(20, 15, 10, 0.55), rgba(20, 15, 10, 0.55)), url(${galleryHeroImage})`,
        }}
      >
        <div className="container gallery-hero__inner">
          <h1 className="gallery-hero__title">Our Gallery</h1>
          <span className="gallery-hero__divider" aria-hidden="true" />
          <p className="gallery-hero__subtitle">
            Explore the beautiful moments, elegant décor, and unforgettable
            celebrations at Blessings.
          </p>
        </div>
      </section>

      <GalleryFull />

      <section className="gallery-cta">
        <div className="container gallery-cta__inner">
          <div>
            <h2 className="gallery-cta__title">
              Ready to Celebrate Your Special Day?
            </h2>
            <p className="gallery-cta__sub">
              Let us make your moments unforgettable.
            </p>
          </div>
          <div className="gallery-cta__actions">
            <a href="/contact" className="btn btn-outline">
              Contact Us
            </a>
            <a href="/book" className="btn btn-primary">
              Book Your Event
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
