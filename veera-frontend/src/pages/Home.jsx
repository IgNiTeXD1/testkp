import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      {/* 🧠 Meta */}
      <head>
        <title>Veera Polymers & Chemicals | Epoxy & PU Flooring Experts</title>
        <meta
          name="description"
          content="India’s trusted name for epoxy, PU and chemical-resistant flooring systems. Designed for performance, built for longevity."
        />
      </head>

      {/* 🏭 Hero Section */}
      <section className="relative bg-[#0b2b4a] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero-floor.jpg"
            alt="Industrial epoxy floor"
            className="w-full h-full object-cover brightness-75"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b2b4a]/95 via-[#0b2b4a]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
              <span className="text-sky-400">Durability.</span> Precision.
              <br />
              <span className="text-sky-400">Innovation.</span>
            </h1>
            <p className="mt-6 text-lg text-white/90 leading-relaxed">
              From factories to pharma labs, Veera delivers surfaces engineered
              for safety, strength, and sustainability — every square meter built
              to last.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/products"
                className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-all"
              >
                Explore Products
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

          <motion.div
            className="hidden md:block rounded-xl overflow-hidden shadow-2xl border border-white/10"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <img
              src="/images/factory-floor.jpg"
              alt="Epoxy installation process"
              className="object-cover w-full h-[420px]"
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      {/* 🔹 Feature Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            title: "Epoxy Systems",
            desc: "Seamless, impact-resistant floors with tailored finishes for every industry.",
            img: "/images/epoxy-system.jpg",
            to: "/products",
          },
          {
            title: "PU & Hybrid Floors",
            desc: "Flexible and abrasion-resistant polyurethane coatings for heavy-duty areas.",
            img: "/images/pu-floor.jpg",
            to: "/products",
          },
          {
            title: "ESD & Anti-Static",
            desc: "Precision-engineered floors ensuring safety for sensitive electronic zones.",
            img: "/images/esd-floor.jpg",
            to: "/projects",
          },
        ].map((c, i) => (
          <motion.div
            key={c.title}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            transition={{ delay: i * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="group bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 hover:-translate-y-1 transition-all overflow-hidden"
          >
            <div className="h-52 overflow-hidden">
              <img
                src={c.img}
                alt={c.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
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

      {/* 🏗️ Projects Preview */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-10 flex-wrap">
            <h2 className="text-3xl font-bold text-[#0b2b4a]">
              Recent Installations
            </h2>
            <Link
              to="/projects"
              className="text-sky-700 font-semibold hover:underline"
            >
              View All →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
              <motion.div
                key={i}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="rounded-2xl overflow-hidden bg-white border hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <img
                  src={n.img}
                  alt={n.h}
                  className="h-48 w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="font-semibold text-[#0b2b4a] text-lg mb-1">
                    {n.h}
                  </h3>
                  <p className="text-gray-600 text-sm">{n.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🌍 CTA */}
      <section className="bg-[#0b2b4a] py-16 text-center text-white">
        <motion.h2
          className="text-3xl font-bold mb-4"
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
        >
          Ready to Reinforce Your Space?
        </motion.h2>
        <p className="text-white/80 mb-6">
          Talk to our experts for customized flooring recommendations and site
          inspections.
        </p>
        <Link
          to="/contact"
          className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg"
        >
          Contact Us
        </Link>
      </section>

      {/* 📞 Floating Contact */}
      <motion.a
        href="/contact"
        className="fixed bottom-6 right-6 bg-sky-600 text-white rounded-full shadow-lg p-4 hover:scale-110 transition-transform"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
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
      </motion.a>
    </>
  );
}



