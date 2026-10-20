
import { Helmet } from "react-helmet-async";
import PageHeader from "../components/layout/PageHeader";
import About from "../components/sections/About";
import Brands from "../components/sections/Brands";
import Gallery from "../components/sections/Gallery";
import Stats from "../components/sections/Stats";
import Testimonials from "../components/sections/Testimonials";
import aboutImage from "../components/layout/assets/stage5.jpeg";

export default function AboutUs() {
  return (
    <>
      <Helmet>
        <title>About Us | Blessings Marquee & Events</title>

        <meta
          name="description"
          content="Learn about Blessings Marquee & Events, a premier wedding marquee and banquet hall offering elegant venues, quality services and unforgettable event experiences."
        />

        <meta
          name="keywords"
          content="About Blessings Marquee, wedding marquee, banquet hall, wedding venue, event venue, wedding events"
        />

        <meta name="robots" content="index, follow" />

        <link
          rel="canonical"
          href="https://blessingsmarqueandevents.com/about"
        />
      </Helmet>

      <PageHeader
        title="About Us"
        image={aboutImage}
        imageAlt="Banquet hall set up with white draped chairs"
      />

      <About />
      <Brands />
      <Gallery />
      <Stats />
      <Testimonials />
    </>
  );
}
