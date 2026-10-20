import { useState } from "react";
import "../../styles/footer.css";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(""); // "success" | "error" | ""
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    setMessage("");

    try {
      const res = await fetch("https://api.blessingsmarqueandevents.com/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const json = await res.json();

      if (!res.ok) {
        const firstError = json.errors
          ? Object.values(json.errors)[0][0]
          : json.message || "Something went wrong";
        throw new Error(firstError);
      }

      setStatus("success");
      setMessage(json.message || "Subscribed successfully!");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="footer">
      <div className="container footer__top">
        <div className="footer__brand">
          <span className="footer__logo">Blessings</span>
          <p>Weekly planning tips straight to your inbox.</p>
          <form className="footer__newsletter" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
          {message && (
            <p
              style={{
                marginTop: "8px",
                fontSize: "0.85rem",
                color: status === "success" ? "#4ade80" : "#f87171",
              }}
            >
              {message}
            </p>
          )}
        </div>

        <div className="footer__col">
          <h4>Information</h4>
          <p> Address: MXRM+WC2, Main Margalla Rd, Golra E-11, Islamabad.</p>
          <p>Phone-number: 0300-5140302</p>
        </div>

        <div className="footer__col">
          <h4>Our Services</h4>
          <ul>
            <li>Wedding Planning</li>
            <li>Catering &amp; Menu</li>
            <li>Hall Decor</li>
            <li>Sound &amp; Lighting</li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/gallery">Gallery</a></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Working Hours</h4>
          <p>11:00 AM – 11:00 PM</p>
          <p>Monday – Sunday</p>
        </div>
      </div>

      <div className="container footer__bottom">
        <div className="footer__social">
          <a
            href="https://www.facebook.com/blessingsmarquee/"
            aria-label="Facebook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/blessingsmarquee/"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
        </div>
        <p>© 2026 Blessings. All rights reserved.</p>
      </div>
    </footer>
  );
}