import { MetadataRoute } from 'next';
import { HOME_ROOMS, SAMPLE_KENYAN_HOME_LISTINGS } from '../data/mock_listings';
import { MASTER_PRODUCT_CATEGORIES } from '../data/kenyan_taxonomy';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://homeduka.co.ke';
  const lastModified = new Date();

  // Core static landing pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/soko`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.98,
    },
    {
      url: `${baseUrl}/deals`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/fair-prices`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/verify-till`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/delivery-check`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sell`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/rooms`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/refills`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
  ];

  // Master Soko Category Pages (SEO & AI Overviews Authority Pillars)
  const masterCategoryRoutes: MetadataRoute.Sitemap = MASTER_PRODUCT_CATEGORIES.map((cat) => ({
    url: `${baseUrl}/soko/${cat.id}`,
    lastModified,
    changeFrequency: 'daily',
    priority: 0.95,
  }));

  // Granular Subcategory Pages (Long-Tail Precision GEO & AIO Ranking)
  const subcategoryRoutes: MetadataRoute.Sitemap = MASTER_PRODUCT_CATEGORIES.flatMap((cat) =>
    cat.subcategories.map((sub) => ({
      url: `${baseUrl}/soko/${cat.id}/${sub.id}`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.9,
    }))
  );

  // Dedicated Room Landing Pages
  const roomRoutes: MetadataRoute.Sitemap = HOME_ROOMS.map((room) => ({
    url: `${baseUrl}/room/${room.id}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // Verified Local Shops & Yard Showrooms
  const shopRoutes: MetadataRoute.Sitemap = SAMPLE_KENYAN_HOME_LISTINGS.map((shop) => ({
    url: `${baseUrl}/shop/${shop.slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    ...staticRoutes,
    ...masterCategoryRoutes,
    ...subcategoryRoutes,
    ...roomRoutes,
    ...shopRoutes,
  ];
}
