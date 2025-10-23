import React, { useState, useEffect } from "react";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/store.json")
      .then((res) => res.json())
      .then((data) => setProjects(data.projects || []))
      .catch((err) => console.error("❌ Failed to load projects:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-50 via-white to-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-900 mb-4 tracking-tight">
            Our Projects & Industries
          </h1>
          <p className="text-gray-600 sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Explore our epoxy and flooring installations across industries —
            engineered for performance, safety, and aesthetic excellence.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-gray-200 rounded-2xl h-64"
                />
              ))
            : projects.map((p, i) => (
                <div
                  key={i}
                  className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden transform hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden rounded-t-2xl">
                    <img
                      src={p.img || "/images/placeholder.jpg"}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col justify-between h-48">
                    <div className="space-y-2">
                      <h3 className="text-lg sm:text-xl font-semibold text-blue-900 group-hover:text-blue-700 transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-gray-500 text-sm flex items-center gap-1">
                        📍 {p.place}
                      </p>
                      {p.category && (
                        <span className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
                          {p.category}
                        </span>
                      )}
                    </div>

                    {/* Optional Hover CTA */}
                    {p.link && (
                      <a
                        href={p.link}
                        className="mt-3 inline-block text-blue-700 font-medium hover:underline text-sm"
                      >
                        Learn More →
                      </a>
                    )}
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm p-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-blue-900 mb-2">
                      {p.title}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-3">
                      {p.desc}
                    </p>
                    <p className="text-sm sm:text-base font-medium text-blue-700">
                      📍 {p.place}
                    </p>
                  </div>
                </div>
              ))}
        </div>

        {/* Empty State */}
        {!loading && projects.length === 0 && (
          <p className="text-center text-gray-500 mt-16">
            No projects found. Please check back later.
          </p>
        )}
      </div>
    </div>
  );
}


