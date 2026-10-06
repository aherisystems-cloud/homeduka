import { BusinessProfile, HomeProduct } from '../types/schema';

/**
 * ZOHO ONE WEBHOOK DISPATCHER
 * 
 * Synchronizes marketplace vendor actions, profile creation,
 * and product updates to Zoho Flow / Zoho CRM in real time.
 */

export interface ZohoVendorPayload {
  event: 'vendor.onboarded' | 'vendor.updated' | 'product.created' | 'product.out_of_stock';
  platform: 'Home Kenya' | 'Beauty Kenya' | 'Experiences Kenya';
  timestamp: string;
  vendor: {
    id: string;
    slug: string;
    business_name: string;
    phone: string;
    whatsapp: string;
    county: string;
    sub_county: string;
    neighborhood: string;
    landmark: string;
    verification_tier: string;
    categories: string[];
    profile_url: string;
  };
  product?: {
    id: string;
    title: string;
    regular_price_kes: number;
    category: string;
    product_url: string;
  };
}

/**
 * Transforms an internal BusinessProfile into a clean Zoho CRM payload.
 */
export function buildZohoVendorPayload(
  business: BusinessProfile,
  event: 'vendor.onboarded' | 'vendor.updated',
  product?: HomeProduct
): ZohoVendorPayload {
  return {
    event,
    platform: 'Home Kenya',
    timestamp: new Date().toISOString(),
    vendor: {
      id: business.id,
      slug: business.slug,
      business_name: business.business_name,
      phone: business.contact.primary_phone,
      whatsapp: business.contact.whatsapp_number,
      county: business.location.county,
      sub_county: business.location.sub_county,
      neighborhood: business.location.neighborhood,
      landmark: business.location.landmark,
      verification_tier: business.verification.tier,
      categories: business.categories,
      profile_url: `https://homekenya.co.ke/biz/${business.slug}`
    },
    ...(product && {
      product: {
        id: product.id,
        title: product.title,
        regular_price_kes: product.pricing.regular_price_kes,
        category: product.category,
        product_url: `https://homekenya.co.ke/p/${product.slug}`
      }
    })
  };
}

/**
 * Dispatches the event to Zoho Flow webhook endpoint.
 */
export async function sendToZohoFlow(
  webhookUrl: string,
  payload: ZohoVendorPayload
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      return { success: false, error: `Zoho Flow returned HTTP ${response.status}` };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Unknown network error' };
  }
}
