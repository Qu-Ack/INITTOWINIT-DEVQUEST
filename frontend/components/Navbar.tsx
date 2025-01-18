import { Button } from "@/components/ui/button";

export default function NavBar() {
  const navOptions = [
    { title: "Home", href: "#hero" },
    { title: "How We Work", href: "#how-we-work" },
    { title: "About Us", href: "#about-us" },
    { title: "Contact", href: "#contact" },
  ];

  function handleLogin() {
    window.location.href = "http://localhost:8080/auth/google/start/";
  }

  return (
    <nav className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
      <div className="text-3xl text-lime-400">VedAssist</div>
      <ul className="flex h-full">
        {navOptions.map((option) => (
          <li key={option.title} className="h-full">
            <a
              href={option.href}
              className="h-full px-6 flex items-center text-lg justify-center text-white transition-colors duration-300 ease-in-out bg-transparent hover:bg-white hover:text-gray-900"
            >
              {option.title}
            </a>
          </li>
        ))}
      </ul>
      <Button
        onClick={handleLogin}
        className="bg-lime-400 text-gray-900 rounded-full border-2 border-lime-400 hover:bg-gray-900 hover:text-white hover:border-white flex items-center gap-2"
      >
        Sign Up With Google
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
