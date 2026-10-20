import { useState } from "react";
import "../../styles/contact.css";

const initialForm = { firstName: "", lastName: "", email: "", message: "" };

const MAP_EMBED_SRC =
  "https://www.google.com/maps?q=33.6922542,72.9835296&z=16&output=embed";
const MAP_LINK =
  "https://www.google.com/maps/dir//Blessings+Marquee,+MXRM%2BWC2,+Main+Margalla+Rd,+Golra+E-11,+Islamabad,+Pakistan/@33.6922542,72.9835296,17z";

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("https://api.blessingsmarqueandevents.com/api/contact-messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`.trim(),
          email: form.email,
          message: form.message,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        // Laravel validation errors come back as { errors: { field: [msg] } }
        const firstError = json.errors
          ? Object.values(json.errors)[0][0]
          : json.message || "Something went wrong";
        throw new Error(firstError);
      }

      setStatus("sent");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  };

  return (
    <section id="contact" className="section contact">
      <div className="container contact__inner">
        <div className="contact__form-col">
          <span className="section__eyebrow">Get Help</span>
          <h2 className="section__title">Get In Touch</h2>
          <p className="contact__sub">
            Tell us about your event and our team will reach out shortly.
          </p>

          <form className="contact__form" onSubmit={handleSubmit}>
            <div className="contact__row">
              <div className="contact__field">
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="e.g. Ayesha"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="contact__field">
                <label htmlFor="lastName">Second Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="e.g. Khan"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="contact__field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="sample@mail.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact__field">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="Your Message Here"
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <label className="contact__checkbox">
              <input type="checkbox" required />
              I agree to receive promotional updates.
            </label>

            <button
              type="submit"
              className="btn btn-primary contact__submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending..." : "Submit"}
            </button>

            {status === "sent" && (
              <p className="contact__status contact__status--ok">
                Thanks — we'll be in touch soon!
              </p>
            )}
            {status === "error" && (
              <p className="contact__status contact__status--err">
                {errorMsg || "Something went wrong, please try again."}
              </p>
            )}
          </form>
        </div>

        <div className="contact__media">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80"
            alt="Support team ready to help plan your event"
          />
        </div>
      </div>

      <div className="container contact__map-block">
        <div className="contact__map-head">
          <span className="section__eyebrow">Find Us</span>
          <h3 className="contact__map-title">Visit The Venue</h3>
          <p className="contact__sub">
            Blessings Marquee, Main Margalla Road, Golra, E-11, Islamabad.
          </p>
        </div>

        <div className="contact__map">
          <iframe
            title="Blessings Marquee location on Google Maps"
            src={MAP_EMBED_SRC}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <a
          href={MAP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline contact__map-cta"
        >
          Get Directions
        </a>
      </div>
    </section>
  );
}