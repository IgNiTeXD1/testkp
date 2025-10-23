import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Photos() {
  const [photos, setPhotos] = useState([]);
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });

  useEffect(() => {
    fetch("/data/pho.json")
      .then((res) => res.json())
      .then((data) => setPhotos(data))
      .catch((err) => console.error("❌ Failed to load photo data:", err));
  }, []);

  const openLightbox = (index) => setLightbox({ open: true, index });
  const closeLightbox = () => setLightbox({ open: false, index: 0 });
  const nextPhoto = () =>
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index + 1) % photos.length,
    }));
  const prevPhoto = () =>
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index - 1 + photos.length) % photos.length,
    }));

  return (
    <main className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <section className="max-w-7xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-900 mb-4 text-center">
          Our Project Gallery
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto sm:text-lg leading-relaxed">
          Explore our recent epoxy and PU flooring projects. Every installation
          is designed for durability, chemical resistance, and visual appeal — from industrial factories to commercial showrooms.
        </p>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.length === 0
            ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-gray-200 rounded-xl h-64"
                />
              ))
            : photos.map((p, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  className="group relative bg-white rounded-xl shadow-md overflow-hidden border cursor-pointer transition-transform duration-300"
                  onClick={() => openLightbox(i)}
                >
                  <div className="relative h-56 overflow-hidden rounded-t-xl">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="p-5 flex flex-col justify-between h-48">
                    <div className="space-y-2">
                      <h3 className="text-lg sm:text-xl font-semibold text-blue-900 group-hover:text-blue-700 transition-colors">
                        {p.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">{p.desc}</p>
                      <span className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
                        ₹ {p.price} / sq ft
                      </span>
                    </div>
                    <a
                      href="/contact"
                      className="mt-3 inline-block text-center px-3 py-2 text-sm font-medium border border-blue-700 text-blue-700 rounded-lg hover:bg-blue-700 hover:text-white transition"
                    >
                      Get Quote
                    </a>
                  </div>
                </motion.div>
              ))}
        </div>

        {photos.length === 0 && (
          <p className="text-center text-gray-500 mt-10">Loading photos...</p>
        )}
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox.open && photos[lightbox.index] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-3xl w-full bg-white rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={photos[lightbox.index].image}
                alt={photos[lightbox.index].name}
                className="w-full object-contain max-h-[80vh]"
              />
              <div className="p-5">
                <h3 className="text-xl sm:text-2xl font-bold text-blue-900 mb-2">
                  {photos[lightbox.index].name}
                </h3>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  {photos[lightbox.index].desc}
                </p>
                <p className="mt-2 text-sm font-medium text-blue-700">
                  ₹ {photos[lightbox.index].price} / sq ft
                </p>
              </div>

              {/* Navigation */}
              <button
                onClick={prevPhoto}
                aria-label="Previous photo"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white transition text-lg sm:text-xl"
              >
                ◀
              </button>
              <button
                onClick={nextPhoto}
                aria-label="Next photo"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white transition text-lg sm:text-xl"
              >
                ▶
              </button>
              {/* Close */}
              <button
                onClick={closeLightbox}
                aria-label="Close lightbox"
                className="absolute top-3 right-3 bg-white/80 rounded-full p-2 hover:bg-white transition font-bold text-lg sm:text-xl"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}


