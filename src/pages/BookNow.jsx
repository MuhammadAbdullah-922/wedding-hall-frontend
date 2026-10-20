
import { Helmet } from "react-helmet-async";
import PageHeader from "../components/layout/PageHeader";
import BookingForm from "../components/sections/BookingForm";

export default function BookNow() {
  return (
    <>
      <Helmet>
        <title>Book Your Event | Blessings Marquee & Events</title>

        <meta
          name="description"
          content="Book your wedding or special event at Blessings Marquee & Events. Submit your event details and our team will contact you to discuss availability and arrangements."
        />

        <meta
          name="keywords"
          content="Book Blessings Marquee, wedding booking, banquet hall booking, event booking, wedding venue booking, marquee booking"
        />

        <meta name="robots" content="index, follow" />

        <link
          rel="canonical"
          href="https://blessingsmarqueandevents.com/book"
        />
      </Helmet>

      <PageHeader
        title="Appointment"
        image="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=80"
        imageAlt="Banquet hall set up with white draped chairs"
      />

      <BookingForm />
    </>
  );
}

