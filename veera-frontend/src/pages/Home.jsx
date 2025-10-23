import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      {/* 🧠 SEO Meta */}
      <head>
        <title>Veera Polymers & Chemicals | Epoxy Flooring Experts in Chennai</title>
        <meta
          name="description"
          content="Leading manufacturer of epoxy flooring, PU coatings, and chemical-resistant flooring. Trusted across India for durable, safe, and sustainable surfaces."
        />
        <meta
          name="keywords"
          content="epoxy flooring chennai, industrial floor coating, epoxy resin floor, PU coating India, Veera Polymers"
        />
        <meta name="robots" content="index, follow" />
      </head>

      {/* 🌇 Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-gray-900">
        <img
          src="/images/hero-floor.jpg"
          alt="Epoxy flooring installation"
          className="absolute inset-0 w-full h-full object-cover brightness-75"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b2b4a]/90 via-[#0b2b4a]/70 to-transparent" />

        <motion.div
          className="relative z-10 text-white px-6 max-w-3xl text-center md:text-left"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4">
            <span className="text-sky-400">Safer. Stronger. </span>
            Smarter Floors.
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            Engineered epoxy and PU systems that deliver durability and performance
            across every industrial environment.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <Link
              to="/products"
              className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-full transition-all shadow-md hover:shadow-lg"
            >
              Explore Solutions
            </Link>
            <a
              href="/brochure/veera_brochure.pdf"
              download
              className="border border-white/70 text-white px-6 py-3 rounded-full hover:bg-white/10 transition-all"
            >
              Download Brochure
            </a>
          </div>
        </motion.div>
      </section>

      {/* 🧩 Core Highlights */}
      <section className="max-w-7xl mx-auto px-6 -mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-20">
        {[
          {
            title: "Epoxy Systems",
            desc: "Seamless, durable, and chemical-resistant flooring for industrial facilities.",
            img: "/images/epoxy-system.jpg",
            to: "/products",
          },
          {
            title: "Industries Served",
            desc: "Automotive, Pharma, FMCG, Electronics — we tailor flooring to your needs.",
            img: "/images/industries.jpg",
            to: "/projects",
          },
          {
            title: "Sustainability",
            desc: "Eco-friendly, low-VOC systems ensuring safety and long service life.",
            img: "/images/sustainable-floor.jpg",
            to: "/about",
          },
        ].map((c, i) => (
          <motion.div
            key={c.title}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            transition={{ delay: i * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden border hover:-translate-y-1"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={c.img}
                alt={c.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-[#0b2b4a] group-hover:text-sky-700">
                {c.title}
              </h3>
              <p className="text-gray-600 mt-3 text-sm md:text-base">{c.desc}</p>
              <Link
                to={c.to}
                className="inline-block mt-4 text-sky-700 font-semibold hover:underline"
              >
                Learn more →
              </Link>
            </div>
          </motion.div>
        ))}
      </section>

      {/* 🧭 Quick Navigation */}
      <section className="max-w-7xl mx-auto px-6 mt-20 text-center">
        <motion.h2
          className="text-3xl font-bold text-[#0b2b4a] mb-8"
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
        >
          Explore Our Solutions
        </motion.h2>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            { label: "Products", to: "/products" },
            { label: "Projects", to: "/projects" },
            { label: "About Us", to: "/about" },
            { label: "Contact", to: "/contact" },
          ].map((l, i) => (
            <motion.div
              key={l.label}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={l.to}
                className="px-6 py-3 border border-sky-500 text-sky-700 rounded-full hover:bg-sky-500 hover:text-white transition-all"
              >
                {l.label}
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 📰 News & Insights */}
      <section className="max-w-7xl mx-auto px-6 mt-20 mb-24">
        <div className="flex justify-between items-center flex-wrap mb-6">
          <h2 className="text-3xl font-bold text-[#0b2b4a]">Latest Updates</h2>
          <Link
            to="/projects"
            className="text-sky-700 hover:underline font-semibold"
          >
            View All →
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              h: "New Anti-Static Flooring for Electronics Plant",
              d: "Completed 10,000 sq ft epoxy system in Bangalore with ESD protection.",
              img: "/images/news1.jpg",
            },
            {
              h: "PU Coating Line Upgrade",
              d: "Enhanced abrasion resistance and gloss retention for long-term performance.",
              img: "/images/news2.jpg",
            },
            {
              h: "Sustainability Report 2025",
              d: "Introduced eco-grade epoxy with 35% lower VOC emissions for greener operations.",
              img: "/images/news3.jpg",
            },
          ].map((n, i) => (
            <motion.article
              key={i}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className="h-44 overflow-hidden">
                <img
                  src={n.img}
                  alt={n.h}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-[#0b2b4a] text-lg mb-2">
                  {n.h}
                </h3>
                <p className="text-gray-600 text-sm">{n.d}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* 📞 Floating Contact Button */}
      <Link
        to="/contact"
        className="fixed bottom-6 right-6 bg-sky-600 text-white rounded-full shadow-lg hover:scale-110 transition-transform p-4"
        aria-label="Contact Us"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1118 0z"
          />
        </svg>
      </Link>
    </>
  );
}


