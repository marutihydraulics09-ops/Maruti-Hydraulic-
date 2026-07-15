import React from 'react';
import { Mail, PhoneCall, MapPin, MessageCircle } from 'lucide-react';
import SEOHeader from '../components/common/SEOHeader';
import { companyDetails } from '../data/siteData';

const infoCards = [
  {
    icon: MapPin,
    title: 'Office Address',
    content: '5th Floor, Office no. B-524, Pushpak Corner, Opp. Navyug School, Naroda, Ahmedabad – 382345, Gujarat, India',
    link: 'https://maps.google.com/maps?q=Pushpak+Corner,+Naroda,+Ahmedabad,+Gujarat+382345'
  },
  {
    icon: PhoneCall,
    title: 'Call & WhatsApp',
    content: '+91 97371 13699\n+91 90165 26446',
  },
  {
    icon: Mail,
    title: 'Email Support',
    content: 'marutihydraulics09@gmail.com',
    link: 'mailto:marutihydraulics09@gmail.com'
  },
];

const hours = [
  { day: 'Monday – Friday', time: '9:00 AM – 7:00 PM', open: true },
  { day: 'Saturday', time: '9:00 AM – 5:00 PM', open: true },
  { day: 'Sunday', time: 'Closed', open: false },
];

export default function Contact() {
  return (
    <>
      <SEOHeader
        title="Contact Offices & Factory Location | Maruti"
        description="Get in touch with Maruti Hydraulics in Naroda GIDC. Call +91 97371 13699 or submit an engineering specification sheet inquiry."
      />

      {/* ── Hero ── */}
      <section className="relative pt-10 pb-6 md:pt-16 md:pb-8 bg-dark-bg overflow-hidden">
        <div className="absolute inset-0 engineering-grid opacity-[0.04] pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 md:px-8 text-center space-y-3 relative z-10">
          <span className="font-poppins font-extrabold text-[10px] md:text-xs tracking-widest text-accent uppercase">
            Get in Touch
          </span>
          <h1 className="font-poppins font-black text-2xl sm:text-4xl md:text-5xl text-white uppercase tracking-tight leading-none">
            Contact Maruti Hydraulics
          </h1>
          <p className="text-xs md:text-sm font-inter text-white/60 max-w-lg mx-auto leading-relaxed">
            Reach out for custom geometries, high-pressure fittings, procurement catalogs, or technical support.
          </p>
        </div>
      </section>

      {/* ── Contact Cards + WhatsApp ── */}
      <section className="pb-10 pt-6 md:pb-20 md:pt-6 bg-dark-bg">
        <div className="max-w-5xl mx-auto px-4 md:px-8 space-y-4 md:space-y-6">

          {/* 3 info cards — equal height */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-5">
            {infoCards.map(({ icon: Icon, title, content, link }, i) => {
              const CardWrapper = link ? 'a' : 'div';
              const extraProps = link ? { href: link, target: '_blank', rel: 'noopener noreferrer' } : {};
              return (
                <CardWrapper
                  key={i}
                  {...extraProps}
                  className={`glass-panel rounded-xl sm:rounded-2xl p-4 sm:p-5 flex gap-3 sm:gap-4 items-start hover:border-accent/20 transition-all duration-300 ${link ? 'cursor-pointer group' : ''}`}
                >
                  <div className="shrink-0 p-2.5 sm:p-3 bg-accent/10 border border-accent/20 rounded-lg sm:rounded-xl text-accent group-hover:bg-accent/20 transition-colors">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-poppins font-bold text-white text-[10px] sm:text-xs uppercase tracking-widest mb-1 sm:mb-1.5 flex items-center gap-1.5">
                      {title}
                      {link && !link.startsWith('mailto:') && (
                        <span className="text-[8px] text-accent/60 font-manrope font-normal normal-case">(Open Map)</span>
                      )}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-white/60 font-inter leading-relaxed whitespace-pre-line break-words">
                      {content}
                    </p>
                  </div>
                </CardWrapper>
              );
            })}
          </div>

          {/* WhatsApp hero banner — full width */}
          <a
            href={`https://wa.me/${companyDetails.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden rounded-2xl sm:rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-5 px-6 py-6 md:px-10 md:py-8
                       bg-gradient-to-r from-green-900/40 via-green-800/25 to-green-900/40
                       hover:shadow-[0_0_40px_rgba(34,197,94,0.15)]
                       transition-all duration-500 group"
          >
            {/* glow blobs */}
            <div className="absolute -top-8 -left-8 w-40 h-40 bg-green-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
            <div className="absolute -bottom-8 -right-8 w-52 h-52 bg-green-400/5 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700 pointer-events-none" />

            {/* live pulse dot */}
            <span className="absolute top-4 right-4 sm:top-5 sm:right-6 flex h-2.5 w-2.5 sm:h-3 sm:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-full w-full bg-green-500" />
            </span>

            {/* left — icon + copy */}
            <div className="flex items-center gap-4 sm:gap-5 z-10 text-center sm:text-left w-full sm:w-auto flex-col sm:flex-row">
              <div className="shrink-0 p-3 sm:p-4 bg-green-500/20 rounded-xl sm:rounded-2xl text-green-400
                              group-hover:scale-110 group-hover:bg-green-500/30 transition-all duration-300">
                <MessageCircle className="w-7 h-7 sm:w-9 sm:h-9" />
              </div>
              <div className="space-y-0.5 sm:space-y-1">
                <p className="text-[9px] sm:text-[10px] font-manrope font-black text-green-400 uppercase tracking-[0.2em]">
                  ● Online — Instant Reply
                </p>
                <h2 className="font-poppins font-black text-lg sm:text-2xl md:text-3xl text-white uppercase tracking-tight">
                  Chat on WhatsApp
                </h2>
                <p className="text-[10px] sm:text-xs font-inter text-white/60 max-w-[280px] sm:max-w-sm mx-auto sm:mx-0">
                  Send cylinder specs, drawings, or requirements — get a quote within minutes.
                </p>
              </div>
            </div>

            {/* right — CTA button */}
            <div className="z-10 shrink-0 w-full sm:w-auto mt-2 sm:mt-0">
              <div className="flex items-center justify-center gap-2
                              bg-green-500/90 text-white
                              font-manrope font-black text-[10px] sm:text-xs uppercase tracking-widest
                              px-5 py-3.5 sm:px-7 sm:py-4 rounded-xl sm:rounded-2xl w-full sm:w-auto
                              group-hover:bg-green-500
                              group-hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]
                              transition-all duration-300">
                <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Start Chat
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </a>

        </div>
      </section>

      {/* ── Map + Business Hours ── */}
      <section className="pb-20 md:pb-28 bg-dark-bg">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">

            {/* Map — 3/5 width on desktop */}
            <div 
              data-lenis-prevent
              className="lg:col-span-3 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 h-[350px] sm:h-[400px] lg:h-auto lg:min-h-[450px]"
            >
              <iframe
                data-lenis-prevent
                title="Maruti Hydraulics — Pushpak Corner, Naroda"
                src="https://maps.google.com/maps?q=Pushpak+Corner,+Naroda,+Ahmedabad,+Gujarat+382345&z=16&output=embed"
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Business Hours — 2/5 width on desktop */}
            <div className="lg:col-span-2 glass-panel rounded-3xl border border-white/5 p-8 flex flex-col justify-between gap-6">
              <div>
                <span className="font-poppins font-extrabold text-[10px] tracking-widest text-accent uppercase">
                  Working Schedule
                </span>
                <h3 className="font-poppins font-black text-xl text-white uppercase tracking-tight mt-1 mb-6">
                  Business Hours
                </h3>

                <div className="divide-y divide-white/5">
                  {hours.map(({ day, time, open }, i) => (
                    <div key={i} className="flex justify-between items-center py-3.5">
                      <span className="font-inter text-xs text-white/70">{day}</span>
                      <span className={`font-manrope font-bold text-xs tabular-nums ${open ? 'text-accent' : 'text-white/25'
                        }`}>
                        {time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-accent/10 border border-accent/20 rounded-2xl">
                <p className="text-xs font-inter text-white/70 leading-relaxed">
                  <span className="text-accent font-bold">Emergency Support: </span>
                  For urgent hydraulic failures, call or WhatsApp us anytime — we respond within the hour.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
