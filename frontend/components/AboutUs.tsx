import React from "react";
import Image from "next/image";

const AboutUs = () => {
  const teamMembers = [
    { id: 1, name: "Daksh Sangal", image: "/daksh.jpeg" },
    { id: 2, name: "Ashmit Singh", image: "/ashmit.jpeg" },
    { id: 3, name: "Sarthak Singh Tariyal", image: "/sarthak.jpeg" },
    { id: 4, name: "Gourang Jain", image: "/gourang.jpeg" },
    { id: 5, name: "Ayush Kumar", image: "/ayushphoto.jpg" },
  ];

  return (
    <div
      id="about-us"
      className="bg-gray-100 min-h-screen flex flex-col items-center py-10 justify-center gap-10"
    >
      {/* Main Heading */}
      <h1 className="text-6xl font-bold text-center text-gray-800">About Us</h1>
      {/* Team Name */}
      <p className="text-4xl font-semibold text-lime-600 text-center -mt-8 mb-10">
        INIT TO WIN IT
      </p>
      {/* Team Members */}
      <div className="flex flex-wrap justify-center gap-8">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white shadow-lg rounded-lg p-6 w-72 h-96 text-center hover:scale-105 transform transition duration-300"
          >
            {/* Image Container */}
            <div className="w-full h-72 overflow-hidden rounded-lg mb-4">
              <Image
                src={member.image}
                alt={member.name}
                width={192}
                height={192}
                className="object-cover w-full h-full"
              />
            </div>
            <h2 className="text-lg font-semibold text-gray-700">
              {member.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
