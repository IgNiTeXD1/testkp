import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Photos() {
  const [photos, setPhotos] = useState([]);
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetch("/data/pho.json")
      .then((res) => res.json())
      .then((data) => setPhotos(data))
      .catch((err) => console.error("❌ Failed to load photo data:", err));
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(photos.map((p) => p.category || "Uncategorized"));
    return ["All", ...cats];
  }, [photos]);

  const filteredPhotos = useMemo(() => {
    if (activeCategory === "All") return photos;
    return photos.filter((p) => p.category === activeCategory);
  }, [photos, activeCategory]);

  const openLightbox = (index) => setLightbox({ open: true, index });
  const closeLightbox = () => setLightbox({ open: false, index: 0 });
  const nextPhoto = () =>
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index + 1) % filteredPhotos.length,
    }));
  const prevPhoto = () =>
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index - 1 + filteredPhotos.length) % filteredPhotos.length,
    }));

  return (
    <main className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <section className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0b2b4a]">
            Project Gallery
          </h1>
          <p className="text-gray-600 mt-3 max-w-3xl mx-auto sm:text-lg leading-relaxed">
            Explore our epoxy and PU flooring installations across industries —
            from cleanrooms to warehouses. Every floor reflects durability,
            safety, and craftsmanship.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full border text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-[#0b2b4a] text-white border-[#0b2b4a] shadow-md"
                  : "bg-white text-[#0b2b4a] border-gray-200 hover:bg-gray-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
            aria-label="Project gallery"
          >
            {filteredPhotos.length === 0 ? (
              <p className="text-center text-gray-500 col-span-full mt-6">
                No photos found for this category.
              </p>
            ) : (
              filteredPhotos.map((p, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4 }}
                  className="relative group overflow-hidden rounded-2xl shadow-md bg-white border cursor-pointer break-inside-avoid"
                  onClick={() => openLightbox(i)}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-lg font-semibold">{p.name}</h3>
                    <p className="text-sm text-gray-200 line-clamp-2">
                      {p.desc}
                    </p>
                    {p.price && (
                      <span className="inline-block mt-2 bg-sky-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                        ₹ {p.price} / sq ft
                      </span>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox.open && filteredPhotos[lightbox.index] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-6"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0.8 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl bg-white rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filteredPhotos[lightbox.index].image}
                alt={filteredPhotos[lightbox.index].name}
                className="w-full object-contain max-h-[80vh]"
              />
              <div className="p-5 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-[#0b2b4a] mb-2">
                  {filteredPhotos[lightbox.index].name}
                </h3>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  {filteredPhotos[lightbox.index].desc}
                </p>
                {filteredPhotos[lightbox.index].price && (
                  <p className="mt-3 text-sm font-medium text-sky-700">
                    ₹ {filteredPhotos[lightbox.index].price} / sq ft
                  </p>
                )}
              </div>

              {/* Nav Buttons */}
              <button
                onClick={prevPhoto}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-3 hover:bg-white transition"
              >
                ◀
              </button>
              <button
                onClick={nextPhoto}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-3 hover:bg-white transition"
              >
                ▶
              </button>

              {/* Close Button */}
              <button
                onClick={closeLightbox}
                aria-label="Close lightbox"
                className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full p-3 hover:bg-white transition font-bold"
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




