import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

export default function SEOHeader({ title, description, keywords, ogImage }) {
  const { pathname } = useLocation();
  const baseTitle = "Maruti Hydraulics | Heavy Duty Hydraulic Cylinders Manufacturer";
  const fullTitle = title ? `${title} | Maruti Hydraulics` : baseTitle;
  const canonicalUrl = `https://www.marutihydraulics.in${pathname}`;
  const defaultDesc = "Maruti Hydraulics manufactures premium, precision-engineered heavy-duty hydraulic cylinders and power packs in Ahmedabad, Gujarat, India. Serving steel, plastic, mining, and construction industries.";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta property="og:image" content={ogImage || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDesc} />
      <meta name="twitter:image" content={ogImage || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"} />

      {/* Structured Data (Schema.org) for Manufacturing Company */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Maruti Hydraulics",
          "image": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
          "telephone": "+91-9737113699",
          "email": "marutihydraulics09@gmail.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Office no. B-524, Pushpak Corner, Opp. Navyug School, Naroda",
            "addressLocality": "Ahmedabad",
            "addressRegion": "Gujarat",
            "postalCode": "382345",
            "addressCountry": "IN"
          },
          "url": "https://www.marutihydraulics.in"
        })}
      </script>
    </Helmet>
  );
}
