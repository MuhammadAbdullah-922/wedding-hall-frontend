
import { Helmet } from "react-helmet-async";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Services from "../components/sections/Services";
import Gallery from "../components/sections/Gallery";
import Testimonials from "../components/sections/Testimonials";
import ReviewForm from "../components/sections/ReviewForm";
import Contact from "../components/sections/Contact";
import Insights from "../components/sections/Insights";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>
          Blessings Marquee & Events | Wedding Marquee & Banquet Hall
        </title>

        <meta
          name="description"
          content="Blessings Marquee & Events is a premier wedding marquee and banquet hall offering elegant venues for weddings, mehndi, nikkah, baraat, walima and special events."
        />

        <meta
          name="keywords"
          content="Blessings Marquee & Events, wedding marquee, banquet hall, wedding venue, marquee, mehndi, nikkah, baraat, walima, event venue, wedding hall"
        />

        <meta name="robots" content="index, follow" />

        <link
          rel="canonical"
          href="https://blessingsmarqueandevents.com/"
        />
      </Helmet>

      <Hero />

      <About />

      <Services />

      <Gallery />

      <Testimonials />

      <section className="section--soft">
        <div className="container" style={{ maxWidth: "560px" }}>
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <span className="section__eyebrow">Get Help</span>

            <h2 className="section__title">Share Your Experience</h2>

            <p className="section__sub">
              Celebrated an event with us? We'd love to hear about it.
            </p>
          </div>

          <ReviewForm />
        </div>
      </section>

      <Contact />

      <Insights />
    </>
  );
}
