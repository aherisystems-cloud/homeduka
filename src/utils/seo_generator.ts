import { BusinessProfile } from '../types/schema';

/**
 * Programmatic Asset Generator (The 1-to-N Engine)
 * Takes a single structured BusinessProfile and generates:
 * 1. JSON-LD LocalBusiness Schema (Rich Google snippets)
 * 2. High-CTR SEO Meta tags tailored for Kenyan search queries
 * 3. Social share card copy
 */

export function generateLocalBusinessJsonLd(business: BusinessProfile) {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": business.business_name,
    "image": [business.media.cover_image_url, ...business.media.portfolio_work_photos],
    "telephone": business.contact.primary_phone,
    "priceRange": business.commercial.price_rating,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": `${business.location.landmark}, ${business.location.road_or_bypass || ''}`.trim(),
      "addressLocality": business.location.neighborhood,
      "addressRegion": business.location.county,
      "addressCountry": "KE"
    },
    ...(business.location.coordinates && {
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": business.location.coordinates.latitude,
        "longitude": business.location.coordinates.longitude
      }
    }),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": business.reputation.rating,
      "reviewCount": business.reputation.total_reviews
    }
  };
}

export function generateCollectionPageSlug(category: string, county: string, neighborhood?: string): string {
  const cleanCat = category.toLowerCase().replace(/_/g, '-');
  const cleanCounty = county.toLowerCase().replace(/\s+/g, '-');
  if (neighborhood) {
    const cleanNeigh = neighborhood.toLowerCase().replace(/\s+/g, '-');
    return `${cleanCat}-in-${cleanNeigh}-${cleanCounty}`;
  }
  return `${cleanCat}-in-${cleanCounty}`;
}
