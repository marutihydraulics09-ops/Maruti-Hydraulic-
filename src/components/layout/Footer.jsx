import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Mail, Phone, MapPin, ArrowUp
} from 'lucide-react';
import Logo from '../common/Logo';
import { companyDetails, products, industries } from '../../data/siteData';

// Custom inline SVG icons for social platforms
const FacebookIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Footer() {
  const { pathname } = useLocation();
  const isContactPage = pathname === '/contact';

  const scrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-dark-bg border-t border-white/10 text-white/60 pt-12 pb-6 overflow-hidden z-10">
      {/* Blueprint Grid Accent */}
      <div className="absolute inset-0 engineering-grid opacity-[0.03] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">

        {/* Top Segment: Brand & Socials */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-10 border-b border-white/5">
          {/* Brand Presentation */}
          <div className="flex flex-col gap-3 max-w-2xl">
            <Link to="/">
              <Logo light={true} className="h-10 md:h-12" />
            </Link>
            <p className="text-xs font-inter leading-relaxed text-white/50 max-w-xl">
              Maruti Hydraulics is a premier, ISO-ready engineering company manufacturing heavy-duty hydraulic cylinders and power packs for rugged industrial and mobile machinery worldwide. Precision engineered in Gujarat, India.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 shrink-0">
            {[
              { icon: FacebookIcon, link: "https://www.facebook.com" },
              { icon: LinkedinIcon, link: "https://www.linkedin.com" },
              { icon: TwitterIcon, link: "https://x.com" }
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white hover:text-accent hover:border-accent hover:bg-accent/10 transition-all duration-300"
              >
                <social.icon />
              </a>
            ))}
          </div>
        </div>

        {/* Middle Segment: Columns */}
        <div className={`grid gap-8 py-10 ${isContactPage ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-2 md:grid-cols-4'}`}>
          {/* Col 1: Products */}
          <div className="flex flex-col gap-3">
            <h4 className="font-poppins font-extrabold text-white text-[11px] uppercase tracking-widest border-l-2 border-accent pl-2.5">
              Cylinders & Packs
            </h4>
            <div className="flex flex-col gap-2 text-xs">
              {products.map((prod) => (
                <Link
                  key={prod.id}
                  to={`/products/${prod.id}`}
                  className="hover:text-accent transition-colors font-manrope"
                >
                  {prod.name.replace(" Hydraulic Cylinders", "")}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 2: Industries */}
          <div className="flex flex-col gap-3">
            <h4 className="font-poppins font-extrabold text-white text-[11px] uppercase tracking-widest border-l-2 border-accent pl-2.5">
              Industries Served
            </h4>
            <div className="flex flex-col gap-2 text-xs">
              {industries.slice(0, 6).map((ind) => (
                <Link
                  key={ind.id}
                  to={`/industries#${ind.id}`}
                  className="hover:text-accent transition-colors font-manrope"
                >
                  {ind.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 3: Company Links */}
          <div className="flex flex-col gap-3">
            <h4 className="font-poppins font-extrabold text-white text-[11px] uppercase tracking-widest border-l-2 border-accent pl-2.5">
              Navigation
            </h4>
            <div className="flex flex-col gap-2 text-xs">
              {[
                { label: "About Story", path: "/about" },
                { label: "Quality Benchmarks", path: "/quality" },
                { label: "Cylinder Configurator", path: "/configurator" },
                { label: "Projects Case Studies", path: "/projects" },
                { label: "Knowledge Blog", path: "/blog" },
                { label: "Download Brochure", path: "/Maruti Hydraulic Brochure.pdf", isStatic: true }
              ].map((link, idx) => {
                if (link.isStatic) {
                  return (
                    <a
                      key={idx}
                      href={link.path}
                      download="Maruti_Hydraulic_Brochure.pdf"
                      className="hover:text-accent transition-colors font-manrope text-accent font-bold"
                    >
                      {link.label}
                    </a>
                  );
                }
                return (
                  <Link
                    key={idx}
                    to={link.path}
                    className="hover:text-accent transition-colors font-manrope"
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Col 4: Address/Contact — hidden on /contact page */}
          {!isContactPage && (
            <div className="flex flex-col gap-3">
              <h4 className="font-poppins font-extrabold text-white text-[11px] uppercase tracking-widest border-l-2 border-accent pl-2.5">
                Contact Details
              </h4>
              <div className="flex flex-col gap-3 text-[11px] font-manrope">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    {companyDetails.address}
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-3.5 h-3.5 text-accent" />
                  <span>+91 97371 13699</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-3.5 h-3.5 text-accent" />
                  <span>marutihydraulics09@gmail.com</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Segment: Copyright & Legal */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-white/5 gap-4">
          <p className="text-[11px] font-manrope text-white/40">
            © {new Date().getFullYear()} Maruti Hydraulics. All engineering rights reserved. Built in India.
          </p>
          <div className="flex gap-6 text-[11px] font-manrope">
            <Link to="/privacy-policy" className="hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-conditions" className="hover:text-accent transition-colors">
              Terms & Conditions
            </Link>
          </div>
          {/* Scroll to Top Trigger */}
          <button
            onClick={scrollToTop}
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent hover:text-dark-bg hover:border-accent hover:shadow-[0_0_15px_rgba(255,107,0,0.4)] transition-all cursor-pointer group"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
