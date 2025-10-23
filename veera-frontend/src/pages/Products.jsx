// src/pages/Products.jsx
import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const FALLBACK_IMG = "/images/products/placeholder.jpg";

const containerVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

function useFetchJSON(url) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error("Network response not ok");
        return r.json();
      })
      .then((json) => mounted && setData(json))
      .catch((err) => mounted && setError(err))
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, [url]);
  return { data, loading, error };
}

function CategoryButton({ name, active, onClick }) {
  return (
    <button
      onClick={() => onClick(name)}
      className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between focus:outline-none transition text-[15px] sm:text-base ${
        active
          ? "bg-primary-900 text-white shadow-md"
          : "bg-white text-primary-900 hover:bg-primary-50"
      }`}
      aria-pressed={active}
    >
      <span className="truncate font-medium">{name}</span>
      <svg
        className={`w-5 h-5 transform transition-transform ${
          active ? "rotate-90" : "rotate-0"
        }`}
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M7 5l5 5-5 5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

function ServiceCard({ title, desc, img }) {
  const [errored, setErrored] = useState(false);
  const src = errored || !img ? FALLBACK_IMG : img;

  return (
    <motion.article
      layout
      variants={cardVariants}
      whileHover={{ scale: 1.02, y: -3 }}
      className="bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col hover:shadow-lg transition-transform duration-300"
      role="article"
      aria-label={title}
    >
      <div className="h-44 sm:h-48 md:h-52 overflow-hidden bg-gray-100">
        <img
          src={src}
          alt={title}
          onError={() => setErrored(true)}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-base md:text-lg font-semibold text-primary-900 mb-2 truncate">
          {title}
        </h3>
        <p className="text-gray-600 text-sm md:text-[15px] flex-1 leading-relaxed">
          {desc}
        </p>

        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-semibold bg-secondary-500 text-white hover:bg-secondary-600 focus:outline-none shadow-sm transition"
            aria-label={`Request quote for ${title}`}
          >
            Request Quote
          </Link>
          <button
            className="text-sm text-primary-700 hover:underline focus:underline"
            onClick={() => {
              const el =
                document.getElementById("contact-form") ||
                document.querySelector("footer");
              el?.scrollIntoView({ behavior: "smooth", block: "center" });
            }}
            type="button"
          >
            Learn more →
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default function Products() {
  const { data: rawProducts, loading, error } = useFetchJSON("/data/pro.json");
  const categories = useMemo(() => Object.keys(rawProducts || {}), [rawProducts]);

  const [activeCategory, setActiveCategory] = useState(null);
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!activeCategory && categories.length > 0) {
      setActiveCategory(categories[0]);
    }
  }, [categories, activeCategory]);

  const servicesForActive = useMemo(() => {
    if (!activeCategory || !rawProducts[activeCategory]) return {};
    const services = rawProducts[activeCategory].services || {};
    if (!query.trim()) return services;
    const q = query.trim().toLowerCase();
    const result = {};
    Object.entries(services).forEach(([k, v]) => {
      const desc = v.desc || v.description || "";
      if (k.toLowerCase().includes(q) || desc.toLowerCase().includes(q))
        result[k] = v;
    });
    return result;
  }, [rawProducts, activeCategory, query]);

  const overview = rawProducts[activeCategory]?.overview ?? "";

  return (
    <main className="min-h-screen bg-gray-50 text-primary-900 pb-20">
      {/* Header */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
            Our Services Range
          </h1>
          <p className="text-gray-600 mt-2 max-w-2xl text-sm sm:text-base">
            Explore epoxy, PU coatings, protective paints, and more — designed
            for durability, performance, and safety across industries.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none sm:w-72">
            <input
              id="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search services..."
              className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary-200"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 rounded-full text-gray-500 hover:text-gray-700"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
          <Link
            to="/contact"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-900 text-white font-semibold hover:bg-primary-800 transition"
          >
            Request Quote
          </Link>
        </div>
      </header>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 lg:flex lg:gap-8">
        {/* Sidebar */}
        <aside className="lg:w-1/3 mb-8 lg:mb-0">
          {/* Mobile dropdown */}
          <div className="block lg:hidden mb-4">
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-white border shadow-sm text-[15px] font-medium"
            >
              <span className="truncate">
                {activeCategory ?? "Select Category"}
              </span>
              <svg
                className={`w-5 h-5 transform transition-transform ${
                  mobileOpen ? "rotate-180" : ""
                }`}
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M5 8l5 5 5-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <AnimatePresence>
              {mobileOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="mt-2 grid gap-2"
                >
                  {categories.map((cat) => (
                    <CategoryButton
                      key={cat}
                      name={cat}
                      active={cat === activeCategory}
                      onClick={(name) => {
                        setActiveCategory(name);
                        setMobileOpen(false);
                        setQuery("");
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block sticky top-28">
            <div className="bg-white rounded-2xl border p-4 shadow-sm space-y-3">
              <h2 className="text-sm font-semibold text-gray-500">Categories</h2>
              <div className="grid gap-2">
                {categories.map((cat) => (
                  <CategoryButton
                    key={cat}
                    name={cat}
                    active={cat === activeCategory}
                    onClick={(name) => setActiveCategory(name)}
                  />
                ))}
              </div>

              {activeCategory && (
                <>
                  <div className="mt-4 pt-3 border-t">
                    <h3 className="text-sm font-medium text-primary-900 mb-1">
                      Overview
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {overview || "Select a category to read overview."}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      Need help?
                    </h3>
                    <Link
                      to="/contact"
                      className="block text-sm font-medium text-secondary-500 hover:underline"
                    >
                      Contact our experts →
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </aside>

        {/* Services Grid */}
        <main className="lg:w-2/3">
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-52 bg-white rounded-2xl animate-pulse"
                />
              ))}
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg border">
              Failed to load products. Check your{" "}
              <code>/data/pro.json</code> and network.
            </div>
          )}

          {!loading && !error && (
            <>
              {activeCategory && (
                <section aria-labelledby="category-heading">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                    <div>
                      <h2
                        id="category-heading"
                        className="text-2xl font-bold text-primary-900"
                      >
                        {activeCategory}
                      </h2>
                      <p className="text-gray-600 mt-1 max-w-2xl text-sm sm:text-base">
                        {overview}
                      </p>
                    </div>
                    <div className="lg:hidden">
                      <Link
                        to="/contact"
                        className="inline-flex items-center px-4 py-2 rounded-full bg-primary-900 text-white text-sm font-semibold"
                      >
                        Request Quote
                      </Link>
                    </div>
                  </div>

                  <AnimatePresence mode="popLayout">
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="show"
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                    >
                      {Object.entries(servicesForActive).length === 0 && (
                        <div className="col-span-full bg-white border rounded-2xl p-6 text-center">
                          <p className="text-gray-600">
                            No services match your search.
                          </p>
                        </div>
                      )}

                      {Object.entries(servicesForActive).map(([srv, data]) => (
                        <ServiceCard
                          key={srv}
                          title={srv}
                          desc={data.desc || ""}
                          img={data.img || data.image || ""}
                        />
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </section>
              )}
            </>
          )}
        </main>
      </section>

      {/* Floating CTA */}
      <div className="fixed right-4 bottom-5 z-40 sm:right-6 sm:bottom-6">
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-secondary-500 text-white shadow-lg hover:bg-secondary-600 active:scale-95 transition"
          aria-label="Request a quote"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1118 0z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 7v5l3 3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Request Quote
        </Link>
      </div>

      {/* Colors */}
      <style jsx>{`
        :root {
          --primary-900: #0b2b4a;
          --secondary-500: #0284c7;
          --secondary-200: #bae6fd;
        }
        .text-primary-900 {
          color: var(--primary-900);
        }
        .bg-primary-900 {
          background-color: var(--primary-900);
        }
        .bg-secondary-500 {
          background-color: var(--secondary-500);
        }
        .focus\\:ring-secondary-200:focus {
          box-shadow: 0 0 0 3px var(--secondary-200);
        }
      `}</style>
    </main>
  );
}







