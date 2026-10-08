/**
 * COMPREHENSIVE KENYAN ADMINISTRATIVE GEOGRAPHY
 * Structured hierarchy: County -> Sub-County / Town -> Area / Estate / Micro-region
 * Optimized for searchable comboboxes, cascading dropdowns, and instant area search.
 */

export interface AreaItem {
  id: string;
  name: string;
}

export interface SubCountyItem {
  id: string;
  name: string;
  areas: AreaItem[];
}

export interface CountyItem {
  id: string;
  name: string;
  popular?: boolean;
  subCounties: SubCountyItem[];
}

export interface FlatLocationItem {
  countyId: string;
  countyName: string;
  subCountyId: string;
  subCountyName: string;
  areaId: string;
  areaName: string;
  displayName: string; // e.g. "Kamakis, Ruiru (Kiambu)"
}

export const KENYAN_COUNTIES: CountyItem[] = [
  {
    id: 'nairobi',
    name: 'Nairobi',
    popular: true,
    subCounties: [
      {
        id: 'westlands',
        name: 'Westlands & Dagoretti North',
        areas: [
          { id: 'kilimani', name: 'Kilimani' },
          { id: 'kileleshwa', name: 'Kileleshwa' },
          { id: 'lavington', name: 'Lavington' },
          { id: 'westlands_cbd', name: 'Westlands Commercial / Sarit' },
          { id: 'parklands', name: 'Parklands & Highridge' },
          { id: 'riverside', name: 'Riverside Drive' },
          { id: 'spring_valley', name: 'Spring Valley & Lower Kabete' },
          { id: 'mountain_view', name: 'Mountain View' }
        ]
      },
      {
        id: 'langata_karen',
        name: "Lang'ata & Karen",
        areas: [
          { id: 'karen', name: 'Karen' },
          { id: 'langata_estate', name: "Lang'ata Estate" },
          { id: 'south_c', name: 'South C' },
          { id: 'nairobi_west', name: 'Nairobi West' },
          { id: 'madaraka', name: 'Madaraka' },
          { id: 'dam_estate', name: 'Dam Estate' }
        ]
      },
      {
        id: 'kasarani_roysambu',
        name: 'Kasarani & Roysambu',
        areas: [
          { id: 'roysambu', name: 'Roysambu (TRM Area)' },
          { id: 'kasarani_town', name: 'Kasarani' },
          { id: 'zimmerman', name: 'Zimmerman' },
          { id: 'kahawa_west', name: 'Kahawa West' },
          { id: 'garden_estate', name: 'Garden Estate' },
          { id: 'clay_city', name: 'Clay City' },
          { id: 'mirema', name: 'Mirema Drive' }
        ]
      },
      {
        id: 'embakasi',
        name: 'Embakasi Corridor',
        areas: [
          { id: 'nyayo_estate', name: 'Nyayo Estate (Embakasi)' },
          { id: 'donholm', name: 'Donholm & Greenfields' },
          { id: 'fedha', name: 'Fedha Estate' },
          { id: 'utawala', name: 'Utawala & Shooters' },
          { id: 'imara_daima', name: 'Imara Daima' },
          { id: 'pipeline', name: 'Pipeline' },
          { id: 'tassia', name: 'Tassia' }
        ]
      },
      {
        id: 'starehe_kamukunji',
        name: 'Starehe, Makadara & Eastlands',
        areas: [
          { id: 'south_b', name: 'South B & Plainsview' },
          { id: 'buruburu', name: 'Buruburu (Phase 1-5)' },
          { id: 'ngara', name: 'Ngara' },
          { id: 'pangani', name: 'Pangani' },
          { id: 'nairobi_cbd', name: 'Nairobi CBD' },
          { id: 'eastleigh', name: 'Eastleigh' }
        ]
      },
      {
        id: 'kibra_dagoretti_south',
        name: 'Kibra & Dagoretti South',
        areas: [
          { id: 'woodley', name: 'Woodley & Adams Arcade' },
          { id: 'jamhuri', name: 'Jamhuri Estate' },
          { id: 'riruta', name: 'Riruta Satellite' },
          { id: 'waithaka', name: 'Waithaka' }
        ]
      }
    ]
  },
  {
    id: 'kiambu',
    name: 'Kiambu',
    popular: true,
    subCounties: [
      {
        id: 'ruiru',
        name: 'Ruiru (Eastern Bypass & Thika Rd)',
        areas: [
          { id: 'kamakis', name: 'Kamakis (Eastern Bypass)' },
          { id: 'membley', name: 'Membley Estate' },
          { id: 'kahawa_sukari', name: 'Kahawa Sukari' },
          { id: 'kahawa_wendani', name: 'Kahawa Wendani' },
          { id: 'ruiru_town', name: 'Ruiru Town' },
          { id: 'kimbo', name: 'Kimbo / Toll' },
          { id: 'mugutha', name: 'Mugutha' },
          { id: 'tatu_city', name: 'Tatu City' }
        ]
      },
      {
        id: 'kiambaa_karuri',
        name: 'Kiambaa & Karuri (Ruaka)',
        areas: [
          { id: 'ruaka', name: 'Ruaka' },
          { id: 'two_rivers', name: 'Two Rivers Area' },
          { id: 'banana', name: 'Banana Hill' },
          { id: 'muchatha', name: 'Muchatha' },
          { id: 'ndenderu', name: 'Ndenderu' },
          { id: 'karuri_town', name: 'Karuri' }
        ]
      },
      {
        id: 'kiambu_town',
        name: 'Kiambu Sub-County',
        areas: [
          { id: 'thindigua', name: 'Thindigua (Kiambu Rd)' },
          { id: 'edenville', name: 'Edenville Estate' },
          { id: 'fourways', name: 'Fourways Junction' },
          { id: 'kiambu_cbd', name: 'Kiambu Town' },
          { id: 'kasarini', name: 'Kasarini' }
        ]
      },
      {
        id: 'thika',
        name: 'Thika Town & Environs',
        areas: [
          { id: 'thika_cbd', name: 'Thika Town CBD' },
          { id: 'section_9', name: 'Section 9' },
          { id: 'ngoingwa', name: 'Ngoingwa Estate' },
          { id: 'makongeni', name: 'Makongeni' },
          { id: 'landless', name: 'Landless' }
        ]
      },
      {
        id: 'juja',
        name: 'Juja Sub-County',
        areas: [
          { id: 'juja_town', name: 'Juja Town' },
          { id: 'high_point', name: 'High Point Juja' },
          { id: 'kalimoni', name: 'Kalimoni' },
          { id: 'juja_farm', name: 'Juja Farm' }
        ]
      },
      {
        id: 'kikuyu_limuru',
        name: 'Kikuyu & Limuru',
        areas: [
          { id: 'kikuyu_town', name: 'Kikuyu Town' },
          { id: 'ondiri', name: 'Ondiri' },
          { id: 'zambezi', name: 'Zambezi' },
          { id: 'limuru_town', name: 'Limuru Town' },
          { id: 'tigoni', name: 'Tigoni' }
        ]
      }
    ]
  },
  {
    id: 'machakos',
    name: 'Machakos',
    popular: true,
    subCounties: [
      {
        id: 'mavoko',
        name: 'Mavoko / Athi River',
        areas: [
          { id: 'syokimau', name: 'Syokimau' },
          { id: 'mlolongo', name: 'Mlolongo' },
          { id: 'athi_river_town', name: 'Athi River Town' },
          { id: 'katani', name: 'Katani' },
          { id: 'sabaki', name: 'Sabaki' },
          { id: 'kyumvi', name: 'Kyumvi / Machakos Junction' }
        ]
      },
      {
        id: 'machakos_town_sub',
        name: 'Machakos Town',
        areas: [
          { id: 'machakos_cbd', name: 'Machakos CBD' },
          { id: 'katumani', name: 'Katumani' },
          { id: 'mua_hills', name: 'Mua Hills' }
        ]
      },
      {
        id: 'tala_kangundo',
        name: 'Tala & Kangundo',
        areas: [
          { id: 'tala_town', name: 'Tala Town' },
          { id: 'kangundo_town', name: 'Kangundo Town' }
        ]
      }
    ]
  },
  {
    id: 'kajiado',
    name: 'Kajiado',
    popular: true,
    subCounties: [
      {
        id: 'kajiado_north',
        name: 'Kajiado North (Rongai & Ngong)',
        areas: [
          { id: 'ongata_rongai', name: 'Ongata Rongai' },
          { id: 'rimpa', name: 'Rimpa' },
          { id: 'nkoroi', name: 'Nkoroi' },
          { id: 'ngong_town', name: 'Ngong Town' },
          { id: 'matasia', name: 'Matasia' },
          { id: 'kiserian', name: 'Kiserian' }
        ]
      },
      {
        id: 'kajiado_east',
        name: 'Kajiado East (Kitengela)',
        areas: [
          { id: 'kitengela_town', name: 'Kitengela Town' },
          { id: 'kitengela_yukos', name: 'Kitengela (Yukos)' },
          { id: 'chuna_estate', name: 'Chuna Estate' },
          { id: 'epz_area', name: 'EPZ Area' },
          { id: 'acacia', name: 'Acacia Estate' }
        ]
      }
    ]
  },
  {
    id: 'mombasa',
    name: 'Mombasa',
    popular: true,
    subCounties: [
      {
        id: 'nyali_sub',
        name: 'Nyali',
        areas: [
          { id: 'nyali_beach', name: 'Nyali Beach' },
          { id: 'links_road', name: 'Links Road' },
          { id: 'greenwood', name: 'Greenwood' },
          { id: 'cinemax', name: 'Cinemax / Nyali Centre' }
        ]
      },
      {
        id: 'kisauni_sub',
        name: 'Kisauni & Bamburi',
        areas: [
          { id: 'bamburi', name: 'Bamburi' },
          { id: 'shanzu', name: 'Shanzu' },
          { id: 'mkomani', name: 'Mkomani' }
        ]
      },
      {
        id: 'mvita',
        name: 'Mvita (Mombasa Island)',
        areas: [
          { id: 'old_town_msa', name: 'Old Town' },
          { id: 'ganjoni', name: 'Ganjoni' },
          { id: 'kizingo', name: 'Kizingo' },
          { id: 'tudor', name: 'Tudor' }
        ]
      },
      {
        id: 'likoni_sub',
        name: 'Likoni',
        areas: [
          { id: 'shelly_beach', name: 'Shelly Beach' },
          { id: 'likoni_town', name: 'Likoni' }
        ]
      }
    ]
  },
  {
    id: 'nakuru',
    name: 'Nakuru',
    popular: true,
    subCounties: [
      {
        id: 'nakuru_town',
        name: 'Nakuru City (East & West)',
        areas: [
          { id: 'milimani_nkr', name: 'Milimani (Nakuru)' },
          { id: 'section_58', name: 'Section 58' },
          { id: 'naka', name: 'Naka' },
          { id: 'kiamunyi', name: 'Kiamunyi' },
          { id: 'free_area', name: 'Free Area' },
          { id: 'lanet', name: 'Lanet' },
          { id: 'pipeline_nkr', name: 'Pipeline (Nakuru)' }
        ]
      },
      {
        id: 'naivasha_sub',
        name: 'Naivasha',
        areas: [
          { id: 'naivasha_town', name: 'Naivasha Town' },
          { id: 'moi_south_lake', name: 'Moi South Lake' },
          { id: 'karagita', name: 'Karagita' }
        ]
      },
      {
        id: 'gilgil_sub',
        name: 'Gilgil',
        areas: [
          { id: 'gilgil_town', name: 'Gilgil Town' },
          { id: 'kikopey', name: 'Kikopey' }
        ]
      }
    ]
  },
  {
    id: 'uasin_gishu',
    name: 'Uasin Gishu (Eldoret)',
    popular: true,
    subCounties: [
      {
        id: 'eldoret_central',
        name: 'Eldoret City',
        areas: [
          { id: 'elgon_view', name: 'Elgon View' },
          { id: 'pioneer', name: 'Pioneer' },
          { id: 'kapsoya', name: 'Kapsoya' },
          { id: 'west_indies', name: 'West Indies' },
          { id: 'annex', name: 'Annex' },
          { id: 'langas', name: 'Langas' },
          { id: 'maili_nne', name: 'Maili Nne' }
        ]
      }
    ]
  },
  {
    id: 'kisumu',
    name: 'Kisumu',
    popular: true,
    subCounties: [
      {
        id: 'kisumu_central',
        name: 'Kisumu City',
        areas: [
          { id: 'milimani_ksm', name: 'Milimani (Kisumu)' },
          { id: 'riat_hills', name: 'Riat Hills' },
          { id: 'kondele', name: 'Kondele' },
          { id: 'tom_mboya', name: 'Tom Mboya Estate' },
          { id: 'mamboleo', name: 'Mamboleo' },
          { id: 'migosi', name: 'Migosi' },
          { id: 'kibuye', name: 'Kibuye' },
          { id: 'nyamasaria', name: 'Nyamasaria' }
        ]
      }
    ]
  },
  {
    id: 'kilifi',
    name: 'Kilifi',
    subCounties: [
      {
        id: 'kilifi_south',
        name: 'Kilifi South & Mtwapa',
        areas: [
          { id: 'mtwapa', name: 'Mtwapa' },
          { id: 'vipingo_ridge', name: 'Vipingo Ridge' },
          { id: 'kikambala', name: 'Kikambala' }
        ]
      },
      {
        id: 'malindi_watamu',
        name: 'Malindi & Watamu',
        areas: [
          { id: 'malindi_town', name: 'Malindi Town' },
          { id: 'watamu_beach', name: 'Watamu Beach' }
        ]
      },
      {
        id: 'kilifi_north',
        name: 'Kilifi North',
        areas: [
          { id: 'kilifi_town', name: 'Kilifi Town' },
          { id: 'bofa_beach', name: 'Bofa Beach' }
        ]
      }
    ]
  },
  {
    id: 'kwale',
    name: 'Kwale (Diani)',
    subCounties: [
      {
        id: 'msambweni_diani',
        name: 'Msambweni & Diani',
        areas: [
          { id: 'diani_beach', name: 'Diani Beach' },
          { id: 'ukunda_town', name: 'Ukunda Town' },
          { id: 'galu_kinondo', name: 'Galu Kinondo' },
          { id: 'tiwi', name: 'Tiwi' }
        ]
      }
    ]
  },
  {
    id: 'nyeri',
    name: 'Nyeri',
    subCounties: [
      {
        id: 'nyeri_central',
        name: 'Nyeri Town',
        areas: [
          { id: 'ring_road_nyr', name: 'Ring Road' },
          { id: 'skuta', name: 'Skuta' },
          { id: 'kingongo', name: "King'ong'o" }
        ]
      },
      {
        id: 'mathira',
        name: 'Mathira & Karatina',
        areas: [
          { id: 'karatina_town', name: 'Karatina Town' }
        ]
      }
    ]
  },
  {
    id: 'meru',
    name: 'Meru',
    subCounties: [
      {
        id: 'imenti_north',
        name: 'Meru Town',
        areas: [
          { id: 'makutano_meru', name: 'Makutano' },
          { id: 'milimani_meru', name: 'Milimani Meru' },
          { id: 'kinoru', name: 'Kinoru' }
        ]
      },
      {
        id: 'imenti_south',
        name: 'Nkubu',
        areas: [
          { id: 'nkubu_town', name: 'Nkubu Town' }
        ]
      }
    ]
  },
  {
    id: 'kakamega',
    name: 'Kakamega',
    subCounties: [
      {
        id: 'lurambi',
        name: 'Kakamega Town',
        areas: [
          { id: 'milimani_kak', name: 'Milimani Kakamega' },
          { id: 'amalemba', name: 'Amalemba' },
          { id: 'kefinco', name: 'Kefinco' }
        ]
      }
    ]
  },
  {
    id: 'kisii',
    name: 'Kisii',
    subCounties: [
      {
        id: 'kisii_town_sub',
        name: 'Kisii Town',
        areas: [
          { id: 'milimani_ksi', name: 'Milimani Kisii' },
          { id: 'daraja_mbili', name: 'Daraja Mbili' },
          { id: 'nyanchwa', name: 'Nyanchwa' }
        ]
      }
    ]
  },
  {
    id: 'laikipia',
    name: 'Laikipia (Nanyuki)',
    subCounties: [
      {
        id: 'laikipia_east',
        name: 'Nanyuki Town',
        areas: [
          { id: 'nanyuki_town', name: 'Nanyuki Town' },
          { id: 'sweetwaters_rd', name: 'Sweetwaters Road' }
        ]
      }
    ]
  },
  {
    id: 'kericho',
    name: 'Kericho',
    subCounties: [
      {
        id: 'kericho_central',
        name: 'Kericho Town',
        areas: [
          { id: 'milimani_ker', name: 'Milimani Kericho' },
          { id: 'brooke', name: 'Brooke' }
        ]
      }
    ]
  },
  {
    id: 'embu',
    name: 'Embu',
    subCounties: [
      {
        id: 'manyatta_embu',
        name: 'Embu Town',
        areas: [
          { id: 'embu_town', name: 'Embu Town' },
          { id: 'majengo_embu', name: 'Majengo' }
        ]
      }
    ]
  },
  {
    id: 'kirinyaga',
    name: 'Kirinyaga',
    subCounties: [
      {
        id: 'kirinyaga_central',
        name: 'Kerugoya & Mwea',
        areas: [
          { id: 'kerugoya', name: 'Kerugoya Town' },
          { id: 'mwea_town', name: 'Wanguru / Mwea' },
          { id: 'sagana', name: 'Sagana' }
        ]
      }
    ]
  },
  {
    id: 'other_counties',
    name: 'Other 47 Counties',
    subCounties: [
      {
        id: 'rest_of_kenya',
        name: 'Countrywide Hubs',
        areas: [
          { id: 'trans_nzoia_kitale', name: 'Kitale / Trans Nzoia' },
          { id: 'bungoma_town', name: 'Bungoma' },
          { id: 'busia_border', name: 'Busia' },
          { id: 'homa_bay_town', name: 'Homa Bay' },
          { id: 'migori_town', name: 'Migori' },
          { id: 'siaya_town', name: 'Siaya' },
          { id: 'nandi_kapsabet', name: 'Kapsabet / Nandi' },
          { id: 'bomet_town', name: 'Bomet' },
          { id: 'narok_town', name: 'Narok' },
          { id: 'taita_voya', name: 'Voi / Taita Taveta' },
          { id: 'kitui_town', name: 'Kitui' },
          { id: 'makueni_wote', name: 'Wote / Makueni' },
          { id: 'garissa_town', name: 'Garissa' },
          { id: 'isiolo_town', name: 'Isiolo' }
        ]
      }
    ]
  }
];

/**
 * Pre-flatten all areas for instant fast typing search:
 * typing "Kamakis" will match "Kamakis, Ruiru (Kiambu)" instantly.
 */
export function getAllFlatLocations(): FlatLocationItem[] {
  const list: FlatLocationItem[] = [];
  for (const county of KENYAN_COUNTIES) {
    for (const sub of county.subCounties) {
      for (const area of sub.areas) {
        list.push({
          countyId: county.id,
          countyName: county.name,
          subCountyId: sub.id,
          subCountyName: sub.name,
          areaId: area.id,
          areaName: area.name,
          displayName: `${area.name}, ${sub.name.split(' (')[0]} (${county.name})`
        });
      }
    }
  }
  return list;
}

export function searchLocations(query: string, maxResults = 8): FlatLocationItem[] {
  if (!query || query.trim() === '') return [];
  const q = query.toLowerCase().trim();
  const all = getAllFlatLocations();
  return all
    .filter((loc) => 
      loc.areaName.toLowerCase().includes(q) ||
      loc.subCountyName.toLowerCase().includes(q) ||
      loc.countyName.toLowerCase().includes(q)
    )
    .slice(0, maxResults);
}
