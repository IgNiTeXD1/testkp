import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";

export default function Photos() {
  const [photos, setPhotos] = useState([]);
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });
  const [activeCategory, setActiveCategory] = useState("All");

  // -----------------------------
  // Data loading
  // -----------------------------
  useEffect(() => {
    fetch("/data/pho.json")
      .then((res) => res.json())
      .then(setPhotos)
      .catch((err) => console.error("❌ Failed to load photo data:", err));
  }, []);

  // -----------------------------
  // Derived data
  // -----------------------------
  const categories = useMemo(() => {
    const cats = new Set(photos.map((p) => p.category || "Uncategorized"));
    return ["All", ...cats];
  }, [photos]);

  const filteredPhotos = useMemo(() => {
    if (activeCategory === "All") return photos;
    return photos.filter((p) => p.category === activeCategory);
  }, [photos, activeCategory]);

  // -----------------------------
  // Lightbox controls
  // -----------------------------
  const openLightbox = useCallback((i) => setLightbox({ open: true, index: i }), []);
  const closeLightbox = useCallback(() => setLightbox({ open: false, index: 0 }), []);
  const nextPhoto = useCallback(
    () => setLightbox((prev) => ({ ...prev, index: (prev.index + 1) % filteredPhotos.length })),
    [filteredPhotos.length]
  );
  const prevPhoto = useCallback(
    () =>
      setLightbox((prev) => ({
        ...prev,
        index: (prev.index - 1 + filteredPhotos.length) % filteredPhotos.length,
      })),
    [filteredPhotos.length]
  );

  // Keyboard navigation in lightbox
  useEffect(() => {
    const handleKey = (e) => {
      if (!lightbox.open) return;
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "ArrowLeft") prevPhoto();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightbox.open, nextPhoto, prevPhoto, closeLightbox]);

  // -----------------------------
  // Motion variants
  // -----------------------------
  const fade = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  // -----------------------------
  // Schema markup for SEO
  // -----------------------------
  const gallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Project Photo Gallery",
    description:
      "Gallery of epoxy and PU flooring installations across industries — cleanrooms, warehouses, and showrooms by Veera Polymers.",
    image: photos.map((p) => p.image),
  };

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <main className="bg-gray-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      {/* SEO */}
      <Helmet>
        <title>Project Gallery | Epoxy & PU Flooring by Veera Polymers</title>
        <meta
          name="description"
          content="Browse our epoxy and PU flooring gallery across industrial and commercial projects — from cleanrooms to showrooms. Every surface is built for strength and beauty."
        />
        <meta
          name="keywords"
          content="epoxy flooring gallery, PU flooring photos, industrial flooring projects, cleanroom flooring, Veera Polymers projects"
        />
        <link rel="canonical" href="https://veerapolymers.com/photos" />
        <script type="application/ld+json">{JSON.stringify(gallerySchema)}</script>
      </Helmet>

      {/* HEADER */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={fade}
        className="text-center mb-14"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0b2b4a] mb-3">
          Project <span className="text-sky-600">Gallery</span>
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto sm:text-lg leading-relaxed">
          Explore our epoxy and PU flooring installations across industries — from cleanrooms to
          warehouses. Every floor reflects durability, safety, and craftsmanship.
        </p>
      </motion.div>

      {/* CATEGORY FILTERS */}
      <div
        className="flex flex-wrap justify-center gap-3 mb-12"
        aria-label="Gallery category filters"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-full border text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
              activeCategory === cat
                ? "bg-[#0b2b4a] text-white border-[#0b2b4a] shadow-md"
                : "bg-white text-[#0b2b4a] border-gray-200 hover:bg-gray-100"
            }`}
            aria-pressed={activeCategory === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GALLERY GRID */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={activeCategory}
          initial="hidden"
          animate="show"
          exit={{ opacity: 0, y: -20 }}
          variants={fade}
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
          aria-label="Project gallery"
        >
          {filteredPhotos.length === 0 ? (
            <p className="text-center text-gray-500 mt-6">
              No photos found for this category.
            </p>
          ) : (
            filteredPhotos.map((p, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -3 }}
                onClick={() => openLightbox(i)}
                className="relative group overflow-hidden rounded-2xl shadow-md bg-white border cursor-pointer break-inside-avoid"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-lg font-semibold">{p.name}</h3>
                  <p className="text-sm text-gray-200 line-clamp-2">{p.desc}</p>
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

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightbox.open && filteredPhotos[lightbox.index] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-8"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0.8 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-5xl bg-white rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filteredPhotos[lightbox.index].image}
                alt={filteredPhotos[lightbox.index].name}
                className="w-full object-contain max-h-[80vh]"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#0b2b4a] mb-2">
                  {filteredPhotos[lightbox.index].name}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {filteredPhotos[lightbox.index].desc}
                </p>
                {filteredPhotos[lightbox.index].price && (
                  <p className="mt-3 text-sm font-medium text-sky-700">
                    ₹ {filteredPhotos[lightbox.index].price} / sq ft
                  </p>
                )}
              </div>

              {/* Controls */}
              <button
                onClick={prevPhoto}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md rounded-full p-3 hover:bg-white transition shadow"
              >
                ◀
              </button>
              <button
                onClick={nextPhoto}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md rounded-full p-3 hover:bg-white transition shadow"
              >
                ▶
              </button>
              <button
                onClick={closeLightbox}
                aria-label="Close lightbox"
                className="absolute top-3 right-3 bg-white/80 backdrop-blur-md rounded-full p-3 hover:bg-white transition font-bold shadow"
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
