import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/Contactus";
import BookNow from "./pages/BookNow";
import ServiceDetails from "./pages/Servicedetails";
import GalleryPage from "./pages/GalleryPage";
import MenuPage from "./pages/Menupage";
import Events from "./pages/Events";
import EventTypeDetail from "./pages/Eventtypedetail";
import Venues from "./pages/Venues";
import VenueDetail from "./pages/Venuedetail";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/book" element={<BookNow />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/menus" element={<MenuPage />} />
          <Route path="/services/:id" element={<ServiceDetails />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventTypeDetail />} />
          <Route path="/venues" element={<Venues />} />
          <Route path="/venues/:id" element={<VenueDetail />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default App;