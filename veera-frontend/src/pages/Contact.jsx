import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  User,
  Building2,
} from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.service || !form.message)
      return alert("⚠️ Please fill all fields.");
    setLoading(true);

    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setForm({ name: "", email: "", service: "", message: "" });
      setTimeout(() => setSubmitted(false), 4000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4 flex flex-col items-center">
      {/* Title */}
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-center mb-10 text-[#0b2b4a]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Let’s Start a Project
      </motion.h1>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* 📍 Info Section */}
        <motion.div
          className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div>
            <h2 className="text-2xl font-semibold text-[#0b2b4a] mb-4">
              Veera Polymers & Chemicals
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Delivering customized epoxy and PU flooring solutions built for
              precision, durability, and safety across India.
            </p>

            <div className="space-y-3 text-gray-800 text-sm md:text-base">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-[3px] text-[#0b2b4a]" />
                No.16, Bhavani Nagar, Vivekananda Nagar Main Road,
                <br /> Chennai – 600099
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#0b2b4a]" /> +91 7942704879
              </p>
              <p className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#0b2b4a]" /> Proprietor: Ragupathi
                V
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#0b2b4a]" />{" "}
                veerapolymers@gmail.com
              </p>
              <p className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#0b2b4a]" /> Mon – Sat: 9 AM
                – 6 PM
              </p>
            </div>
          </div>

          {/* Map */}
          <div className="mt-8 rounded-xl overflow-hidden shadow-md border border-blue-100">
            <iframe
              src="https://www.google.com/maps?q=No.16,+Bhavani+Nagar,+Vivekananda+Nagar+Main+Road,+Chennai,+Tamil+Nadu+600099,+India&output=embed"
              className="w-full h-64 md:h-72 border-0"
              allowFullScreen
              loading="lazy"
              title="Veera Polymers Location"
            ></iframe>
          </div>
        </motion.div>

        {/* ✉️ Contact Form */}
        <motion.div
          className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg p-8 hover:shadow-xl transition-all duration-300"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-2xl font-semibold text-[#0b2b4a] mb-6">
            Send Us a Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name + Email */}
            {["name", "email"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                  {field}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent transition"
                  placeholder={`Your ${field}`}
                />
              </div>
            ))}

            {/* Service Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Choose Service
              </label>
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent transition bg-white"
              >
                <option value="">Select a service</option>
                <option value="epoxy-flooring">Epoxy Flooring</option>
                <option value="pu-coating">PU Coating</option>
                <option value="esd-flooring">ESD / Anti-Static Systems</option>
                <option value="protective-paint">Protective Paint Coatings</option>
                <option value="waterproofing">Waterproofing Solutions</option>
                <option value="custom-consult">Custom Industrial Consultation</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                name="message"
                rows="4"
                value={form.message}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent transition resize-none"
                placeholder="Tell us about your project or requirement..."
              ></textarea>
            </div>

            {/* Submit Button */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.02 }}
              disabled={loading}
              type="submit"
              className="w-full bg-[#0b2b4a] text-white py-3 rounded-lg font-semibold hover:bg-[#123d6a] transition flex justify-center items-center gap-2 shadow-md"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                </>
              ) : (
                "Send Message"
              )}
            </motion.button>
          </form>

          {/* ✅ Success Message */}
          <AnimatePresence>
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="mt-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center justify-center gap-2 text-sm"
              >
                <CheckCircle className="w-5 h-5 text-green-600" />
                Message sent successfully! We’ll get back to you soon.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Mobile Call Shortcut */}
      <a
        href="tel:+917942704879"
        className="fixed bottom-5 right-5 sm:hidden bg-sky-600 text-white rounded-full shadow-lg p-4 hover:scale-110 transition"
        aria-label="Call Veera Polymers"
      >
        <Phone className="w-5 h-5" />
      </a>
    </div>
  );
}
