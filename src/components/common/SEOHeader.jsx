import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

export default function SEOHeader({ title, description, keywords, ogImage, productSchema }) {
  const { pathname } = useLocation();
  const baseTitle = "Maruti Hydraulics | Heavy Duty Hydraulic Cylinders & Power Packs Manufacturer";
  
  // Clean path and ensure consistent canonical URL matching sitemap
  const cleanPath = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
  const canonicalUrl = cleanPath === '/' ? 'https://www.marutihydraulics.in/' : `https://www.marutihydraulics.in${cleanPath}`;

  const fullTitle = title 
    ? (title.includes("Maruti Hydraulics") ? title : `${title} | Maruti Hydraulics`)
    : baseTitle;

  const defaultDesc = "Maruti Hydraulics manufactures premium, precision-engineered heavy-duty hydraulic cylinders and power packs in Ahmedabad, Gujarat, India. Serving steel, plastic, mining, and construction industries.";

  // Generate breadcrumb items from URL path
  const pathSegments = cleanPath.split('/').filter(Boolean);
  const breadcrumbItems = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.marutihydraulics.in/"
    },
    ...pathSegments.map((segment, index) => {
      const url = `https://www.marutihydraulics.in/${pathSegments.slice(0, index + 1).join('/')}`;
      const name = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      return {
        "@type": "ListItem",
        "position": index + 2,
        "name": name,
        "item": url
      };
    })
  ];

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Organization"],
    "name": "Maruti Hydraulics",
    "legalName": "Maruti Hydraulics",
    "alternateName": [
      "Maruti Hydraulic",
      "Maruti Hydraulics Ahmedabad",
      "Maruti Hydraulics Naroda",
      "Maruti Hydraulics Gujarat",
      "Maruti Hydraulics India"
    ],
    "image": ogImage || "https://www.marutihydraulics.in/LogoOG.png",
    "logo": "https://www.marutihydraulics.in/LogoOG.png",
    "telephone": "+91-9737113699",
    "email": "marutihydraulics09@gmail.com",
    "priceRange": "₹₹₹",
    "currenciesAccepted": "INR",
    "paymentAccepted": "Cash, Credit Card, Bank Transfer",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Office no. B-524, Pushpak Corner, Opp. Navyug School, Naroda",
      "addressLocality": "Ahmedabad",
      "addressRegion": "Gujarat",
      "postalCode": "382345",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 23.0694,
      "longitude": 72.6578
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "19:00"
      }
    ],
    "url": "https://www.marutihydraulics.in/"
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:site_name" content="Maruti Hydraulics" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta property="og:image" content={ogImage || "https://www.marutihydraulics.in/LogoOG.png"} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDesc} />
      <meta name="twitter:image" content={ogImage || "https://www.marutihydraulics.in/LogoOG.png"} />

      {/* Structured Data (Schema.org) for Manufacturing Company */}
      <script type="application/ld+json">
        {JSON.stringify(businessSchema)}
      </script>

      {/* BreadcrumbList Schema for Google Sitelinks & Breadcrumbs */}
      {pathSegments.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbItems
          })}
        </script>
      )}

      {/* Optional Product Schema */}
      {productSchema && (
        <script type="application/ld+json">
          {JSON.stringify(productSchema)}
        </script>
      )}
    </Helmet>
  );
}
