import { BusinessProfile } from '../types/schema';

/**
 * Builds high-converting, localized WhatsApp deep links for Kenyan buyers.
 * 
 * In Kenya, buyers will NOT fill out contact forms or send emails.
 * They tap WhatsApp immediately.
 * 
 * Prefilling the exact context and platform referral:
 * 1. Proves value to the seller ("This lead came from Home Kenya!").
 * 2. Gives the seller the exact item/service the buyer is asking about.
 * 3. Reduces typing effort for the buyer to 0 taps (just press Send).
 */
export function generateWhatsAppLeadLink(
  business: BusinessProfile,
  options?: {
    itemOrServiceName?: string;
    itemRefCode?: string;
    consumerLocation?: string;
  }
): string {
  const phone = business.contact.whatsapp_number.replace(/\+/g, '').trim();

  let message = `Habari ${business.business_name},\n`;
  message += `Nimeona profile yenu kwenye *Home Kenya*.\n\n`;

  if (options?.itemOrServiceName) {
    message += `Napenda kuulizia: *${options.itemOrServiceName}*`;
    if (options.itemRefCode) {
      message += ` (Ref: #${options.itemRefCode})`;
    }
    message += `.\n`;
  } else {
    message += `Napenda kuulizia kuhusu huduma/bidhaa zenu.\n`;
  }

  if (options?.consumerLocation) {
    message += `Niko pande za: *${options.consumerLocation}*.\n`;
  }

  message += `\nJe, hii inapatikana na bei ni ngapi pamoja na delivery/kazi?\nAsante!`;

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}
