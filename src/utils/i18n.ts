import { Language, Currency } from '../types';

export const ZIG_PER_USD = 27.0; // Current indicative rate

export const LANGUAGES: { code: Language; label: string; subLabel: string }[] = [
  { code: 'en', label: 'English', subLabel: 'English' },
  { code: 'sn', label: 'chiShona', subLabel: 'chiShona' },
  { code: 'nd', label: 'isiNdebele', subLabel: 'isiNdebele' },
];

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // Brand & Tagline
    app_name: 'Thriftly',
    app_tagline: 'Secondhand clothes near you. Inspect before buying.',
    hero_badge: 'Zimbabwe Local Resale',
    harare: 'Harare (Mbare / CBD)',
    bulawayo: 'Bulawayo (Makokoba)',

    // Actions & Glossary (from spec)
    hello: 'Hello',
    clothes: 'Clothes',
    buy: 'Buy Now',
    sell: 'Sell',
    price: 'Price',
    reserve: 'Reserve to View',
    reserve_hold: 'Hold for me',
    collect_pickup: 'Collect at stand',
    im_here: "I'm here at stand",
    size: 'Size',
    sold: 'Sold',
    available: 'Available',
    market_stand: 'Market Stand',
    confirmed: 'Confirmed',
    thank_you: 'Thank you',
    close: 'Close',
    back: 'Back',
    cancel: 'Cancel',
    save: 'Save',
    directions: 'Directions',
    whatsapp_chat: 'Chat on WhatsApp',

    // Nav
    nav_browse: 'Browse',
    nav_orders: 'My Holds & Orders',
    nav_vendor: 'Stand Vendor Hub',
    nav_bot_sim: 'WhatsApp Bot',

    // Header & Controls
    low_data_mode: 'Data Saver (3G)',
    currency_switch: 'Currency',
    choose_language: 'Choose Language',
    search_placeholder: 'Search jacket, bhero, mbatya, size...',

    // Categories
    cat_all: 'All Items',
    cat_clothing: 'Clothes',
    cat_jackets: 'Jackets & Coats',
    cat_shoes: 'Shoes & Boots',
    cat_denim: 'Denim & Jeans',
    cat_dresses: 'Dresses & Tops',
    cat_vintage: 'Rare Bhero Picks',

    // Fulfilment Modes
    mode_reserve_to_view: 'Reserve to View',
    mode_reserve_desc: 'Hold for free or deposit, touch fabric at stand before paying.',
    mode_pickup: 'Fast Pickup',
    mode_pickup_desc: 'Pay now or on collection with secure pickup code.',
    mode_delivery: 'Local Delivery (Pilot)',
    mode_delivery_desc: 'Delivered by verified local runner.',

    // Conditions
    condition_grade_a: 'Grade A · Like New',
    condition_grade_b: 'Grade B · Gently Worn',
    condition_grade_c: 'Grade C · Fair Thrift',
    condition_grade_a_desc: 'Crisp fabric, no stains or visible flaws.',
    condition_grade_b_desc: 'Normal light wear, all buttons and zippers work.',
    condition_grade_c_desc: 'Clear thrift charm, minor flaws listed below.',

    // Item Details
    measurements: 'Measurements',
    chest_waist: 'Chest/Waist',
    length: 'Length',
    flaws_note: 'Honest Condition & Flaws',
    no_flaws: 'No flaws spotted. Grade inspected.',
    vendor_location_title: 'Stand Location & Landmark',
    days_present_label: 'Days at Stand',
    voice_note_label: 'Listen to vendor description (Voice note)',
    voice_playing: 'Playing vendor audio note...',
    voice_paused: 'Vendor voice description (14 sec)',
    similar_items_title: 'Other items at this stand',
    just_sold_alert: 'Just sold! Here are similar pieces nearby:',

    // Reservation Flow
    reserve_title: 'Reserve to View at Stand',
    reserve_subtitle: 'The vendor will hold this garment exclusively for you.',
    select_slot: 'Pick your visit time:',
    slot_today_afternoon: 'Today 2:30 PM - 3:30 PM',
    slot_today_late: 'Today 4:00 PM - 5:00 PM',
    slot_tomorrow_morning: 'Tomorrow 10:00 AM - 11:30 AM',
    hold_policy_notice: 'Hold duration: Visit window + 15 min grace period. Prevents double-selling.',
    optional_deposit_title: 'Optional $1 USD visit deposit',
    optional_deposit_desc: 'Guarantees the stand keeps it aside on busy market days. 100% refundable if not as described.',
    confirm_reservation_btn: 'Confirm Stand Reservation',

    // Checkout / Pickup
    checkout_title: 'Collect at Market Stand',
    payment_method: 'Payment Method',
    pay_cash_pickup: 'Cash on Pickup (USD or ZiG)',
    pay_ecocash: 'EcoCash Mobile Money',
    pay_innbucks: 'InnBucks Wallet',
    pay_zipit: 'ZIPIT Direct Transfer',
    hold_timer_label: 'Active Cart Hold expires in:',
    pickup_code_title: 'Your Secret Pickup Code',
    pickup_code_sub: 'Show this code to the vendor when collecting to verify your order.',
    btn_confirm_pickup: 'Confirm Pickup Order',

    // Orders & Tracking
    no_active_orders: 'No active holds yet. Browse items and tap "Reserve to view".',
    status_pending: 'Awaiting Vendor Check',
    status_confirmed: 'Confirmed & Held at Stand',
    status_ready: 'Ready for Collection',
    status_arrived: 'Buyer Arrived at Stand',
    status_completed: 'Completed & Inspected',
    status_cancelled: 'Cancelled / Released',
    im_here_btn: "I'm here! Notify Vendor",
    im_here_success: 'Vendor notified! They will bring your reserved garment.',
    directions_landmark: 'Landmark directions',

    // Vendor Portal
    vendor_title: 'Bhero Vendor Dashboard',
    vendor_switch_stand: 'Switch Stand',
    vendor_status_toggle: 'Stand Open Today',
    vendor_away_notice: 'Marked as away: Stand closed today',
    vendor_reliability: 'Reliability Score',
    vendor_sales_today: 'Total Sales',
    incoming_reservations: 'Incoming Reservations & Holds',
    btn_accept_res: 'Accept Hold',
    btn_decline_res: 'Decline',
    btn_mark_ready: 'Mark Ready',
    btn_mark_sold: 'Mark Sold at Stand',

    // WhatsApp Bot Simulator
    bot_sim_title: 'WhatsApp Bot Simulator',
    bot_sim_subtitle: 'Used by market vendors & feature-phone users without smartphone app.',
    bot_send: 'Send',
    bot_placeholder: 'Type 1, 2, or keywords (e.g. ndatambira / accept)...',

    // Report Translation
    report_wording: 'Report a wording problem',
    report_wording_title: 'Improve Translations',
    report_wording_desc: 'Notice a stiff translation or better everyday Shona/Ndebele phrase? Help us make Thriftly feel natural.',
    report_submit: 'Submit suggestion',
    report_success: 'Maita basa / Siyabonga! Your translation feedback has been recorded.',
  },

  sn: {
    // chiShona
    app_name: 'Thriftly',
    app_tagline: 'Mbatya dzechipiri dziri pedyo newe. Batisa uone usati watenga.',
    hero_badge: 'Mabhero Emuno muZimbabwe',
    harare: 'Harare (Mbare / Musika / CBD)',
    bulawayo: 'Bulawayo (Makokoba)',

    hello: 'Mhoro shamwari',
    clothes: 'Mbatya',
    buy: 'Tenga Izvozvi',
    sell: 'Tengesa',
    price: 'Mutengo',
    reserve: 'Ndichengetere Ndiuye Kuzoona',
    reserve_hold: 'Ndichengetere',
    collect_pickup: 'Tora pastendi',
    im_here: 'Ndasvika pastendi',
    size: 'Saizi',
    sold: 'Chatengeswa',
    available: 'Chiripo',
    market_stand: 'Stendi / Bhero',
    confirmed: 'Zvatsimbiswa',
    thank_you: 'Ndatenda zvikuru / Maita basa',
    close: 'Vhara',
    back: 'Dzokera shure',
    cancel: 'Kanzura',
    save: 'Chengetedza',
    directions: 'Nzira yekusvika',
    whatsapp_chat: 'Taura naMutengesi paWhatsApp',

    nav_browse: 'Tarisa Mbatya',
    nav_orders: 'Zvandakachengeta',
    nav_vendor: 'Dhesiki reMutengesi',
    nav_bot_sim: 'WhatsApp Bot',

    low_data_mode: 'Chengetedza Dhata (3G)',
    currency_switch: 'Mari',
    choose_language: 'Sarudza Mutauro',
    search_placeholder: 'Tsvaga bhachi, bhero, mbatya, saizi...',

    cat_all: 'Zvose Zviripo',
    cat_clothing: 'Mbatya Dzose',
    cat_jackets: 'Mabhachi neMajasi',
    cat_shoes: 'Shangu neBhutsu',
    cat_denim: 'Mabhurugwa eDhenimi',
    cat_dresses: 'Madhirezi neZvikepisi',
    cat_vintage: 'Zvinhu Zvakasarudzika',

    mode_reserve_to_view: 'Ndichengetere Ndiuye Kuzoona',
    mode_reserve_desc: 'Chengetedza mahara, ubate jira usati wabhadhara pastendi.',
    mode_pickup: 'Kutora Nekuchimbidza',
    mode_pickup_desc: 'Bhadhara mberi kana paunotora uchishandisa kodhi yako.',
    mode_delivery: 'Kuunzirwa Pamba (Mwayidzo)',
    mode_delivery_desc: 'Unounzirwa nemunhu wekufambisa akavimbika.',

    condition_grade_a: 'Giredhi A · Sechitsva Chaicho',
    condition_grade_b: 'Giredhi B · Chakanaka Kwazvo',
    condition_grade_c: 'Giredhi C · Bhero Rakareruka',
    condition_grade_a_desc: 'Jira rakasimba risina gwapa kana kukuvara.',
    condition_grade_b_desc: 'Yakambopfekwa zvinyoro nyoro, mabhatani nezipi zvakasimba.',
    condition_grade_c_desc: 'Mbatya dzechinyakare, ine kamwe kaflaw katsanangurwa pasi.',

    measurements: 'Kukura neMasvomhu',
    chest_waist: 'Mupimo weChityu/Chiuno',
    length: 'Kureba',
    flaws_note: 'Tsananguro Yezvakakanganisika',
    no_flaws: 'Haina kukuvara kwakaonekwa. Giredhi rakaongororwa.',
    vendor_location_title: 'Nzvimbo yeStendi neMaka',
    days_present_label: 'Mazuva Anowanikwa',
    voice_note_label: 'Teerera tsanangudzo yemutengesi (Inzwi)',
    voice_playing: 'Mutengesi ari kutaura...',
    voice_paused: 'Tsanangudzo yeinzwi yemutengesi (14 sec)',
    similar_items_title: 'Dzimwe mbatya dziri pastendi ino',
    just_sold_alert: 'Chichangotengeswa! Heano mamwe akafanana ari pedyo:',

    reserve_title: 'Chengetedza Kuti Uuye Kuzoona',
    reserve_subtitle: 'Mutengesi achaisira parutivi chigadzirwa ichi chete kwauri.',
    select_slot: 'Sarudza nguva yauchange uri pastendi:',
    slot_today_afternoon: 'Nhasi Masikati 2:30 PM - 3:30 PM',
    slot_today_late: 'Nhasi Madekwana 4:00 PM - 5:00 PM',
    slot_tomorrow_morning: 'Mangwana Mangwanani 10:00 AM - 11:30 AM',
    hold_policy_notice: 'Nguva yekuchengeta: Nguva yakasarudzwa nemamwe maminitsi 15. Inodzivirira kutengesera mumwe.',
    optional_deposit_title: 'Dhipoziti yesarudzo ye $1 USD',
    optional_deposit_desc: 'Inoita kuti mutengesi akuchengetere zvakakwana mumusika makazara. Inodzoserwa 100% kana chisingaenderane.',
    confirm_reservation_btn: 'Tsimbisa Kuchengeta paStendi',

    checkout_title: 'Tora paStendi yeMusika',
    payment_method: 'Nzira Yekubhadhara',
    pay_cash_pickup: 'Mari Yemawoko paKutora (USD kana ZiG)',
    pay_ecocash: 'EcoCash Mobile Money',
    pay_innbucks: 'InnBucks Wallet',
    pay_zipit: 'ZIPIT kuBhangi',
    hold_timer_label: 'Nguva yekubata nguo isati yaburitswa:',
    pickup_code_title: 'Kodhi Yako yeChakavanzika yekutora',
    pickup_code_sub: 'Ratidza mutengesi kodhi iyi paunosvika kuti upiwe mbatya dzako.',
    btn_confirm_pickup: 'Tsimbisa Odha Yekutora',

    no_active_orders: 'Hausati wachengetedza chinhu. Tarisa mbatya wobaya "Ndichengetere".',
    status_pending: 'Kumirira Kutambirwa neMutengesi',
    status_confirmed: 'Zvatsimbiswa & Zvakachengetwa paStendi',
    status_ready: 'Zvagadzirirwa Kutora',
    status_arrived: 'Mutengi Asvika paStendi',
    status_completed: 'Zvapedzwa & Zvaongororwa',
    status_cancelled: 'Zvakanzurwa / Zvaburitswa',
    im_here_btn: 'Ndasvika! Zivisa Mutengesi',
    im_here_success: 'Mutengesi aziviswa! Ari kukubuditsira mbatya dzenyu.',
    directions_landmark: 'Nzira yemakamaka epedyo',

    vendor_title: 'Dhesiki reMutengesi weBhero',
    vendor_switch_stand: 'Chinja Stendi',
    vendor_status_toggle: 'Stendi Yakazaruka Nhasi',
    vendor_away_notice: 'Hapana munhu: Stendi yakavharwa nhasi',
    vendor_reliability: 'Kuvimbika kweMutengesi',
    vendor_sales_today: 'Mbatya Dzatengeswa',
    incoming_reservations: 'Zvinhu Zvakumbirwa Kuchengetwa',
    btn_accept_res: 'Tambira (Ndatambira)',
    btn_decline_res: 'Ramba',
    btn_mark_ready: 'Isa Kuti Zvagadzirwa',
    btn_mark_sold: 'Isa Kuti Zvatengeswa paStendi',

    bot_sim_title: 'WhatsApp Bot yeMutengesi',
    bot_sim_subtitle: 'Inoshandiswa nevanoita zvemusika vasina app mufoni.',
    bot_send: 'Tumira',
    bot_placeholder: 'Nyora 1, 2, kana izwi (semuenzaniso: ndatambira)...',

    report_wording: 'Taurira patakarasika mashoko',
    report_wording_title: 'Gadziridza Mitauro',
    report_wording_desc: 'Pane mashoko asina kunyatsogara zvakanaka muchiShona? Tibatsire kuita kuti zvinzwisisike.',
    report_submit: 'Tumira pfungwa dzenyu',
    report_success: 'Maita basa chaizvo! Mashoko enyu asvika kuvashandi vedu.',
  },

  nd: {
    // isiNdebele
    app_name: 'Thriftly',
    app_tagline: 'Impahla zamasekeni eduze kwakho. Hlola ngaphambi kokuthenga.',
    hero_badge: 'Izitolo Zamabhero eZimbabwe',
    harare: 'Harare (Mbare / Musika / CBD)',
    bulawayo: 'Bulawayo (Makokoba / Esgodweni)',

    hello: 'Salibonani / Sawubona',
    clothes: 'Impahla / Izigqoko',
    buy: 'Thenga Khathesi',
    sell: 'Thengisa',
    price: 'Intengo',
    reserve: 'Ngibekele Ngizohlola',
    reserve_hold: 'Ngibekele',
    collect_pickup: 'Thatha esitendini',
    im_here: 'Ngifikile esitendini',
    size: 'Usayizi',
    sold: 'Kuthengisiwe',
    available: 'Kuyatholakala',
    market_stand: 'Isitendi / Ibhero',
    confirmed: 'Kuqinisekisiwe',
    thank_you: 'Ngiyabonga kakhulu / Siyabonga',
    close: 'Vala',
    back: 'Buyela emuva',
    cancel: 'Cima',
    save: 'Londoloza',
    directions: 'Indlela eya esitendini',
    whatsapp_chat: 'Khuluma lomthengisi kuWhatsApp',

    nav_browse: 'Dinga Impahla',
    nav_orders: 'Engikubekelelweyo',
    nav_vendor: 'Ihhovisi Lomthengisi',
    nav_bot_sim: 'WhatsApp Bot',

    low_data_mode: 'Hlambulula Idatha (3G)',
    currency_switch: 'Imali',
    choose_language: 'Khetha Ulimi',
    search_placeholder: 'Dinga ibhantshi, ibhero, impahla, usayizi...',

    cat_all: 'Konke Okukhona',
    cat_clothing: 'Zonke Impahla',
    cat_jackets: 'Amabhantshi Lamajazi',
    cat_shoes: 'Izicathulo Lamabhutsu',
    cat_denim: 'Amabhurugwe eDhenimi',
    cat_dresses: 'Amalokwe Lamaduku',
    cat_vintage: 'Okukhethiweyo Kwamabhero',

    mode_reserve_to_view: 'Ngibekele Ngizohlola',
    mode_reserve_desc: 'Bekelela mahala, ubambe ilula lempahla ngaphambi kokubhadala.',
    mode_pickup: 'Ukuthatha Ngokuphangisa',
    mode_pickup_desc: 'Bhadala khathesi kumbe nxa uthatha usebenzisa ikhodi yakho.',
    mode_delivery: 'Ukulethwa Ekhasini (Ilingo)',
    mode_delivery_desc: 'Ilethelwa ngumgijimi othembekileyo wendawo.',

    condition_grade_a: 'Igrayidi A · Kunjengokutsha',
    condition_grade_b: 'Igrayidi B · Kuhle Kakhulu',
    condition_grade_c: 'Igrayidi C · Ibhero Elisebenzileyo',
    condition_grade_a_desc: 'Indwangu eqinileyo engenamabala kumbe ukudabuka.',
    condition_grade_b_desc: 'Kugqokwe kancane, amabhathini lamazipi kuqinile.',
    condition_grade_c_desc: 'Impahla yakudala enhle, ilokuncane okuchaziweyo ngezansi.',

    measurements: 'Isilinganiso Nobude',
    chest_waist: 'Isifuba / Ukhalo',
    length: 'Ubude',
    flaws_note: 'Ukuchazwa Kwamaphutha Empahla',
    no_flaws: 'Akukho monakalo owabonakalayo. Kuhloliwe.',
    vendor_location_title: 'Indawo Yesitendi Lomhlahlandlela',
    days_present_label: 'Izinsuku Zokutholakala',
    voice_note_label: 'Lalela incazelo yomthengisi (Ilizwi)',
    voice_playing: 'Umthengisi uyakhuluma...',
    voice_paused: 'Incazelo yelizwi yomthengisi (14 sec)',
    similar_items_title: 'Ezinye impahla ezikulesi sitendi',
    just_sold_alert: 'Kusanda kuthengiswa! Nanku okunye okufananayo eduze:',

    reserve_title: 'Bekelela Ukuze Uze Uhlole',
    reserve_subtitle: 'Umthengisi uzagcinela wena kuphela lesi siphahla.',
    select_slot: 'Khetha isikhathi ozabe ukhona esitendini:',
    slot_today_afternoon: 'Namuhla Emini 2:30 PM - 3:30 PM',
    slot_today_late: 'Namuhla Ntambama 4:00 PM - 5:00 PM',
    slot_tomorrow_morning: 'Kusasa Ekuseni 10:00 AM - 11:30 AM',
    hold_policy_notice: 'Isikhathi sokubekelela: Isikhathi osikhethileyo lemizuzu elitshumi lanhlanu. Kuvikela ukuthengisela omunye.',
    optional_deposit_title: 'Idiphozithi yokuzikhethela eye $1 USD',
    optional_deposit_desc: 'Iqinisekisa ukuthi umthengisi uyakugcinela emakethe egcweleyo. Ibuyiselwa 100% nxa kungafanelani.',
    confirm_reservation_btn: 'Qinisekisa Ukubekelela Esitendini',

    checkout_title: 'Thatha Esitendini Semakethe',
    payment_method: 'Indlela Yokuhlawula',
    pay_cash_pickup: 'Imali Yesandla Nxa Uthatha (USD kumbe ZiG)',
    pay_ecocash: 'EcoCash Mobile Money',
    pay_innbucks: 'InnBucks Wallet',
    pay_zipit: 'ZIPIT eBhangeni',
    hold_timer_label: 'Isikhathi sokubamba impahla ngaphambi kokudedelwa:',
    pickup_code_title: 'Ikhodi Yakho Eyimfihlo Yokuthatha',
    pickup_code_sub: 'Tshetshela umthengisi le khodi nxa usufikile ukuze uthathe.',
    btn_confirm_pickup: 'Qinisekisa Ukuthatha',

    no_active_orders: 'Awukagcini lutho okwamanje. Dinga impahla bese ucindezela "Ngibekele".',
    status_pending: 'Kumelelwe Ukwamukelwa Ngumthengisi',
    status_confirmed: 'Kuqinisekisiwe & Kugciniwe Esitendini',
    status_ready: 'Kulungiselwe Ukuthathwa',
    status_arrived: 'Umthengi Ufikile Esitendini',
    status_completed: 'Kuqediwe & Kuhloliwe',
    status_cancelled: 'Kucinyiwe / Kudedeliwe',
    im_here_btn: 'Ngifikile! Yazisa Umthengisi',
    im_here_success: 'Umthengisi wazisiwe! Uyakukhiphela impahla yakho khathesi.',
    directions_landmark: 'Umhlahlandlela wendawo',

    vendor_title: 'Ihhovisi Lomthengisi Webhero',
    vendor_switch_stand: 'Tshintsha Isitendi',
    vendor_status_toggle: 'Isitendi Sivuliwe Namuhla',
    vendor_away_notice: 'Kavaliwe: Umthengisi akekho namuhla',
    vendor_reliability: 'Ukuthembeka Komthengisi',
    vendor_sales_today: 'Impahla Ezithengisiweyo',
    incoming_reservations: 'Okuceliweyo Ukuthi Kubekelwe',
    btn_accept_res: 'Yamukela (Ngiyavuma)',
    btn_decline_res: 'Yala',
    btn_mark_ready: 'Faka Ukuthi Sekulungile',
    btn_mark_sold: 'Faka Ukuthi Kuthengisiwe',

    bot_sim_title: 'WhatsApp Bot Yomthengisi',
    bot_sim_subtitle: 'Isetshenziswa ngabathengisi bemakethe abangela app efonini.',
    bot_send: 'Thumela',
    bot_placeholder: 'Bhala 1, 2, kumbe ibala (isibonelo: ngiyavuma)...',

    report_wording: 'Bika iphutha lokuhumusha',
    report_wording_title: 'Lungisa Amazwi Olimi',
    report_wording_desc: 'Ubone ibala elingahlalanga kuhle ngesiNdebele? Sisize senze uhlelo lukhulume njengabantu.',
    report_submit: 'Thumela umbono',
    report_success: 'Siyabonga kakhulu! Amazwi akho afikile.',
  },
};

/**
 * Format price in either USD or ZiG
 */
export function formatPrice(usdAmount: number, currency: Currency): string {
  if (currency === 'ZiG') {
    const zigAmount = Math.round(usdAmount * ZIG_PER_USD);
    return `ZiG ${zigAmount.toLocaleString()}`;
  }
  return `$${usdAmount.toFixed(usdAmount % 1 === 0 ? 0 : 2)} USD`;
}

/**
 * Multilingual search synonym dictionary for code-switching
 */
const SYNONYM_MAP: Record<string, string> = {
  // Shona terms (singular & plural)
  mbatya: 'clothing',
  hembe: 'clothing',
  mahembe: 'clothing',
  bhero: 'vintage',
  mabhero: 'vintage',
  bhachi: 'jackets',
  mabhachi: 'jackets',
  jasi: 'jackets',
  majasi: 'jackets',
  bhurugwa: 'denim',
  mabhurugwa: 'denim',
  bhutsu: 'shoes',
  shangu: 'shoes',
  dhiredzi: 'dresses',
  madhiredzi: 'dresses',
  tenga: 'all',
  mbare: 'harare',
  mupedzanhamo: 'harare',

  // Ndebele terms (singular & plural)
  impahla: 'clothing',
  izigqoko: 'clothing',
  ihembe: 'clothing',
  amahembe: 'clothing',
  ibhero: 'vintage',
  amabhero: 'vintage',
  ibhantshi: 'jackets',
  amabhantshi: 'jackets',
  ijazi: 'jackets',
  amajazi: 'jackets',
  amabhurugwe: 'denim',
  ibhulukwe: 'denim',
  izicathulo: 'shoes',
  amabhutsu: 'shoes',
  ibhuthu: 'shoes',
  ilokwe: 'dresses',
  amalokwe: 'dresses',
  thenga: 'all',
  makokoba: 'bulawayo',
  esgodweni: 'bulawayo',

  // Common English & Slang
  clothes: 'clothing',
  shirt: 'clothing',
  shirts: 'clothing',
  jacket: 'jackets',
  jackets: 'jackets',
  coat: 'jackets',
  coats: 'jackets',
  boots: 'shoes',
  shoes: 'shoes',
  sneakers: 'shoes',
  jeans: 'denim',
  jean: 'denim',
  dress: 'dresses',
  dresses: 'dresses',
  skirt: 'dresses',
  thrift: 'vintage',
  vintage: 'vintage',
};

/**
 * Match query against code-switched synonyms or direct term
 */
export function resolveSearchQuery(query: string): { normalizedCategory?: string; keywords: string[] } {
  const clean = query.trim().toLowerCase();
  if (!clean) return { keywords: [] };

  const tokens = clean.split(/\s+/);
  let matchedCategory: string | undefined;

  for (const token of tokens) {
    if (SYNONYM_MAP[token]) {
      matchedCategory = SYNONYM_MAP[token];
      break;
    }
  }

  return {
    normalizedCategory: matchedCategory,
    keywords: tokens,
  };
}

/**
 * Safe translation getter with fallback
 */
export function t(key: string, lang: Language): string {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
  return dict[key] || TRANSLATIONS.en[key] || key;
}
