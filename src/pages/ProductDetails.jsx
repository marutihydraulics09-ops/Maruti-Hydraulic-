import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, CheckCircle2, ChevronRight, Phone, Mail
} from 'lucide-react';

import SEOHeader from '../components/common/SEOHeader';
import { products } from '../data/siteData';

export default function ProductDetails() {
  const { productId } = useParams();
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl text-white">Product Not Found</h2>
        <Link to="/products" className="text-accent underline mt-4 inline-block">Back to Catalog</Link>
      </div>
    );
  }

  return (
    <>
      <SEOHeader
        title={`${product.name} Technical Specifications & Engineering Inquiry`}
        description={`Get complete mechanical dimensions, operating envelopes, materials, and seals for Maruti ${product.name}. Request technical quote on WhatsApp.`}
      />

      {/* Breadcrumbs */}
      <section className="py-4 md:py-6 bg-dark-bg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center text-xs font-manrope">
          <Link to="/products" className="flex items-center gap-1 text-white/50 hover:text-accent">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Catalog
          </Link>
          <div className="flex items-center gap-1.5 text-white/40">
            <span>Catalog</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/80">{product.name}</span>
          </div>
        </div>
      </section>
 
      {/* Main product presentation */}
      <section className="py-8 md:py-16 bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Left segment: Image and specs description */}
          <div className="lg:col-span-7 space-y-8">
            <div className="overflow-hidden rounded-2xl bg-black">
              {product.image ? (
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-64 sm:h-80 md:h-[400px] object-contain scale-[1.12] hover:scale-[1.18] transition-transform duration-500" 
                />
              ) : (
                <div className="w-full h-80 bg-dark-bg/80 relative flex flex-col justify-center items-center rounded-2xl border border-white/5">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-tr from-orange-accent to-accent opacity-20 blur-3xl rounded-full animate-pulse"></div>
                  <div className="relative z-10 space-y-3 text-center flex flex-col items-center">
                    <span className="font-poppins font-black text-2xl uppercase tracking-widest text-white">Bespoke</span>
                    <span className="text-xs font-manrope text-accent uppercase tracking-widest">Engineering & Design</span>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <span className="font-poppins font-extrabold text-xs tracking-widest text-accent uppercase">
                Actuator Specifications
              </span>
              <h1 className="font-poppins font-black text-2xl md:text-3xl text-white uppercase tracking-tight">
                {product.name}
              </h1>
              <p className="text-sm font-inter text-white/70 leading-relaxed">
                {product.longDescription}
              </p>
            </div>

            {/* Spec Sheet Table */}
            {product.specifications && (
              <div className="space-y-4 pt-6 border-t border-white/5">
                <h3 className="font-poppins font-bold text-base text-white uppercase tracking-wider">
                  Technical Specifications Sheet
                </h3>

                <div className="rounded-2xl overflow-hidden text-xs md:text-sm font-manrope">
                  {[
                    { label: "Bore Size Limit", val: product.specifications.boreDia },
                    { label: "Piston Rod Limit", val: product.specifications.rodDia },
                    { label: "Stroke Limits", val: product.specifications.stroke },
                    { label: "Fluid Medium", val: product.specifications.medium },
                    { label: "Operating pressure", val: product.specifications.pressure },
                    { label: "Temperature limits", val: product.specifications.temperature },
                    { label: "Sealing materials", val: product.specifications.seals },
                    { label: "Materials construction", val: product.specifications.construction }
                  ].map((spec, i) => (
                    <div key={i} className={`grid grid-cols-1 md:grid-cols-3 p-3 sm:p-4 gap-1 sm:gap-2 ${i % 2 === 0 ? 'bg-white/5' : 'bg-white/[0.02]'}`}>
                      <span className="font-bold text-white/50 uppercase text-[10px] tracking-wider">{spec.label}</span>
                      <span className="md:col-span-2 text-white/80 leading-relaxed">{spec.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features details */}
            {product.features && (
              <div className="space-y-4 pt-6 border-t border-white/5">
                <h3 className="font-poppins font-bold text-base text-white uppercase tracking-wider">
                  Standard Design Features
                </h3>
                <ul className="space-y-3">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex gap-3 text-xs md:text-sm leading-relaxed text-white/70 font-inter">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right segment: Professional Inquiry & WhatsApp Quoting */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28 self-start">
            <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl relative space-y-4 sm:space-y-6 overflow-hidden">
              {/* Background gradient flare */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-green-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="space-y-3">
                <span className="font-poppins font-extrabold text-xs tracking-widest text-green-500 uppercase flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Instant Pricing
                </span>
                <h3 className="font-poppins font-black text-2xl text-white uppercase tracking-tight">
                  Request Quote
                </h3>
                <p className="text-xs md:text-sm font-inter text-white/60 leading-relaxed">
                  Skip the configuration forms. Connect directly with our engineering division on WhatsApp for immediate technical support, drawing verification, and customized commercial pricing.
                </p>
              </div>

              {/* WhatsApp CTA Action */}
              <div className="pt-4">
                <a
                  href={`https://wa.me/919737113699?text=Hello%20Maruti%20Hydraulics,%20I%20would%20like%20to%20get%20a%20technical%20quote%20and%20drawings%20for%20the%20${encodeURIComponent(product.name)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-600 hover:bg-green-500 text-white font-manrope font-extrabold text-sm uppercase tracking-wider py-4.5 rounded-xl transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(34,197,94,0.2)] hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]"
                >
                  {/* WhatsApp SVG Icon */}
                  <svg className="w-5.5 h-5.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.45 5.589 0 10.137-4.502 10.14-10.04.002-2.684-1.038-5.207-2.93-7.097C16.64 1.577 14.12.54 11.45.54 5.858.54 1.31 5.04 1.308 10.582c-.001 1.62.433 3.202 1.258 4.606l-1.008 3.673 3.774-.988c1.378.75 2.85 1.135 4.315 1.135zm11.233-6.843c-.303-.15-1.79-.877-2.068-.977-.278-.1-.48-.15-.68.15-.2.3-.777.977-.953 1.177-.177.2-.353.225-.656.075-.302-.15-1.277-.468-2.433-1.493-.898-.799-1.505-1.787-1.68-2.087-.177-.3-.02-.46.13-.61.135-.135.303-.35.454-.525.152-.175.202-.3.303-.5.101-.2.05-.375-.025-.525-.075-.15-.68-1.627-.93-2.25-.246-.588-.496-.5-.68-.51-.176-.01-.378-.01-.578-.01-.2 0-.526.075-.802.375-.278.3-1.06 1.025-1.06 2.5s1.07 2.899 1.22 3.1c.15.2 2.105 3.186 5.099 4.48.712.309 1.267.493 1.7.632.715.227 1.366.195 1.88.118.572-.085 1.79-.725 2.043-1.425.253-.699.253-1.299.177-1.425-.076-.125-.278-.2-.581-.35z" />
                  </svg>
                  Enquire on WhatsApp
                </a>
              </div>

              {/* Core capabilities highlighting */}
              <div className="space-y-4 pt-6 border-t border-white/5">
                <h4 className="font-poppins font-bold text-xs text-white/50 uppercase tracking-widest">
                  Why work with Maruti Hydraulics?
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "100% Bespoke Engineering",
                    "ISO Compliant Standards",
                    "Direct Technical Call",
                    "Fast Staged Approvals"
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-manrope text-white/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct email & phone fallback */}
              <div className="pt-6 border-t border-white/5 flex flex-col gap-3 text-xs font-manrope text-white/50">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white/70 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-accent" />
                    Email drawings:
                  </span>
                  <a href="mailto:marutihydraulics09@gmail.com" className="text-accent hover:underline">
                    marutihydraulics09@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white/70 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-accent" />
                    Call engineers:
                  </span>
                  <span>+91 97371 13699</span>
                </div>
              </div>

            </div>


          </div>

        </div>
      </section>
    </>
  );
}
