import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const team = [
    {
      name: "Daksh Sangal",
      url: "https://github.com/Qu-Ack/",
    },
    {
      name: "Gourang Jain",
      url: "https://github.com/Gourang12332",
    },
    {
      name: "Ashmit Singh",
      url: "https://github.com/Ashmit0405",
    },
    {
      name: "Ayush Kumar",
      url: "https://github.com/kumar-ayush101",
    },
    {
      name: "Sarthak Singh Tariyal",
      url: "https://github.com/SKjustSK/",
    },
  ];

  const navOptions = [
    { title: "Home", href: "#hero" },
    { title: "How We Work", href: "#how-we-work" },
    { title: "About Us", href: "#about-us" },
    { title: "Contact", href: "#contact" },
  ];

  return (
    <footer
      id="contact"
      className="bg-gray-900 text-white py-12 font-inter w-full"
    >
      <div className="container mx-auto px-4 flex w-full justify-between">
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8"> */}
        {/* Form Section */}
        <div className="flex flex-col gap-2 w-80">
          <h3 className="text-lg font-semibold">Stay Connected</h3>
          <form className="">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 mb-4"
            />
            <Button
              type="submit"
              size="sm"
              className="bg-lime-400 text-gray-900 rounded-full border-2 border-lime-400 hover:bg-gray-900 hover:text-white hover:border-white"
            >
              Subscribe
            </Button>
          </form>
        </div>

        <div className="flex gap-40">
          <nav className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {navOptions.map((option) => {
                return (
                  <li key={option.title}>
                    <Link
                      href={option.href}
                      className="hover:text-gray-300 transition-colors"
                    >
                      {option.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <nav className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-2">
              {team.map((member) => {
                return (
                  <li key={member.name}>
                    <Link
                      href={member.url}
                      className="hover:text-gray-300 transition-colors"
                    >
                      {member.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex flex-col items-end space-y-4">
            <Link href="/" className="inline-block">
              <div className="text-lime-400 font-bold text-2xl">VedAssist</div>
            </Link>
            <p className="text-sm text-gray-400">
              © 2025 VedAssist. All rights reserved.
            </p>
          </div>
        </div>
      </div>
      {/* </div> */}
    </footer>
  );
}
