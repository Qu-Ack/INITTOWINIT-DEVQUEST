import NavBar from "./Navbar";
import Hero from "./Hero";
import AboutUs from "./AboutUs";
import HowWeWork from "./HowWeWork";
import Footer from "./Footer";

export default function LandingPage() {
  return (
    <div className="font-sans bg-white min-h-screen texr-black scroll-smooth">
      <header className="absolute top-0 left-0 w-full bg-transparent text-white z-10">
        <NavBar />
      </header>
      <main>
        <Hero />
        <HowWeWork />
        <AboutUs />
      </main>
      <Footer />
    </div>
  );
}
