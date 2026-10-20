import { useState } from "react";
import "../../styles/review-form.css";

export default function ReviewForm() {
  const [form, setForm] = useState({
    customer_name: "",
    event_type: "",
    review: "",
    rating: 5,
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("https://api.blessingsmarqueandevents.com/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message || "Something went wrong");
      }

      setStatus("success");
      setForm({ customer_name: "", event_type: "", review: "", rating: 5 });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  };

  if (status === "success") {
    return (
      <div className="review-form review-form--success">
        <h3>Thank you! 🎉</h3>
        <p>
          Your review has been submitted and will appear once our team approves it.
        </p>
      </div>
    );
  }

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h3>Share Your Experience</h3>

      <label>
        Your Name
        <input
          type="text"
          name="customer_name"
          value={form.customer_name}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Event Type (optional)
        <input
          type="text"
          name="event_type"
          placeholder="e.g. Bride, Groom's Family, Event Host"
          value={form.event_type}
          onChange={handleChange}
        />
      </label>

      <label>
        Rating
        <select name="rating" value={form.rating} onChange={handleChange}>
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} Star{r > 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </label>

      <label>
        Your Review
        <textarea
          name="review"
          rows={4}
          value={form.review}
          onChange={handleChange}
          required
        />
      </label>

      {status === "error" && (
        <p className="review-form__error">{errorMsg}</p>
      )}

      <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
        {status === "sending" ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
