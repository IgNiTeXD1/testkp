import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const FALLBACK_IMG = "/images/products/placeholder.jpg";

const containerVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.06, duration: 0.4, ease: "easeOut" },
  },
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
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load data");
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
      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-[15px] font-medium transition-all
        ${
          active
            ? "bg-primary-900 text-white shadow-md"
            : "bg-white text-primary-900 hover:bg-primary-50"
        }`}
      aria-pressed={active}
    >
      <span className="truncate">{name}</span>
      <svg
        className={`w-5 h-5 transition-transform ${
          active ? "rotate-90" : "rotate-0"
        }`}
        viewBox="0 0 20 20"
        fill="none"
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
      whileHover={{ scale: 1.015, y: -3 }}
      transition={{ duration: 0.25 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg overflow-hidden flex flex-col"
    >
      <div className="h-44 sm:h-48 overflow-hidden bg-gray-100">
        <img
          src={src}
          alt={title}
          onError={() => setErrored(true)}
          loading="lazy"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-primary-900 truncate mb-2">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed flex-1">{desc}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            to="/contact"
            className="px-4 py-2 rounded-full text-sm font-semibold bg-secondary-500 text-white hover:bg-secondary-600 transition-all"
          >
            Request Quote
          </Link>
          <button
            className="text-sm text-primary-700 hover:underline"
            onClick={() =>
              document
                .querySelector("footer")
                ?.scrollIntoView({ behavior: "smooth" })
            }
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

  const overview = rawProducts[activeCategory]?.overview ?? "";

  const filteredServices = useMemo(() => {
    if (!activeCategory || !rawProducts[activeCategory]) return {};
    const services = rawProducts[activeCategory].services || {};
    if (!query.trim()) return services;
    const q = query.toLowerCase();
    const filtered = {};
    Object.entries(services).forEach(([k, v]) => {
      const desc = v.desc || v.description || "";
      if (k.toLowerCase().includes(q) || desc.toLowerCase().includes(q))
        filtered[k] = v;
    });
    return filtered;
  }, [rawProducts, activeCategory, query]);

  return (
    <main className="min-h-screen bg-gray-50 text-primary-900 pb-20">
      {/* Header */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold">
            Our Product Range
          </h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base max-w-2xl">
            Epoxy, PU, and industrial floor coatings built for safety,
            performance, and long-term durability.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-72">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary-200"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
          <Link
            to="/contact"
            className="hidden sm:inline-flex items-center px-5 py-2 rounded-full bg-primary-900 text-white font-semibold hover:bg-primary-800 transition"
          >
            Request Quote
          </Link>
        </div>
      </header>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 lg:flex lg:gap-10">
        {/* Sidebar */}
        <aside className="lg:w-1/3 mb-8 lg:mb-0">
          {/* Mobile Dropdown */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-full flex justify-between items-center px-4 py-3 bg-white border rounded-lg shadow-sm text-[15px]"
            >
              <span>{activeCategory ?? "Select Category"}</span>
              <svg
                className={`w-5 h-5 transition-transform ${
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
                  className="mt-2 space-y-2"
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
            <div className="bg-white border rounded-2xl shadow-sm p-5 space-y-3">
              <h2 className="text-sm font-semibold text-gray-500">Categories</h2>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <CategoryButton
                    key={cat}
                    name={cat}
                    active={cat === activeCategory}
                    onClick={setActiveCategory}
                  />
                ))}
              </div>

              {activeCategory && (
                <>
                  <div className="mt-5 pt-3 border-t">
                    <h3 className="text-sm font-medium text-primary-900 mb-1">
                      Overview
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {overview || "Select a category to read overview."}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      Need assistance?
                    </h3>
                    <Link
                      to="/contact"
                      className="text-sm font-medium text-secondary-500 hover:underline"
                    >
                      Talk to our experts →
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </aside>

        {/* Main Grid */}
        <main className="lg:w-2/3">
          {loading && (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-52 bg-white rounded-2xl animate-pulse" />
              ))}
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg border">
              Failed to load products. Please check your <code>pro.json</code>.
            </div>
          )}

          {!loading && !error && activeCategory && (
            <section>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-primary-900">
                    {activeCategory}
                  </h2>
                  <p className="text-gray-600 mt-1 text-sm sm:text-base">
                    {overview}
                  </p>
                </div>
                <div className="lg:hidden">
                  <Link
                    to="/contact"
                    className="inline-flex px-4 py-2 rounded-full bg-primary-900 text-white text-sm font-semibold"
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
                  {Object.entries(filteredServices).length === 0 && (
                    <div className="col-span-full bg-white border rounded-2xl p-6 text-center">
                      <p className="text-gray-600">No matching products found.</p>
                    </div>
                  )}

                  {Object.entries(filteredServices).map(([srv, data]) => (
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
        </main>
      </section>

      {/* Floating CTA */}
      <Link
        to="/contact"
        className="fixed right-4 bottom-5 sm:right-6 sm:bottom-6 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-secondary-500 text-white shadow-lg hover:bg-secondary-600 active:scale-95 transition-all"
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

      {/* Theme Colors */}
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








