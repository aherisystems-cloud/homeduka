import { MetadataRoute } from 'next';
import { HOME_ROOMS, SAMPLE_KENYAN_HOME_LISTINGS } from '../data/mock_listings';

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
      url: `${baseUrl}/rooms`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/refills`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/fair-prices`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/delivery-check`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/deals`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/verify-till`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sell`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
  ];

  // Dedicated Room Landing Pages (SEO & AIEO Authority Hubs)
  const roomRoutes: MetadataRoute.Sitemap = HOME_ROOMS.map((room) => ({
    url: `${baseUrl}/room/${room.id}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // Verified Local Shops & Yard Showrooms
  const shopRoutes: MetadataRoute.Sitemap = SAMPLE_KENYAN_HOME_LISTINGS.map((shop) => ({
    url: `${baseUrl}/shop/${shop.slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...roomRoutes, ...shopRoutes];
}
