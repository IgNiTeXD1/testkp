import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function About() {
  const [activeTab, setActiveTab] = useState("vision");

  const content = {
    vision: {
      title: "Our Story & Vision",
      text: `Veera Polymers & Chemicals was born from a simple idea — that industrial spaces deserve the same care, safety, and attention to detail as the people who work in them.  
      
      What began as a small flooring service in Chennai has grown into a trusted name across India for reliable, long-lasting epoxy and PU systems.  
      
      Our vision is to build foundations that empower industries — floors that don't just endure time, but inspire confidence.`,
      image: "/images/vision.jpg",
    },
    infrastructure: {
      title: "Our Craft & Capability",
      text: `Behind every smooth surface is a story of precision and teamwork.  
      
      Our Chennai facility houses advanced resin-blending units, quality control labs, and on-site teams trained to deliver consistent results.  
      
      We don’t just supply materials — we partner with clients to understand every detail, ensuring safety, sustainability, and beauty in equal measure.`,
      image: "/images/infrastructure.jpg",
    },
    credibility: {
      title: "Trust, Transparency & Compliance",
      text: `We’ve built Veera Polymers on three values: honesty, traceability, and commitment.  
      
      Every project we deliver is documented, certified, and verified for quality — from our GST-registered products to our eco-conscious processes.  
      
      We believe trust isn’t claimed; it’s earned, project by project.`,
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[55vh] flex items-center justify-center text-center overflow-hidden">
        <img
          src="/images/about-hero.jpg"
          alt="Veera Polymers workshop"
          className="absolute inset-0 w-full h-full object-cover brightness-75"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b2b4a]/80 via-[#0b2b4a]/50 to-transparent" />
        <motion.div
          className="relative z-10 text-white px-6 max-w-3xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
            Every Strong Floor
            <br />
            <span className="text-sky-400">Starts With a Strong Purpose</span>
          </h1>
          <p className="text-lg text-white/90 leading-relaxed">
            We’re a team of builders, chemists, and dreamers — crafting safe,
            sustainable, and high-performance flooring for modern India.
          </p>
        </motion.div>
      </section>

      {/* Tabs Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {[
            { id: "vision", label: "Our Story" },
            { id: "infrastructure", label: "Our Work" },
            { id: "credibility", label: "Our Promise" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2.5 rounded-full border font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-[#0b2b4a] text-white border-[#0b2b4a] shadow-md"
                  : "bg-white text-[#0b2b4a] border-gray-200 hover:bg-gray-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

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
              <h2 className="text-2xl font-bold text-[#0b2b4a] mb-4">
                {content[activeTab].title}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4 whitespace-pre-line">
                {content[activeTab].text}
              </p>
              {activeTab === "credibility" && (
                <ul className="text-sm text-gray-600 grid sm:grid-cols-2 gap-x-6 mt-4">
                  {content.credibility.details.map((d, i) => (
                    <li key={i} className="border-b py-2">
                      <span className="font-semibold text-[#0b2b4a]">
                        {d.label}:
                      </span>{" "}
                      {d.value}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 bg-gradient-to-t from-blue-50/60 to-transparent rounded-t-3xl">
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold text-[#0b2b4a] text-center mb-12"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          The People Behind the Work
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              name: "Ragupathi M",
              role: "Founder & Managing Director",
              img: "/images/team1.jpg",
              bio: "Ragupathi founded Veera Polymers with a vision to merge craftsmanship and chemistry. A hands-on leader, he believes in quality over quantity and relationships over transactions.",
            },
            {
              name: "Priya K",
              role: "Operations & Planning",
              img: "/images/team2.jpg",
              bio: "Priya ensures every project runs smoothly — from materials to manpower. She’s the bridge between on-site execution and client satisfaction.",
            },
            {
              name: "Karthik S",
              role: "Quality & Application Head",
              img: "/images/team3.jpg",
              bio: "With over a decade of industrial coating experience, Karthik oversees material testing, product improvement, and training of new teams.",
            },
            {
              name: "Divya R",
              role: "Procurement & Logistics",
              img: "/images/team4.jpg",
              bio: "Divya manages supplier relations and ensures timely delivery of raw materials, making sure projects stay on schedule every time.",
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

      {/* Journey / Stats Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold text-[#0b2b4a] mb-8"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Our Journey in Numbers
        </motion.h2>

        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { num: "100+", label: "Industrial Projects Delivered" },
            { num: "25+", label: "Cities Served Across India" },
            { num: "3+", label: "Years of Steady Growth" },
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
              <h3 className="text-4xl font-extrabold text-sky-700">{s.num}</h3>
              <p className="text-gray-600 mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-14">
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-[#0b2b4a] text-white font-semibold rounded-full hover:bg-sky-700 transition shadow-md"
          >
            Talk to Our Team →
          </a>
        </div>
      </section>
    </div>
  );
}


