import Image from "next/image";
import { Button } from "@/components/ui/button";

function NavBar() {
  const navOptions = [
    { title: "Home" },
    { title: "How we Work" },
    { title: "About Us" },
    { title: "Contact" },
  ];

  return (
    <nav className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
      <div className="text-3xl text-lime-400">AyurVedu</div>
      <ul className="flex h-full">
        {navOptions.map((option) => (
          <li key={option.title} className="h-full">
            <button className="h-full px-6 flex items-center text-lg justify-center text-white transition-colors duration-300 ease-in-out bg-transparent hover:bg-white hover:text-gray-900">
              {option.title}
            </button>
          </li>
        ))}
      </ul>
      <Button className="bg-lime-400 text-gray-900 rounded-full border-2 border-lime-400 hover:bg-gray-900 hover:text-white hover:border-white flex items-center gap-2">
        Register Now
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
          />
        </svg>
      </Button>
    </nav>
  );
}

function Hero() {
  return (
    <section
      className="relative h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: "url('/ayurveda.webp')",
      }}
    >
      {/* Background overlay with blur */}
      <div className="absolute inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-0"></div>

      {/* Text content above the blur */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex relative z-10">
        <div className="text-white -mt-16">
          <h4 className="flex gap-2 text-lg items-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <div>Constul AI powered Ayurveda, anywhere, anytime.</div>
          </h4>
          <h1 className="text-7xl mb-6">Health Insights at your Fingertips</h1>
          <h6 className="text-xl mb-8">
            Access fast accurate health consulations from comfort of your home.
            Our platform connects you with the best AI models to analyze your
            health
          </h6>
          <Button className="bg-lime-400 text-gray-900 text-lg h-12 px-8 rounded-full hover:bg-lime-500 hover:translate-x-4 transition-transform duration-300 ease-in-out flex items-center">
            Get your free consultation now!
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default function LandingPage() {
  return (
    <div className="font-sans bg-white min-h-screen texr-black">
      <header className="absolute top-0 left-0 w-full bg-gray-900 text-white z-10">
        <NavBar />
      </header>
      <main>
        <Hero />
        {/* <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <section className="mt-8">
            <h2 className="text-2xl font-semibold">How it works</h2>
            <p className="mt-4">
              This section will explain how the application functions.
            </p>
          </section>
        </div> */}
      </main>
      {/* <footer>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">Footer</div>
      </footer> */}
    </div>
  );
}
