import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
// If you use react-helmet-async, uncomment next line and wrap app with <HelmetProvider>
// import { Helmet } from "react-helmet-async";

export default function Home() {
  const reduceMotion = useReducedMotion();

  const fadeInUp = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.6, ease: "easeOut" },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: reduceMotion ? 0 : 0.6 } },
  };

  return (
    <>
      {/* SEO (use Helmet if available; otherwise keep as-is) */}
      {/* <Helmet>
        <title>Veera Polymers & Chemicals | Epoxy & PU Flooring Experts</title>
        <meta
          name="description"
          content="India’s trusted name for epoxy, PU and chemical-resistant flooring systems. Designed for performance, built for longevity."
        />
      </Helmet> */}
      <head>
        <title>Veera Polymers & Chemicals | Epoxy & PU Flooring Experts</title>
        <meta
          name="description"
          content="India’s trusted name for epoxy, PU and chemical-resistant flooring systems. Designed for performance, built for longevity."
        />
      </head>

      {/* HERO */}
      <section className="relative text-white overflow-hidden bg-[#0b2b4a]">
        <img
          src="/images/hero-floor.jpg"
          alt="Industrial epoxy floor"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.75)" }}
          loading="eager"
          decoding="async"
          fetchpriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b2b4a]/90 via-[#0b2b4a]/70 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-6 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-center md:text-left"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
              <span className="text-sky-400">Durability.</span> Precision.
              <br />
              <span className="text-sky-400">Innovation.</span>
            </h1>
            <p className="mt-5 text-base md:text-lg text-white/90 leading-relaxed">
              From factories to pharma labs, Veera builds surfaces engineered
              for safety, strength, and sustainability — every square meter built to last.
            </p>

            <div className="mt-7 flex flex-wrap gap-3 justify-center md:justify-start">
              <Link
                to="/products"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-sky-500 hover:bg-sky-600 font-semibold shadow-sm transition"
              >
                Explore Products
              </Link>
              <a
                href="/brochure/veera-polymer-chemicals(1).pdf"
                download
                className="inline-flex items-center justify-center rounded-full px-6 py-3 border border-white/70 text-white hover:bg-white/10 transition"
              >
                Download Brochure
              </a>
            </div>
          </motion.div>

          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="hidden md:block"
          >
            <div className="rounded-xl overflow-hidden border border-white/10 shadow-xl">
              <img
                src="/images/factory-floor.jpg"
                alt="Epoxy installation process"
                className="object-cover w-full h-[420px]"
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHY VEERA – small human, non-artificial section */}
      <section className="max-w-7xl mx-auto px-5 md:px-6 -mt-10 md:-mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
        {[
          {
            title: "Engineered Systems",
            desc: "Epoxy, PU & ESD floors tailored to load, traffic & hygiene needs.",
            img: "/images/epoxy-system.jpg",
            to: "/products",
          },
          {
            title: "On-Site Expertise",
            desc: "Trained crews, documented QC, predictable timelines, clean handover.",
            img: "/images/industries.jpg",
            to: "/projects",
          },
          {
            title: "Sustainable Choices",
            desc: "Low-VOC options and long-life cycles to reduce total cost of ownership.",
            img: "/images/sustainable-floor.jpg",
            to: "/about",
          },
        ].map((c, i) => (
          <motion.article
            key={c.title}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition overflow-hidden"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={c.img}
                alt={c.title}
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl md:text-2xl font-bold text-[#0b2b4a]">
                {c.title}
              </h3>
              <p className="text-gray-600 mt-2">{c.desc}</p>
              <Link
                to={c.to}
                className="inline-block mt-3 text-sky-700 font-semibold hover:underline"
              >
                Learn more →
              </Link>
            </div>
          </motion.article>
        ))}
      </section>

      {/* RECENT INSTALLATIONS */}
      <section className="bg-gray-50 py-16 md:py-20 mt-10">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0b2b4a]">
              Recent Installations
            </h2>
            <Link to="/projects" className="text-sky-700 font-semibold hover:underline">
              View All →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                img: "/images/plant-bangalore.jpg",
                h: "Bangalore Electronics Hub",
                d: "10,000 sq.ft anti-static epoxy floor with precision finish.",
              },
              {
                img: "/images/pharma-floor.jpg",
                h: "Pharmaceutical Cleanroom",
                d: "PU-based hygienic flooring system with antimicrobial sealant.",
              },
              {
                img: "/images/fmcg-warehouse.jpg",
                h: "FMCG Warehouse – Pune",
                d: "High-load epoxy coating ensuring abrasion resistance and long life.",
              },
            ].map((n, i) => (
              <motion.article
                key={i}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl overflow-hidden bg-white border hover:shadow-md transition"
              >
                <img
                  src={n.img}
                  alt={n.h}
                  className="h-48 w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="p-5">
                  <h3 className="font-semibold text-[#0b2b4a] text-lg">{n.h}</h3>
                  <p className="text-gray-600 text-sm mt-1">{n.d}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST STRIP (subtle, non-AI feel) */}
      <section className="border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-6 py-8 md:py-10">
          <p className="text-center text-gray-600 text-sm md:text-base">
            Trusted by manufacturers, pharma labs, logistics hubs & retail facilities across India.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0b2b4a] py-14 md:py-16 text-center text-white">
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          className="text-2xl md:text-3xl font-bold"
        >
          Ready to Reinforce Your Space?
        </motion.h2>
        <p className="text-white/80 mt-3">
          Get a tailored recommendation and a clear timeline from our site team.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            to="/contact"
            className="bg-sky-500 hover:bg-sky-600 text-white px-7 py-3 rounded-full font-semibold transition shadow-sm"
          >
            Contact Us
          </Link>
          <Link
            to="/photos"
            className="border border-white/70 text-white px-7 py-3 rounded-full hover:bg-white/10 transition"
          >
            View Gallery
          </Link>
        </div>
      </section>

      {/* Floating Contact (mobile-first) */}
      <motion.a
        href="/contact"
        className="fixed bottom-5 right-5 md:bottom-6 md:right-6 bg-sky-600 text-white rounded-full shadow-lg p-4 hover:scale-105 transition-transform"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        aria-label="Contact Veera"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1118 0z" />
        </svg>
      </motion.a>
    </>
  );
}




