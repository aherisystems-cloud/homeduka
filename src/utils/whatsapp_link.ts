import { BusinessProfile } from '../types/schema';

export interface WhatsAppLeadOptions {
  itemOrServiceName?: string;
  itemRefCode?: string;
  consumerLocation?: string;
  priceKes?: number;
  formattedPrice?: string;
  dealBadge?: string;
  deliveryTerms?: string;
  verifiedTill?: string;
  intent?: 'product_order' | 'service_inquiry' | 'deal_claim' | 'emergency_dispatch' | 'general';
}

/**
 * Builds high-converting, localized WhatsApp deep links for Kenyan buyers.
 * 
 * Rules:
 * 1. "Act > Read": Punchy, direct Swahili-English conversational tone.
 * 2. Injects exact item, direct price, verified till, and buyer estate.
 * 3. Zero typing needed from buyer: Just tap Send.
 */
export function generateWhatsAppLeadLink(
  business: BusinessProfile,
  options?: WhatsAppLeadOptions
): string {
  const phone = business.contact.whatsapp_number.replace(/\+/g, '').trim();

  let message = `Habari ${business.business_name},\n`;
  message += `Nimeona listing yenu kwenye *Home Kenya*.\n\n`;

  if (options?.intent === 'deal_claim') {
    message += `🔥 *NINATAKA OFA HII (CLAIM DEAL):*\n`;
    message += `Bidhaa/Huduma: *${options.itemOrServiceName || 'Special Deal'}*\n`;
    if (options.formattedPrice || options.priceKes) {
      message += `Bei ya Ofa: *${options.formattedPrice || `KSh ${options.priceKes?.toLocaleString()}`}*\n`;
    }
    if (options.dealBadge) {
      message += `Punguzo: *${options.dealBadge}*\n`;
    }
    if (options.consumerLocation) {
      message += `Eneo langu: *${options.consumerLocation}*\n`;
    }
    message += `\nNaomba kuthibitisha order na malipo kupitia Lipa na M-Pesa. Asante!`;
  } else if (options?.intent === 'emergency_dispatch') {
    message += `🚨 *EMERGENCY FUNDI CALL-OUT (24/7):*\n`;
    message += `Huduma: *${options.itemOrServiceName || 'Emergency Repairs'}*\n`;
    if (options.consumerLocation) {
      message += `Eneo / Estate: *${options.consumerLocation}*\n`;
    }
    message += `\nNahitaji fundi haraka iwezekanavyo. Tafadhali thibitisha kama mko karibu. Asante!`;
  } else if (options?.intent === 'service_inquiry') {
    message += `🛠️ *HUDUMA YA FUNDI:*\n`;
    message += `Kazi: *${options.itemOrServiceName || 'Huduma ya Ukarabati'}*\n`;
    if (options.formattedPrice || options.priceKes) {
      message += `Makadirio ya Bei: *${options.formattedPrice || `KSh ${options.priceKes?.toLocaleString()}`}*\n`;
    }
    if (business.attributes?.affirmed_free_whatsapp_assessment) {
      message += `📷 *Nitatuma picha/video ya eneo kwa WhatsApp estimate ya bure.*\n`;
    }
    if (business.attributes?.affirmed_free_local_measurement) {
      message += `📐 *Nitaomba free site measurement eneo langu.*\n`;
    }
    if (options.consumerLocation) {
      message += `Eneo langu: *${options.consumerLocation}*\n`;
    }
    message += `\nNaomba kujua lini mnaweza kuangalia na kuanza kazi. Asante!`;
  } else {
    // Default / product_order
    message += `🛒 *ORDER YA BIDHAA:*\n`;
    message += `Bidhaa: *${options?.itemOrServiceName || 'Bidhaa'}*`;
    if (options?.itemRefCode) {
      message += ` (Ref: #${options.itemRefCode})`;
    }
    message += `\n`;
    if (options?.formattedPrice || options?.priceKes) {
      message += `Bei: *${options.formattedPrice || `KSh ${options.priceKes?.toLocaleString()}`}*\n`;
    }
    if (options?.deliveryTerms) {
      message += `Delivery: *${options.deliveryTerms}*\n`;
    }
    if (options?.consumerLocation) {
      message += `Eneo langu: *${options.consumerLocation}*\n`;
    }
    if (business.commercial?.mpesa_till_number) {
      message += `Lipa na M-Pesa Till: *${business.commercial.mpesa_till_number}*\n`;
    }
    message += `\nJe, hii iko tayari kuletwa au kuanza kutengenezwa? Asante!`;
  }

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}
