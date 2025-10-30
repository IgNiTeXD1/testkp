import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export default function Home() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.08]);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const systems = [
    {
      t: "Epoxy Flooring Systems",
      d: "High-strength coatings engineered for heavy-load industries and seamless durability.",
      img: "/images/epoxy-system.jpg",
    },
    {
      t: "PU & Hybrid Floors",
      d: "Flexible, abrasion-resistant coatings ideal for food, pharma, and high-traffic environments.",
      img: "/images/pu-floor.jpg",
    },
    {
      t: "ESD & Conductive Coatings",
      d: "Static-safe flooring systems for electronics, defense, and precision manufacturing.",
      img: "/images/esd-floor.jpg",
    },
  ];

  const projects = [
    {
      img: "/images/plant-bangalore.jpg",
      h: "Bangalore Electronics Hub",
      d: "10,000 sq.ft anti-static epoxy system for controlled assembly zones.",
    },
    {
      img: "/images/pharma-floor.jpg",
      h: "Pharma Cleanroom – Hyderabad",
      d: "Hygienic PU flooring with antimicrobial sealant and gloss finish.",
    },
    {
      img: "/images/fmcg-warehouse.jpg",
      h: "FMCG Warehouse – Pune",
      d: "High-load epoxy floor sustaining 5-ton forklifts under 24x7 cycles.",
    },
  ];

  const siteSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Veera Polymers",
    url: "https://veerapolymers.com",
    logo: "https://veerapolymers.com/images/logo.png",
    description:
      "Industrial flooring experts specializing in epoxy, PU, and ESD systems for factories, warehouses, and cleanrooms.",
  };

  return (
    <main className="bg-[#0b2b4a] text-white overflow-x-hidden selection:bg-sky-400/40 selection:text-white">
      <Helmet>
        <title>Veera Polymers | Industrial Epoxy & PU Flooring Experts</title>
        <meta
          name="description"
          content="Premium industrial epoxy, PU, and conductive flooring systems engineered for India's leading industries. Built for strength, safety, and sustainability."
        />
        <meta
          name="keywords"
          content="epoxy flooring, PU flooring, ESD flooring, industrial floor coatings, factory floor, Veera Polymers"
        />
        <link rel="canonical" href="https://veerapolymers.com" />
        <script type="application/ld+json">{JSON.stringify(siteSchema)}</script>
      </Helmet>

      {/* HERO */}
      <section
        className="relative h-[100vh] flex items-center justify-center"
        aria-label="Hero section"
      >
        <motion.img
          src="/images/hero-floor.jpg"
          alt="Industrial epoxy floor"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.55]"
          style={!reduceMotion ? { scale: heroScale } : {}}
          fetchpriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b2b4a] via-[#0b2b4a]/70 to-transparent" />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="relative z-10 backdrop-blur-sm bg-white/10 border border-white/20 rounded-3xl p-10 text-center max-w-3xl shadow-xl"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4 uppercase tracking-tight">
            <span className="text-sky-400">Precision</span> in Every Layer
          </h1>
          <p className="text-white/80 text-lg mb-8 leading-relaxed">
            Engineered flooring systems that power India’s leading industries — designed for strength,
            safety, and sustainability.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/products"
              className="px-8 py-3 rounded-full bg-sky-500 hover:bg-sky-600 font-semibold shadow-md transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              Explore Products
            </Link>
            <Link
              to="/photos"
              className="px-8 py-3 rounded-full border border-white/60 hover:bg-white/10 transition font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
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
            alt="Factory process"
            className="rounded-2xl shadow-lg object-cover w-full h-80 md:h-[420px]"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            loading="lazy"
          />
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-sky-400 mb-4">
              Building India’s Future, One Floor at a Time
            </h2>
            <p className="text-white/80 leading-relaxed text-[17px]">
              From pharmaceutical labs to aerospace hubs, Veera Polymers has delivered over{" "}
              <span className="text-sky-300 font-semibold">100,000 sq.ft</span> of flooring excellence.
              We combine design precision, advanced resin chemistry, and rigorous on-site supervision —
              ensuring performance that lasts.
            </p>
            <Link
              to="/about"
              className="inline-block mt-6 text-sky-400 hover:underline font-medium"
            >
              Discover Our Story →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SIGNATURE SYSTEMS */}
      <section className="bg-[#f8fafc] text-[#0b2b4a] py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-12">
            Our Signature Systems
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {systems.map((c, i) => (
              <motion.article
                key={c.t}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl overflow-hidden flex flex-col border border-gray-100 transition"
              >
                <img
                  src={c.img}
                  alt={c.t}
                  className="h-56 object-cover w-full"
                  loading="lazy"
                />
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold mb-2">{c.t}</h3>
                  <p className="text-gray-600 flex-1 text-[15px]">{c.d}</p>
                  <Link
                    to="/products"
                    className="text-sky-700 mt-4 font-semibold hover:underline"
                  >
                    Learn more →
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS STRIP */}
      <section className="bg-[#0b2b4a] text-white py-24 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(56,189,248,0.15),transparent_70%)]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        />
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-14 text-sky-400">
            The Science Behind Strength
          </h2>

          <div className="relative flex flex-col md:flex-row md:justify-between items-center md:before:absolute md:before:top-1/2 md:before:left-0 md:before:w-full md:before:h-[2px] md:before:bg-white/15">
            {[
              {
                n: "01",
                h: "Consult & Design",
                p: "We study your environment, loads, and safety standards to define optimal materials.",
              },
              {
                n: "02",
                h: "Implement & Supervise",
                p: "Our field teams execute with precision and daily quality checks at every layer.",
              },
              {
                n: "03",
                h: "Validate & Support",
                p: "We inspect, document, and provide post-installation maintenance guidance.",
              },
            ].map((step, i) => (
              <motion.div
                key={step.n}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative z-10 bg-white/5 border border-white/20 rounded-full w-52 h-52 flex flex-col justify-center items-center shadow-lg backdrop-blur-sm p-6 mx-auto my-10 md:my-0"
              >
                <span className="text-4xl font-extrabold text-sky-400 mb-2">
                  {step.n}
                </span>
                <h3 className="text-lg font-semibold">{step.h}</h3>
                <p className="text-sm text-white/70 mt-2 text-center">{step.p}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RECENT PROJECTS */}
      <section className="bg-[#f8fafc] text-[#0b2b4a] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-10 flex-wrap">
            <h2 className="text-3xl font-extrabold">Recent Installations</h2>
            <Link
              to="/photos"
              className="text-sky-700 hover:underline font-medium mt-3 sm:mt-0"
            >
              View Gallery →
            </Link>
          </div>

          <motion.div
            drag="x"
            dragConstraints={{ left: -400, right: 0 }}
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          >
            {projects.map((n, i) => (
              <motion.article
                key={i}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="min-w-[280px] bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition snap-start"
              >
                <img src={n.img} alt={n.h} className="h-48 w-full object-cover" loading="lazy" />
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-1">{n.h}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{n.d}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0b2b4a] text-center text-white py-24">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          className="text-3xl md:text-4xl font-bold mb-3"
        >
          Ready to Reinforce Your Space?
        </motion.h2>
        <p className="text-white/80 mb-8 text-lg max-w-2xl mx-auto">
          Connect with our technical experts for custom recommendations and free site assessments.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/contact"
            className="px-8 py-3 bg-sky-500 hover:bg-sky-600 rounded-full font-semibold transition shadow-md"
          >
            Contact Us
          </Link>
          <a
            href="/brochure/veera-polymer-chemicals(1).pdf"
            download
            className="px-8 py-3 border border-white/70 hover:bg-white/10 rounded-full transition font-semibold"
          >
            Download Brochure
          </a>
        </div>
      </section>
    </main>
  );
}
