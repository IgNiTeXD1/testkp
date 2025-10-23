import React from "react";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0b2b4a] text-white mt-16 relative overflow-hidden">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 via-blue-400 to-cyan-400" />

      <div className="max-w-7xl mx-auto px-6 py-12 grid sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* About section */}
        <div>
          <h4 className="font-bold text-lg mb-3">Veera Polymers & Chemicals</h4>
          <p className="text-white/80 text-sm leading-relaxed">
            Industrial epoxy flooring, PU coatings, and protective paints engineered 
            for performance, safety, and long-term durability.
          </p>
          <a
            href="/brochure/veera_brochure.pdf"
            download
            className="inline-block mt-4 text-sm font-medium text-sky-300 hover:text-sky-400 transition"
          >
            📄 Download Brochure
          </a>
        </div>

        {/* Solutions */}
        <div>
          <h5 className="font-semibold text-lg mb-3">Solutions</h5>
          <ul className="space-y-2 text-sm text-white/80">
            <li><a href="/products#Epoxy Flooring" className="hover:text-sky-300 transition">Epoxy Flooring</a></li>
            <li><a href="/products#PU & Floor Coating" className="hover:text-sky-300 transition">PU Floor Coating</a></li>
            <li><a href="/products#Epoxy Paints" className="hover:text-sky-300 transition">Epoxy Paints</a></li>
            <li><a href="/products#Industrial Coatings" className="hover:text-sky-300 transition">Industrial Coatings</a></li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h5 className="font-semibold text-lg mb-3">Company</h5>
          <ul className="space-y-2 text-sm text-white/80">
            <li><a href="/" className="hover:text-sky-300 transition">Home</a></li>
            <li><a href="/about" className="hover:text-sky-300 transition">About</a></li>
            <li><a href="/projects" className="hover:text-sky-300 transition">Projects</a></li>
            <li><a href="/contact" className="hover:text-sky-300 transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact + Socials */}
        <div>
          <h5 className="font-semibold text-lg mb-3">Contact</h5>
          <p className="text-sm text-white/80 mb-1">📍 Chennai, Tamil Nadu, India</p>
          <p className="text-sm text-white/80 mb-1">📞 +91 98765 43210</p>
          <p className="text-sm text-white/80 mb-4">✉️ veerapolymers@gmail.com</p>

          <div className="flex space-x-4 mt-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/10 rounded-full hover:bg-sky-600 transition"
            >
              <FaFacebookF size={16} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/10 rounded-full hover:bg-sky-600 transition"
            >
              <FaLinkedinIn size={16} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/10 rounded-full hover:bg-sky-600 transition"
            >
              <FaInstagram size={16} />
            </a>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/10 rounded-full hover:bg-green-600 transition"
            >
              <FaWhatsapp size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="border-t border-white/10 text-center py-4 text-xs text-white/70 backdrop-blur-sm">
        © {new Date().getFullYear()} <span className="font-medium text-white">Veera Polymers & Chemicals</span>.  
        All rights reserved. | Designed with ❤️ in Chennai
      </div>
    </footer>
  );
}

