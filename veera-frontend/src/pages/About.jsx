import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function About() {
  const [activeTab, setActiveTab] = useState("vision");

  const content = {
    vision: {
      title: "Our Vision",
      text: `At Veera Polymers & Chemicals, our vision is to redefine industrial flooring through innovation, precision, and responsibility. 
      We believe every floor should be a foundation for safety and success — from high-performance epoxy systems to sustainable PU coatings. 
      Our goal is simple: to build India's most reliable, eco-conscious flooring solutions for the industries that move our nation.`,
      image: "/images/vision.jpg",
    },
    infrastructure: {
      title: "Our Infrastructure",
      text: `Our state-of-the-art manufacturing and application facility in Chennai is designed to meet the highest global standards. 
      Equipped with automated resin blending units, precision testing labs, and on-site project teams, we ensure unmatched consistency and performance in every application. 
      Every system we deliver is backed by technical documentation, rigorous quality checks, and traceable material batches.`,
      image: "/images/infrastructure.jpg",
    },
    credibility: {
      title: "Credentials & Compliance",
      text: `Veera Polymers & Chemicals is built on a foundation of trust and accountability. 
      We operate with complete transparency, adhering to India’s industrial, environmental, and taxation norms. 
      Our certifications, GST registration, and product codes ensure that every transaction and formulation is traceable and compliant.`,
      details: [
        { label: "GST Number", value: "33DHYPS9395N1ZS" },
        { label: "HSN Code", value: "3907 - Epoxy Resins" },
        { label: "Udyam Registration", value: "TN-02-0001234" },
        { label: "Incorporation Year", value: "2021" },
      ],
      image: "/images/certificates.jpg",
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[55vh] flex items-center justify-center text-center overflow-hidden">
        <img
          src="/images/about-hero.jpg"
          alt="Veera Polymers facility"
          className="absolute inset-0 w-full h-full object-cover brightness-75"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b2b4a]/80 to-transparent" />
        <motion.div
          className="relative z-10 text-white px-6 max-w-3xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            About <span className="text-sky-400">Veera Polymers & Chemicals</span>
          </h1>
          <p className="text-lg text-white/90 leading-relaxed">
            Engineering durability, safety, and sustainability — one floor at a time.
          </p>
        </motion.div>
      </section>

      {/* Tabs */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {[
            { id: "vision", label: "Our Vision" },
            { id: "infrastructure", label: "Infrastructure" },
            { id: "credibility", label: "Credentials" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2.5 rounded-full border transition-all font-semibold ${
                activeTab === tab.id
                  ? "bg-blue-900 text-white border-blue-900 shadow-md"
                  : "bg-white text-blue-900 border-blue-200 hover:bg-blue-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col md:flex-row"
          >
            <img
              src={content[activeTab].image}
              alt={content[activeTab].title}
              className="md:w-1/2 h-64 md:h-auto object-cover"
            />
            <div className="p-8 md:w-1/2 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">
                {content[activeTab].title}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4 whitespace-pre-line">
                {content[activeTab].text}
              </p>

              {activeTab === "credibility" && (
                <ul className="text-sm text-gray-600 grid sm:grid-cols-2 gap-x-6 mt-4">
                  {content.credibility.details.map((d, i) => (
                    <li key={i} className="border-b py-2">
                      <span className="font-semibold text-blue-900">{d.label}:</span>{" "}
                      {d.value}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* 🧩 Team Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold text-[#0b2b4a] text-center mb-12"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Meet Our Core Team
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              name: "Rghupathi M",
              role: "Founder & Managing Director",
              img: "/images/team1.jpg",
              bio: "description.",
            },
            {
              name: "Name",
              role: "role",
              img: "/images/team2.jpg",
              bio: "desc.",
            },
            {
              name: "name",
              role: "role",
              img: "/images/team3.jpg",
              bio: "desc",
            },
            {
              name: "name",
              role: "role",
              img: "/images/team4.jpg",
              bio: "desc",
            },
          ].map((t, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border shadow hover:shadow-lg transition-all hover:-translate-y-1 text-center overflow-hidden"
            >
              <img
                src={t.img}
                alt={t.name}
                className="w-full h-52 object-cover"
                loading="lazy"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#0b2b4a]">{t.name}</h3>
                <p className="text-sky-600 text-sm font-medium mb-2">
                  {t.role}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">{t.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid sm:grid-cols-3 gap-6 text-center">
          {[
            { num: "100+", label: "Industrial Projects Delivered" },
            { num: "25+", label: "Cities Served Pan-India" },
            { num: "3", label: "Years of Consistent Growth" },
          ].map((s, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-4xl font-extrabold text-blue-900">{s.num}</h3>
              <p className="text-gray-600 mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-blue-900 text-white font-semibold rounded-full hover:bg-sky-700 transition shadow-md"
          >
            Contact Our Experts →
          </a>
        </div>
      </section>
    </div>
  );
}

