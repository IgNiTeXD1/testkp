import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const FALLBACK_IMG = "/images/products/placeholder.jpg";

// -----------------------------
// JSON fetch hook (with small cache)
// -----------------------------
function useFetchJSON(url) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    let alive = true;

    // tiny cache to avoid refetch flicker between tabs
    const cached = sessionStorage.getItem(`json:${url}`);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        setData(parsed);
        setLoading(false);
      } catch {}
    }

    fetch(url, { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load data");
        return r.json();
      })
      .then((j) => {
        if (!alive) return;
        setData(j);
        sessionStorage.setItem(`json:${url}`, JSON.stringify(j));
      })
      .catch((e) => alive && setError(e))
      .finally(() => alive && setLoading(false));

    return () => {
      alive = false;
    };
  }, [url]);

  return { data, loading, error };
}

// -----------------------------
// Debounce hook
// -----------------------------
function useDebouncedValue(value, ms = 300) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return v;
}

// -----------------------------
// Utility: create ProductCatalog schema
// -----------------------------
function getCatalogSchema(raw) {
  const cats = Object.keys(raw || {});
  return {
    "@context": "https://schema.org",
    "@type": "ProductCatalog",
    name: "Industrial Flooring Systems",
    brand: "Veera Polymers",
    itemListElement: cats.map((cat, i) => ({
      "@type": "ProductGroup",
      name: cat,
      position: i + 1,
    })),
  };
}

// -----------------------------
// Component
// -----------------------------
export default function Products() {
  const reduced = useReducedMotion();
  const { data: rawProducts, loading, error } = useFetchJSON("/data/pro.json");

  const categories = useMemo(() => Object.keys(rawProducts || {}), [rawProducts]);

  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get("cat");
  const initialQ = searchParams.get("q") || "";

  const [active, setActive] = useState(initialCat || categories[0] || "");
  const [query, setQuery] = useState(initialQ);
  const debouncedQuery = useDebouncedValue(query, 250);

  // Ensure active is always a valid category
  useEffect(() => {
    if (!active && categories.length > 0) setActive(categories[0]);
    if (active && !categories.includes(active) && categories.length > 0) {
      setActive(categories[0]);
    }
  }, [categories, active]);

  // Sync URL params
  useEffect(() => {
    if (!active) return;
    setSearchParams((p) => {
      p.set("cat", active);
      if (debouncedQuery) p.set("q", debouncedQuery);
      else p.delete("q");
      return p;
    });
  }, [active, debouncedQuery, setSearchParams]);

  const services = active ? rawProducts[active]?.services || {} : {};
  const overview = active ? rawProducts[active]?.overview || "" : "";

  // Suggestion tags (either from current category or a fallback)
  const suggestionTags = useMemo(() => {
    const base = ["Epoxy", "PU", "ESD", "Anti-Static", "Heavy-Duty", "Chemical Resistant", "Food Grade"];
    // try to infer tags from service keys
    const fromKeys = Object.keys(services || {}).slice(0, 6);
    return fromKeys.length ? Array.from(new Set([...fromKeys, ...base])).slice(0, 8) : base;
  }, [services]);

  const filteredServices = useMemo(() => {
    const entries = Object.entries(services || {});
    if (!debouncedQuery.trim()) return Object.fromEntries(entries);

    const q = debouncedQuery.toLowerCase();
    const out = {};
    for (const [k, v] of entries) {
      const desc = (v.desc || v.description || "").toLowerCase();
      if (k.toLowerCase().includes(q) || desc.includes(q)) out[k] = v;
    }
    return out;
  }, [services, debouncedQuery]);

  const fade = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: reduced ? 0 : 0.45, ease: "easeOut" } },
  };

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <main className="min-h-screen bg-[#0b2b4a] text-white overflow-x-hidden selection:bg-sky-300/40 selection:text-white">
      {/* SEO / Head */}
      <Helmet>
        <title>{active ? `${active} | Flooring Systems` : "Flooring Systems"} | Veera Polymers</title>
        <meta
          name="description"
          content={
            overview ||
            "Explore premium epoxy and PU flooring systems for industrial, commercial, and cleanroom applications. Request a free site inspection today."
          }
        />
        <meta
          name="keywords"
          content="epoxy flooring, PU flooring, industrial flooring, cleanroom flooring, anti-static flooring, esd flooring, chemical resistant flooring, food grade flooring"
        />
        <link rel="canonical" href="https://veerapolymers.com/products" />
        {/* Preload hero image */}
        <link rel="preload" as="image" href="/images/epoxy-system.jpg" />
        {/* Structured data */}
        <script type="application/ld+json">{JSON.stringify(getCatalogSchema(rawProducts))}</script>
      </Helmet>

      {/* HERO */}
      <section
        className="relative min-h-[58vh] sm:min-h-[62vh] flex flex-col justify-end pb-16"
        aria-label="Hero section"
      >
        <motion.img
          src="/images/epoxy-system.jpg"
          alt="Industrial flooring system hero"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.45]"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1, transition: { duration: reduced ? 0 : 1.6, ease: "easeOut" } }}
          fetchpriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b2b4a]/60 via-[#0b2b4a]/90 to-[#0b2b4a]" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.h1
            variants={fade}
            initial="hidden"
            animate="show"
            className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight"
          >
            Our <span className="text-sky-300">Flooring Systems</span>
          </motion.h1>
          <motion.p
            variants={fade}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.15 }}
            className="mt-4 text-lg text-white/85 max-w-2xl mx-auto leading-relaxed"
          >
            Engineered surfaces for every environment — from cleanrooms and cold storage to heavy-duty industrial floors.
          </motion.p>
        </div>
      </section>

      {/* CATEGORY BAR */}
      <nav
        className="sticky top-0 z-30 bg-[#0b2b4a]/90 backdrop-blur-md border-b border-white/10 shadow-sm"
        aria-label="Category and search"
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3 overflow-x-auto scrollbar-thin">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                active === c
                  ? "bg-sky-500 text-white shadow-sm"
                  : "bg-white/10 hover:bg-white/20 text-white/80"
              }`}
              aria-pressed={active === c}
            >
              {c}
            </button>
          ))}

          {/* Search + quick tags */}
          <div className="ml-auto min-w-[230px]">
            <div className="flex items-center">
              <label htmlFor="prod-search" className="sr-only">
                Search products
              </label>
              <input
                id="prod-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search systems…"
                className="w-full bg-white/10 text-white/90 placeholder-white/50 rounded-full px-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                aria-label="Search products"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="ml-2 text-white/70 hover:text-white"
                  aria-label="Clear search"
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mt-3 text-[12.5px]">
              {suggestionTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-sky-600/20 text-white/85 hover:text-white transition"
                  aria-label={`Filter by ${tag}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* PRODUCTS GRID */}
      <section
        className="max-w-6xl mx-auto px-6 py-24 sm:py-28 space-y-14"
        aria-label="Product catalog"
      >
        <div className="text-center">
          <motion.h2
            variants={fade}
            initial="hidden"
            animate="show"
            className="text-3xl font-bold text-sky-300"
          >
            {active || "Flooring Systems"}
          </motion.h2>
          <motion.p
            variants={fade}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.15 }}
            className="text-white/80 mt-2 max-w-2xl mx-auto leading-relaxed"
          >
            {overview}
          </motion.p>
        </div>

        {loading && (
          <div role="status" aria-live="polite" className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-56 bg-white/10 animate-pulse rounded-2xl"
                aria-label="Loading product"
              />
            ))}
          </div>
        )}

        {error && (
          <div
            className="text-center bg-red-900/40 border border-red-700 text-red-200 rounded-xl p-6"
            role="alert"
          >
            Failed to load products. Please check <code>data/pro.json</code>.
          </div>
        )}

        {!loading && !error && (
          <AnimatePresence mode="popLayout">
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: reduced ? 0 : 0.05 } },
              }}
              initial="hidden"
              animate="show"
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {Object.keys(filteredServices).length === 0 && (
                <div className="col-span-full text-center text-white/70 py-10">
                  No matching products found.
                </div>
              )}

              {Object.entries(filteredServices).map(([srv, data]) => (
                <motion.article
                  key={srv}
                  variants={fade}
                  whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.25 } }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-sky-400/40 hover:shadow-lg rounded-2xl overflow-hidden flex flex-col"
                  aria-label={`${srv} card`}
                >
                  <div className="h-44 sm:h-52 overflow-hidden">
                    <img
                      src={data.img || data.image || FALLBACK_IMG}
                      alt={`${srv} flooring system`}
                      loading="lazy"
                      className="w-full h-full object-cover will-change-transform hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2 leading-snug">
                        {srv}
                      </h3>
                      <p className="text-white/75 text-sm leading-relaxed line-clamp-3">
                        {data.desc || data.description}
                      </p>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <Link
                        to="/contact"
                        className="px-4 py-2 rounded-full text-sm font-semibold bg-sky-500 hover:bg-sky-600 transition shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                        aria-label={`Request quote for ${srv}`}
                      >
                        Request Quote
                      </Link>
                      <button
                        onClick={() => document.querySelector("footer")?.scrollIntoView({ behavior: "smooth" })}
                        className="text-sky-300 text-sm hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-full px-2"
                        aria-label={`Learn more about ${srv}`}
                      >
                        Learn more →
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </section>

      {/* Sticky global CTA (appears near bottom as user explores) */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: reduced ? 0 : 0.6 }}
        className="sticky bottom-5 z-20 flex justify-center px-4"
        aria-hidden={loading || !!error}
      >
        <Link
          to="/contact"
          className="bg-sky-600 hover:bg-sky-500 text-white px-6 py-3 rounded-full shadow-lg font-semibold tracking-wide"
          aria-label="Get a custom quote"
        >
          Get a Custom Quote
        </Link>
      </motion.div>

      {/* FINAL CTA */}
      <section className="bg-gradient-to-r from-sky-600 to-sky-400 text-white text-center py-20 mt-16">
        <motion.h2
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-extrabold mb-6"
        >
          Build the Perfect Surface for Your Space
        </motion.h2>
        <p className="text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
          From factories to showrooms — our engineers help you choose the ideal floor system. Schedule a free
          consultation today.
        </p>
        <Link
          to="/contact"
          className="inline-block px-10 py-3 bg-white text-sky-700 rounded-full font-semibold hover:bg-sky-50 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          Book Free Site Visit →
        </Link>
      </section>
    </main>
  );
}










