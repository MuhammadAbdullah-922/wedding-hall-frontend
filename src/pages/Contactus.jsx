
import { Helmet } from "react-helmet-async";
import PageHeader from "../components/layout/PageHeader";
import Contact from "../components/sections/Contact";

export default function ContactUs() {
  return (
    <>
      <Helmet>
        <title>Contact Us | Blessings Marquee & Events</title>

        <meta
          name="description"
          content="Contact Blessings Marquee & Events to plan your wedding, mehndi, nikkah, baraat, walima or special event. Our team is ready to help you."
        />

        <meta
          name="keywords"
          content="Contact Blessings Marquee, wedding venue contact, banquet hall contact, event booking, wedding marquee"
        />

        <meta name="robots" content="index, follow" />

        <link
          rel="canonical"
          href="https://blessingsmarqueandevents.com/contact"
        />
      </Helmet>

      <PageHeader
        eyebrow="Get Help"
        title="Contact Us"
        subtitle="Tell us about your event and our team will reach out shortly."
      />

      <Contact />
    </>
  );
}

