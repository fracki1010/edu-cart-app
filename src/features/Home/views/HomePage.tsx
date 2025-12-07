import React from "react";
import { Link } from "react-router";

interface Feature {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  linkText: string;
}

const features: Feature[] = [
  {
    id: 1,
    title: "Study Materials",
    description: "Essential books and resources for your learning journey",
    image: "https://images.pexels.com/photos/5185074/pexels-photo-5185074.jpeg",
    link: "/products",
    linkText: "Browse Collection",
  },
  {
    id: 2,
    title: "Tech Tools",
    description: "Devices to enhance your learning experience",
    image: "https://images.pexels.com/photos/6968105/pexels-photo-6968105.jpeg",
    link: "/products",
    linkText: "Explore Gadgets",
  },
  {
    id: 3,
    title: "Workspace Setup",
    description: "Everything you need for a productive study space",
    image: "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg",
    link: "/products",
    linkText: "View Options",
  },
];

export const HomePage: React.FC = () => {
  return (
    <main className="flex-grow container mx-auto px-4 py-8 bg-gray-50 dark:bg-neutral-900 transition-colors">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-indigo-700 dark:text-indigo-400 mb-4">
          Welcome to EduCart
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Your smart learning resources marketplace
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
          >
            <img
              src={feature.image}
              alt={feature.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {feature.description}
              </p>
              <Link
                to={feature.link}
                className="inline-block bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-400 transition-colors"
              >
                {feature.linkText}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};
