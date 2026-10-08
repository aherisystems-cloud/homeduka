import { HomeProduct, BusinessProfile, HomeService } from '../types/schema';

/**
 * SOCIAL MEDIA COPY & AUTOMATED SCHEDULING ENGINE FOR HOME KENYA
 * 
 * Prepares formatted posts for:
 * 1. Instagram Feed / Carousel
 * 2. Facebook Page / Groups (Kilimani Mums, Nairobi Expats, etc.)
 * 3. X (Twitter)
 * 4. WhatsApp Channel & Status
 * 
 * Integrates with Zoho Social API & Zoho Flow Webhooks.
 */

export interface FormattedSocialPost {
  platform: 'instagram' | 'facebook' | 'twitter' | 'whatsapp';
  caption: string;
  hashtags: string[];
  imageUrl: string;
  whatsappDeepLink: string;
  callToAction: string;
}

export function generateSocialPostCopy(
  product: HomeProduct,
  business: BusinessProfile
): FormattedSocialPost {
  const priceKes = product.pricing.regular_price_kes 
    ? `KSh ${product.pricing.regular_price_kes.toLocaleString()}` 
    : 'Inquire on WhatsApp';

  const cleanPhone = business.contact.whatsapp_number.replace(/\+/g, '').trim();
  const waLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Habari ${business.business_name}, nimeona *${product.title}* kwenye Home Kenya social post. Naomba kujua details zaidi!`
  )}`;

  const caption = `✨ ${product.title.toUpperCase()} ✨

🛋️ Price: ${priceKes}
📍 Shop Landmark: ${business.location.landmark} (${business.location.neighborhood}, ${business.location.county})
🛠️ Material: ${product.specifications.material || 'Solid Hardwood & Premium Finish'}
${product.specifications.dimensions ? `📐 Dimensions: ${product.specifications.dimensions}\n` : ''}
${product.delivery.nairobi_delivery_fee_kes === 0 ? '🚚 FREE Nairobi Delivery Included\n' : '🚚 Countrywide Delivery Available\n'}
🛡️ Verified Lipa na M-Pesa Buy Goods Till: ${business.commercial.mpesa_till_number || 'Available'}

💬 Order or inquire directly on WhatsApp:
${waLink}

🔗 See verified showcase on Home Kenya:
https://homekenya.co.ke/shop/${business.slug}
`;

  const hashtags = [
    '#HomeKenya',
    '#NairobiHomes',
    '#KenyanFurniture',
    '#LivingRoomDecor',
    `#${business.location.neighborhood.replace(/\s+/g, '')}`,
    '#MpesaVerified',
    '#BuyKenyaBuildKenya',
    '#FundiKenya'
  ];

  return {
    platform: 'instagram',
    caption: `${caption}\n\n${hashtags.join(' ')}`,
    hashtags,
    imageUrl: product.images[0] || business.media.cover_image_url,
    whatsappDeepLink: waLink,
    callToAction: 'Order directly on WhatsApp or visit shop!'
  };
}

export function generateServiceSocialPostCopy(
  service: HomeService,
  business: BusinessProfile
): FormattedSocialPost {
  const priceText = service.pricing.starting_price_kes
    ? `From KSh ${service.pricing.starting_price_kes.toLocaleString()}`
    : 'Inquire for free estimate';

  const cleanPhone = business.contact.whatsapp_number.replace(/\+/g, '').trim();
  const waLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Habari ${business.business_name}, nimeona huduma ya *${service.title}* kwenye Home Kenya. Nahitaji makadirio ya kazi.`
  )}`;

  const caption = `🔧 VERIFIED HOME PRO: ${service.title.toUpperCase()} 🔧

📍 Serving: ${business.location.service_coverage_areas?.join(', ') || business.location.neighborhood}
💰 Pricing: ${priceText}
${service.affirmed_commitments.free_whatsapp_assessment ? '📸 Affirmed: Free WhatsApp Photo/Video Assessment\n' : ''}
${service.affirmed_commitments.free_local_measurement ? `📐 Affirmed: Free Local Site Measurements in ${business.location.neighborhood}\n` : ''}
${service.service_terms.emergency_available ? '🚨 24/7 Fast Emergency Dispatch Available\n' : ''}
🛡️ Verified M-Pesa Till: ${business.commercial.mpesa_till_number || 'Verified Pro'}

💬 WhatsApp the fundi directly:
${waLink}

🔗 Full Profile on Home Kenya:
https://homekenya.co.ke/shop/${business.slug}
`;

  const hashtags = [
    '#HomeKenya',
    '#FundiWaStima',
    '#PlumbingKenya',
    '#NairobiFundi',
    `#${business.location.neighborhood.replace(/\s+/g, '')}`,
    '#HomeRepairsKenya'
  ];

  return {
    platform: 'facebook',
    caption: `${caption}\n\n${hashtags.join(' ')}`,
    hashtags,
    imageUrl: service.portfolio_photos[0] || business.media.cover_image_url,
    whatsappDeepLink: waLink,
    callToAction: 'Message on WhatsApp for instant assessment'
  };
}

/**
 * Dispatches automated schedule payload to Zoho Social / Zoho Flow webhook.
 */
export async function dispatchToZohoSocial(payload: {
  post: FormattedSocialPost;
  scheduledTime?: string;
  businessId: string;
}): Promise<{ success: boolean; scheduleId?: string; error?: string }> {
  try {
    const webhookUrl = process.env.ZOHO_SOCIAL_WEBHOOK_URL;
    
    // In production, posts payload to Zoho Flow / Zoho Social
    if (webhookUrl) {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'home_kenya_marketplace',
          action: 'auto_schedule_social_drop',
          data: payload
        })
      });

      if (!response.ok) {
        throw new Error(`Zoho Social webhook failed with status ${response.status}`);
      }
    }

    return {
      success: true,
      scheduleId: `sched-${Date.now()}`
    };
  } catch (err: any) {
    console.error('Failed to dispatch to Zoho Social:', err);
    return {
      success: false,
      error: err.message || 'Zoho Social scheduling failed'
    };
  }
}
