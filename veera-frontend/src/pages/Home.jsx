import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export default function Home() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.08]);

  const fade = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const services = [
    {
      title: "Epoxy Flooring Systems",
      desc: "Heavy-duty seamless floors for industrial, chemical, and automotive applications.",
      img: "/images/epoxy-system.jpg",
    },
    {
      title: "PU & Hybrid Floors",
      desc: "Resilient, abrasion-resistant coatings designed for food, pharma, and commercial spaces.",
      img: "/images/pu-floor.jpg",
    },
    {
      title: "ESD & Conductive Coatings",
      desc: "Static-controlled systems for cleanrooms, electronics, and defense industries.",
      img: "/images/esd-floor.jpg",
    },
    {
      title: "Chemical-Resistant Linings",
      desc: "Protective resin layers for tanks, drains, and chemical processing zones.",
      img: "/images/chemical-lining.jpg",
    },
  ];

  const industries = [
    { name: "Pharmaceutical", icon: "💊" },
    { name: "Food & Beverage", icon: "🥫" },
    { name: "Automotive", icon: "🚗" },
    { name: "Electronics", icon: "💻" },
    { name: "Warehousing", icon: "🏭" },
  ];

  const siteSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Veera Polymers",
    url: "https://veerapolymers.com",
    logo: "https://veerapolymers.com/images/logo.png",
    description:
      "Veera Polymers provides high-performance epoxy, PU, and ESD flooring systems for industrial, commercial, and specialized applications.",
    sameAs: ["https://www.linkedin.com/company/veerapolymers"],
  };

  return (
    <main className="bg-[#0b2b4a] text-white overflow-x-hidden">
      <Helmet>
        <title>Veera Polymers | Industrial Epoxy & PU Flooring Solutions</title>
        <meta
          name="description"
          content="Trusted manufacturer and applicator of epoxy, PU, and ESD flooring systems across pharma, food, and industrial sectors in India."
        />
        <meta
          name="keywords"
          content="epoxy flooring, PU flooring, ESD coating, industrial floors, resin flooring, Veera Polymers"
        />
        <link rel="canonical" href="https://veerapolymers.com" />
        <script type="application/ld+json">{JSON.stringify(siteSchema)}</script>
      </Helmet>

      {/* HERO */}
      <section className="relative h-[100vh] flex flex-col items-center justify-center text-center overflow-hidden">
        <motion.img
          src="/images/hero-floor.jpg"
          alt="Industrial epoxy floor"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.55]"
          style={!reduceMotion ? { scale: heroScale } : {}}
          fetchpriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b2b4a] via-[#0b2b4a]/70 to-transparent" />

        <motion.div
          variants={fade}
          initial="hidden"
          animate="show"
          className="relative z-10 backdrop-blur-sm bg-white/10 border border-white/20 rounded-3xl p-10 max-w-3xl shadow-xl"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4 uppercase tracking-tight">
            Excellence in <span className="text-sky-400">Resin Flooring</span>
          </h1>
          <p className="text-white/80 text-lg mb-8">
            Certified applicators delivering seamless, durable, and chemical-resistant surfaces since{" "}
            <span className="font-semibold text-sky-300">2002</span>.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/products"
              className="px-8 py-3 bg-sky-500 hover:bg-sky-600 rounded-full font-semibold shadow-md transition"
            >
              Explore Systems
            </Link>
            <Link
              to="/photos"
              className="px-8 py-3 border border-white/60 hover:bg-white/10 rounded-full transition font-semibold"
            >
              View Projects
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ABOUT STRIP */}
      <section className="bg-[#081e34] py-24 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.img
            src="/images/factory-floor.jpg"
            alt="Factory floor application"
            className="rounded-2xl shadow-lg object-cover w-full h-80 md:h-[420px]"
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            loading="lazy"
          />
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-sky-400 mb-4">
              Two Decades of Polymer Excellence
            </h2>
            <p className="text-white/80 leading-relaxed text-[17px]">
              With 20+ years of expertise in industrial resin flooring, Veera Polymers has executed over{" "}
              <span className="font-semibold text-sky-300">500+ projects</span> nationwide — from
              pharmaceutical facilities to heavy manufacturing units.
            </p>
            <div className="flex gap-4 mt-6 flex-wrap">
              <div className="bg-white/10 rounded-lg px-4 py-2 text-sm font-medium">
                ISO 9001:2015 Certified
              </div>
              <div className="bg-white/10 rounded-lg px-4 py-2 text-sm font-medium">
                PAN India Execution
              </div>
              <div className="bg-white/10 rounded-lg px-4 py-2 text-sm font-medium">
                100% In-house Team
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-[#f8fafc] text-[#0b2b4a] py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-12">Our Core Services</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((s, i) => (
              <motion.article
                key={s.title}
                variants={fade}
                initial="hidden"
                whileInView="show"
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl overflow-hidden border border-gray-100 transition flex flex-col"
              >
                <img src={s.img} alt={s.title} className="h-48 w-full object-cover" loading="lazy" />
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                  <p className="text-gray-600 text-sm flex-1">{s.desc}</p>
                  <Link
                    to="/products"
                    className="text-sky-700 mt-4 font-semibold hover:underline text-sm"
                  >
                    Learn More →
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="bg-[#0b2b4a] py-20 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            variants={fade}
            initial="hidden"
            whileInView="show"
            className="text-3xl md:text-4xl font-bold text-sky-400 mb-10"
          >
            Industries We Serve
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-6">
            {industries.map((ind, i) => (
              <motion.div
                key={i}
                variants={fade}
                initial="hidden"
                whileInView="show"
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 rounded-xl px-8 py-4 text-white/90 hover:bg-white/20 transition shadow-sm backdrop-blur-sm"
              >
                <span className="text-2xl mr-2">{ind.icon}</span> {ind.name}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-sky-600 to-sky-400 text-center text-white py-20">
        <motion.h2
          variants={fade}
          initial="hidden"
          whileInView="show"
          className="text-3xl md:text-4xl font-extrabold mb-4"
        >
          Ready to Reinforce Your Facility?
        </motion.h2>
        <p className="text-white/90 mb-8 text-lg max-w-2xl mx-auto">
          Schedule a free consultation and site assessment with our engineering team.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/contact"
            className="px-8 py-3 bg-white text-sky-700 hover:bg-sky-50 rounded-full font-semibold transition shadow-md"
          >
            Get Quote
          </Link>
          <Link
            to="/about"
            className="px-8 py-3 border border-white/70 hover:bg-white/10 rounded-full transition font-semibold"
          >
            Learn More
          </Link>
        </div>
      </section>
    </main>
  );
}
