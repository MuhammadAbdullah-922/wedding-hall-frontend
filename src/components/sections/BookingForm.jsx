import { useState, useEffect } from "react";
import "../../styles/bookingForm.css";

const API_BASE = "https://api.blessingsmarqueandevents.com";

const initialForm = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  packageId: "",
  eventDate: "",
  timeSlot: "evening",
  message: "",
};

export default function BookingForm() {
  const [packages, setPackages] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/api/packages?status=active`)
      .then((res) => res.json())
      .then((json) => setPackages(json?.data?.data ?? []))
      .catch(() => setPackages([]));
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      // 1) Find a venue to attach the booking to (single-hall setup: use the first one)
      const venueRes = await fetch(`${API_BASE}/api/venues`);
      const venueJson = await venueRes.json();
      const venue = venueJson?.data?.data?.[0] ?? venueJson?.data?.[0];
      if (!venue) throw new Error("No venue is configured yet.");

      // 2) Create (or reuse) the customer record
      // Customer model only has a single "name" column (not first/last name
      // separately), so we combine the two fields the form collects.
      const fullName = `${form.firstName} ${form.lastName}`.trim();

      const customerRes = await fetch(`${API_BASE}/api/customers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          phone: form.phone,
          email: form.email,
        }),
      });
      const customerJson = await customerRes.json();
      if (!customerRes.ok) {
        throw new Error(customerJson?.message || "Could not save your details.");
      }
      const customerId = customerJson?.data?.id;

      // 3) Work out the total from the selected package (0 if none chosen)
      const selectedPackage = packages.find((p) => String(p.id) === form.packageId);

      // 4) Create the booking
      const bookingRes = await fetch(`${API_BASE}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_id: customerId,
          venue_id: venue.id,
          package_id: form.packageId || null,
          event_date: form.eventDate,
          time_slot: form.timeSlot,
          guests: selectedPackage?.guest_limit || 1,
          special_requirements: form.message,
          total_amount: selectedPackage?.price || 0,
        }),
      });
      const bookingJson = await bookingRes.json();
      if (!bookingRes.ok) {
        throw new Error(bookingJson?.message || "Could not create the booking.");
      }

      setStatus("sent");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  };

  return (
    <section id="booking" className="section booking">
      <div className="container booking__inner">
        <div className="booking__form-col">
          <h2 className="booking__title">Book a Service</h2>
          <p className="booking__sub">
            Our friendly team would like to hear from you!
          </p>

          <form className="booking__form" onSubmit={handleSubmit}>
            <div className="booking__row">
              <div className="booking__field">
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Enter First Name"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="booking__field">
                <label htmlFor="lastName">Second Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Enter Last Name"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="booking__field">
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+1 234 456 6789"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="booking__field">
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

            <div className="booking__row booking__row--three">
              <div className="booking__field">
                <label htmlFor="packageId">Service Name</label>
                <select
                  id="packageId"
                  name="packageId"
                  value={form.packageId}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select a package
                  </option>
                  {packages.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="booking__field">
                <label htmlFor="eventDate">Date</label>
                <input
                  id="eventDate"
                  name="eventDate"
                  type="date"
                  value={form.eventDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="booking__field">
                <label htmlFor="timeSlot">Time</label>
                <select
                  id="timeSlot"
                  name="timeSlot"
                  value={form.timeSlot}
                  onChange={handleChange}
                >
                  <option value="morning">Morning</option>
                  <option value="evening">Evening</option>
                  <option value="full_day">Full Day</option>
                </select>
              </div>
            </div>

            <div className="booking__field">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="Your Message Here"
                value={form.message}
                onChange={handleChange}
              />
            </div>

            <label className="booking__checkbox">
              <input type="checkbox" required />
              I agree to receiving promotional updates.
            </label>

            <button
              type="submit"
              className="btn btn-primary booking__submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Submitting..." : "Submit"}
            </button>

            {status === "sent" && (
              <p className="booking__status booking__status--ok">
                Thanks! Your appointment request has been received.
              </p>
            )}
            {status === "error" && (
              <p className="booking__status booking__status--err">{errorMsg}</p>
            )}
          </form>
        </div>

        <div className="booking__media">
          <img
            src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80"
            alt="Floral decorated banquet table setting"
          />
        </div>
      </div>
    </section>
  );
}
