import React from "react";
import { motion } from "framer-motion";

export default function About() {
  const fade = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const timeline = [
    {
      year: "2019",
      title: "Where It All Began",
      text: "Veera Polymers started as a two-man venture in Chennai with one goal — to create safer, longer-lasting floors for Indian industries.",
      img: "/images/vision.jpg",
    },
    {
      year: "2021",
      title: "Growth Through Trust",
      text: "From small workshops to large manufacturing plants, our work expanded across South India. Every project taught us to blend chemistry with craftsmanship.",
      img: "/images/infrastructure.jpg",
    },
    {
      year: "Today",
      title: "Innovation With Integrity",
      text: "We’re more than a flooring company. We’re a team of engineers, chemists, and site specialists working towards sustainable, documented, and beautiful surfaces.",
      img: "/images/certificates.jpg",
    },
  ];

  const stats = [
    { num: "100+", label: "Projects Completed" },
    { num: "25+", label: "Cities Served" },
    { num: "3+", label: "Years of Growth" },
  ];

  return (
    <main className="min-h-screen bg-[#0b2b4a] text-white overflow-x-hidden">
      {/* HERO */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <motion.img
          src="/images/about-hero.jpg"
          alt="Industrial flooring background"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.45]"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1, transition: { duration: 2 } }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b2b4a]/50 via-[#0b2b4a]/80 to-[#0b2b4a]" />
        <motion.div
          variants={fade}
          initial="hidden"
          animate="show"
          className="relative z-10 text-center px-6 max-w-3xl"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4 tracking-tight">
            Every Strong Floor<br />
            <span className="text-sky-400">Begins With a Strong Purpose</span>
          </h1>
          <p className="text-lg text-white/90">
            We build more than floors — we build trust, safety, and long-term partnerships with every installation.
          </p>
        </motion.div>
      </section>

      {/* OUR STORY (Timeline) */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <motion.h2
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-14 text-sky-400"
        >
          Our Journey
        </motion.h2>

        <div className="relative border-l border-sky-600/30 pl-8 space-y-20">
          {timeline.map((t, i) => (
            <motion.div
              key={i}
              variants={fade}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="relative flex flex-col md:flex-row gap-10 items-center md:items-start"
            >
              <div className="absolute -left-3 top-2 w-6 h-6 bg-sky-500 rounded-full shadow-lg" />
              <img
                src={t.img}
                alt={t.title}
                className="w-full md:w-1/2 rounded-2xl shadow-lg border border-white/10 object-cover"
              />
              <div className="md:w-1/2">
                <h3 className="text-xl font-bold text-sky-400">{t.year}</h3>
                <h4 className="text-2xl font-semibold mt-2">{t.title}</h4>
                <p className="text-white/80 mt-3 leading-relaxed">{t.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PEOPLE */}
      <section className="bg-[#081e34] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-14 text-sky-400"
          >
            The People Behind the Work
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Ragupathi V",
                role: "Founder & Managing Director",
                img: "/images/team1.jpg",
                bio: "With over a decade of on-site experience, Ragupathi leads Veera Polymers with a philosophy of integrity, learning, and consistency.",
              },
              {
                name: "name",
                role: "role",
                img: "/images/team2.jpg",
                bio: "desc",
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
                bio: "desc.",
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="bg-white/5 border border-white/10 rounded-2xl shadow-md hover:shadow-lg overflow-hidden backdrop-blur-sm text-center"
              >
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-full h-56 object-cover opacity-90"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white">{t.name}</h3>
                  <p className="text-sky-400 text-sm font-medium mb-2">
                    {t.role}
                  </p>
                  <p className="text-white/70 text-sm">{t.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <motion.h2
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-12 text-sky-400"
        >
          Our Journey in Numbers
        </motion.h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              variants={fade}
              initial="hidden"
              whileInView="show"
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 shadow-md hover:shadow-lg backdrop-blur-sm"
            >
              <h3 className="text-5xl font-extrabold text-sky-400">{s.num}</h3>
              <p className="text-white/80 mt-2">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sky-500 py-16 text-center text-white">
        <motion.h2
          variants={fade}
          initial="hidden"
          whileInView="show"
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Ready to Reinforce Your Space?
        </motion.h2>
        <p className="text-white/90 mb-8">
          Get in touch with our engineers to discuss your site and find the right system.
        </p>
        <a
          href="/contact"
          className="inline-block px-8 py-3 bg-white text-sky-700 rounded-full font-semibold hover:bg-sky-50 transition shadow"
        >
          Talk to Us →
        </a>
      </section>
    </main>
  );
}



